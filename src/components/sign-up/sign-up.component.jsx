import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-buttons/custom-buttons.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '', 
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        try {
            // create a user account, and sign in
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            // create the document in database
            await createUserProfileDocument(user, {displayName});
            // clears out the form
            this.setState({
                displayName: '', 
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (err) {
            console.log(err);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text" 
                        name="displayName" 
                        label='Display Name' 
                        value={displayName} 
                        onChange={this.handleChange} 
                        required
                    />
                    <FormInput 
                        type="email" 
                        name="email" 
                        label='Email' 
                        value={email} 
                        onChange={this.handleChange} 
                        required
                    />
                    <FormInput 
                        type="password" 
                        name="password" 
                        label='Password' 
                        value={password} 
                        onChange={this.handleChange} 
                        required
                    />
                    <FormInput 
                        type="password" 
                        name="confirmPassword" 
                        label='Confirm Password' 
                        value={confirmPassword} 
                        onChange={this.handleChange} 
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                    </form>
            </div>
        )
    }
}

export default SignUp;