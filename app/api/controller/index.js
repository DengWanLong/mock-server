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

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

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
  _class.prototype.indexAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var prefix, url, temp, projectPrefix, interfaceUrl, params, project, interfaces, interfaceList, inParams, i, _params;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //auto render template file index_index.html
              prefix = '/api/';
              url = this.http.url.replace(prefix, '');
              temp = url.split("/");
              //检查接口地址是否符合

              if (!(temp.length != 2 || !temp[0] || !temp[1])) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', this.fail(Enum.URL_ERROR.code, Enum.URL_ERROR.msg));

            case 5:
              projectPrefix = temp[0];
              interfaceUrl = temp[1];
              params = '';
              //处理params参数

              if (interfaceUrl.indexOf("?")) {
                params = interfaceUrl.split("?")[1];
              }
              // return this.success({projectPrefix: projectPrefix, interfaceUrl: interfaceUrl, params: params});
              //查询对应项目是否存在
              _context.next = 11;
              return this.model("project").where({ projectPrefix: projectPrefix }).find();

            case 11:
              project = _context.sent;

              if (!think.isEmpty(project)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', this.fail(Enum.NOT_PROJECT_URL_ERROR.code, Enum.NOT_PROJECT_URL_ERROR.msg));

            case 14:
              //查询当前项目下对应接口是否存在(精确匹配)
              interfaces = null;
              //有入参才能进行精确匹配

              if (!params) {
                _context.next = 33;
                break;
              }

              interfaceUrl = interfaceUrl.replace("?" + params, '');
              _context.next = 19;
              return this.model("interface").where({ projectId: project.id, url: interfaceUrl, openExact: 1 }).select();

            case 19:
              interfaceList = _context.sent;

              //获取入参
              inParams = this.get();

              delete inParams[projectPrefix];
              if (this.isPost()) {
                inParams = this.post();
              }
              //循环对比
              i = 0;

            case 24:
              if (!(i < interfaceList.length)) {
                _context.next = 33;
                break;
              }

              interfaces = interfaceList[i];
              _params = Common.parse(interfaces.params);

              if (!Common.isContainEqual(_params, inParams)) {
                _context.next = 29;
                break;
              }

              return _context.abrupt('break', 33);

            case 29:
              interfaces = null;

            case 30:
              i++;
              _context.next = 24;
              break;

            case 33:
              if (!think.isEmpty(interfaces)) {
                _context.next = 40;
                break;
              }

              //查询当前项目下对应接口是否存在(模糊匹配)
              interfaceUrl = interfaceUrl.replace("?" + params, '');
              _context.next = 37;
              return this.model("interface").where({ projectId: project.id, url: interfaceUrl, openExact: 0 }).find();

            case 37:
              interfaces = _context.sent;

              if (!think.isEmpty(interfaces)) {
                _context.next = 40;
                break;
              }

              return _context.abrupt('return', this.fail(Enum.NOT_INTERFACE_URL_ERROR.code, Enum.NOT_INTERFACE_URL_ERROR.msg));

            case 40:
              if (!(interfaces.openProxy == 1)) {
                _context.next = 45;
                break;
              }

              if (interfaces.proxyURL) {
                _context.next = 43;
                break;
              }

              return _context.abrupt('return', this.fail(Enum.NOT_PROXY_URL_ERROR.code, Enum.NOT_PROXY_URL_ERROR.msg));

            case 43:
              _context.next = 50;
              break;

            case 45:
              if (!(interfaces.openMock == 1)) {
                _context.next = 49;
                break;
              }

              return _context.abrupt('return', this.json(_mockjs2.default.mock(Common.parse(interfaces.result))));

            case 49:
              return _context.abrupt('return', this.json(Common.parse(interfaces.result)));

            case 50:
              return _context.abrupt('return', this.success());

            case 51:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function indexAction() {
      return _ref.apply(this, arguments);
    }

    return indexAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=index.js.map