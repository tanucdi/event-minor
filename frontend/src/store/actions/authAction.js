import axios from 'axios';
import {GET_ERRORS,SET_CURRENT_USER,USER_LOADING} from './types';
const jwt_decode=require('jwt-decode');

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
      .post("http://localhost:5000/api/user/register", userData)
      .then(res => history.push("/login")) // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

export const loginUser=userData=>dispatch=>{
    axios.post("http://localhost:5000/api/user/login",userData)
    .then(res=>{
        const {token}=res.data;
        localStorage.setItem('jwtToken',token);
        const config={
            headers:{
                "Content-type":"application/json"
            }
        }
        if(token){
            config.headers['jwt-token']=token;
        }
        const decoded=jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    }).catch(err=>{
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    })
} 

export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };
  // User loading
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
  // Log user out
  export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    const config={
        headers:{
            "Content-type":"application/json"
        }
    }    
        config.headers['jwt-token']='';
        

    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };