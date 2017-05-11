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
  _class.prototype.queryAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var pageNo, pageSize, userInfo, result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pageNo = this.get("pageNo");
              pageSize = this.get("pageSize");
              _context.next = 4;
              return this.session("userInfo");

            case 4:
              userInfo = _context.sent;

              if (!think.isEmpty(userInfo)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg));

            case 7:
              result = this.model("project").join({
                table: "userAuth",
                join: "inner",
                as: 'ua',
                on: ['id', 'projectId']
              }).page(pageNo, pageSize).where({ userId: userInfo.id }).select();

              if (!think.isEmpty(result)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', this.success({ pages: { pageNo: pageNo, pageSize: pageSize, totalCount: resut.count, totalPage: result.totalPages }, tables: result.data }));

            case 10:
              return _context.abrupt('return', this.success({ pages: { pageNo: pageNo, pageSize: pageSize, totalCount: 0, totalPage: 0 }, tables: [] }));

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function queryAction() {
      return _ref.apply(this, arguments);
    }

    return queryAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=project.js.map