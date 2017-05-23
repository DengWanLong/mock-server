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
              _context.next = 9;
              return this.model("project").join({
                table: "userAuth",
                join: "inner",
                as: 'ua',
                on: ['id', 'projectId']
              }).page(pageNo, pageSize).where({ 'ua.userId': userInfo.id }).field("project.id,project.projectName,project.projectPrefix,project.proxyURL,date_format(project.createTime, '%Y-%c-%d %h:%i:%s' ) as createTime").countSelect();

            case 9:
              result = _context.sent;

              if (!think.isEmpty(result)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', this.success({ pages: { pageNo: pageNo, pageSize: pageSize, totalCount: 0, totalPage: 0 }, tables: [] }));

            case 12:
              return _context.abrupt('return', this.success({ pages: { pageNo: pageNo, pageSize: pageSize, totalCount: result.count, totalPage: result.totalPages }, tables: result.data }));

            case 13:
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

  _class.prototype.queryallAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var userInfo, result;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.session("userInfo");

            case 2:
              userInfo = _context2.sent;

              if (!think.isEmpty(userInfo)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('return', this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg));

            case 5:
              _context2.next = 7;
              return this.model("project").join({
                table: "userAuth",
                join: "inner",
                as: 'ua',
                on: ['id', 'projectId']
              }).where({ 'ua.userId': userInfo.id }).field("project.id,project.projectName,project.projectPrefix").select();

            case 7:
              result = _context2.sent;
              return _context2.abrupt('return', this.success(result));

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function queryallAction() {
      return _ref2.apply(this, arguments);
    }

    return queryallAction;
  }();

  _class.prototype.addAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var projectName, projectPrefix, proxyURL, userInfo, model, projectId, insertId;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              projectName = this.get('projectName');
              projectPrefix = this.get('projectPrefix');
              proxyURL = this.get('proxyURL');
              _context3.next = 5;
              return this.session("userInfo");

            case 5:
              userInfo = _context3.sent;

              if (!think.isEmpty(userInfo)) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt('return', this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg));

            case 8:
              model = this.model("project");
              // let insertId = await model.transaction( async function * () {
              //   let projectId = await model.add({projectName: projectName, projectPrefix: projectPrefix, proxyURL: proxyURL});
              //   return await this.model('userAuth').add({userId: userInfo.id, projectId: projectId, isManage: 1});
              // })
              // let insertId = await this.model("project").add({projectName: projectName, projectPrefix: projectPrefix, proxyURL: proxyURL});

              _context3.prev = 9;
              _context3.next = 12;
              return model.add({ projectName: projectName, projectPrefix: projectPrefix, proxyURL: proxyURL });

            case 12:
              projectId = _context3.sent;
              _context3.next = 15;
              return this.model("userAuth").add({ userId: userInfo.id, projectId: projectId, isManage: 1 });

            case 15:
              insertId = _context3.sent;
              _context3.next = 21;
              break;

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3['catch'](9);
              return _context3.abrupt('return', this.fail(Enum.ADD_ERROR.code, Enum.ADD_ERROR.msg));

            case 21:
              return _context3.abrupt('return', this.success());

            case 22:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[9, 18]]);
    }));

    function addAction() {
      return _ref3.apply(this, arguments);
    }

    return addAction;
  }();

  _class.prototype.editAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var id, projectName, projectPrefix, proxyURL, model, userInfo, affectedRows;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = this.get('id');
              projectName = this.get('projectName');
              projectPrefix = this.get('projectPrefix');
              proxyURL = this.get('proxyURL');
              model = this.model("project");
              _context4.next = 7;
              return this.session("userInfo");

            case 7:
              userInfo = _context4.sent;

              if (!think.isEmpty(userInfo)) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt('return', this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg));

            case 10:
              _context4.prev = 10;
              _context4.next = 13;
              return model.where({ id: id }).update({ projectName: projectName, projectPrefix: projectPrefix, proxyURL: proxyURL });

            case 13:
              affectedRows = _context4.sent;
              _context4.next = 19;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4['catch'](10);
              return _context4.abrupt('return', this.fail(Enum.EDIT_ERROR.code, Enum.EDIT_ERROR.msg));

            case 19:
              return _context4.abrupt('return', this.success());

            case 20:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[10, 16]]);
    }));

    function editAction() {
      return _ref4.apply(this, arguments);
    }

    return editAction;
  }();

  _class.prototype.deleteAction = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var id, userInfo, model, interfaceCount;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = this.get('id');
              _context5.next = 3;
              return this.session("userInfo");

            case 3:
              userInfo = _context5.sent;

              if (!think.isEmpty(userInfo)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt('return', this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg));

            case 6:
              model = this.model("project");
              _context5.prev = 7;
              interfaceCount = this.model("interface").field("id").where({ projectId: id }).count();

              if (!(interfaceCount > 0)) {
                _context5.next = 11;
                break;
              }

              return _context5.abrupt('return', this.fail(Enum.DELETE_PROJECT_INTERFACE_ERROR.code, Enum.DELETE_PROJECT_INTERFACE_ERROR.msg));

            case 11:
              _context5.next = 13;
              return this.model("userAuth").where({ projectId: id }).delete();

            case 13:
              _context5.next = 15;
              return model.where({ id: id }).delete();

            case 15:
              _context5.next = 20;
              break;

            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5['catch'](7);
              return _context5.abrupt('return', this.fail(Enum.DELETE_ERROR.code, Enum.DELETE_ERROR.msg));

            case 20:
              return _context5.abrupt('return', this.success());

            case 21:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[7, 17]]);
    }));

    function deleteAction() {
      return _ref5.apply(this, arguments);
    }

    return deleteAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=project.js.map