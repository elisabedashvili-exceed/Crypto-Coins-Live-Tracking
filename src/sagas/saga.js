import { takeLatest, put, delay } from "redux-saga/effects";
import superagent from "superagent";

const key = `d929dacc-529a-4592-8b87-b6c09da58636`;
const api = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${key}`;
export const apiWithCors = `https://cors-anywhere.herokuapp.com/${api}`;

function* updateDataAsync() {
  let data, coins;
  superagent
    .get(apiWithCors)
    .then((response) => {
      data = response;
      coins = response.body.data;
    })
    .catch((err) => console.log(err));
  yield delay(30000);
  yield put({ type: "UPDATE_DATA_IN_STORE_ASYNC", data, coins });
}

function* loadDataAsync() {
  let data;
  superagent
    .get(apiWithCors)
    .then((response) => {
      data = response;
    })
    .catch((err) => console.log(err));
  yield delay(2000);
  yield put({ type: "LOAD_DATA_IN_STORE_ASYNC", data });
}

// Put api with the data of one particulad coin
function* updateCurrencyDataAsync() {
  let coin, timestamp;
  let symbol = window.location.pathname.split("/").reverse()[0];
  superagent
    .get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${key}&symbol=${symbol}`
    )
    .then((response) => {
      coin = response.body.data[symbol];
      timestamp = response.body.status.timestamp;
    })
    .catch((err) => console.log(err));
  yield delay(300000);
  yield put({ type: "UPDATE_CURRENCY_DATA_IN_STORE_ASYNC", coin, timestamp });
}

function* loadCurrencyDataAsync() {
  let coin, timestamp;
  let symbol = window.location.pathname.split("/").reverse()[0];
  superagent
    .get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${key}&symbol=${symbol}`
    )
    .then((response) => {
      coin = response.body.data[symbol];
      timestamp = response.body.status.timestamp;
    })
    .catch((err) => console.log(err));
  yield delay(2000);
  yield put({ type: "LOAD_CURRENCY_DATA_IN_STORE_ASYNC", coin, timestamp });
}

export function* watchLoadData() {
  yield takeLatest("LOAD_DATA_IN_STORE", loadDataAsync);
}
export function* watchUpdateData() {
  yield takeLatest("UPDATE_DATA_IN_STORE", updateDataAsync);
}
export function* watchLoadCurrencyData() {
  yield takeLatest("LOAD_CURRENCY_DATA_IN_STORE", loadCurrencyDataAsync);
}
export function* watchUpdateCurrencyData() {
  yield takeLatest("UPDATE_CURRENCY_DATA_IN_STORE", updateCurrencyDataAsync);
}
