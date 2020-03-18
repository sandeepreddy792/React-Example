import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axiosOrders from '../../axios-orders'

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
        purchasable: false,
        purchasing: false,
        loading: false
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

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true })
        const data = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Sandeep Reddy K',
                email: 'test@test.com',
                address: {
                    Flat: '1234',
                    Street: 'James Street',
                    City: 'Carcus',
                    Country: 'Mars',
                    Zip: 'Z10b42'
                }
            },
            deliveryMethod: 'fastest'
        }
        axiosOrders.post('/orders.json', data)
            .then(response => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            ordercancelled={this.purchaseCancelHandler}
            ordercontinued={this.purchaseContinueHandler} />;
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={!this.state.purchasable}
                    purchase={this.purchaseHandler} />
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axiosOrders);