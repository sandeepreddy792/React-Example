import React from 'react';
//import classes from './Layout.css';
import './Layout.css'
import Aux from '../../hoc/Auxilary';


const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className="mainContent">
            {props.children}
        </main>
    </Aux>
)

export default layout;