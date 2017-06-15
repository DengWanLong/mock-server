export function parse(source) {
  if(!source.startsWith('{')) {
    source = source.substring(source.indexOf("{"), source.length);
  }
  if(!source.endsWith('}')) {
    source = source.substring(0, source.lastIndexOf("}") + 1);
  }
  if(source.includes('//') || source.includes('/*')) {
    var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g,// 正则表达式
    source = source.replace(reg, function(word) { // 去除注释后的文本
        return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
    });
  }
  var data = JSON.parse(source);
  return data;
}

export function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

//比较对象结构和值是否相等
export function isEqual(o1, o2) {
  //判断类型是否相等
  if(this.toType(o1) === this.toType(o2)) {
    //判读是否为对象
    if(this.toType(o1) === 'object') {
      let keys1 = Object.keys(o1);
      let keys2 = Object.keys(o2);
      if(keys1.length != keys2.length) {
        return false;
      }
      for(let i = 0; i < keys1.length; i++) {
        let key = keys1[i];
        // if(!o2.hasOwnProperty(key)) {
        //   return false;
        // }
        if(!this.isEqual(o1[key], o2[key])) {
          return false;
        }
      }
    }
    //判断是否为数组
    else if(this.toType(o1) === 'array') {
      if(o1.length != o2.length) {
        return false;
      }
      for(let i = 0; i < o1.length; i++) {
        if(!this.isEqual(o1[i], o2[i])) {
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

export function isContainEqual(o1, o2) {
  let data = {};
  let keys1 = Object.keys(o1).forEach((key) => {
    data[key] = o2[key];
  });
  return this.isEqual(o1, data);
}
