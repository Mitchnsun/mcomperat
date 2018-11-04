import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders for EN', () => {
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      get: () => 'en-US',
    });
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders for FR', () => {
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      get: () => 'fr-FR',
    });
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
