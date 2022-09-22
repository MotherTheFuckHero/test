import request from '@/request/http'
export function getparkinfoLists(data) {
  return request({
    url: 'admin/park_info/list',
    method: 'post',
    data
  })
}
/*分公司列表*/
export function getcompany() {
  return request({
    url: '/web/home/company_list',
    method: 'get',
  })
}

export function getLanguageList(data) {
  return request({
    url: '/web/language/list',
    method: 'post',
    data
  })
}

export function getCompanyPanel(companyId) {
  return request({
    url: '/web/home/navigation_bar/' + companyId,
    method: 'get'
  })
}

//首页轮播图
export function getbanner(companyId) {
  return request({
    url: '/web/home/banner/'+ companyId,
    method: 'get',
  })
}
//秒杀活动列表
export function getseckill(companyId) {
  return request({
    url: '/web/sec_kill/product_list/'+ companyId,
    method: 'get',
  })
}
//首页推荐
export function getextension(companyId) {
  return request({
    url: '/web/home/extension/'+ companyId,
    method: 'get',
  })
}

//首页板块分类（父）
export function getpanels(companyId) {
  return request({
    url: '/web/home/panels/'+ companyId,
    method: 'get',
  })
}

//首页板块分类（子）
export function getCategoryPanel(panelId) {
  return request({
    url: '/web/panel/category/'+ panelId,
    method: 'get',
  })
}
//首页板块查商家
export function getpanelMerchant(panelId) {
  return request({
    url: '/web/panel/merchant/'+ panelId,
    method: 'get',
  })
}
// 关键字查商家
export function getpanelMerchantLike (pageNo, pageSize, data) {
  return request({
    url: `/web/panel/merchant/like?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  });
}
//查询英文城市
export function getcityList(data) {
  return request({
    url: '/web/city/list',
    method: 'post',
    data
  })
}
