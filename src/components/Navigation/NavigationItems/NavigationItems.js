import React from 'react';

import classes from './../NavigationItems/NavigationItems.css';
import NavigationItem from './../NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className ={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder </NavigationItem>
        <NavigationItem link="/">Checkout </NavigationItem>
        <NavigationItem link="/">Something Else </NavigationItem>
    </ul>
);

export default navigationItems;