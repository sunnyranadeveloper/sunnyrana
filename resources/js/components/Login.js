import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import {BrowserRouter as Router,Link,Route} from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			msg: "",
			isLoading: false,
			redirect: false,
			errMsgEmail: "",
			errMsgPwd: "",
			errMsg: "",
		};
	}

	onChangehandler = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		let data = {};
		data[name] = value;
		this.setState(data);
	};

	onSignInHandler = () => {
		this.setState({ isLoading: true });
		axios
		.post("http://localhost:8000/api/user-login", {
			email: this.state.email,
			password: this.state.password,
		})
		.then((response) => {
			this.setState({ isLoading: false });
			if (response.data.status === 200) {
				localStorage.setItem("isLoggedIn", true);
				localStorage.setItem("currencyId", response.data.currencyId);
				localStorage.setItem("userData", JSON.stringify(response.data.data));
				this.setState({
					msg: response.data.message,
					redirect: true,
				});      
			}
			if (response.data.status === "failed" && response.data.success === undefined) {
				this.setState({
					errMsgEmail: response.data.validation_error.email,
					errMsgPwd: response.data.validation_error.password,
					msg: response.data.message,
				});
				setTimeout(() => {
					this.setState({ errMsgEmail: "", errMsgPwd: "" });
				}, 2000);
			} else if (response.data.status === "failed" && response.data.success === false) {
				this.setState({
					msg: response.data.message,
				});
				setTimeout(() => {
					this.setState({ errMsg: "" });
				}, 2000);
			}
		})
		.catch((error) => {
			console.log(error);
		});
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to="/home" />;
		}
		const login = localStorage.getItem("isLoggedIn");
		if (login) {
			return <Redirect to="/home" />;
		}
		const isLoading = this.state.isLoading;
		const msg = this.state.msg;
	    return (
	    	<div>
	    	<Header />
	    	<section className="domnoo-menu-filter list-grid-sec new-block">
		        <div className="col-md-offset-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
					<div className="block-stl10">
						<h1>Login :</h1>
						<p>Please Enter Username/Password.</p>
						<Form action="#">
							<FormGroup>
								<div className="form-group">
									<input type="text" className="form-control" name="email" 
									value={this.state.email}
	              					onChange={this.onChangehandler}
									placeholder="Username Here"/>
								</div>
								<div className="form-error">{this.state.errMsgEmail}</div>
							</FormGroup>
							<FormGroup>
								<div className="form-group">
									<input type="password" className="form-control" name="password"
									value={this.state.password}
	              					onChange={this.onChangehandler}
									placeholder="Password Here"/>
								</div>
								<div className="form-error">{this.state.errMsgPwd}</div>
							</FormGroup>
							<FormGroup>
								<div className="form-group">
									<div className="form-error">{msg}</div>
								</div>
							</FormGroup>
							<div className="form-group">
								<Button className="btn btn3"
								color="success"
            					onClick={this.onSignInHandler}>
            					Login
            					{isLoading ? (
					              <span
					                className="spinner-border spinner-border-sm ml-5"
					                role="status"
					                aria-hidden="true"
					              ></span>
					            ) : (
					              <span></span>
					            )}
            					</Button>
							</div>
							<div className="form-group">
								<Link to="/register" className="btn btn3">Register Here</Link>
							</div>
						</Form>
					</div>
				</div>
			</section>
			<Footer/>
            </div>
	    );
	}
}

export default Login;