import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from '../apis/axios_helper';

function* fetchUtilisateursSaga() {
    try {
        const response = yield call(request, 'get', '/api/utilisateurs');
        yield put({ type: 'FETCH_UTILISATEURS_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'FETCH_UTILISATEURS_FAILURE', payload: error.message });
    }
}

function* watchFetchUtilisateursSaga() {
    yield takeLatest('FETCH_UTILISATEURS_REQUEST', fetchUtilisateursSaga);
}

export default watchFetchUtilisateursSaga;
