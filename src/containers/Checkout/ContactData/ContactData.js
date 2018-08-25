import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
    }

      orderHandler = (event) => {
          event.preventDefault();
        //   console.log(this.props.ingredients);
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price,
            customer: {
                name: "Bob Shartz",
                address:{
                    street: 'Some street',
                    zipCode: '14421',
                    country: 'Geramny'
                },
                email: 'email@email.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json',order)
             .then(response =>  {
                 this.setState({loading:false});
                 this.props.history.push('/');

                  } )
             .catch(error =>{
                 this.setState({loading:false});
             });

      }

    render(){
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                    <input className={classes.Input} type="text" name="email" placeholder="Email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code"/>
                    <Button clicked={this.orderHandler} btnTypes="Success">ORDER</Button>
                </form>
        );
        if(this.state.loading){
          form =  <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;