import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';

const array: string[] = [
    "kolo", "okolo", "praha", "praha 2"
]

ReactDOM.render(
    <App suggestions={array} />,
    document.getElementById('root'));