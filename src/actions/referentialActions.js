// actions/referentielActions.js
export const fetchReferentielsRequest = () => ({
    type: 'FETCH_REFERENTIELS_REQUEST',
});

export const fetchReferentielsSuccess = (referentiels) => ({
    type: 'FETCH_REFERENTIELS_SUCCESS',
    payload: referentiels,
});

export const fetchReferentielsFailure = (error) => ({
    type: 'FETCH_REFERENTIELS_FAILURE',
    payload: error,
});
