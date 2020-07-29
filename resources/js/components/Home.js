import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Link,Route,Redirect} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

class Home extends Component {
    constructor(props) 
    {
        super(props);
        this.state={
            categories:[],
            cartPrice:0.00,
            isLoading: true,
        }
    }

    componentDidMount() 
    {
        const user = JSON.parse(localStorage.getItem("userData"));
        const currencyId = localStorage.getItem("currencyId");
        axios.get('http://127.0.0.1:8000/products/'+user.id+'/'+currencyId)
        .then(response=>{
            this.setState({
                categories:response.data.result,
                cartPrice : response.data.totalPrice,
                isLoading : false
            });
        });
    }

    addToCart(id,price) {
        this.setState({ isLoading: true });
        const user = JSON.parse(localStorage.getItem("userData"));
        const currencyId = localStorage.getItem("currencyId");
        axios.post('http://127.0.0.1:8000/cart/add', {id:id,price:price,user_id:user.id,quantity:1,currency_id:currencyId})
        .then(response=>{
            this.setState({ isLoading: false });
            if (response.data.status === 200) {
                this.setState({isProcess:false,cartPrice:response.data.totalPrice});
            } else {
                alert('Issue occured...');
            }
        });
    }

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div>
            <Header cartPrice={ this.state.cartPrice }/>
            <section className="domnoo-menu-filter list-grid-sec new-block">
                <div className="fixed-bg parallax error-img"></div>
                <div className="overlay"></div>
                <div className="filters">
                    <div className="filter-tabnav">
                        <div className="col-md-12">
                            <span className="sort-by"> Short by :</span>
                            <ul className="button-group js-radio-button-group" data-filter-group="item_cat_inner">
                                <li className="sort-btn tab-flr-btn-sort-btn-active" data-sort="default:asc"><span>Newest First</span></li>
                                <li className="sort-btn" data-sort="popularity:asc"><span>Popularity</span></li>
                                <li className="sort-btn" data-sort="price:asc"><span>Low to High</span></li>
                                <li className="sort-btn" data-sort="price:desc"><span>High to Low</span></li>
                            </ul>
                            <div className="list-grid-btns">
                                <button className="btn grid-btn"><i className="flaticon-menu"></i></button>
                                <button className="btn active list-btn"><i className="flaticon-grid"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
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

                <div className="clearfix"></div>
                <div className="grid" id="grid">
                {
                    this.state.categories.map((categories,i)=> {
                        return (
                                <div className="items-for-flr pizza" data-newest="1" data-popularity="5" data-price={categories.price} key={i}>
                                    <div className="block-stl2">
                                        <div className="img-holder">
                                            <img src={"images/"+categories.image} alt="" className="img-responsive"/>
                                        </div>
                                        <div className="text-block">
                                            <h3>{categories.name}</h3>
                                            <p className="sz">Size : {categories.cat_name}</p>
                                            <p className="price"><span>{categories.sym} {categories.price.toFixed(2)}</span></p>
                                            <p className="ab-it">{categories.desc}</p>
                                        </div>
                                        <div className="btn-sec">
                                            <Button to="/" className="btn4" onClick={() =>this.addToCart(categories.product_id,categories.price)}>Add to Cart</Button>
                                        </div>
                                    </div>

                                    <div className="block-stl2_dsn2 md2">
                                        <div className="img-holder">
                                            <img src={"images/"+categories.image} alt="" className="img-responsive"/>
                                        </div>
                                        <div className="text-block">
                                            <h3>{categories.name}</h3>
                                            <p className="sz">Size : {categories.cat_name}</p>
                                            <p className="price"><span>{categories.sym} {categories.price.toFixed(2)}</span></p>
                                            <p className="ab-it">{categories.desc}</p>
                                            <div className="btn-sec">
                                                <Button to="/" className="btn4" onClick={() => this.addToCart(categories.product_id,categories.price)}>Add to Cart</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                )
                    })

                }
                </div>
                <div className="clearfix"></div>
            </section>
            <Footer/>
            </div>
        );

    }

}

export default Home;