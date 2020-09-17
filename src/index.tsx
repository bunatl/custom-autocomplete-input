import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';

const array: string[] = [
    "test", "test2", "test with spaces", "suggestion", "fish"
]

ReactDOM.render(
    <App suggestions={array} />,
    document.getElementById('root'));