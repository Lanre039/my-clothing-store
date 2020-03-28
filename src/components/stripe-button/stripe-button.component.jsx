import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100; //Conversion from dollars to cent
    const publishableKey = 'pk_test_tm34JDTqrz4UbvxWeiuq06hU00lEitvkQL';

    const onToken = token => {
        console.log(token);
        alert('Payent Successful');
    }
    
    return (
        <StripeCheckout
            label='Pay Now'
            name='My CLothing Store Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            // image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}

        />
    )
}

export default StripeCheckoutButton;