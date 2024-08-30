import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios'; // Ensure axios is imported for API requests
import { request } from '../apis/axios_helper';
import { fetchTicketsSuccess, fetchTicketsFailure, fetchTicketDetailsSuccess, fetchTicketDetailsFailure, 
         fetchTicketsByClientSuccess, fetchTicketsByClientFailure, createTicketSuccess, createTicketFailure,
         fetchTicketAttachmentsSuccess, fetchTicketAttachmentsFailure } from '../actions/ticketActions';

// Saga for creating a ticket
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

// Saga for fetching tickets
function* fetchTicketsSaga() {
    try {
        const response = yield call(request, 'get', '/api/tickets');
        yield put(fetchTicketsSuccess(response.data));
    } catch (error) {
        yield put(fetchTicketsFailure(error.message));
    }
}

function* watchFetchTicketsSaga() {
    yield takeLatest('FETCH_TICKETS_REQUEST', fetchTicketsSaga);
}

// Saga for fetching ticket details
function* fetchTicketDetailsSaga(action) {
    try {
        const response = yield call(request, 'get', `/api/tickets/${action.payload}`);
        yield put(fetchTicketDetailsSuccess(response.data));
    } catch (error) {
        yield put(fetchTicketDetailsFailure(error.message));
    }
}

function* watchFetchTicketDetailsSaga() {
    yield takeLatest('FETCH_TICKET_DETAILS_REQUEST', fetchTicketDetailsSaga);
}

// Saga for fetching tickets by client ID
function* fetchTicketsByClientSaga(action) {
    try {
        const response = yield call(request, 'get', `/api/tickets/client/${action.payload}`);
        yield put(fetchTicketsByClientSuccess(response.data));
    } catch (error) {
        yield put(fetchTicketsByClientFailure(error.message));
    }
}

function* watchFetchTicketsByClientSaga() {
    yield takeLatest('FETCH_TICKETS_BY_CLIENT_REQUEST', fetchTicketsByClientSaga);
}

// Saga for fetching ticket attachments
function* fetchTicketAttachmentsSaga(action) {
    try {
        const response = yield call(request, 'get', `/api/ticketAttachements/ticket/${action.payload}`);
        yield put(fetchTicketAttachmentsSuccess(response.data));
    } catch (error) {
        yield put(fetchTicketAttachmentsFailure(error.message));
    }
}

function* watchFetchTicketAttachments() {
    yield takeEvery('FETCH_TICKET_ATTACHMENTS_REQUEST', fetchTicketAttachmentsSaga);
}

// Root saga for tickets
export default function* ticketSaga() {
    yield all([
        watchCreateTicketSaga(),
        watchFetchTicketsSaga(),
        watchFetchTicketDetailsSaga(),
        watchFetchTicketsByClientSaga(),
        watchFetchTicketAttachments(),
    ]);
}
