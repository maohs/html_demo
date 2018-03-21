var Promise = require('es6-promise.min').Promise
var md5 = require('md5.min')
var config = require('../config.js')
var HOST = 'https://api.octinn.com/'

var HEADER = {
  "Content-Type":'application/json',
  "OI-APPKEY": config.appKey,
  "OI-UDID": "00000000000000000000000000000000",
  'OI-AUTH': '',
  'OI-CHN':0,
  "OI-TYPE": "USER",
  "OI-APIVER": '27'
}

function setToken(token) {
  HEADER['OI-AUTH'] = token
}
function setChannel(chn) {
  HEADER['OI-CHN'] = chn
}
function setUdid(udid) {
  HEADER['OI-UDID'] = md5(udid)
}

function fetchGet(url, data = {}) {
  return fetch('GET', url, data)
}
function fetchPost(url, data = {}) {
  return fetch('POST', url, data)
}
function fetchPut(url,data = {}) {
  return fetch('PUT',url,data)
}
function fetchDelete(url, data = {}) {
  return fetch('DELETE', url, data)
}

function fetch(method,url,data) {
  var showHint = true;
  if (data.noHint) {
    showHint = false;
    delete data.noHint;
  }
  return new Promise((resove,reject) => {
    wx.request({
      url:url,
      method:method,
      data:data,
      header:HEADER,
      success:function (result) {
        if (result.statusCode == 200 || result.statusCode == 201) {
          resove(result.data);
        } else {
          reject(result);
          if (showHint) {
            wx.showModal ({
              title:'提示',
              content:result.data.msg,
              showCancel:false,
              confirmColor:'#ff3939',
              success:function (res) {

              }
            })
          }
        }
      },
      fail: function (result) {
        reject(result);
      }
    })
  })
}
module.exports = {
  header: HEADER,
  baseUrl: HOST,
  fetchGet: fetchGet,
  fetchPost: fetchPost,
  fetchPut:fetchPut,
  fetchDelete: fetchDelete,
  setToken: setToken,
  setUdid: setUdid,
  setChannel:setChannel
}
