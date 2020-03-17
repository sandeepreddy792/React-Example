import React, { Component } from 'react';
import classes from './Layout.module.css';
import Aux from '../Auxiliary/Auxilary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => (
            { showSideDrawer: !prevState.showSideDrawer }
        )
        )
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.mainContent}>
                    {this.props.children}
                </main>
            </Aux>)
    }
}

export default Layout;