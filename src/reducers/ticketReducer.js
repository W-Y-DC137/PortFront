// reducers/ticketReducer.js
const initialState = {
    tickets: [],
    ticketDetails: null,
    ticketAttachments: [], // Add this line to handle attachments
    loading: false,
    error: null,
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TICKETS_REQUEST':
        case 'FETCH_TICKET_DETAILS_REQUEST':
        case 'FETCH_TICKET_ATTACHMENTS_REQUEST': // Add this line
            return { ...state, loading: true };
        
        case 'FETCH_TICKETS_SUCCESS':
            return { ...state, loading: false, tickets: action.payload };
        
        case 'FETCH_TICKET_DETAILS_SUCCESS':
            return { ...state, loading: false, ticketDetails: action.payload };
        
        case 'FETCH_TICKET_ATTACHMENTS_SUCCESS': // Add this case
            return { ...state, loading: false, ticketAttachments: action.payload };
        
        case 'FETCH_TICKETS_FAILURE':
        case 'FETCH_TICKET_DETAILS_FAILURE':
        case 'FETCH_TICKET_ATTACHMENTS_FAILURE': // Add this line
            return { ...state, loading: false, error: action.payload };
        
        case 'CREATE_TICKET_REQUEST':
            return { ...state, loading: true };
        
        case 'CREATE_TICKET_SUCCESS':
            return { ...state, loading: false, tickets: [...state.tickets, action.payload] };
        
        case 'CREATE_TICKET_FAILURE':
            return { ...state, loading: false, error: action.payload };
        
        case 'FETCH_TICKETS_BY_CLIENT_REQUEST':
            return { ...state, loading: true };
        
        case 'FETCH_TICKETS_BY_CLIENT_SUCCESS':
            return { ...state, loading: false, tickets: action.payload };
        
        case 'FETCH_TICKETS_BY_CLIENT_FAILURE':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default ticketReducer;
