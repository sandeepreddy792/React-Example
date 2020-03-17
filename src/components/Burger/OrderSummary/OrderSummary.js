import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxilary'
import Button from '../../UI/Button/Button'


const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey} : {props.ingredients[igKey]}</span>
                </li>
            )
        })
    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <p>A delicious ready buger with below ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total price : {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout ?</p>
            <Button btnType='Danger' clicked={props.ordercancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.ordercontinued}>CONTINUE</Button>
        </Aux>
    )
}


export default orderSummary;