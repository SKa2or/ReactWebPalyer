import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//页面自动刷新库
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

ReactDOM.render(
  // <AppContainer>
    <Root />,
  // </AppContainer>,
  document.getElementById('root')
);
