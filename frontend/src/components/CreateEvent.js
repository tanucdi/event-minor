import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';


class CreateEvent extends Component {
    constructor(props){
        super(props);
        this.state={
            event_name:'',
            event_date:'',
            event_time:'',
            tag:'',
            price:0,
            description:'',
            selectedfile:null,
            success:false
        }
    }
    
    
    
 onClickSubmit=(evt)=>{
        evt.preventDefault();
        const fd=new FormData();
        fd.append('event_image',this.state.selectedfile);
        fd.append('name',this.state.event_name);
        fd.append('event_date',this.state.event_date);
        fd.append('event_time',this.state.event_time);
        fd.append('tag',this.state.tag);
        fd.append('price',this.state.price);
        fd.append('venue',this.state.venue);
        fd.append('description',this.state.description);
        axios.post('http://localhost:5000/api/events/',fd).then((res)=>{
            console.log(res);
            
        }).catch(err=>console.log(err));
        

    }
    onChange=(evt)=>{
        this.setState({
            [evt.target.name]:evt.target.value
        })

    }
    fileSelect=(evt)=>{
        this.setState({
            selectedfile:evt.target.files[0]
        })
    }

  render(){
  return (
    <Form className="container" onSubmit={this.onClickSubmit}>
      <FormGroup>
        <Label for="event_name">Event name</Label>
        <Input type="text" name="event_name" id="event_name" placeholder="enter event name" onChange={this.onChange} required />
      </FormGroup>
      <FormGroup>
        <Label for="Venue">Venue</Label>
        <Input type="text" name="venue" id="venue" placeholder="event venue" onChange={this.onChange} required/>
      </FormGroup>
      <FormGroup>
        <Label for="tag">Tag</Label>
        <Input type="select" name="tag" id="tag" onChange={this.onChange}>
          <option>tech event</option>
          <option>cultural</option>
          <option>entertainment</option>
          <option>health</option>
          <option>religious</option>
        </Input>
      </FormGroup>
     
      <FormGroup>
        <Label for="description">About Event</Label>
        <Input type="textarea" name="description" id="description" onChange={this.onChange} required/>
      </FormGroup>
      <FormGroup>
        <Label for="imageFile">Event image</Label>
        <Input type="file" name="imageFile" id="imageFile" required onChange={this.fileSelect} />
        <FormText color="muted">
          please ulpoad an image, size should be less than 2mb
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="price">Price in $</Label>
        <Input type="number" name="price" id="price" placeholder="enter event price" onChange={this.onChange} required/>
      </FormGroup>
      <FormGroup>
        <Label for="event_date">Event date</Label>
        <Input type="text" name="event_date" id="event_date" placeholder="enter event date" onChange={this.onChange} required/>
      </FormGroup>
      <FormGroup>
        <Label for="event_time">Event time</Label>
        <Input type="text" name="event_time" id="event_time" placeholder="enter event time" onChange={this.onChange} required/>
      </FormGroup>
      
      <Button>Submit</Button>
    </Form>
  );
    }
}

export default CreateEvent;