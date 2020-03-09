import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Canvas from './components/canvas'
import { TestScheduler } from 'jest';
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

