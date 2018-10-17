import React from 'react';
import "./index.scss"; 
import { observer } from 'mobx-react';
import { Store } from '@/store'; 
import Counter from '@/components/Counter';
import { Control } from 'react-keeper';

interface Props {
  store?: Store; 
}

@observer
export default  class Home extends React.Component<Props> {
  render(){
    return (
      <div className="HomeContainer" >
        Home <Counter/>
        <button onClick={()=>{Control.go("/second")}}>to second</button>
      </div>
    )
  }
}


