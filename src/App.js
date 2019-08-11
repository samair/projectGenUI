
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Progress} from 'reactstrap';

export default class App extends React.Component {

  constructor(props){
   super(props)
  this.state = {isLoading: false,  artifactName:"",loading:0,groupName:"",springboot: false}  

  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.handleGroupName = this.handleGroupName.bind(this)
}
    springBootOnchange =() =>{
        console.log(this.state.springboot)
        if (this.state.springboot == true){

        this.setState({springboot:false})

        console.log(this.state.springboot)
        }
        else {

        this.setState({springboot:true})

        console.log(this.state.springboot)

        }
    }
    onFocus = () => {
        this.setState({loading:0})
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

     this.setState({isLoading: true});

   
    axios.post('http://localhost:8080/generate/setInfo',{ groupName: this.state.groupName,
      artifactName: this.state.artifactName, javaVersion:9 ,isSpringBootApp:this.state.springboot})
      .then(res => {
        console.log(res.data);
        this.setState({
                loading: 33
            
            })


        axios({
             url: 'http://localhost:8080/generate/maven',
              method: 'GET',
            responseType: 'blob', // important
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

  
            });

                // fake server request, getting the file url as response
                /*
     setTimeout(() => {
      const response = {
        file: 'http://localhost:8080/generate/maven',
      };
      // server sent the url to the file!
      // now, let's download:
      window.location.href = response.file;

      // you could also do:
      // window.open(response.file);
    }, 100);*/
     
        
      })

  }


  
  render() {
    return (
        <div >
    
        <div className="cent">
        <p> Maven Java Project Generator</p>

      
        <FormGroup>
          <Label for="exampleEmail">Group Name</Label>
          <Input type="text" name="groupName" id="exampleEmail" placeholder="com.example" disabled={this.state.isLoading} value={this.state.groupName} onChange={this.handleGroupName}
           onFocus={this.onFocus}/>
        </FormGroup>
                <FormGroup>
          <Label for="exampleEmail">Artificat</Label>
          <Input type="text" name="artiID" id="exampleEmail" placeholder="testApp" disabled={this.state.isLoading} value={this.state.artifactName} onChange={this.handleChange} onFocus={this.onFocus}/>
   </FormGroup>

        <FormGroup>
          <Label for="exampleSelect">JavaVersion</Label>
          <Input type="select" name="select" id="exampleSelect" disabled={this.state.isLoading} onFocus={this.onFocus}>
            <option>1.8</option>
            <option>1.11</option>
            <option>1.12</option>

          </Input>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input type="checkbox"  disabled={this.state.isLoading} onFocus={this.onFocus}/>
            Kafka Producer
          </Label>
        </FormGroup>
                <FormGroup check>
          <Label check>
            <Input type="checkbox" disabled={this.state.isLoading} onFocus={this.onFocus}/>
            Kafka Consumer
          </Label>
        </FormGroup>
                      <FormGroup check>
          <Label check>
            <Input type="checkbox" disabled={this.state.isLoading}  onChange={this.springBootOnchange} />
            Spring Boot Microservice
          </Label>
        </FormGroup>
        <p>
        </p>

<FormGroup>
        <Button type="submit" color="success" onClick={this.handleSubmit} disabled={this.state.isLoading}>
           Generate Project</Button>

              

   </FormGroup>

      <Progress striped value={this.state.loading} animated={this.state.isLoading} />
   
      </div>
      </div>
    );
  }
}