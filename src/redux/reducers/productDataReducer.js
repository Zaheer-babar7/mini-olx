const initialState = {
  data: [],
  adminData: [],
  userData: [],
}

export const getDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return{
        ...state,
        data: action.payload
      }

    default:
      return state;
  }
};

export const getDataForAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA_FOR_ADMIN':
      return{
        ...state,
        adminData: action.payload
      }

    default:
      return state;
  }
};
