import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import {Button} from 'antd'

@observer
export default class Counter extends React.Component {
	@observable cnt = 0;

	render() {
		return (
			<div>
				<span>{this.cnt}</span>
				<Button onClick={() => this.cnt++}>+</Button>
        <button onClick={() => this.cnt--}>-</button>    
			</div>
		);
	}
}
