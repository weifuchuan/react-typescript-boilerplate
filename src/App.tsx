import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import './App.scss';
import './App.less';
import Loadable from 'react-loadable';

const Counter = Loadable({
	loader: () => import('./components/Counter'),
	loading: () => <div>loading...</div>
});

@observer
export default class App extends React.Component {
	@observable count = 0;

	render() {
		return (
			<div className={'container'}>
				<div className={'panel'}>
					<span>{this.count}</span>
				</div>
				<div className={'operations'}>
					<button onClick={() => this.count--}>fuck</button>
					<button onClick={() => this.count++}>add</button>
				</div>
				<Counter />
				<Counter />
				<Counter />
			</div>
		);
	}
}
