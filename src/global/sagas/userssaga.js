import { takeLatest, put, call } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';
function* fetchPostsSaga() {
    try {
        const response = yield call(fetch, 'https://dummyjson.com/users');
        const data = yield response.json();
        yield put({ type: actionTypes.USER_GET_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: actionTypes.USER_GET_FAILURE, payload: error.message });
    }
}

function* rootSaga() {
    yield takeLatest(actionTypes.USER_GET_REQUEST, fetchPostsSaga);
}

export default rootSaga;
