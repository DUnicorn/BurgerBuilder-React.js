import React from 'react';

import burgerLogo from '../../assets/Images/burger-logo.png';
import classes from './../Logo/Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="BurgerBuilder"/>
    </div>


);

export default logo;