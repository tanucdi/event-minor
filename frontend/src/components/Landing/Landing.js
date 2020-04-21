import React,{Component} from 'react'
import PropTypes from 'prop-types';
import {getEvents} from '../../store/actions/events';
import {connect} from 'react-redux';
import EventCard from './EventCard';
class Landing extends Component{
    static propTypes={
        getEvents:PropTypes.func.isRequired
    }
    static defaultProps={
        events:[]
    }
    componentWillMount(){
        this.props.getEvents();
    }
    render(){
        const {events}=this.props.events;
        const cards=events.map(event=>{
            return <EventCard key={event._id} {...event}/>
        })
    return (
        <div>
            
        <ul>{cards}</ul>
        </div>
    )
  }
}
const mapStateToProps=(state)=>({
    events:state.events
})
const dispatchToProps=(dispatch)=>({
    getEvents:()=>dispatch(getEvents())
})
export default connect(mapStateToProps,dispatchToProps)(Landing);