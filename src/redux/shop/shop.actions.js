import ShopActionTypes  from './shoptypes';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

// export const updateCollections = (collectionMap) => ({
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionMap
// })

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionFailture = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILTURE,
    payload: errorMessage
});

export const fetchCollectionStartAsync = () => {
    return dispatch => {

        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionStart())

        collectionRef.get().then(snapShot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapShot)
            dispatch(fetchCollectionSuccess(collectionsMap))
          }).catch (error => dispatch(fetchCollectionFailture(error.message)));
    };
};