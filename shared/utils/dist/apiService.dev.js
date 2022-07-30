"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPersonalDetails = getPersonalDetails;
exports.getProjectDetails = getProjectDetails;
exports.getCompanyDetails = getCompanyDetails;
exports.getGithubDetails = getGithubDetails;
exports.BASE_URL = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// export const BASE_URL = `${process.env.BASE_URL}/api` || 'https://harshgoel.me/api';
var BASE_URL = 'http://localhost:5000/api';
exports.BASE_URL = BASE_URL;

function getPersonalDetails() {
  var _ref, data;

  return regeneratorRuntime.async(function getPersonalDetails$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(BASE_URL, "/me")));

        case 3:
          _ref = _context.sent;
          data = _ref.data;
          return _context.abrupt("return", data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", false);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function getProjectDetails() {
  var _ref2, data;

  return regeneratorRuntime.async(function getProjectDetails$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(BASE_URL, "/projects")));

        case 3:
          _ref2 = _context2.sent;
          data = _ref2.data;
          return _context2.abrupt("return", data);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", false);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function getCompanyDetails() {
  var _ref3, data;

  return regeneratorRuntime.async(function getCompanyDetails$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(BASE_URL, "/companies")));

        case 3:
          _ref3 = _context3.sent;
          data = _ref3.data;
          return _context3.abrupt("return", data);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", false);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function getGithubDetails() {
  var _ref4, data;

  return regeneratorRuntime.async(function getGithubDetails$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("https://api.github.com/repos/harshgoel05/another-portfolio"));

        case 3:
          _ref4 = _context4.sent;
          data = _ref4.data;
          return _context4.abrupt("return", data);

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", false);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}