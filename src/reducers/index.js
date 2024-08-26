// reducers/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ticketReducer from './ticketReducer';
import referentielReducer from './referentialReducer';
import utilisateurReducer from './utilisateurReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    tickets: ticketReducer,
    referentiels: referentielReducer,
    utilisateurs: utilisateurReducer,
});

export default rootReducer;
