import React from 'react';

class AppContainer extends React.Component {
    state = {
        counter: 0
    };

    increase = () => this.setState({ counter: this.state.counter + 1 });
    decrease = () => this.setState({ counter: this.state.counter - 1 });

    render = () => <React.Fragment>
        <button onClick={ this.decrease }> - </button>
        { this.state.counter }
        <button onClick={ this.increase }> + </button>
    </React.Fragment>;
}

export default AppContainer;