import React from 'react';
import './index.scss';
import { observer, inject } from 'mobx-react';
import { Store } from '@/index/store'; 
import { observable } from 'mobx';
import FullScreenLoading from '@/common/components/FullScreenLoading';

const ShowWindowWidth = require('@/common/components/ShowWindowWidth').default;

interface Props {
	store: Store;
}

@inject('store')
@observer
export default class Home extends React.Component<Props> {
	@observable loading = false;

	render() {
		return (
			<div className="HomeContainer">
				<h1>Index page</h1>
				<ShowWindowWidth />
				<FullScreenLoading loading={true}/>
			</div>
		);
	}
}
