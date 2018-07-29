import React,{Component} from 'react';

import Wrapper from '../../../hoc/Wrapper';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    componentWillUpdate(){
        console.log('[OrderSummary] will update');

    }

    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients)
       .map(igKey =>{
           return <li key={igKey}>
               <span style={{textTransfrom: 'capatilize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
                 </li>
       });
        return (
            <Wrapper>
             <h3> Your Order</h3>
             <p> A deliciuos burger with following ingredients:</p>
             <ul>
                 {ingredientsSummary}

            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Contininue to Checkout?</p>
            <Button btnTypes="Danger" clicked={this.props.purchaseCancelled}> CANCEL </Button>
            <Button btnTypes="Success" clicked={this.props.purchaseContinued}> CONTINUE</Button>
        </Wrapper>
        )
    }


}

    

export default OrderSummary;