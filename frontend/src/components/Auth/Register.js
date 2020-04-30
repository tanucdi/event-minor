import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authAction";
import classnames from "classnames";
class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
            errors:{}

        }
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
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
            if (nextProps.errors) {
              this.setState({
                errors: nextProps.errors
              });
            }
          }
          onSubmit = e => {
            e.preventDefault();
        const newUser = {
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
              confirmPassword: this.state.confirmPassword
            };
        this.props.registerUser(newUser, this.props.history); 
          };
    
    render() {
        const { errors } = this.state;
        return (
            <div>
    <Form className="container" onSubmit={this.onSubmit}>
        <FormGroup>
        <Label for="name">full name</Label>
        <Input type="text" name="name" id="name" placeholder="enter your name" 
         className={classnames("", {
            invalid: errors.name
          })}   onChange={this.onChange} />
          <span className="red-text">{errors.name}</span>
      </FormGroup>              
      <FormGroup>
        <Label for="email">email</Label>
        <Input type="email" name="email" id="email" placeholder="enter your emaal" 
         className={classnames("", {
            invalid: errors.email
          })}  onChange={this.onChange} />
          <span className="red-text">{errors.email}</span>
      </FormGroup>
      <FormGroup>
        <Label for="password">password</Label>
        <Input type="password" name="password" id="password" placeholder="enter your password" 
         className={classnames("", {
            invalid: errors.password
          })} onChange={this.onChange} />
        <span className="text-danger">{errors.password}</span>  
      </FormGroup>
      <FormGroup>
        <Label for="confirmPassword">confirm password</Label>
        <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="re-enter your password"
         className={classnames("", {
            invalid: errors.confirmPassword
          })}  onChange={this.onChange} />
          <span className="red-text">{errors.confirmPassword}</span>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
            </div>
        )
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { registerUser }
  )(Register);