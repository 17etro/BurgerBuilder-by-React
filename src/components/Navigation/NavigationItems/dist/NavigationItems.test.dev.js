"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _enzyme = require("enzyme");

var _NavigationItems = _interopRequireDefault(require("./NavigationItems"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});
describe('<NavigationItems />', function () {
  it('should render two <NavigationItem /> elements if not authenticated', function () {});
});