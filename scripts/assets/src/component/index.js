// @ts-ignore
module.exports = (compName) => `import React from 'react';
import "./index.scss"; 
import { observer, inject } from 'mobx-react';
import { Store } from '@/store';

interface Props {
  store?: Store; 
}

@inject("store")
@observer
export default class ${compName} extends React.Component<Props> {
  render(){
    return (
      <div className="${compName}Container" >
      
      </div>
    )
  }
}`;
