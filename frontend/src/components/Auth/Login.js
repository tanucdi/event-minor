import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authAction";
import classnames from "classnames"
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            errors:{}

        }
    } 
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/");
        }
      }
        onChange=(evt)=>{
            this.setState({
                [evt.target.name]:evt.target.value
            })
    
        }
        componentWillReceiveProps(nextProps) {
            if (nextProps.auth.isAuthenticated) {
              this.props.history.push("/"); // push user to dashboard when they login
            }
            if(nextProps.errors) {
                this.setState({
                  errors: nextProps.errors
                });
              }
            }
        onSubmit=(evt)=>{
            evt.preventDefault();
            const userData={
                email:this.state.email,
                password:this.state.password
            }
            this.props.loginUser(userData);
        }
    
    render() {
        const { errors } = this.state;
        return (
            <div>
                <Form className="container" onSubmit={this.onSubmit}>
      <FormGroup>
        <Label for="email">email</Label>
        <Input type="email" name="email" id="email" placeholder="enter your emaal" 
        className={classnames("", {
            invalid: errors.email || errors.emailnotfound
          })} onChange={this.onChange} />
          <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
      </FormGroup>
      <FormGroup>
        <Label for="password">password</Label>
        <Input type="password" name="password" id="password" placeholder="event your password" 
        className={classnames("", {
            invalid: errors.password || errors.passwordincorrect
          })} onChange={this.onChange} />
        <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
      </FormGroup>
      
      <Button>Submit</Button>
    </Form>
            </div>
        )
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);