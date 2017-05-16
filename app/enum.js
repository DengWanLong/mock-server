'use strict';

exports.__esModule = true;
var USER_NO_DATA = exports.USER_NO_DATA = { code: 100, msg: '用户不存在' };
var USER_NOT_PASSWORD = exports.USER_NOT_PASSWORD = { code: 101, msg: '密码错误' };
var SYSTEM_ERROR = exports.SYSTEM_ERROR = { code: -1, msg: '系统异常' };
var NOT_NOGIN = exports.NOT_NOGIN = { code: 1, msg: '用户未登录' };
var ADD_ERROR = exports.ADD_ERROR = { code: 200, msg: '新增失败' };
var EDIT_ERROR = exports.EDIT_ERROR = { code: 300, msg: '修改失败' };
var DELETE_ERROR = exports.DELETE_ERROR = { code: 400, msg: '删除失败' };
var DELETE_PROJECT_INTERFACE_ERROR = exports.DELETE_PROJECT_INTERFACE_ERROR = { code: 401, msg: '请先删除当前项目下所有接口' };
//# sourceMappingURL=enum.js.map