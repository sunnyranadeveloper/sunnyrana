import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Login from './Login';
import { Button, Form, FormGroup, Label, Input,FormFeedback } from "reactstrap";
import axios from "axios";
import Header from './Header';
import Footer from './Footer';

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			signupData: {
				name: "",
				email: "",
				phone: "",
				password: "",
				isLoading: "",
			},
			nameError:"",
			emailError:"",
			phoneError:"",
			passwordError:"",
			msg: "",
		};
	}

	validate = (name,email,phone,password) => {
		let nameError = "";
		let emailError = "";
		let phoneError = "";
		let passwordError = "";
		let error = 0;
		if (name=='') {
			nameError = 'Please Enter Name';
			this.setState({nameError});
			error = 1;
		} else {
			this.setState({nameError});
		}

		if (email=='') {
			emailError = 'Please Enter Email';
			this.setState({emailError});
			error = 1;
		} else {
			this.setState({emailError});
		}

		if (phone=='') {
			phoneError = 'Please Enter Phone';
			this.setState({phoneError});
			error = 1;
		} else {
			this.setState({phoneError});
		}

		if (password=='') {
			passwordError = 'Please Enter Password';
			this.setState({passwordError});
			error = 1;
		} else {
			this.setState({passwordError});
		}

		if(error==1) {
			return false;
		} else {
			return true;
		}
	}

	onChangehandler = (e, key) => {
		const { signupData } = this.state;
		signupData[e.target.name] = e.target.value;
		this.setState({ signupData });
		this.setState({nameError:"",emailError:"",phoneError:"",passwordError:""});
	};

	onSubmitHandler = (e) => {
	    e.preventDefault();
	    this.setState({ isLoading: true });

	    const isValid = this.validate(this.state.signupData.name,this.state.signupData.email,this.state.signupData.phone,this.state.signupData.password);
	    if(!isValid) {
	    	this.setState({ isLoading: false });
	    	return false;
	    }

	    axios
	      .post("http://localhost:8000/api/user-signup", this.state.signupData)
	      .then((response) => {
	        this.setState({ isLoading: false });
	        if (response.data.status === 200) {
	          this.setState({
	            msg: response.data.message,
	            signupData: {
	              name: "",
	              email: "",
	              phone: "",
	              password: "",
	            },
	          });
	          setTimeout(() => {
	            this.setState({ msg: "Registered... Please login now." });
	          }, 2000);
	        }

	        if (response.data.status === "failed") {
	          this.setState({ msg: response.data.message });
	          setTimeout(() => {
	            this.setState({ msg: "" });
	          }, 2000);
	        }
	      });
	  };


	render() {
		const isLoading = this.state.isLoading;
    return (
    	<div>
      	<Header/>
    	<section className="domnoo-menu-filter list-grid-sec new-block">
	        <div className="col-md-offset-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
				<div className="block-stl10">
					<h1>Register :</h1>
					<p>Please Register here.</p>
					<Form action="#">
						<FormGroup>
							<div className="form-group">
								<Input type="text" className="form-control" name="name"
								placeholder="Enter Name" value={this.state.signupData.name}
              					onChange={this.onChangehandler} required/>
              					<div className="form-error">{this.state.nameError}</div>
							</div>
						</FormGroup>
						<FormGroup>
							<div className="form-group">
								<Input type="text" className="form-control" name="email"
								placeholder="email" value={this.state.signupData.email}
              					onChange={this.onChangehandler} required/>
              					<div className="form-error">{this.state.emailError}</div>
							</div>
						</FormGroup>
						<FormGroup>
							<div className="form-group">
								<Input type="text" className="form-control"  name="phone"
								placeholder="Phone" value={this.state.signupData.phone}
              					onChange={this.onChangehandler} required/>
              					<div className="form-error">{this.state.phoneError}</div>
							</div>
						</FormGroup>
						<FormGroup>
							<div className="form-group">
								<Input type="password" className="form-control" name="password"
								placeholder="password" value={this.state.signupData.password}
              					onChange={this.onChangehandler} required/>
              					<div className="form-error">{this.state.passwordError}</div>
							</div>
						</FormGroup>
						{
							(this.state.msg!='')?(
								<div className="alert alert-success">
								  {this.state.msg}
								</div>
								) : ('')
						}
						<div className="form-group">
							<Button className="btn btn3" onClick={this.onSubmitHandler}>
							Sign Up
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
							<Link to="/" className="btn btn3">Login Here</Link>
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

export default Register;