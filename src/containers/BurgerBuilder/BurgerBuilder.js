import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICES = {
    cheese: 0.5,
    meat: 1.5,
    salad: 0.5,
    bacon: 1
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false
    }

    updatePurchasableState = (ingredients) => {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => sum + el, 0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredientCount;
        const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] - 1;
        if (updatedIngredientCount < 0) {
            return;
        }
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredientCount;
        const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients })
        this.updatePurchasableState(updatedIngredients)
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={!this.state.purchasable} />
            </Aux>
        )
    }
}

export default BurgerBuilder;