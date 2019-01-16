import React from "react";
import { Spin } from "antd";
import "./index.scss";

interface Props {
  loading: boolean;
}

export default class FullScreenLoading extends React.Component<Props> {
  render() {
    if (this.props.loading) {
      return (
        <div className="FullScreenLoadingContainer">
          <Spin spinning={this.props.loading} size={"large"} />
        </div>
      );
    } else return null;
  }
}
