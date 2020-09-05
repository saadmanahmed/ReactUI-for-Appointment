import React,{Component} from 'react';

import logo from './logo.svg';
import './App.css';
import AddAppointments from './AddApointments'
import ListAppointments from './ListAppointments'
import SearchAppointments from './SearchAppointments'
import { without, last } from 'lodash';


class App extends Component {
  constructor(){
    super();
    this.state={
    
      myAppointments:[],
      lastIndex:0,
      formDisplay:false,
      orderBy:'ownerName',
      orderDir:'asc',
      queryText:'',

    }
    this.deleteAppointment=this.deleteAppointment.bind(this);
    this.toggleForm=this.toggleForm.bind(this);
    this.addAppointment=this.addAppointment.bind(this);
    this.searchApts=this.searchApts.bind(this);
  }

  toggleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay
    }
    )
  }

  deleteAppointment(apt){
   let tempApt=this.state.myAppointments;
   tempApt=without(tempApt,apt);

   this.setState({
     myAppointments:tempApt
   })

}
addAppointment(apt){
  let tempApt=this.state.myAppointments;
  apt.Id=this.state.lastIndex;
  tempApt.unshift(apt);
  this.setState({
    myAppointments:tempApt,
    lastIndex:this.state.lastIndex+1
  })
}

searchApts(query){
  this.setState(
    {
      queryText:query
    }
  )
 
}
  componentDidMount(){
    fetch('./data.json').then(response=>response.json()).then(result=>{const apts=result.map(e=>{
    e.Id=this.state.lastIndex;
    this.setState({lastIndex:this.state.lastIndex+1})

    
      return e;
    })
    this.setState(
      {
        myAppointments:apts
      }
    )
  });
    
  }
 



  render() {

    let order;
    let filteredApts=this.state.myAppointments;
    if(this.state.orderDir==='asc'){
      order=1;
    }
    else{order=-1};

    filteredApts=filteredApts.sort((a,b)=>{
    if(a[this.state.orderBy].toLowerCase()<b[this.state.orderBy].toLowerCase()){
      return -1;
    }
    else{
      return 1;
    }
  }
    
    
    ).filter(eachItem=>{
      return(
        eachItem['petName'].toLowerCase().includes(this.state.queryText.toLowerCase())||
        eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase())
      )
    })

    
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                 
                 <AddAppointments addAppointment={this.addAppointment} formDisplay={this.state.formDisplay} toggleForm={this.toggleForm}/>
                 <ListAppointments appointments={filteredApts} deleteAppointment={this.deleteAppointment}/>
                 <SearchAppointments searchApts={this.searchApts}/>
                
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}


export default App;
