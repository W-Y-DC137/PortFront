export const fetchTicketsRequest = () => ({
    type: 'FETCH_TICKETS_REQUEST',
  });
  
  export const fetchTicketsSuccess = (tickets) => ({
    type: 'FETCH_TICKETS_SUCCESS',
    payload: tickets,
  });
  
  export const fetchTicketsFailure = (error) => ({
    type: 'FETCH_TICKETS_FAILURE',
    payload: error,
  });
  
  // src/actions/ticketActions.js

export const fetchTicketDetailsRequest = (id) => ({
  type: 'FETCH_TICKET_DETAILS_REQUEST',
  payload: id,
});

export const fetchTicketDetailsSuccess = (ticket) => ({
  type: 'FETCH_TICKET_DETAILS_SUCCESS',
  payload: ticket,
});

export const fetchTicketDetailsFailure = (error) => ({
  type: 'FETCH_TICKET_DETAILS_FAILURE',
  payload: error,
});

export const createTicketRequest = (ticket) => ({
  type: 'CREATE_TICKET_REQUEST',
  payload: ticket,
});

export const createTicketSuccess = (ticket) => ({
  type: 'CREATE_TICKET_SUCCESS',
  payload: ticket,
});

export const createTicketFailure = (error) => ({
  type: 'CREATE_TICKET_FAILURE',
  payload: error,
});


