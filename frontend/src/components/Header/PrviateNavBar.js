import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {logoutUser} from '../../store/actions/auths';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class NavBar extends Component{
  constructor(props){
    super(props);
    this.state={
      isOpen:false,
      toggle:false
    }
  }
  
  
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    
  };
  
  
  toggle = () =>{
    this.setState({
      isOpen:!this.state.isOpen
    })
  };
  
  render(){
    const {user}=this.props.auth
    if(user.isAuthenticated){
   return( 
    <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to='/'>Eventanes</NavbarBrand>
      <NavbarToggler onClick={this.state.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to='/create'>create event</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/browseevent'>browse events</NavLink>
          </NavItem>

          <NavItem>
            <Button onClick={this.onLogoutClick}>logout</Button>
          </NavItem>
          
        </Nav>
      </Collapse>
    </Navbar>
  </div>
    
   )
  }
}
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);

