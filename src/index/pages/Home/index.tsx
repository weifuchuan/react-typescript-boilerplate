import React from 'react';
import { observer, inject } from 'mobx-react';
import { Store } from '@/index/store';
import { observable } from 'mobx';
import FullScreenLoading from '@/common/components/FullScreenLoading';
import './index.scss';
import styled from 'styled-components';
import colors from '@/common/styles/colors';

const ShowWindowWidth = require('@/common/components/ShowWindowWidth').default;

interface Props {
  store: Store;
}

const H1 = styled.h1`
  color: #fff;
  background-color: ${colors.SkyBlue};
  font-weight: bold;
`;

@inject('store')
@observer
export default class Home extends React.Component<Props> {
  @observable loading = false;

  render() {
    return (
      <div className="HomeContainer">
        <H1>Index page</H1>
        <ShowWindowWidth />
        <FullScreenLoading loading={true} />
      </div>
    );
  }
}
