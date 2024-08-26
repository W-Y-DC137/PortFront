import { call, put, takeLatest, all } from 'redux-saga/effects';
import { request } from '../apis/axios_helper';
import { fetchTicketsSuccess, fetchTicketsFailure, fetchTicketDetailsSuccess, fetchTicketDetailsFailure } from '../actions/ticketActions';
import { createTicketSuccess, createTicketFailure } from '../actions/ticketActions';

function* createTicketSaga(action) {
    try {
        const response = yield call(request, 'post', '/api/tickets', action.payload);
        yield put(createTicketSuccess(response.data));
    } catch (error) {
        yield put(createTicketFailure(error.message));
    }
}

function* watchCreateTicketSaga() {
    yield takeLatest('CREATE_TICKET_REQUEST', createTicketSaga);
}

// Define the original fetchTicketsSaga
function* fetchTicketsSaga() {
    try {
        const response = yield call(request, 'get', '/api/tickets');
        yield put(fetchTicketsSuccess(response.data));
    } catch (error) {
        yield put(fetchTicketsFailure(error.message));
    }
}

// Define the fetchTicketDetailsSaga for handling ticket details requests
function* fetchTicketDetailsSaga(action) {
    try {
        const response = yield call(request, 'get', `/api/tickets/${action.payload}`);
        yield put(fetchTicketDetailsSuccess(response.data));
    } catch (error) {
        yield put(fetchTicketDetailsFailure(error.message));
    }
}

// Watcher saga for ticket list requests
function* watchFetchTicketsSaga() {
    yield takeLatest('FETCH_TICKETS_REQUEST', fetchTicketsSaga);
}

// Watcher saga for ticket details requests
function* watchFetchTicketDetailsSaga() {
    yield takeLatest('FETCH_TICKET_DETAILS_REQUEST', fetchTicketDetailsSaga);
}

// Root saga for tickets
export default function* ticketSaga() {
    yield all([
        watchCreateTicketSaga(),
        watchFetchTicketsSaga(),
        watchFetchTicketDetailsSaga(),
    ]);
}
