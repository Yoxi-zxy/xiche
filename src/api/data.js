import axios from './index'
import qs from 'qs'
//  获取openId
const getOpenId = (params) => {
  return axios.request({
    url: 'getOpenId',
    params
  })
}
//  获取用户信息
const getUserInfo = (params) => {
  return axios.request({
    url: 'getUserInfo',
    params
  })
}
//  公众号分享
const share = (params) => {
  return axios.request({
    url: 'share',
    params
  })
}
//  商品列表
const getProductList = (params) => {
  return axios.request({
    url: 'getProductList',
    params
  })
}
//  商品详情
const getProduct = (params) => {
  return axios.request({
    url: 'getProduct/' + params
  })
}
//  商品预约
const getProductReserve = (params) => {
  return axios.request({
    url: 'getProductReserve/' + params
  })
}
//  添加订单
const addReserve = (data) => {
  return axios.request({
    url: 'addReserve',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  获取订单详情
const getOrder = (params) => {
  return axios.request({
    url: 'getOrder/' + params
  })
}
//  查询订单列表
const getOrderList = (params) => {
  return axios.request({
    url: 'getOrderList',
    params
  })
}
//  取消订单
const cancelOrder = (params) => {
  return axios.request({
    url: 'cancelOrder/' + params,
    method: 'put'
  })
}
//  取消订单
const deleteOrder = (params) => {
  return axios.request({
    url: 'deleteOrder/' + params,
    method: 'put'
  })
}
export default {
  getOpenId,
  getUserInfo,
  share,
  getProductList,
  getProductReserve,
  getProduct,
  addReserve,
  getOrder,
  getOrderList,
  cancelOrder,
  deleteOrder
}
