// sagas/rootSaga.js
import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import watchFetchTicketsSaga from './ticketSaga';
import utilisateurSaga from './utilisateurSaga';
import watchFetchReferentielsSaga from './referentialSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        watchFetchTicketsSaga(),
        utilisateurSaga(),
        watchFetchReferentielsSaga(),
    ]);
}
