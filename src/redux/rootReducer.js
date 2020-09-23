import { actionTypes } from "./actionTypes";

const initialState = {
  data: null,
  coins: [],
  coin: null,
  numberPerPage: 20,
  currentPage: 1,
  timestamp: null,
};

const reducer = (state = initialState, action) => {
  const { currentPage } = state;
  let { data, coins, coin, timestamp } = action; //SAGA

  switch (action.type) {
    case actionTypes.UPDATE_DATA_IN_STORE_ASYNC:
      return { ...state, data, coins };

    case actionTypes.LOAD_DATA_IN_STORE_ASYNC:
      return {
        ...state,
        data,
        coins: data.body.data,
      };

    case actionTypes.UPDATE_CURRENCY_DATA_IN_STORE_ASYNC:
      return {
        ...state,
        coin,
        timestamp,
      };

    case actionTypes.LOAD_CURRENCY_DATA_IN_STORE_ASYNC:
      return {
        ...state,
        coin,
        timestamp,
      };

    case actionTypes.NEXT_PAGE:
      return {
        ...state,
        currentPage: currentPage + 1,
      };

    case actionTypes.PREV_PAGE:
      return {
        ...state,
        currentPage: currentPage - 1,
      };

    default:
      return state;
  }
};

export default reducer;
