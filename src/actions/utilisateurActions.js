export const fetchUtilisateursRequest = () => ({
    type: 'FETCH_UTILISATEURS_REQUEST',
});

export const fetchUtilisateursSuccess = (utilisateurs) => ({
    type: 'FETCH_UTILISATEURS_SUCCESS',
    payload: utilisateurs,
});

export const fetchUtilisateursFailure = (error) => ({
    type: 'FETCH_UTILISATEURS_FAILURE',
    payload: error,
});

