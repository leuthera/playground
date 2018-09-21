import React from 'react';

class ScrumPoker extends React.Component {
    state = {
        pickedCard: null,
        hidden: true
    }

    cards = [
        0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100
    ];

    poker = () => {
        if ( this.state.hidden ) {
            this.setState({ hidden: false });
        }
        else {
            this.setState({ pickedCard: null });
            this.setState({ hidden: true });
        }
    }

    detectShake = () => {
        if ( typeof window.DeviceMotionEvent !== 'undefined' ) {
            // Shake sensitivity (a lower number is more)
            let sensitivity = 80;
        
            // Position variables
            let x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;
        
            // Listen to motion events and update the position
            window.addEventListener('devicemotion', e => {
                x1 = e.accelerationIncludingGravity.x;
                y1 = e.accelerationIncludingGravity.y;
                z1 = e.accelerationIncludingGravity.z;
            }, false);
        
            // Periodically check the position and fire
            // if the change is greater than the sensitivity
            window.setInterval(() => {
                var change = Math.abs(x1-x2+y1-y2+z1-z2);
        
                if (change > sensitivity) {
                    this.setState({ hidden: false });
                }
        
                // Update new position
                x2 = x1;
                y2 = y1;
                z2 = z1;
            }, 150);
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    typeof this.state.pickedCard !== 'number'
                    ? 
                        <section className="cards">
                            { 
                                this.cards.entries ? 
                                    this.cards.map( value =>
                                        <article 
                                            onClick   = { () => { this.setState({ pickedCard: value }); this.detectShake(); } }
                                            key       = { value }
                                            className = "card">

                                            <p>
                                                { value }
                                            </p>
                                        </article>
                                    )
                                : null
                            }
                        </section>
                    : 
                        <section
                            onClick   = { this.poker }
                            className ="selected-card">

                            <span className={ this.state.hidden ? "hidden" : "" }>
                                { this.state.pickedCard  }
                            </span>
                        </section>
                }
            </React.Fragment>
        );
    }
}

export default ScrumPoker;