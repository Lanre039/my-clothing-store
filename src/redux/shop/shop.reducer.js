// import SHOP_DATA from './shop.data';
import ShopActionTypes from './shoptypes';


const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
    // collections: SHOP_DATA
}

const shopReducer = ( state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.FETCH_COLLECTIONS_START: 
        return {
            ...state,
            isFetching: true
        }
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTIONS_FAILTURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default shopReducer;