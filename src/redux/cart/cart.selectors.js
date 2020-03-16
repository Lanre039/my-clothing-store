// Selector
// memoization prevents a component re-render if the state value does not change

import  { createSelector } from 'reselect'

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity, 0)
);