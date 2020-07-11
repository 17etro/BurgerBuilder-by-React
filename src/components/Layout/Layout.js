import React from 'react';

import Aux from '../../hoc/Auxillary/Auxillary';

import classes from './Layout.module.css';

const layout = ( props ) => {
    return (
        <Aux>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default layout;