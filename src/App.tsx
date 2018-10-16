import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import './App.scss';
import './App.less';
import Loadable from 'react-loadable';
import {HashRouter} from 'react-keeper'

const Counter = Loadable({
	loader: () => import('./components/Counter'),
	loading: () => <div>loading...</div>
});

const Login = Loadable({
	loader: () => import('./components/Login'),
	loading: () => <div>loading...</div>
});

@observer
class App extends React.Component {
	@observable count = 0;

	render() {
		return (
			<div className={'container'}>
				<div className={'panel'}>
					<span>{this.count}</span>
				</div>
				<div className={'operations'}>
					<button onClick={() => this.count--}>-</button>
					<button onClick={() => this.count++}>+</button>
				</div>
				<Counter />
				<Counter />
				<Counter />
				<Counter />
				<Login />
			</div>
		);
	}
}

import { hot } from 'react-hot-loader'

export default hot(module)(App); 
