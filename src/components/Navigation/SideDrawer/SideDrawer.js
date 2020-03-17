import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Auxiliary/Auxilary'
import Backdrop from '../../UI/Backdrop/Backdrop'

import classes from './SideDrawer.module.css'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Open]
    if (!props.open) {
        attachedClasses = [classes.SideDrawer, classes.Close]
    }
    return <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    </Aux>
}


export default sideDrawer;