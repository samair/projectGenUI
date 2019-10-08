import React from 'react';
import { FormGroup,Input, Label, Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';

import ReactTable from './Table.js';
import ReactButton from './Endpoint.js';

import 'bootstrap/dist/css/bootstrap.css';


class RestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      httpGet:false,
      httpPost:false,
      endpoints: [
            { path: '/account', type: 'GET', response: 'json' },
           
         ]
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {

    this.setState(prevState => ({
      modal: !prevState.modal

    }));
    //Save an
    console.log("State ",this.state.modal)
  }
  handleGET =  () => {
   this.setState(prevState => ({
      httpGet: !prevState.httpGet

    }));
    console.log(this.state.httpGet)
  }

    handlePOST =  (e) => {
   this.setState(prevState => ({
      httpPost: !prevState.httpPost

    }));
    console.log(e.target.checked)
  }

 renderTableData = () => {
      return this.state.endpoints.map((endpoint, index) => {
         const { path, type, response } = endpoint //destructuring
         return (
            <tr key={index}>
           
               <td>{path}</td>
               <td>{type}</td>
               <td>{response}</td>
               <td><Button>Edit</Button>&nbsp;<Button color="danger" onClick={()=>this.deleteRow(index)}>Delete</Button></td>
            </tr>
         )
      })
   }

   deleteRow = (index) => {
    var array = [...this.state.endpoints];
     array.splice(index, 1);
    this.setState({endpoints: array});

   }
   addRow = (methodType,rePath,response) => {
     const obj = { path:rePath , type:methodType , response: response }
     if (methodType !="" && rePath !="")
      this.setState({

      endpoints: this.state.endpoints.concat(obj)
  })
   }

  render() {
    return (
      <div>
      <Label>
        <Input type="checkbox"  onClick={this.toggle}></Input>
        {this.props.buttonLabel}
</Label>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">

          <ModalHeader toggle={this.toggle}>Add Resources </ModalHeader>

          <ModalBody>
            
            <FormGroup>
      <ReactButton addEndpoint = {this.addRow}/>
        </FormGroup>
        <FormGroup>
             

          {/* Table which takes callback to print from parent*/}
          <ReactTable updateRows ={this.renderTableData}/>


            </FormGroup >
            <br/>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={(httpGet,httpPost)=>this.props.saveEndpoints(this.state.httpGet,this.state.httpPost)}>Ok</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}

export default RestModal;