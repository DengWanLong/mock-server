'use strict';
/**
 * error controller
 */

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  /**
   * display error page
   * @param  {Number} status []
   * @return {Promise}        []
   */
  _class.prototype.displayError = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(status) {
      var _this2 = this;

      var controllerInstance, data, errorConfig, message, _jsonp, module, file, options;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              controllerInstance = this.controller('api/index');
              _context.next = 3;
              return this.action(controllerInstance, 'index');

            case 3:
              data = _context.sent;


              //hide error message on production env
              if (think.env === 'production') {
                this.http.error = null;
              }

              errorConfig = this.config('error');
              message = this.http.error && this.http.error.message || '';

              if (!this.isJsonp()) {
                _context.next = 11;
                break;
              }

              return _context.abrupt('return', this.jsonp((_jsonp = {}, _jsonp[errorConfig.key] = status, _jsonp[errorConfig.msg] = message, _jsonp)));

            case 11:
              if (!this.isAjax()) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return', this.fail(status, message));

            case 13:
              module = 'common';

              if (think.mode !== think.mode_module) {
                module = this.config('default_module');
              }
              file = module + '/error/' + status + '.html';
              options = this.config('tpl');

              options = think.extend({}, options, { type: 'base', file_depr: '_' });

              // let prefix = '/api';
              // let url = prefix + this.http.url;
              // this.forward(url);
              // this.redirect(url);

              this.fetch(file, {}, options).then(function (content) {
                content = content.replace('ERROR_MESSAGE', message);
                _this2.type(options.content_type);
                _this2.end(content);
              });

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function displayError(_x) {
      return _ref.apply(this, arguments);
    }

    return displayError;
  }();
  /**
   * Bad Request
   * @return {Promise} []
   */


  _class.prototype._400Action = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', this.displayError(400));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function _400Action() {
      return _ref2.apply(this, arguments);
    }

    return _400Action;
  }();
  /**
   * Forbidden
   * @return {Promise} []
   */


  _class.prototype._403Action = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', this.displayError(403));

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _403Action() {
      return _ref3.apply(this, arguments);
    }

    return _403Action;
  }();
  /**
   * Not Found
   * @return {Promise}      []
   */


  _class.prototype._404Action = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt('return', this.displayError(404));

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function _404Action() {
      return _ref4.apply(this, arguments);
    }

    return _404Action;
  }();
  /**
   * Internal Server Error
   * @return {Promise}      []
   */


  _class.prototype._500Action = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt('return', this.displayError(500));

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function _500Action() {
      return _ref5.apply(this, arguments);
    }

    return _500Action;
  }();
  /**
   * Service Unavailable
   * @return {Promise}      []
   */


  _class.prototype._503Action = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt('return', this.displayError(503));

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function _503Action() {
      return _ref6.apply(this, arguments);
    }

    return _503Action;
  }();

  return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=error.js.map