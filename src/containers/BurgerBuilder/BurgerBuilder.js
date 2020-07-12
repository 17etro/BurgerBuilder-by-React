import React, { Component } from 'react';

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad : 1,
            cheese : 1,
            bacon : 2,
            meat : 2
        }
    }

    render () {
        return (
            <Aux>
                <Burger ingredient={this.state.ingredients}/>
                <div>Build Controls</div>
            </Aux>
        );
    }
};

export default BurgerBuilder;