const baseUrl = process.env.VUE_APP_BASE_API
const baseSsoUrl = process.env.VUE_APP_SSO_API
const api = {
  state: {
    // 部署包上传
    deployUploadApi: baseUrl + '/api/deploy/upload',
    // SQL脚本上传
    databaseUploadApi: baseUrl + '/api/database/upload',
    // 实时控制台
    socketApi: baseUrl + '/websocket?token=kl',
    // 图片上传
    imagesUploadApi: baseUrl + '/api/pictures',
    // 修改头像
    updateAvatarApi: baseSsoUrl + '/api/user_info/head_img',
    // 上传文件到七牛云
    qiNiuUploadApi: baseUrl + '/api/qiNiuContent',
    // Sql 监控
    sqlApi: baseUrl + '/druid',
    // swagger
    swaggerApi: baseUrl + '/swagger-ui.html',
    // 文件上传
    fileUploadApi: baseUrl + '/api/file',
    // baseUrl，
    baseApi: baseUrl,
    // SSO
    ssoApi: baseSsoUrl
  }
}

export default api
