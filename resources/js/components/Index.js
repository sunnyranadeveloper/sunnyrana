import React, { Component } from 'react';
import ReactDOM,{ render } from 'react-dom';
import {BrowserRouter as Router,Link,Route,Switch,withRouter} from 'react-router-dom';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Login from './Login';
import Register from './Register';
import Payment from './Payment';
import Orders from './Orders';

class Index extends Component {
	
    render() {
    	return (
	        <div className="container">
	            <Router>
	        		<Route exact path="/" component={Login}  />
	                <Route exact path="/home" component={Home} />
	        		<Route exact path="/register" component={Register}/>
	        		<Route exact path="/payment" component={Payment} />
	        		<Route exact path="/orders" component={Orders} />
		        </Router>
	        </div>
	    );
    }
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
