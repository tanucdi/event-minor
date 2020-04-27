import {GET_EVENTS,CREATE_EVENT} from './types';
import axios from 'axios';

export const getEvents=()=>(dispatch)=>{
    axios.get('http://localhost:5000/api/events/').then(res=>dispatch({
        type:GET_EVENTS,
        payload:res.data
    }))
}
export const createEvents=(formData)=>(dispatch)=>{
    axios.post('http://localhost:5000/api/events/',formData)
    .then(res=>dispatch({
        type:CREATE_EVENT,
        payload:res.data
    }))
}
