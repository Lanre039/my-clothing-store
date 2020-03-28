import ShopActionTypes  from './shoptypes';

export const updateCollections = (collectionMap) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionMap
})