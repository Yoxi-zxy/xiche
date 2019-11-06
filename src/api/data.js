import axios from './index'
import qs from 'qs'

//  登录接口
const login = (data) => {
  return axios.request({
    url: '/users/userLogin',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  获取验证码
const getCond = (data) => {
  return axios.request({
    url: '/commonCode/getPhoneCode',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  注册验证手机号
const phoneRegister = (data) => {
  return axios.request({
    url: '/commonCode/comparison',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  注册成功
const register = (data) => {
  return axios.request({
    url: '/users/userRegister',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  完善资料
const finshedInfo = (data) => {
  return axios.request({
    url: '/users/userFinshedInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  忘记密码-验证
const forgerPassword = (data) => {
  return axios.request({
    url: '/users/forgetPassWord',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  忘记密码-修改
const editPassword = (data) => {
  return axios.request({
    url: '/users/flxForgetPassWord',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  获取个人信息&&验证token是否过期
const authorization = (data) => {
  return axios.request({
    url: '/users/getUserInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  修改手机号
const changePhone = (data) => {
  return axios.request({
    url: '/users/changeBindingPhone',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  修改密码
const changePassword = (data) => {
  return axios.request({
    url: '/users/updatePassWord',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  退出登录
const singOut = (data) => {
  return axios.request({
    url: '/users/logOut',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查询分类
const allSort = (data) => {
  return axios.request({
    url: '/sysDict/selectDataMaxCateValue',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  職位分類查詢
const jobSort = (data) => {
  return axios.request({
    url: '/JobClassification/selectJobClassification',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查询分类结果
const sortData = (data) => {
  return axios.request({
    url: '/news/selectNewsList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查询详情
const newDetails = (data) => {
  return axios.request({
    url: '/news/selectNewsDetails',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查询banner
const banner = (data) => {
  return axios.request({
    url: '/sysBanner/selectBannerByValue',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  上传文件
const upFile = (data) => {
  return axios.request({
    url: '/commonUpload/apiUploadImg',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}
//  查询地区
const parent = (data) => {
  return axios.request({
    url: '/region/selectDataByParentId',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  添加/修改企业信息
const addFirmInfo = (data) => {
  return axios.request({
    url: '/enterpriseInformation/addOrUpdateEnterpriseInformation',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  判断用户类型
const userType = (data) => {
  return axios.request({
    url: '/enterpriseInformation/ifEnterpriseAndAuditStatus',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  获取企业审核状态
const firmStatus = (data) => {
  return axios.request({
    url: '/enterpriseInformation/companyDetails',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  回显企业信息
const editFirmInfo = (data) => {
  return axios.request({
    url: '/enterpriseInformation/selectEnterpriseInformation',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  获取企业信息
const getFirmInfo = (data) => {
  return axios.request({
    url: '/enterpriseInformation/myRecruitTopCompanyInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  根据职位状态获取职位列表
const hierList = (data) => {
  return axios.request({
    url: '/jobInfo/getJobList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查看职位详情
const jobDetails = (data) => {
  return axios.request({
    url: '/jobInfo/getJobDetails',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  上线职位或下线职位
const jobShow = (data) => {
  return axios.request({
    url: '/jobInfo/upOrDown',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  删除职位
const deleteJob = (data) => {
  return axios.request({
    url: '/jobInfo/deleteJob',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  最低工资查询
const minMumWage = (data) => {
  return axios.request({
    url: '/jobInfo/selectMinimumWage',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要培训
const addTrain = (data) => {
  return axios.request({
    url: '/train/addOrupdateTrain',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  培训可选列表
const trainSelect = (data) => {
  return axios.request({
    url: '/trainProject/selectTrainProjectList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  培训详情
const trainDelit = (data) => {
  return axios.request({
    url: '/trainProject/selectTrainProjectById',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  培训报名
const aplayTrain = (data) => {
  return axios.request({
    url: '/trainProject/aplayTrainProject',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  添加/修改职位
const editJob = (data) => {
  return axios.request({
    url: '/jobInfo/addOrUpdateiJobInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  精品推荐职位查询
const boutiqueJob = (data) => {
  return axios.request({
    url: '/expect/selectBoutiqueExpectData',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  全部职位查询
const allJob = (data) => {
  return axios.request({
    url: '/expect/selectAllPositionsData',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  修改/新增求职意愿
const editExpect = (data) => {
  return axios.request({
    url: '/expect/setExpect',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查询求职意向
const queryExpect = (data) => {
  return axios.request({
    url: '/expect/selectExpectData',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查看职位详情
const jobInfo = (data) => {
  return axios.request({
    url: '/jobInfo/getMyJobWantedJobDetails',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  办事大厅
const hallData = (data) => {
  return axios.request({
    url: '/depManage/selectProcessingMatters',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  办事流程
const processData = (data) => {
  return axios.request({
    url: '/depManage/selectProcessingProcess',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  提交在线审核资料
const auditInfo = (data) => {
  return axios.request({
    url: '/onlineAudit/addOrUpdateOnlineAudit',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查看在线审核资料
const QueryInfo = (data) => {
  return axios.request({
    url: '/onlineAudit/selectOnlineAuditDataById',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查询在线审核列表
const auditList = (data) => {
  return axios.request({
    url: '/onlineAudit/selectMyOnlineAuditData',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查询我的预约列表
const bookingList = (data) => {
  return axios.request({
    url: '/book/selectMyBookList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  新增预约办事
const bookingData = (data) => {
  return axios.request({
    url: '/book/bookingMeansByDetId',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查询预约办事网点
const serviceDot = (data) => {
  return axios.request({
    url: '/book/selectServiceDot',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  提交预约办事
const addBooking = (data) => {
  return axios.request({
    url: '/book/addBooking',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  预约成功回显页面
const bookingSuccess = (data) => {
  return axios.request({
    url: '/book/selectBookSuccess',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  查询全部网点
const selectAllDot = (data) => {
  return axios.request({
    url: '/depManage/selectAllDot',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  调用微信js-sdk
const jssdk = (data) => {
  return axios.request({
    url: '/common/getSignature',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  获取培训机构列表
const trainList = (data) => {
  return axios.request({
    url: '/trainingManage/selectTrainList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  获取培训结构详情
const trainItem = (data) => {
  return axios.request({
    url: '/trainingManage/selectTrainDetails',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  二维码扫码进入
const qrIndex = (data) => {
  return axios.request({
    url: '/depManage/selectProcessingMattersByNumber',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要创业列表
const shipList = (data) => {
  return axios.request({
    url: '/entrepreneurship/selectEntrepreneurshipList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要创业详情接口
const shipDetails = (data) => {
  return axios.request({
    url: '/entrepreneurship/selectEntrepreneurshipDetails',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  实名认证
const realName = (data) => {
  return axios.request({
    url: '/users/realNameAuthentication',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我的培训-我的报名
const signUpData = (data) => {
  return axios.request({
    url: '/trainProject/selectTrainByUserId',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我的培训-我的培训需求
const demandData = (data) => {
  return axios.request({
    url: '/trainProject/selectDemandByUserId',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  市外维权服务-列表
const protectionList = (data) => {
  return axios.request({
    url: '/rightsProtection/selectRightsProtectionList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  市外维权服务-详情
const protectionItem = (data) => {
  return axios.request({
    url: '/rightsProtection/selectRightsProtectionById',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要招聘-最低法定年龄
const LegalAgeList = (data) => {
  return axios.request({
    url: '/legalAge/selectLegalAgeList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  三峡职业技工学院-技能培训
const skillsTraining = (data) => {
  return axios.request({
    url: '/skillTraining/selectSkillTrainingById',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要求职-立即沟通+1
const counAdd = (data) => {
  return axios.request({
    url: '/jobInfo/communicateNumber',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要创业-申请资金详情
const fundsDetails = (data) => {
  return axios.request({
    url: '/entrepreneurship/selectEntrepreneurshipDetails',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要创业-申请资金
const fundsApply = (data) => {
  return axios.request({
    url: '/rightsProtection/applyCapitalEntrepreneurship',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要创业-场地申请
const siteApply = (data) => {
  return axios.request({
    url: '/workstationEntrepreneurship/applyWorkstationEntrepreneurship',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要创业-导师列表 && 我要创业-活动列表
const businessList = (data) => {
  return axios.request({
    url: '/entrepreneurialGuidance/selectEntrepreneurialGuidanceList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要创业-导师详情 && 我要创业-活动详情
const businessDetails = (data) => {
  return axios.request({
    url: '/entrepreneurialGuidance/selectEntrepreneurialGuidanceDetails',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  我要创业-导师申请 && 我要创业-活动申请
const businessApply = (data) => {
  return axios.request({
    url: '/entrepreneurialGuidance/applyGHuidanceApply',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  个人中心-我要创业-创业申请列表
const businessApplyList = (data) => {
  return axios.request({
    url: '/entrepreneurship/personalCenterApplyList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//  个人中心-我要创业-创业申请详情
const businessApplyDetails = (data) => {
  return axios.request({
    url: '/entrepreneurship/personalCenterApplyDetails',
    method: 'post',
    data: qs.stringify(data)
  })
}
export default {
  businessApplyDetails,
  businessApplyList,
  businessApply,
  businessDetails,
  businessList,
  siteApply,
  fundsApply,
  fundsDetails,
  counAdd,
  skillsTraining,
  LegalAgeList,
  protectionItem,
  protectionList,
  demandData,
  signUpData,
  realName,
  shipDetails,
  shipList,
  qrIndex,
  trainItem,
  trainList,
  jssdk,
  selectAllDot,
  bookingSuccess,
  addBooking,
  serviceDot,
  bookingData,
  bookingList,
  auditList,
  QueryInfo,
  auditInfo,
  processData,
  hallData,
  jobInfo,
  queryExpect,
  editExpect,
  allJob,
  boutiqueJob,
  editJob,
  minMumWage,
  aplayTrain,
  trainDelit,
  trainSelect,
  addTrain,
  deleteJob,
  jobShow,
  jobDetails,
  hierList,
  getFirmInfo,
  editFirmInfo,
  firmStatus,
  userType,
  addFirmInfo,
  parent,
  upFile,
  banner,
  newDetails,
  sortData,
  jobSort,
  allSort,
  singOut,
  changePassword,
  changePhone,
  authorization,
  editPassword,
  forgerPassword,
  finshedInfo,
  register,
  phoneRegister,
  getCond,
  login
}
