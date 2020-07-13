import React from 'react';

import classes from './buildControl.module.css';

import buildControls from '../BuildControls';

const buildControl = ( props ) => {
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}>Less</button>
        <button className={classes.More}>More</button>
    </div>
};

export default buildControl;