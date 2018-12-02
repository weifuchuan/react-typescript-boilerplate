import React from 'react';
import "./index.scss";  
import {Spin} from 'antd'

interface Props {
  loading: boolean;  
}

export default class FullScreenLoading extends React.Component<Props> {
  render(){
    if(this.props.loading){
    return (
      <div className="FullScreenLoadingContainer" >
        <Spin spinning={this.props.loading} size={"large"} ></Spin>
      </div>
    )}
    else
      return null; 
    
  }
}