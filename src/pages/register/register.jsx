import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import './register.styles.scss';

const RegisterPage = () => (
    <div className='register-page'>
        <SignIn />
        <SignUp />
    </div>
)
export default RegisterPage;