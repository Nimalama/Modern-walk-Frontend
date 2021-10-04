import { Component, state, changeHandler, submitLogin,successResponse,failureResponse } from "react";
import axios from 'axios';
import '../style.css'
import swal from 'sweetalert'
import GoogleLogin from 'react-google-login';

class Login extends Component {
	state = {
		Username: "",
		Password: ""
	}
	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		}

		)
	}
	submitLogin = (e) => {
		e.preventDefault();
		axios.post("http://localhost:90/users/login", this.state)
			.then((response) => {
				if (response.data.success == true) {
					swal({
						"title": "Successfully Login",
						"text": response.data.message,
						"icon": "success"
					})

					localStorage.setItem('token', response.data.token);
					localStorage.setItem("user", JSON.stringify(response.data.data))
					window.location.href = "/"
				}
				else {

					swal({
						"title": "Error",
						"text": response.data.message,
						"icon": "error"


					})
				}
			})
			.catch((err) => {
				console.log(err.response)

				swal({
					"title": "Invalid username and password",
					"icon": "error"

				})

			}
			)
	}

	successResponse = (response)=>{
		axios.post(process.env.REACT_APP_URL+"googleLogin",{'tokenId':response.tokenId})
		.then((response)=>{
		   if(response.data.success == true)
		   {
			  localStorage.setItem('user',JSON.stringify(response.data.data));
			  localStorage.setItem('token',response.data.token);
			  swal({
			   'title':"Success",
			   "text":response.data.message,
			   "icon":"Success"
		   })
			  window.location.href="/";
		   }
		   else
		   {
			  swal({
				  'title':"error",
				  "text":response.data.message,
				  "icon":"Error"
			  })
		   }
		})
		.catch((err)=>{
			console.log(err);
		})
	}

	failureResponse = (response)=>{
		console.log(response)
	}
	render() {
		return (
			<>

				<div className="limiter">
					<div className="container-login100" >
						<div className="wrap-login100" >
							<form className="login100-form validate-form">
								<span className="login100-form-title p-b-43">
									Login to continue
					</span>


								<div className="wrap-input100 validate-input">
									<input className="input100" type="text" name="Username" value={this.state.Username} onChange={this.changeHandler} placeholder="Username" />


								</div>


								<div className="wrap-input100 validate-input" data-validate="Password is required">
									<input className="input100" type="password" name="Password" value={this.state.Password} onChange={this.changeHandler} placeholder="Password" />


								</div>

								<div className="flex-sb-m w-full p-t-3 p-b-32">

									<div className="row align-items-center remember">
										<input type="checkbox" />Remember Me

						</div>

									<div>
										<a href="#" className="txt1">
											Forgot Password?
							</a>
									</div>
								</div>


								<div className="container-login100-form-btn">
									<button className="login100-form-btn" onClick={this.submitLogin}>
										Login
						</button>
								</div>

								<div className="text-center p-t-46 p-b-20">
									<span className="txt2">
										or sign up using
									</span>
								</div>

								<div className="text-center mt-4">
								<GoogleLogin
										clientId="152506000566-5ai7d5st3ufv6amebke7fel88hug8ihf.apps.googleusercontent.com"
										buttonText="Login with Google"
										onSuccess={this.successResponse}
										onFailure={this.failureResponse}
										cookiePolicy={'single_host_origin'}
									/>
								</div>

								{/* <div className="login100-form-social flex-c-m">
									<a href="#" className="login100-form-social-item flex-c-m bg1 m-r-5">
										<i className="fa fa-facebook-f" aria-hidden="true"></i>
									</a>

									<a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
										<i className="fa fa-twitter" aria-hidden="true"></i>
									</a>
								</div> */}
							</form>

							<div className="login100-more" >
							</div>
						</div>
					</div>
				</div>


			</>
		)
	}
}
export default Login;