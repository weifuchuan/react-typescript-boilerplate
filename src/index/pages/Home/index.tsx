import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

interface Props {}

const Home: FunctionComponent<Props> = observer(() => {
  return <div>Home</div>;
});

export default Home;
