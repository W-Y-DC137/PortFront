import { call, put, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailure } from '../actions/authActions';
import { request } from '../apis/axios_helper';

function* loginSaga(action) {
  try {
    const response = yield call(request, 'post', '/api/auth/authenticate', action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* authSaga() {
  yield takeLatest('LOGIN_REQUEST', loginSaga);
}

export default authSaga;
