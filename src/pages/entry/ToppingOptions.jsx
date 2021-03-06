import React from 'react';
import Col from 'react-bootstrap/Col'
export default function ToppingOptions({name, imagePath}){
    return(
        <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}}>
        <img src={`http://localhost:3030/${imagePath}`} alt={`${name} toppings`} style={{width:"75%"}}/>
        </Col>
    )
}