import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios'
import Header from './Header';
import Footer from './Footer';

class Payment extends Component {
    constructor(props) 
    {
        super(props);
        this.state={
            cart:[],
            cartPrice:0.00,
            isLoading: true,
            msg: "",
            success:false,
        }
    }

    componentDidMount() 
    {
        const user = JSON.parse(localStorage.getItem("userData"));
        const currencyId = localStorage.getItem("currencyId");
        axios.get('http://127.0.0.1:8000/cart/orders/'+user.id+'/'+currencyId)
        .then(response=>{
            this.setState({
                cart:response.data.result,
                cartPrice:response.data.totalPrice,
                isLoading : false
            });

            setTimeout(() => {
                this.setState({ msg: "" });
              }, 2000);
        });
    }

    render() {
        const isLoading = this.state.isLoading;
        const cartPrice = this.state.cartPrice;
        const success = this.state.success;
        const msg = this.state.msg;
        return (
            <div>
            <Header cartPrice={ this.state.cartPrice }/>
            <section className="new-block">
                {
                    (this.props.success) ? (
                        <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-warning">
                                {this.props.msg}
                            </div>
                        </div>
                    </div>
                    ) : ('')
                }
                <div className="container">
                    {isLoading ? (
                        <div className="col-md-12 text-center">
                          <button className="btn btn-warning">
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading..
                          </button>
                        </div>
                        ) : (
                          <span></span>
                        )}
                    <div className="row { isLoading ? ('hide') : ('')  }">
                        <div className="col-lg-12">
                            <div className="table-responsive">
                                <table className="table cart-tbl">
                                <thead>
                                    <tr>
                                        <th className="p_dtl">Order Details</th>
                                        <th className="p_quantity">Quantity</th>
                                        <th className="p_ttl">Total</th>
                                        <th className="p_ttl">Order Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.cart.map((cart,i)=> {
                                            return (
                                            <tr key={i}>
                                                <td className="p_dtl">
                                                    <div className="block-stl9">
                                                        <div className="info-block">
                                                            <p className="txt-cat">Or. <strong>{ cart.order_no }</strong></p>
                                                            <p className="txt-cat">
                                                                { cart.name }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p_quantity">
                                                    <div className="quantity">
                                                        {cart.quantity}
                                                    </div>
                                                </td>
                                                <td className="p_ttl">
                                                    {cart.sym} {cart.price.toFixed(2)}
                                                </td>
                                                <td className="p_ttl">
                                                    <p className="txt-cat">{ cart.created_at }</p>
                                                </td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
            </section>
            <Footer/>
            </div>
        );

    }

}

export default Payment;