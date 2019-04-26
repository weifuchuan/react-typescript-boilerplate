import * as React from 'react';
import { HashRouter  } from 'react-keeper'; 
import LoadingRoute from '@/common/components/LoadingRoute';
import styled from 'styled-components';

const Router = HashRouter;

class App extends React.Component {
  render() {
    return (
      <Router>
        <_App>
          <LoadingRoute path="/>" imported={() => import('./pages/Home')} />
        </_App>
      </Router>
    );
  }
}

export default App;

const _App = styled.div`
`