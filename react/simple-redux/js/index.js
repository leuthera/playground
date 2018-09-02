import React from 'react';
import ReactDOM from 'react-dom';

import Simple from './simple';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

/* HowTo:
    - create a store
    - create reducer and handle actions
    - provide the store to the app
    - connect component to redux
    - provide mapStateToProps fn
    - dispatch actions
*/

const initials = {
    counter: 0
};

const reducer = ( state = initials, action ) => {
    switch ( action.type ) {
        case 'INCREMENT':
            return { counter: state.counter + 1 };
        case 'DECREMENT':
            return { counter: state.counter - 1 };
        default:
            return state;
    }
};

ReactDOM.render(
    <Provider store={ createStore( reducer ) }>
        <Simple />
    </Provider>,
    document.getElementById( "root" )
);
