import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address : {
            street: '',
            postalCode: ''
        },
        loading : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            customer : {
                name : 'Petro Petruk',
                adress : {
                    street : 'Teststreet',
                    zipCode : '12345',
                    city : 'Kyiv'
                },
                email : 'petrpetryk2016@gmail.com'
            },
            deliveryMethod : 'fastest'
        };
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
                    <input type='text' name='name' placeholder='Your name'/>
                    <input type='email' name='email' placeholder='Your email'/>
                    <input type='text' name='street' placeholder='Street'/>
                    <input type='text' name='postalCode' placeholder='Postal Code'/>
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