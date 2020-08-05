import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        orderForm: {
            name : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            ingredients : this.props.ingredients,
            price : this.props.price,
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest',displayValue: 'Fastest'},
                        {value: 'cheapest',displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading : false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading : false});
        });
    }

    render() {

        let form;
        if (this.state.loading) {
            form = <Spinner />
        } else {
            form = (
                <form>
                    <Input inputtype='input' type='text' name='name' placeholder='Your name'/>
                    <Input inputtype='input' type='email' name='email' placeholder='Your email'/>
                    <Input inputtype='input' type='text' name='street' placeholder='Street'/>
                    <Input inputtype='input' type='text' name='postalCode' placeholder='Postal Code'/>
                    <Button 
                    btnType='Success'
                    clicked={this.orderHandler}>ORDER</Button>
                </form>
            );
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                {form}
            </div>
        );
    }
};

export default ContactData;