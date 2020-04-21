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

const EventCard=({name})=>(
  
        <div>
          <Card>
          <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
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
  name:PropTypes.string.isRequired
}
export default EventCard