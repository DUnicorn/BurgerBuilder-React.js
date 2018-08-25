import React,{Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Wrapper from '../Wrapper';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null

        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;

            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
                console.log(error + "ERROR");
                this.setState({error:error})

            });
        }
        //remove interceptors don't needed anymore
        componentWillUnmount(){
            console.log('Will Unmount', this.reqInterceptor,this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);


        }
        errorConfirmHandler = () =>{
            this.setState({error:null})
        }
        render(){
            return  (
                <Wrapper>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                        Something did not work!
                    </Modal>
                <WrappedComponent {...this.props}/>
                </Wrapper>
            );
        }
    }}

export default withErrorHandler;