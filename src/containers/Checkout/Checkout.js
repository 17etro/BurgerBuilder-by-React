import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients : {},
        totalPrice : 0,
    }

    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients : ingredients,
            totalPrice : price
        })
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
                ingredient={this.state.ingredients}
                checkoutCanceled={this.checkoutCanceled}
                checkoutContinued={this.checkoutContinued}/>
                <Route 
                path={this.props.match.path + '/contact-data'} 
                render={(props) =><ContactData 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                {...props}/>} />
            </div>
        );
    }
};

export default Checkout;