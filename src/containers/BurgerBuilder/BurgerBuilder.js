import React, {Component} from 'react';

import Wrapper from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrosHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.2,
    bacon: 1.0
};

class BurgerBuilder extends Component{
    // constructor (props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false

    }

    componentDidMount(){
        console.log(this.props);
        axios.get('https://react-burger-app-46fc6.firebaseio.com/ingredients.json')
        .then(res => {
            this.setState({ingredients : res.data})
        })
        .catch(error => {
            this.setState({error : true});
        })
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                console.log('igKey in BurgerBuilder updatePurchaseState',igKey);
                return ingredients[igKey]
        })
            .reduce((sum ,el) => {
                console.log('element in reduce updatePurchaseState',el);
                return sum + el;
        },0);
    this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount +  1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCounted = oldCount -1 ;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () =>{
        const queryParams = [];
        //encode elements that they can be used in the URL
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        });
        
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

    
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
        if(this.state.ingredients){
            
        burger = (
            <Wrapper>
            <Burger ingredients= {this.state.ingredients}/>
            <BuildControls
                    ingredientAdded= {this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price= {this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
                </Wrapper>
                    );                  
         orderSummary = <OrderSummary 
         ingredients={this.state.ingredients}
         price={this.state.totalPrice}
         purchaseCancelled = {this.purchaseCancelHandler}
         purchaseContinued = {this.purchaseContinueHandler}
     />  
        }
        if (this.state.loading){
            orderSummary = <Spinner/>

        }
        // {salad: true, meat: true ...}
        return (
            <Wrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}                 
                    />
                </Modal>
               {burger} 
            </Wrapper>
        );
    }
}

export default withErrosHandler(BurgerBuilder,axios);