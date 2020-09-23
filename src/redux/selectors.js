import { createSelector } from "reselect";

export const dataSelector = (state) => state.data;
export const coinsSelector = (state) => state.coins;
export const coinSelector = (state) => state.coin;
export const timestampSelector = (state) => state.timestamp;
export const numberPerPageSelector = (state) => state.numberPerPage;
export const currentPageSelector = (state) => state.currentPage;

export const combineSelectors = createSelector(
  [coinsSelector, numberPerPageSelector, currentPageSelector],
  (coins, num, curr) => {
    const start = (curr - 1) * num;
    const end = start + num;
    return coins.filter((item, index) => index >= start && index < end);
  }
);

export const oneCoinSelector = createSelector(
  [coinSelector, timestampSelector],
  (coin, timestamp) => [coin, timestamp]
);
