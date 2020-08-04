import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    meat : 1.3 ,
    salad : 0.4 ,
    cheese : 0.5 ,
    bacon : 0.8 ,
}

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false,

    }

    componentDidMount() {
        axios.get('https://burgerbuilder-by-react.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients : response.data});
        })
        .catch(error => {
            this.setState({error : true});
        })
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({
            purchasable : sum > 0
        });

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice : updatedPrice,
            ingredients : updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice : updatedPrice,
            ingredients : updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // this.setState({loading : true});
        // const order = {
        //     ingredients : this.state.ingredients,
        //     price : this.state.totalPrice,
        //     customer : {
        //         name : 'Petro Petruk',
        //         adress : {
        //             street : 'Teststreet',
        //             zipCode : '12345',
        //             city : 'Kyiv'
        //         },
        //         email : 'petrpetryk2016@gmail.com'
        //     },
        //     deliveryMethod : 'fastest'
        // };
        // axios.post('/orders.json', order)
        // .then(response => {
        //     this.setState({loading : false, purchasing : false});
        // })
        // .catch(error => {
        //     this.setState({loading : false, purchasing : false});
        // });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice); 
        let queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search: '?' + queryString
        });
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = ( disabledInfo[key] <= 0 );
        }
        let burger = this.state.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;
        let orderSummary = null;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredient={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}/>
            );
        };
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

export default withErrorHandler(BurgerBuilder, axios);