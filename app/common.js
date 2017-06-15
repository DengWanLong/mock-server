'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.parse = parse;
exports.toType = toType;
exports.isEqual = isEqual;
exports.isContainEqual = isContainEqual;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(source) {
  if (!source.startsWith('{')) {
    source = source.substring(source.indexOf("{"), source.length);
  }
  if (!source.endsWith('}')) {
    source = source.substring(0, source.lastIndexOf("}") + 1);
  }
  if (source.includes('//') || source.includes('/*')) {
    var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g,
        // 正则表达式
    source = source.replace(reg, function (word) {
      // 去除注释后的文本
      return (/^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word
      );
    });
  }
  var data = JSON.parse(source);
  return data;
}

function toType(obj) {
  return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

//比较对象结构和值是否相等
function isEqual(o1, o2) {
  //判断类型是否相等
  if (this.toType(o1) === this.toType(o2)) {
    //判读是否为对象
    if (this.toType(o1) === 'object') {
      var keys1 = (0, _keys2.default)(o1);
      var keys2 = (0, _keys2.default)(o2);
      if (keys1.length != keys2.length) {
        return false;
      }
      for (var i = 0; i < keys1.length; i++) {
        var key = keys1[i];
        // if(!o2.hasOwnProperty(key)) {
        //   return false;
        // }
        if (!this.isEqual(o1[key], o2[key])) {
          return false;
        }
      }
    }
    //判断是否为数组
    else if (this.toType(o1) === 'array') {
        if (o1.length != o2.length) {
          return false;
        }
        for (var _i = 0; _i < o1.length; _i++) {
          if (!this.isEqual(o1[_i], o2[_i])) {
            return false;
          }
        }
      }
      //基本类型处理
      else {
          return o1 == o2;
        }
  } else {
    return o1 == o2;
  }
  return true;
}

function isContainEqual(o1, o2) {
  var data = {};
  var keys1 = (0, _keys2.default)(o1).forEach(function (key) {
    data[key] = o2[key];
  });
  return this.isEqual(o1, data);
}
//# sourceMappingURL=common.js.map