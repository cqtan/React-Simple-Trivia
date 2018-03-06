import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TriviaApp from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TriviaApp />, document.getElementById('root'));
registerServiceWorker();
