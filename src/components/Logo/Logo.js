import React from 'react';
import Logo from '../../assets/images/original.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={Logo} alt="MyBurger" />
    </div>
)


export default logo;