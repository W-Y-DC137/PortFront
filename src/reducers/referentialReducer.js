// reducers/referentielReducer.js
const initialState = {
    referentiels: [],
    loading: false,
    error: null,
};

const referentielReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_REFERENTIELS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_REFERENTIELS_SUCCESS':
            return { ...state, loading: false, referentiels: action.payload };
        case 'FETCH_REFERENTIELS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default referentielReducer;
