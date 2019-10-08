import React, { Component } from 'react';
import { Button, ButtonGroup , Label, Input,Row,Col,Badge} from 'reactstrap';
import AdvancedOptions from './AdvancedOptions.js'

class ReactButton extends Component {
  constructor (props) {
    super(props);

    this.state = { cSelected: [] };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  onPathChange = (event) => {
    this.setState ({ path:event.target.value});
  }

  onBasePathChange = (event) => {
    this.setState ({ basePath:event.target.value});
  }

  
  addEntry = (methodType,rePath) =>{
    
    const obj = { path: rePath, type:methodType , response: 'json' }

    //this.porps.addEndpoints(obj);
  }
 

  render() {
    return (
      <div>
        <h5></h5>
         <Row>
          <Col xs="4">
       
        <ButtonGroup>
          <Button color="primary" onClick={() => this.onRadioBtnClick("GET")} active={this.state.rSelected === "GET"} >GET</Button> 
          <Button color="primary" onClick={() => this.onRadioBtnClick("PUT")} active={this.state.rSelected === "PUT"}>PUT</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick("POST")} active={this.state.rSelected === "POST"}>POST</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick("DELETE")} active={this.state.rSelected === "DELETE"}>DELETE</Button>
        </ButtonGroup>
        <Col xs = "4">

        </Col>
     
        </Col>
        </Row>
          <Row>
       <Col xs='4'>
         <Label for="endPointName">Base Path</Label>
            <Input type="text" id="endPointName" onChange={this.onBasePathChange}></Input>


       </Col>
       <Col xs='4'>

       </Col>
       </Row>
       <Row>
       <Col xs='4'>
         <Label for="endPointName">Path</Label>
            <Input type="text" id="endPointName" onChange={this.onPathChange}></Input>

        
       </Col>

       </Row>

    <Row>
    <br/>

      <Col>
       <Button onClick={() =>this.props.addEndpoint(this.state.rSelected,this.state.path,'json')}>Add</Button>
       </Col>
       </Row>
     
         <Badge color="secondary" className="float-right">{this.state.rSelected}</Badge>
  
      </div>
    );
  }
}

export default ReactButton;