import { takeEvery, call, put, takeLatest, all } from 'redux-saga/effects';

import ShopActionTypes from './shoptypes';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { 
    fetchCollectionSuccess, 
    fetchCollectionFailture 
} from './shop.actions';

export function* fetchCollectionsAsync() {
    // yield is just like await
    // call helps to call a function
    // put is just like dispatch which helps to dispatch an action
    //takeEvery and take listen for when an actipn is dispatched. The diffence btw them is that take is used to listen on an action that has payload while takeEvery is used to listen on an action that doesn't have payload. Take listen & execute once while takeEvery listen & execute everytime.
    // takeLatest works as the name implies
    // delay is equivalent to setTimeout
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));

    } catch (error) {
        yield put(fetchCollectionFailture(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}