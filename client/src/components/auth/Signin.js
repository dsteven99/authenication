import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {signin} from '../../actions/index'; 

class Signin extends React.Component {

    renderError({error, touched}){

        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
        
    };

    renderInput = ({input, label, meta, type}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" type={type}/>
                <div>{this.renderError(meta)}</div>
            </div>          
        );
    };

    onSubmit = (formValues) => {
        this.props.signin(formValues, () => {
            this.props.history.push('/feature');
        });
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field
                    name="email"
                    type="text"
                    component={this.renderInput}
                    label="Email"
                />
                <Field
                    name="password"
                    type="password"
                    component={this.renderInput}
                    label="Password"
                />
                <div>{this.props.errorMessage}</div>
                <button className="ui button primary">Sign In</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.email){
        errors.email = "You must enter an email.";
    }
    if(!formValues.password){
        errors.password = "You must enter a password";
    }

    return errors;
};

const mapStateToProps = (state) =>{
    return {
        errorMessage: state.auth.errorMessage
    };
}

export default compose(
    connect(mapStateToProps, {signin}),
    reduxForm({ form: 'signin', validate })
)(Signin);
