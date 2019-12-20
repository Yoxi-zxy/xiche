//  设置token
export const setToken = (tokenId, openId) => {
  localStorage.setItem(tokenId, openId)
}
//  获取token
export const getToken = (openId) => {
  return localStorage.getItem(openId)
}
//  获取url参数
export const getRequest = () => {
  let url = location.search;
  let theRequest = {};
  if (url.indexOf('?') !== -1) {
    let str = url.substr(1);
    let strs = str.split('&');
    for (let i in strs) {
      theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1]);
    }
  }
  return theRequest
}
//  将数组循环出来以逗号分隔
export const seletString = (data, type) => {
  let str = '';
  data.forEach((item) => {
    if (type === 'value') {
      if (item.checked) {
        str += item[type] + ',';
      }
    } else {
      str += item[type] + ',';
    }
  });
  if (str.length > 0) {
    str = str.substr(0, str.length - 1);
  }
  return str
};
//  将时间戳转换为时间格式
export const timestampToTime = (time) => {
  let date = new Date(time * 1000)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = date.getHours()
  // var m = date.getMinutes() + ':'
  // var s = date.getSeconds()
  return Y + M + D + h;
}
