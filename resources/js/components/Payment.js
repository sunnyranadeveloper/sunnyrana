import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Link,Route,Redirect} from 'react-router-dom';
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
            order:true,
            payment:false,
            currencySym:''
        }
    }

    componentDidMount() 
    {
        const user = JSON.parse(localStorage.getItem("userData"));
        const currencyId = localStorage.getItem("currencyId");
        axios.get('http://127.0.0.1:8000/cart/get/'+user.id+'/'+currencyId)
        .then(response=>{
            this.setState({
                cart:response.data.data,
                cartPrice : response.data.totalPrice,
                order : response.data.isRecords,
                isLoading : false,
                currencySym : response.data.currencySym,
            });
        });
    }

    removeItem(productId) {
        this.setState({ isLoading: true });
        const user = JSON.parse(localStorage.getItem("userData"));
        const currencyId = localStorage.getItem("currencyId");
        axios.get('http://127.0.0.1:8000/cart/remove/'+user.id+'/'+productId+'/'+currencyId)
        .then(response=>{
            this.setState({
                        cart:response.data.data,
                        cartPrice : response.data.totalPrice,
                        order : response.data.isRecords,
                        isLoading : false
                    });

        });
    }

    updateQuantity(id,quantity) {
        this.setState({ isLoading: true });
        const user = JSON.parse(localStorage.getItem("userData"));
        const currencyId = localStorage.getItem("currencyId");
        axios.post('http://127.0.0.1:8000/cart/update',{id:id,user_id:user.id,quantity:quantity,currency_id:currencyId})
        .then(response=>{
            this.setState({
                        cart:response.data.data,
                        cartPrice : response.data.totalPrice,
                        isLoading : false
                    });

        });
    }

    confirmPayment() {
        this.setState({ isLoading: true });
        const user = JSON.parse(localStorage.getItem("userData"));
        const currencyId = localStorage.getItem("currencyId");
        axios.post('http://127.0.0.1:8000/cart/confirm-order',{user_id:user.id,currency_id:currencyId})
        .then(response=>{
            this.setState({
                        cart:response.data.data,
                        cartPrice : response.data.totalPrice,
                        isLoading : false,
                        order : false,
                    });

            if(response.data.success) {
                this.setState({payment:true});
            }

        });

    }

    render() {
        const isLoading = this.state.isLoading;
        const cartPrice = this.state.cartPrice;
        const order = this.state.order;
        const payment = this.state.payment;
        if(payment) {
            return <Redirect to={{ pathname:"/orders", state:{msg:'Order has been done successfully.',success:true} }} />;
        }
        return (
            <div>
            <Header cartPrice={ this.state.cartPrice }/>
            <section className={ order ? ('new-block') : ('shopping-cart new-block') } >
                {
                    (order) ? (
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
                        <div className="col-lg-8">
                            <div className="table-responsive">
                                <table className="table cart-tbl">
                                <thead>
                                    <tr>
                                        <th className="p_dtl">Product Details</th>
                                        <th className="p_btn"></th>
                                        <th className="p_price">Price</th>
                                        <th className="p_quantity">Quantity</th>
                                        <th className="p_ttl">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.cart.map((cart,i)=> {
                                            return (
                                            <tr key={i}>
                                                <td className="p_dtl">
                                                    <div className="block-stl9">
                                                        <div className="img-holder">
                                                            <img src={"images/"+cart.image} alt="" className="img-responsive"/>
                                                        </div>
                                                        <div className="info-block">
                                                            <h5>{cart.name}</h5>
                                                            <p className="txt-cat">{cart.cat_name}</p>
                                                            <p className="txt-cat"><strong>{ cart.type }</strong></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p_btn">
                                                    <a href="#" className="btn1 stl3" onClick={() => this.removeItem(cart.id)}>Remove</a>
                                                </td>
                                                <td className="p_price">
                                                    {cart.sym} {cart.price.toFixed(2)}
                                                </td>
                                                <td className="p_quantity">
                                                    <div className="quantity">
                                                        <div className="quantity-button quantity-up"><Button onClick={() => this.updateQuantity(cart.id,1)}><i className="flaticon-add"></i></Button></div><br/>
                                                        <Input type="number" className="form-control text-center" value={cart.quantity} min="0" readOnly/><br/>
                                                        <div className="quantity-button quantity-down"><Button onClick={() => this.updateQuantity(cart.id,-1)}><i className="flaticon-substract"></i></Button></div>
                                                    </div>
                                                </td>
                                                <td className="p_ttl">
                                                    {cart.sym} {cart.totalPrice.toFixed(2)}
                                                </td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-xs-12">
                            <div className="block-stl10 odr-summary">
                                <h3>order summary :</h3>
                                <ul className="list-unstyled">
                                    <li><span className="ttl">Subtotal</span> <span className="stts">{this.state.currencySym} {cartPrice}</span></li>
                                    <li><span className="ttl">Shipping</span> <span className="stts">Free Shipping</span></li>
                                </ul>
                                <div className="ttl-all">
                                    <span className="ttlnm">Total</span>
                                    <span className="odr-stts">{this.state.currencySym} {cartPrice}</span>
                                </div>
                            </div>
                            <Button className="btn btn1 stl2" onClick={() =>this.confirmPayment()}>
                                Confirm Payment
                            </Button>
                        </div>
                    </div>
                </div>
                ) :
                (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-warning">
                                You don't have anything in Cart. Please select Pizzas.
                            </div>
                        </div>
                    </div>
                </div>
                )
                }
                <div className="clearfix"></div>
            </section>
            <Footer/>
            </div>
        );

    }

}

export default Payment;