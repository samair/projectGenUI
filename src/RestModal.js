import React from 'react';
import { FormGroup,Input, Label,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class RestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      httpGet:false,
      httpPost:false
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

  render() {
    return (
      <div>
      <Label>
        <Input type="checkbox"  onClick={this.toggle}></Input>
        {this.props.buttonLabel}
</Label>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

          <ModalHeader toggle={this.toggle}>Add REST Endpoint</ModalHeader>

          <ModalBody>
            <FormGroup>
            <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          
          </Input>
        </FormGroup>
              <Label for="endPointName">Name</Label>
            <Input type="text" id="endPointName"></Input>

            
            <p/><Button>Add</Button>
            </FormGroup >
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