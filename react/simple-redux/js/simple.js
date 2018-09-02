import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AppContainer extends React.Component {
    increase = () => this.props.dispatch({ type: 'INCREMENT' });
    decrease = () => this.props.dispatch({ type: 'DECREMENT' });

    render = () => <React.Fragment>
        <button onClick={ this.decrease }> - </button>
        { this.props.counter }
        <button onClick={ this.increase }> + </button>
    </React.Fragment>;
}

AppContainer.propTypes = {
    counter: PropTypes.string,
    dispatch: PropTypes.fn
};

const mapStateToProps = state => ({
    counter: state.counter
});

export default connect( mapStateToProps )( AppContainer );