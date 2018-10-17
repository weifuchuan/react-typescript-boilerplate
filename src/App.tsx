import * as React from 'react';
import './App.scss';
import { HashRouter, Route } from 'react-keeper';

const Router = HashRouter;

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className={'container'}>
					<Route path={'/>'} loadComponent={(cb) => import('@/pages/Home').then((C) => cb(C.default))} />
					<Route
						path={'/second'}
						loadComponent={(cb) => import('@/pages/Second').then((C) => cb(C.default))}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
