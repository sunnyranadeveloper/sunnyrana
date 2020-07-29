import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Redirect,Link} from 'react-router-dom';
import { Button } from "reactstrap";
import axios from 'axios'

class Header extends Component {

    constructor(props) 
    {
        super(props);
        this.state = {
            navigate: false,
            cart:[],
            currency:[],
            currencyId:0,
            isCurrencyChanged : false,
            currencySym : '',
        };
    }

    onLogoutHandler = () => {
        localStorage.clear();
        this.setState({
            navigate: true,
        });
    };

    componentDidMount() 
    {
        const navigate = this.state.navigate;
        const user = JSON.parse(localStorage.getItem("userData"));
        if(user != null) {
            this.fetchData()
        }
    }

    fetchData() {
        const user = JSON.parse(localStorage.getItem("userData"));
        const currencyId = localStorage.getItem("currencyId");
        axios.get('http://127.0.0.1:8000/cart/get/'+user.id+'/'+currencyId)
            .then(response=>{
                this.setState({ 
                    cart:response.data,
                    currency:response.data.currency, 
                    currencyId:response.data.currencyId,
                    currencySym:response.data.currencySym 
                });
            });
    }

    updateCart() {
        const user = JSON.parse(localStorage.getItem("userData"));
        const currencyId = localStorage.getItem("currencyId");
        axios.get('http://127.0.0.1:8000/cart/updateCartCurrency/'+user.id+'/'+currencyId)
            .then(response=>{
            });
    }

    changeCurrency(currencyId) {
        this.setState({currencyId:currencyId})
        localStorage.setItem("currencyId",currencyId)
        this.fetchData();
        this.setState({isCurrencyChanged:true});
        this.updateCart();
    }

    render() {
        const login = localStorage.getItem("isLoggedIn");
        const user = JSON.parse(localStorage.getItem("userData"));
        
        const navigate = this.state.navigate;
        const isCurrencyChanged = this.state.isCurrencyChanged;

        if (navigate || isCurrencyChanged) {
            return <Redirect to="/" />;
        }
        return (
        	<header className="new-block main-header">
                <div className="main-nav new-block">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="logo">
                                    <Link to="/"><img src="/images/logo.png" alt="logo" className="img-responsive"/></Link>
                                </div>
                                <div className="location-block">
                                    <p>Austrlia</p>
                                    <span>+00 123 456 789</span>
                                </div>
                                <Link to="/" className="nav-opener"><i className="fa fa-bars"></i></Link>
                                <nav className="nav">
                                    {
                                        login ? (
                                                <ul className="list-unstyled">
                                                    <li><Link to="/">Home</Link></li>
                                                    <li><Link to="/orders">My Order</Link></li>
                                                    <li><Link to="/home">Welcome : <strong>{user.name}</strong></Link></li>
                                                    <li><Link to="/" onClick={this.onLogoutHandler}>Logout</Link></li>
                                                    <li>
                                                        <div className="dropdown">
                                                            <Button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                {this.state.currencySym}
                                                            </Button>
                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                {
                                                                    this.state.currency.map((currency,i)=> {
                                                                        return (
                                                                                <span className="dropdown-item" onClick={()=>this.changeCurrency(currency.id)} row={i}>{currency.sym}</span>
                                                                            )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li><Link to="/payment"><i className="flaticon-scooter-front-view"></i><span className="nav-price"><strong>{this.state.currencySym} { this.props.cartPrice.toFixed(2) }</strong></span></Link></li>
                                                </ul>
                                            ) : (
                                                <ul className="list-unstyled">
                                                    <li><Link to="/">Home</Link></li>
                                                    <li><Link to="/">Login</Link></li>
                                                    <li><Link to="/register">Sign Up</Link></li>
                                                </ul>
                                            )
                                    }
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;