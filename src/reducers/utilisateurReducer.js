const initialState = {
    utilisateurs: [],
    loading: false,
    error: null,
};

const utilisateurReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_UTILISATEURS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_UTILISATEURS_SUCCESS':
            return { ...state, loading: false, utilisateurs: action.payload };
        case 'FETCH_UTILISATEURS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default utilisateurReducer;
