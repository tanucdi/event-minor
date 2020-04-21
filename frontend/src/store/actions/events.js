import {GET_EVENTS} from './types';
import axios from 'axios';

export const getEvents=()=>(dispatch)=>{
    axios.get('http://localhost:5000/api/events/').then(res=>dispatch({
        type:GET_EVENTS,
        payload:res.data
    }))
}