import React from 'react';

import Aux from '../../hoc/Auxillary/Auxillary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

const layout = ( props ) => {
    return (
        <Aux>
            <Toolbar />
            <SideDrawer />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default layout;