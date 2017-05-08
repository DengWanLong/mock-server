'use strict';

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

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _enum = require('../../enum.js');

var Enum = _interopRequireWildcard(_enum);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * index action
   * @return {Promise} []
   */
  _class.prototype.indexAction = function indexAction() {
    //auto render template file index_index.html
    return this.display();
  };

  _class.prototype.loginAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var model, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              model = this.model('user');
              _context.next = 3;
              return model.where({ userName: this.get('userName') }).find();

            case 3:
              data = _context.sent;

              if (think.isEmpty(data)) {
                _context.next = 9;
                break;
              }

              if (!(data.password != think.md5(this.get('password')))) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', this.fail(Enum.USER_NOT_PASSWORD.code, Enum.USER_NOT_PASSWORD.msg));

            case 7:
              _context.next = 10;
              break;

            case 9:
              return _context.abrupt('return', this.fail(Enum.USER_NO_DATA.code, Enum.USER_NO_DATA.msg));

            case 10:
              delete data.password;
              _context.next = 13;
              return this.session("userInfo", data);

            case 13:
              return _context.abrupt('return', this.success(data));

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loginAction() {
      return _ref.apply(this, arguments);
    }

    return loginAction;
  }();

  _class.prototype.logoutAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.session();

            case 2:
              return _context2.abrupt('return', this.redirect('/login/index/login.html'));

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function logoutAction() {
      return _ref2.apply(this, arguments);
    }

    return logoutAction;
  }();

  _class.prototype.getuserinfoAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var userInfo;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.session("userInfo");

            case 2:
              userInfo = _context3.sent;

              console.log(userInfo);
              if (think.isEmpty(userInfo)) {
                this.redirect('/login/index/login.html');
              }
              return _context3.abrupt('return', this.success(userInfo));

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getuserinfoAction() {
      return _ref3.apply(this, arguments);
    }

    return getuserinfoAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=index.js.map