import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                  type: "email",
                  placeholder: "Mail Adress ",
                },
                value: "",
                validation: {
                  required: true,
                  isEmail: true
                },
                valid: false,
                touched: false,
              },
              password: {
                elementType: "input",
                elementConfig: {
                  type: "password",
                  placeholder: "Password",
                },
                value: "",
                validation: {
                  required: true,
                  minLength: 6
                },
                valid: false,
                touched: false,
              },
        },
        isSignUp: true
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidaty(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }

    checkValidaty = (value, rules) => {
        let isValid = true;
    
        if (rules.required) {
          isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid;
        }
    
        return isValid;
      };

      submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
      }

      switchAuthModHandler = () => {
        this.setState(prevState => {
          return {
            isSignUp: !prevState.isSignUp
          }
        })
      }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
            id: key,
            config: this.state.controls[key],
        });
        };
 
        const form = formElementsArray.map(formElement => {
            return (
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            );
        });

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    <Button 
                    clicked={this.switchAuthModHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP' }</Button>
                </form>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);