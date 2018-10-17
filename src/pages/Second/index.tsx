import React from 'react';
import "./index.scss"; 
import { observer } from 'mobx-react';
import { Store } from '@/store';

interface Props {
  store?: Store; 
}

@observer
export default class Second extends React.Component<Props> {
  render(){
    return (
      <div className="SecondContainer" >
        Second
      </div>
    )
  }
}