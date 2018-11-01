import React from 'react';
import "./index.scss"; 
import { observer } from 'mobx-react';
import { Store } from '@/store';  
import FullScreenLoading from '@/components/FullScreenLoading';
import { observable } from 'mobx';

interface Props {
  store?: Store; 
}

@observer
export default  class Home extends React.Component<Props> {
  @observable loading=false;

  render(){
    return (
      <div className="HomeContainer" >
        <FullScreenLoading loading={this.loading} />
        <button onClick={()=>{this.loading=!this.loading}} style={{zIndex:1}} >click</button>
      </div>
    )
  }
}


