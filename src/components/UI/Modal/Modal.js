import React,{Component} from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Wrapper from '../../../hoc/Wrapper';
import classes from './Modal.css';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children)

    }

    componentWillUpdate(){
        console.log('[Modal] will update')
    }

    render(){
        return (
            <Wrapper>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div 
                className= {classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
            </Wrapper>
        );
    }
}

export default Modal;