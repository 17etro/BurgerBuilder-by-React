"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchOrders = exports.fetchOrdersStart = exports.fetchOrdersFail = exports.fetchOrdersSuccess = exports.purchaseInit = exports.purchaseBurger = exports.purchaseBurgerStart = exports.purchaseBurgerFail = exports.purchaseBurgerSuccess = void 0;

var actionTypes = _interopRequireWildcard(require("../actions/actionTypes"));

var _axiosOrders = _interopRequireDefault(require("../../axios-orders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var purchaseBurgerSuccess = function purchaseBurgerSuccess(id, orderData) {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

exports.purchaseBurgerSuccess = purchaseBurgerSuccess;

var purchaseBurgerFail = function purchaseBurgerFail(error) {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

exports.purchaseBurgerFail = purchaseBurgerFail;

var purchaseBurgerStart = function purchaseBurgerStart() {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

exports.purchaseBurgerStart = purchaseBurgerStart;

var purchaseBurger = function purchaseBurger(orderData, token) {
  return function (dispatch) {
    dispatch(purchaseBurgerStart());

    _axiosOrders["default"].post("/orders.json?auth=" + token, orderData).then(function (response) {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })["catch"](function (error) {
      dispatch(purchaseBurgerFail(error));
    });
  };
};

exports.purchaseBurger = purchaseBurger;

var purchaseInit = function purchaseInit() {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

exports.purchaseInit = purchaseInit;

var fetchOrdersSuccess = function fetchOrdersSuccess(orders) {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

exports.fetchOrdersSuccess = fetchOrdersSuccess;

var fetchOrdersFail = function fetchOrdersFail(error) {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

exports.fetchOrdersFail = fetchOrdersFail;

var fetchOrdersStart = function fetchOrdersStart() {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

exports.fetchOrdersStart = fetchOrdersStart;

var fetchOrders = function fetchOrders(token, userId) {
  return function (dispatch) {
    dispatch(fetchOrdersStart());
    var queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    _axiosOrders["default"].get('/orders.json' + queryParams).then(function (res) {
      var fetchedOrders = [];

      for (var key in res.data) {
        fetchedOrders.push(_objectSpread({}, res.data[key], {
          id: key
        }));
      }

      dispatch(fetchOrdersSuccess(fetchedOrders));
    })["catch"](function (err) {
      dispatch(fetchOrdersFail(err));
    });
  };
};

exports.fetchOrders = fetchOrders;