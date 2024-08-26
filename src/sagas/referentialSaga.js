// sagas/referentielSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from '../apis/axios_helper';
import { fetchReferentielsSuccess, fetchReferentielsFailure } from '../actions/referentialActions';

function* fetchReferentielsSaga() {
    try {
        const response = yield call(request, 'get', '/api/referentiel');
        yield put(fetchReferentielsSuccess(response.data));
    } catch (error) {
        yield put(fetchReferentielsFailure(error.message));
    }
}

function* watchFetchReferentielsSaga() {
    yield takeLatest('FETCH_REFERENTIELS_REQUEST', fetchReferentielsSaga);
}

export default watchFetchReferentielsSaga;
