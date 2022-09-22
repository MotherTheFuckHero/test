module.exports = {
  /**
   * @description 网站标题
   */
  title: '过来玩后台管理',
  /**
   * @description 是否显示 tagsView
   */
  tagsView: true,
  /**
   * @description 固定头部
   */
  fixedHeader: true,
  /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 1,
  /**
   * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天s
   */
  passCookieExpires: 1,
  /**
   * @description 是否只保持一个子菜单的展开
   */
  uniqueOpened: true,
  /**
   * @description token key
   */
  TokenKey: 'access_token',
  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000,
  /**
   * @description 是否显示logo
   */
  sidebarLogo: true,
  /**
   * 是否显示设置的底部信息
   */
  showFooter: true,
  /**
   * 底部文字，支持html语法
   */
  footerTxt: '© 2021 过来玩 遵化市博客旅游集散中心有限公司',
  /** ++
   * 备案号
   */
  caseNumber: '冀ICP备 15016998',
  /**
   * 客户端标识
   */
  clientId: 'glwAdmin',
  /**
   * 单点登录系统ID
   */
  systemId: 1,
  /**
   * 用户类型
   */
  userType: 2,
  /**
   * 默认显示登录方式
   */
  loginType: 'password'

}
