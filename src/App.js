
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import React from 'react';
import axios from 'axios';
import RestModal from './RestModal';
import { Button, Form, FormGroup, Label, Input, Progress,Alert,FormText,Container,Row,Col} from 'reactstrap';

export default class App extends React.Component {

  constructor(props){
   super(props)
  this.state = {isLoading: false,  artifactName:"",loading:0,groupName:"",springboot: false,barColor:"success",hide:true,
groupNameText:"Group name is the revrse dns name..",formTextArtifactIdColor:"muted", endpoint :[{name:"",type:""}]}  

  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.handleGroupName = this.handleGroupName.bind(this)
}
    springBootOnchange =() =>{
        if (this.state.springboot){
        this.setState({springboot:false})
        }
        else {
        this.setState({springboot:true})
        }
    }
    onFocus = () => {
        this.setState({loading:0,hide:true,formTextGroupNameColor:"muted",formTextArtifactIdColor:"muted",groupNameText:"Group name is the revrse dns name.."})
    }
   handleGroupName (event){
    this.setState({loading:0    })
    this.setState({groupName:event.target.value})

    console.log(this.state.groupName)
   }
   handleChange (event){
    this.setState({loading:0    })
    this.setState({artifactName:event.target.value})

    console.log(this.state.artifactName)
   }
    handleSubmit () {

    // Check for the fields
    var error = false
    if (this.state.groupName.trim() == "" ){
        error = true
        this.setState({groupNameText:"Please enter a valid Group Name",formTextGroupNameColor:"danger"})

    }
    if (this.state.artifactName.trim() == "") {
        error = true
        this.setState({groupNameText:"Please enter a valid Group Name",formTextArtifactIdColor:"danger"})
    }
    if (error)
        return;


     this.setState({isLoading: true});
     console.log("Spring boot app"+this.state.springboot)
       this.setState({
                loading: 33
            
            })

      


        axios({
            // url: 'http://localhost:8080/generate/v1/maven',
              url:'https://javaprojgen.herokuapp.com/generate/v1/maven',
              method: 'POST',
            responseType: 'blob', // important
            data: {groupName: this.state.groupName,
      artifactName: this.state.artifactName, javaVersion:9 ,isSpringBootApp:this.state.springboot},
             onDownloadProgress: (progressEvent) => {
            
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            this.setState({
                loading: percentCompleted
            
            })
                 },
            })
        .then((response) => {
                this.setState({isLoading: false})
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                const filename = this.state.artifactName.concat(".zip");
                link.setAttribute('download', filename);
                 document.body.appendChild(link);
                 link.click();

  
            }).
               catch((error) => {
    console.log(error);
         this.setState({
                loading: 100, barColor:"danger",hide:false,isLoading:false

            
            })
    });

                

  }

  saveEndpoints = (httpGet, httpPost) =>{

    console.log("GET Value", httpGet)

    this.setState({ endpoint:[{name:"ok",type:"GET"}]

    })

    console.log("Called saveEndpoints", this.state.endpoint[0].name)

  }  


  
  render() {
    const hideme = this.state.hide ?{display:'none'}:{};
    const unhideme = this.state.isLoading ? {}:{display:'none'};
    const formTextGroup = this.state.erroInputGroupName ? {color:'red'} :{};
    return (
        <div >
    
        <div className="cent">
        <Container>
        <p></p>
        <p> <b>Maven Java Project Generator</b></p>
         <hr  style={{
    color: '#00cc66',
    backgroundColor: '#00cc66',
    height: .5,
    borderColor : '#00cc66'
}}/>

       <Row>
          <Col xs="4">
        <FormGroup>
          <Label for="exampleEmail">Group Name</Label>
          <Input type="text" name="groupName" required id="exampleEmail" placeholder="com.example" disabled={this.state.isLoading} value={this.state.groupName} onChange={this.handleGroupName}
           onFocus={this.onFocus}/>
           <FormText color={this.state.formTextGroupNameColor}>{this.state.groupNameText}</FormText>
        </FormGroup>
        </Col>
        <Col xs="4">
        <FormGroup check>
        <Label for="exampleEmail"><b>Options:</b></Label>
           <RestModal buttonLabel="Add REST Endpoints" saveEndpoints={this.saveEndpoints} />
        </FormGroup>
       
        </Col>
        <Col>

        </Col>
        </Row>

             <Row>
          <Col xs="4">
                <FormGroup>
          <Label for="exampleEmail">Artificat</Label>
          <Input type="text" name="artiID" id="exampleEmail" placeholder="testApp" disabled={this.state.isLoading} value={this.state.artifactName} onChange={this.handleChange} onFocus={this.onFocus}/>
         <FormText color={this.state.formTextArtifactIdColor}>Artificat Name becomes your app name,  a main method is generated for it</FormText>
   </FormGroup>
    </Col>
          <Col xs="4">
        <FormGroup check>
        <Label for="exampleEmail"> <b>Advanced Options (optional): </b></Label>
          <Label check>
            <Input type="checkbox" disabled={this.state.isLoading}  onChange={this.springBootOnchange} />
            Create a project in GitHub
          </Label>
        </FormGroup>
        </Col>
        </Row>
           <Row>
          <Col xs="4">
        <FormGroup>
          <Label for="exampleSelect">JavaVersion</Label>
          <Input type="select" name="select" id="exampleSelect" disabled={this.state.isLoading} onFocus={this.onFocus}>
            <option>1.8</option>
            <option>1.11</option>
            <option>1.12</option>

          </Input>
        </FormGroup>
  </Col>
        </Row>
             <Row>
          <Col xs="4">
                      
       </Col>
        </Row>
     
 <Row>
          <Col xs="4">
<FormGroup>

        <Button type="submit" color="success" onClick={this.handleSubmit} disabled={this.state.isLoading}>
           Generate Project</Button>

              

   </FormGroup>
   </Col>
        </Row>
 <Row>
          <Col xs="4">
      <Progress striped color={this.state.barColor} value={this.state.loading} animated={this.state.isLoading} style={unhideme}/>
   </Col>
        </Row>

     <Row>
          <Col xs="4">    
     <Alert color="danger" style ={hideme}>
        Failed to generate maven project !
      </Alert>
       </Col>
        </Row>
     </Container>
      </div>
      </div>
    );
  }
}