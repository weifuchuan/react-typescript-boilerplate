import React, { Component } from 'react';
import {observable} from 'mobx'
import { observer } from 'mobx-react';
@observer
export default class Counter extends Component{
  @observable cnt=0; 

  render(){
    return <div><span>{this.cnt}</span><button onClick={()=>this.cnt++} >+</button></div>
  }
}