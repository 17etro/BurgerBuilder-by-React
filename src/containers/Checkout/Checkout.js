import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredient : {
            salad : 1,
            meat : 1,
            cheese : 1,
            bacon : 1
        }
    }

    checkoutCanceled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredient={this.state.ingredient}
                checkoutCanceled={this.checkoutCanceled}
                checkoutContinued={this.checkoutContinued}/>
            </div>
        );
    }
};

export default Checkout;