import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export default class Counter extends React.Component {
	@observable cnt = 0;

	render() {
		return (
			<div>
				<span>{this.cnt}</span>
				<button onClick={() => this.cnt++}>+</button>
        <button onClick={() => this.cnt--}>--</button>    
			</div>
		);
	}
}
