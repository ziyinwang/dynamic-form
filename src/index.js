import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './components/Form';
import personalDetails from './definitions/personal-details';

ReactDOM.render(<Form definition={personalDetails} />, document.getElementById('root'));
