import {GET_EVENTS,CREATE_EVENT} from '../actions/types';

const initialState={
    events:[],
    error:null
}
export default function eventReducer(state=initialState,action){
    switch(action.type){
        case GET_EVENTS:
            return{
                ...state,
                events:action.payload
            }
        case CREATE_EVENT:
            return{
                ...state,
                events:[...state.events,action.payload]
            }     
        default:
            return state;    
    }
}