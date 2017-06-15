
export const USER_NO_DATA = { code: 100, msg: '用户不存在' }
export const USER_NOT_PASSWORD = { code: 101, msg: '密码错误' }
export const SYSTEM_ERROR = { code: -1, msg: '系统异常' }
export const NOT_NOGIN = { code: 1, msg: '用户未登录'}
export const ADD_ERROR = {code: 200, msg: '新增失败'}
export const ADD_PROJECT_NAME_ERROR = {code: 210, msg: '项目名称已存在'}
export const ADD_PROJECT_PREFIX_ERROR = {code: 211, msg: '项目前缀已存在'}
export const ADD_INTERFACE_NAME_ERROR = {code: 220, msg: '接口名称已存在'}
export const ADD_INTERFACE_URL_OR_PARAMS_ERROR = {code: 221, msg: '接口地址和参数同时重复'}
export const EDIT_ERROR = {code: 300, msg: '修改失败'}
export const DELETE_ERROR = {code: 400, msg: '删除失败'}
export const DELETE_PROJECT_INTERFACE_ERROR = {code: 401, msg: '请先删除当前项目下所有接口'}
export const URL_ERROR = {code: 500, msg: '请求接口地址存在错误'}
export const NOT_PROJECT_URL_ERROR = {code: 501, msg: '请求接口地址不存在'}
export const NOT_INTERFACE_URL_ERROR = {code: 502, msg: '请求接口地址不存在'}
export const NOT_PROXY_URL_ERROR = {code: 503, msg: '二次代理地址不存在'}
