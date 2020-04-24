import React from 'react';
import PropTypes from 'prop-types';
import{
    Card,
    CardImg,
    CardBody,
    CardText,
    CardSubtitle,
    Button,
    CardTitle
} from 'reactstrap';
const EventCard=({name,event_image})=>(
        
        <div className="col-6">
          <Card> 
          <CardImg top width="100%" src={"http://localhost:5000/uploads/"+event_image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    )

EventCard.propTypes={
  name:PropTypes.string.isRequired,
  event_image:PropTypes.string.isRequired
}
export default EventCard