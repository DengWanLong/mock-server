'use strict';

exports.__esModule = true;
var USER_NO_DATA = exports.USER_NO_DATA = { code: 100, msg: '用户不存在' };
var USER_NOT_PASSWORD = exports.USER_NOT_PASSWORD = { code: 101, msg: '密码错误' };
var SYSTEM_ERROR = exports.SYSTEM_ERROR = { code: -1, msg: '系统异常' };
var NOT_NOGIN = exports.NOT_NOGIN = { code: 1, msg: '用户未登录' };
var ADD_ERROR = exports.ADD_ERROR = { code: 200, msg: '新增失败' };
var ADD_PROJECT_NAME_ERROR = exports.ADD_PROJECT_NAME_ERROR = { code: 210, msg: '项目名称已存在' };
var ADD_PROJECT_PREFIX_ERROR = exports.ADD_PROJECT_PREFIX_ERROR = { code: 211, msg: '项目前缀已存在' };
var ADD_INTERFACE_NAME_ERROR = exports.ADD_INTERFACE_NAME_ERROR = { code: 220, msg: '接口名称已存在' };
var ADD_INTERFACE_URL_OR_PARAMS_ERROR = exports.ADD_INTERFACE_URL_OR_PARAMS_ERROR = { code: 221, msg: '接口地址和参数同时重复' };
var EDIT_ERROR = exports.EDIT_ERROR = { code: 300, msg: '修改失败' };
var DELETE_ERROR = exports.DELETE_ERROR = { code: 400, msg: '删除失败' };
var DELETE_PROJECT_INTERFACE_ERROR = exports.DELETE_PROJECT_INTERFACE_ERROR = { code: 401, msg: '请先删除当前项目下所有接口' };
var URL_ERROR = exports.URL_ERROR = { code: 500, msg: '请求接口地址存在错误' };
var NOT_PROJECT_URL_ERROR = exports.NOT_PROJECT_URL_ERROR = { code: 501, msg: '请求接口地址不存在' };
var NOT_INTERFACE_URL_ERROR = exports.NOT_INTERFACE_URL_ERROR = { code: 502, msg: '请求接口地址不存在' };
var NOT_PROXY_URL_ERROR = exports.NOT_PROXY_URL_ERROR = { code: 503, msg: '二次代理地址不存在' };
//# sourceMappingURL=enum.js.map