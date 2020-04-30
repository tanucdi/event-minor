import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authAction";
import { Redirect } from "react-router-dom";
class Logout extends Component {
    constructor(props){
        super(props);
    }
  componentDidMount(){
      this.props.logoutUser();
  }
  componentWillReceiveProps(nextProps)
  {
      if(!nextProps.auth.isAuthenticated){
          this.props.history.push('/');
      }
  }
render() {
    const { user } = this.props.auth;
return (
        <div>logging out </div>    
    );
  }
}
Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Logout);