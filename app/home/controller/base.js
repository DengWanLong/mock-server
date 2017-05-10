'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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
   * 前置魔术方法
   * @return {Promise} []
   */
  _class.prototype.__before = _regenerator2.default.mark(function __before() {
    var userInfo;
    return _regenerator2.default.wrap(function __before$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.session('userInfo');

          case 2:
            userInfo = _context.sent;

            if (!think.isEmpty(userInfo)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', this.redirect('/login/login/login.html'));

          case 5:
            console.log("base befor");
            this.assign('userInfo', userInfo);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, __before, this);
  });
  return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=base.js.map