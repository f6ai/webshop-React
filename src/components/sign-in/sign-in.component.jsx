import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-buttons/custom-buttons.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            // sign in with email and password (not with Google)
            await auth.signInWithEmailAndPassword(email, password);
            // clear the state
            this.setState({ email: '', password: '' });
        } catch (err) {
            console.log(err.message);
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        // name will be email, value is the typed in email address
        // The square brackets allows us to evaluate the value of a variable as the name of a property on our object. This is what allows us to dynamically set the prop, which is how we're to reuse this method for both our form inputs
        this.setState({ [name]: value });
    }

    render() {
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" label='Email' value={this.state.email} handleChange={this.handleChange} required />
                    <FormInput type="password" name="password" label='Password' value={this.state.password} handleChange={this.handleChange} required />
                    <div className='buttons'>
                        {/* using a closing tag rather than a self-closing one, so that whatever is in between will be passed in will be the children prop -> we can customize the text of button */}
                        <CustomButton type="submit" value="Submit Form">Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>{' '}Sign in with Google{' '}</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;