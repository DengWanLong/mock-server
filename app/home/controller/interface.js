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

var _common = require('../../common.js');

var Common = _interopRequireWildcard(_common);

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
      var pageNo, pageSize, projectId, queryText, userInfo, where, result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pageNo = this.get("pageNo");
              pageSize = this.get("pageSize");
              projectId = this.get("projectId");
              queryText = this.get("queryText");
              _context.next = 6;
              return this.session("userInfo");

            case 6:
              userInfo = _context.sent;

              if (!think.isEmpty(userInfo)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return', this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg));

            case 9:
              where = { "ua.userId": userInfo.id };

              if (!think.isEmpty(projectId)) {
                where["p.id"] = projectId;
              }
              if (!think.isEmpty(queryText)) {
                // where["i.interfaceName"] = ["like", "%" + queryText + "%"];
                where._complex = {
                  "i.interfaceName": ["like", "%" + queryText + "%"],
                  "i.url": ["like", "%" + queryText + "%"],
                  _logic: "or"
                };
              }
              _context.next = 14;
              return this.model("interface").alias('i').join(['INNER JOIN project as p ON i.projectId=p.id', 'INNER JOIN userAuth as ua on p.id=ua.projectId']).page(pageNo, pageSize).where(where).field("i.id,i.projectId,i.interfaceName,i.url,i.proxyUrl,i.requestType,i.openExact,i.params,i.result,i.code,i.openMock,i.openProxy,date_format(i.createTime, '%Y-%c-%d %h:%i:%s' ) as createTime,p.projectName,p.projectPrefix").countSelect();

            case 14:
              result = _context.sent;

              if (!think.isEmpty(result)) {
                _context.next = 17;
                break;
              }

              return _context.abrupt('return', this.success({ pages: { pageNo: pageNo, pageSize: pageSize, totalCount: 0, totalPage: 0 }, tables: [] }));

            case 17:
              return _context.abrupt('return', this.success({ pages: { pageNo: pageNo, pageSize: pageSize, totalCount: result.count, totalPage: result.totalPages }, tables: result.data }));

            case 18:
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

  _class.prototype.addAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var allParams, userInfo, model, interfaces, params, interfaceList, i, oldParams;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              //获取所有入参
              allParams = this.post();
              //判断用户是否登录

              _context2.next = 3;
              return this.session("userInfo");

            case 3:
              userInfo = _context2.sent;

              if (!think.isEmpty(userInfo)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg));

            case 6:
              model = this.model("interface");
              _context2.next = 9;
              return model.where({ projectId: allParams.projectId, interfaceName: allParams.interfaceName }).find();

            case 9:
              interfaces = _context2.sent;

              if (!(!think.isEmpty(interfaces) && !think.isEmpty(interfaces.id))) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt('return', this.fail(Enum.ADD_INTERFACE_NAME_ERROR.code, Enum.ADD_INTERFACE_NAME_ERROR.msg));

            case 12:
              params = Common.parse(allParams.params);
              _context2.next = 15;
              return model.where({ projectId: allParams.projectId, url: allParams.url }).select();

            case 15:
              interfaceList = _context2.sent;
              i = 0;

            case 17:
              if (!(i < interfaceList.length)) {
                _context2.next = 25;
                break;
              }

              interfaces = interfaceList[i];
              oldParams = Common.parse(interfaces.params);
              //模糊匹配url不能相同，精确匹配参数不能相同，模糊匹配的地址与精确匹配的地址不能相同

              if (!(allParams.openExact == 0 || interfaces.openExact == 0 || Common.isContainEqual(params, oldParams) || Common.isContainEqual(oldParams, params))) {
                _context2.next = 22;
                break;
              }

              return _context2.abrupt('return', this.fail(Enum.ADD_INTERFACE_URL_OR_PARAMS_ERROR.code, Enum.ADD_INTERFACE_URL_OR_PARAMS_ERROR.msg));

            case 22:
              i++;
              _context2.next = 17;
              break;

            case 25:
              _context2.next = 27;
              return this.model("interface").add(allParams);

            case 27:
              return _context2.abrupt('return', this.success());

            case 28:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function addAction() {
      return _ref2.apply(this, arguments);
    }

    return addAction;
  }();

  _class.prototype.editAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var allParams, userInfo, id, model, interfaces, params, interfaceList, i, oldParams;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              //获取所有入参
              allParams = this.post();
              //判断用户是否登录

              _context3.next = 3;
              return this.session("userInfo");

            case 3:
              userInfo = _context3.sent;

              if (!think.isEmpty(userInfo)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt('return', this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg));

            case 6:
              id = allParams.id;

              delete allParams.id;
              model = this.model("interface");
              _context3.next = 11;
              return model.where({ projectId: allParams.projectId, id: ['!=', id], interfaceName: allParams.interfaceName }).find();

            case 11:
              interfaces = _context3.sent;

              if (!(!think.isEmpty(interfaces) && !think.isEmpty(interfaces.id))) {
                _context3.next = 14;
                break;
              }

              return _context3.abrupt('return', this.fail(Enum.ADD_INTERFACE_NAME_ERROR.code, Enum.ADD_INTERFACE_NAME_ERROR.msg));

            case 14:
              params = Common.parse(allParams.params);
              _context3.next = 17;
              return model.where({ projectId: allParams.projectId, id: ['!=', id], url: allParams.url }).select();

            case 17:
              interfaceList = _context3.sent;
              i = 0;

            case 19:
              if (!(i < interfaceList.length)) {
                _context3.next = 27;
                break;
              }

              interfaces = interfaceList[i];
              oldParams = Common.parse(interfaces.params);
              //模糊匹配url不能相同，精确匹配参数不能相同，模糊匹配的地址与精确匹配的地址不能相同

              if (!(allParams.openExact == 0 || interfaces.openExact == 0 || Common.isContainEqual(params, oldParams) || Common.isContainEqual(oldParams, params))) {
                _context3.next = 24;
                break;
              }

              return _context3.abrupt('return', this.fail(Enum.ADD_INTERFACE_URL_OR_PARAMS_ERROR.code, Enum.ADD_INTERFACE_URL_OR_PARAMS_ERROR.msg));

            case 24:
              i++;
              _context3.next = 19;
              break;

            case 27:
              _context3.next = 29;
              return this.model("interface").where({ id: id }).update(allParams);

            case 29:
              return _context3.abrupt('return', this.success());

            case 30:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function editAction() {
      return _ref3.apply(this, arguments);
    }

    return editAction;
  }();

  _class.prototype.deleteAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var id, userInfo;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = this.get("id");
              _context4.next = 3;
              return this.session("userInfo");

            case 3:
              userInfo = _context4.sent;

              if (!think.isEmpty(userInfo)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt('return', this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg));

            case 6:
              _context4.next = 8;
              return this.model("interface").where({ id: id }).delete();

            case 8:
              return _context4.abrupt('return', this.success());

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteAction() {
      return _ref4.apply(this, arguments);
    }

    return deleteAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=interface.js.map