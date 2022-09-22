import { initDataPost, download } from '@/api/data'
import { parseTime, downloadFile } from '@/utils/index'
import { get } from '@/api/product/product'
import Vue from 'vue'

/**
 * CRUD配置
 * @author moxun
 * @param {*} options <br>
 * @return crud instance.
 * @example
 * 要使用多crud时，请在关联crud的组件处使用crud-tag进行标记，如：<jobForm :job-status="dict.job_status" crud-tag="job" />
 */
function CRUD(options) {
  const defaultOptions = {
    tag: 'default',
    // id字段名
    idField: 'id',
    // 标题
    title: '',
    // 请求数据的url
    url: '',
    // 表格数据
    data: [],
    // 导出数据的url
    exportUrl: '',
    // 选择项
    selections: [],
    // 待查询的对象
    query: {},
    // 查询数据的参数
    params: {},
    // Form 表单
    form: {},
    // 重置表单
    defaultForm: () => {},
    // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
    sort: ['id,desc'],
    // 等待时间
    time: 50,
    // CRUD Method
    crudMethod: {
      add: (form) => {},
      del: (id) => {},
      edit: (form) => {},
      get: (id) => {}
    },
    // 主页操作栏显示哪些按钮
    optShow: {
      add: true,
      edit: false,
      del: false,
      download: false,
      reset: true
    },
    // 自定义一些扩展属性
    props: {},
    // 在主页准备
    queryOnPresenterCreated: true,
    // 调试开关
    debug: false
  }
  options = mergeOptions(defaultOptions, options)
  const data = {
    ...options,
    // 记录数据状态
    dataStatus: {},
    status: {
      add: CRUD.STATUS.NORMAL,
      edit: CRUD.STATUS.NORMAL,
      // 添加或编辑状态
      get cu() {
        if (this.add === CRUD.STATUS.NORMAL && this.edit === CRUD.STATUS.NORMAL) {
          return CRUD.STATUS.NORMAL
        } else if (this.add === CRUD.STATUS.PREPARED || this.edit === CRUD.STATUS.PREPARED) {
          return CRUD.STATUS.PREPARED
        } else if (this.add === CRUD.STATUS.PROCESSING || this.edit === CRUD.STATUS.PROCESSING) {
          return CRUD.STATUS.PROCESSING
        }
        throw new Error('wrong crud\'s cu status')
      },
      // 标题
      get title() {
        return this.add > CRUD.STATUS.NORMAL ? `新增${crud.title}` : this.edit > CRUD.STATUS.NORMAL ? `编辑${crud.title}` : crud.title
      }
    },
    msg: {
      submit: '提交成功',
      add: '新增成功',
      edit: '编辑成功',
      del: '删除成功'
    },
    page: {
      // 页码
      page: 0,
      // 每页数据条数
      size: 10,
      // 总数据条数
      total: 0
    },
    // 整体loading
    loading: false,
    // 导出的 Loading
    downloadLoading: false,
    // 删除的 Loading
    delAllLoading: false
  }
  const methods = {
    /**
     * 通用的提示
     */
    submitSuccessNotify() {
      crud.notify(crud.msg.submit, CRUD.NOTIFICATION_TYPE.SUCCESS)
    },
    addSuccessNotify() {
      crud.notify(crud.msg.add, CRUD.NOTIFICATION_TYPE.SUCCESS)
    },
    editSuccessNotify() {
      crud.notify(crud.msg.edit, CRUD.NOTIFICATION_TYPE.SUCCESS)
    },
    delSuccessNotify() {
      crud.notify(crud.msg.del, CRUD.NOTIFICATION_TYPE.SUCCESS)
    },
    // 搜索
    toQuery() {
      crud.page.page = 1
      crud.refresh()
    },
    // 刷新
    refresh() {
      if (!callVmHook(crud, CRUD.HOOK.beforeRefresh)) {
        return
      }
      return new Promise((resolve, reject) => {
        crud.loading = true
        // 请求数据
        initDataPost(crud.url, crud.getPageParams(), crud.getQueryParams()).then(data => {
          crud.data = data.data.resultList
          crud.page.total = data.data.totalCount
          crud.resetDataStatus()
          // time 毫秒后显示表格
          setTimeout(() => {
            crud.loading = false
            callVmHook(crud, CRUD.HOOK.afterRefresh)
          }, crud.time)
          resolve(data)
        }).catch(err => {
          crud.loading = false
          reject(err)
        })
      })
    },
    /**
     * 启动添加
     */
    toAdd() {
      crud.resetForm()
      if (!(callVmHook(crud, CRUD.HOOK.beforeToAdd, crud.form) && callVmHook(crud, CRUD.HOOK.beforeToCU, crud.form))) {
        return
      }
      crud.status.add = CRUD.STATUS.PREPARED
      callVmHook(crud, CRUD.HOOK.afterToAdd, crud.form)
      callVmHook(crud, CRUD.HOOK.afterToCU, crud.form)
    },

    /**
     * 启动编辑
     * @param {*} data 数据项
     */
    toEdit(data) {
      if (data.certificateImg !== '' && data.certificateImg !== undefined && data.certificateImg !== null) {
        data.fileList = []
        data.fileList.push({
          'key': data.certificateImg,
          'url': data.certificateImgUrl
        })
      }
      if (data.icon !== '' && data.icon !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.icon,
          'url': data.iconUrl
        })
      }
      if (data.tableImg !== '' && data.tableImg !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.tableImg,
          'url': data.tableImgUrl
        })
      }
      if (data.cover !== '' && data.cover !== undefined) {
        data.filecoverList = []
        data.filecoverList.push({
          'key': data.cover,
          'url': data.cover
        })
      }
      if (data.stationLogo !== '' && data.stationLogo !== undefined) {
        data.filestationLogoList = []
        data.filestationLogoList.push({
          'key': data.stationLogo,
          'url': data.stationLogoUrl
        })
      }
      if (data.backfile !== '' && data.backfile !== undefined) {
        data.filestorageList = []
        data.filestorageList.push({
          'key': data.backfile,
          'name': data.backFileUrl,
          'url': data.backFileUrl
        })
      }
      if (data.url !== '' && data.url !== undefined) {
        data.fileurlList = []
        data.fileurlList.push({
          'key': data.url,
          'name': data.url,
          'url': data.url
        })
      }
      if (data.cover !== '' && data.cover !== undefined) {
        data.filecoverPicKeyList = []
        data.filecoverPicKeyList.push({
          'key': data.cover,
          'url': data.coverUrl
        })
      }
      if (data.communityHeadAddress !== '' && data.communityHeadAddress !== undefined) {
        if (data.communityHeadAddress.headImg !== '' && data.communityHeadAddress.headImg !== null) {
          data.fileList = []
          data.fileList.push({
            'key': data.communityHeadAddress.headImg,
            'url': data.communityHeadAddress.headImgUrl
          })
        }
      }
      if (data.coverPicKey !== '' && data.coverPicKey !== undefined) {
        data.filecoverPicKeyList = []
        data.filecoverPicKeyList.push({
          'key': data.coverPicKey,
          'url': data.coverPicUrl
        })
      }
      if (data.cover !== '' && data.cover !== undefined) {
        data.fileadvertPicKeyList = []
        data.fileadvertPicKeyList.push({
          'key': data.cover,
          'url': data.cover
        })
      }
      if (data.parkPic !== '' && data.parkPic !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.parkPic,
          'url': data.parkPicDesc
        })
      }
      if (data.areaPic !== '' && data.areaPic !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.areaPic,
          'url': data.areaPicDesc
        })
      }
      if (data.imageKey !== '' && data.imageKey !== undefined) {
        data.fileimageKeyList = []
        data.fileimageKeyList.push({
          'key': data.imageKey,
          'url': data.imageUrl
        })
      }

      if (data.headImg !== '' && data.headImg !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.headImg,
          'url': data.headImgUrl
        })
      }
      if (data.guideImgKey !== '' && data.guideImgKey !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.guideImgKey,
          'url': data.guideImgUrl
        })
      }
      if (data.pointImgKey !== '' && data.pointImgKey !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.pointImgKey,
          'url': data.pointImgUrl
        })
      }
      if (data.image !== '' && data.image !== undefined) {
        data.fileimageList = []
        data.fileimageList.push({
          'key': data.image,
          'url': data.imageUrl
        })
      }
      if (data.imgKey !== '' && data.imgKey !== undefined) {
        data.fileimgKeyList = []
        data.fileimgKeyList.push({
          'key': data.imgKey,
          'url': data.imgUrl
        })
      }
      if (data.imgKey !== '' && data.imgKey !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.imgKey,
          'url': data.imgUrl
        })
      }
      if (data.cover !== '' && data.cover !== undefined) {
        data.filegiftPicKeyList = []
        data.filegiftPicKeyList.push({
          'key': data.cover,
          'url': data.cover
        })
      }
      if (data.playKey !== '' && data.playKey !== undefined) {
        data.filestorageList = []
        data.filestorageList.push({
          'key': data.playKey,
          'name': data.name,
          'url': data.playUrl
        })
      }
      if (data.packageKey !== '' && data.packageKey !== undefined) {
        data.fileversionList = []
        data.fileversionList.push({
          'key': data.packageKey,
          'name': data.packageKey,
          'url': data.url
        })
      }
      if (data.headImg !== '' && data.headImg !== undefined) {
        data.fileheadImgList = []
        data.fileheadImgList.push({
          'key': data.headImg,
          'url': data.headImgUrl
        })
      }
      if (data.coverPic !== '' && data.coverPic !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.coverPic,
          'url': data.coverPic
        })
      }
      if (data.advertpicUrl !== '' && data.advertpicUrl !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.advertpicUrl,
          'url': data.advertpicUrl
        })
      }
      if (data.imageUrl !== '' && data.imageUrl !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.imageUrl,
          'url': data.imageUrl
        })
      }
      if (data.giftpicUrl !== '' && data.giftpicUrl !== undefined) {
        data.fileList = []
        data.fileList.push({
          'key': data.giftpicUrl,
          'url': data.giftpicUrl
        })
      }
      if (data.playUrl !== '' && data.playUrl !== undefined) {
        data.filestorageList = []
        data.filestorageList.push({
          'key': data.playUrl,
          'size': data.playSize,
          'name': data.playName,
          'url': data.playUrl
        })
      }

      /* 商品专用*/
      if (crud.url === 'admin/product/page_list') {
        const id = data.id
        get(id).then(res => {
          const code = res.code
          const msg = res.msg
          if (code === '0') {
            const mewRes = res.data /* 查询返回*/
            const newForm = data /* 渲染使用*/
            /* 商品基本信息*/
            newForm.productDesc = {}
            newForm.productDesc = mewRes.productDesc
            newForm.postageId = mewRes.postageId

            /* 商品标签*/
            newForm.productLabelList = mewRes.productLabelList
            /* 商品运输方式*/
            newForm.kong = []
            for (var y = 0; y < mewRes.productTransportList.length; y++) {
              newForm.kong.push(mewRes.productTransportList[y].transportType)
              if (mewRes.productTransportList[y].isDefault === true) {
                newForm.isDefault = mewRes.productTransportList[y].transportType
              }
              if (newForm.kong.includes(1) === true) {
                newForm.isDefaultone = true
              } else {
                newForm.isDefaultone = false
              }
              if (newForm.kong.includes(2) === true) {
                newForm.isDefaulttwo = true
              } else {
                newForm.isDefaulttwo = false
              }
              if (newForm.kong.includes(3) === true) {
                newForm.isDefaultthree = true
              } else {
                newForm.isDefaultthree = false
              }
            }
            /* 规格信息*/
            newForm.productSpecUserGradeList = []
            newForm.productSpecLineList = []
            if (mewRes.productSpecList.length === 1) {
              newForm.productIds = mewRes.productSpecList[0].id
              newForm.productSpecs = mewRes.productSpecList[0].productSpecs
              newForm.unit = mewRes.productSpecList[0].unit
              newForm.purchasePrice = mewRes.productSpecList[0].purchasePrice
              newForm.barCode = mewRes.productSpecList[0].barCode
              newForm.isGroup = mewRes.productSpecList[0].isGroup
              newForm.languageId = mewRes.productSpecList[0].languageId
              if (mewRes.productType === 8 && mewRes.productSpecList[0].productSpecLineList !== null) {
                if (mewRes.productSpecList[0].productSpecLineList.length > 0) {
                  for (var l = 0; l < mewRes.productSpecList[0].productSpecLineList.length; l++) {
                    newForm.productSpecLineList.push({
                      date: mewRes.productSpecList[0].productSpecLineList[l].saleDate,
                      content: mewRes.productSpecList[0].productSpecLineList[l].price,
                      contents: mewRes.productSpecList[0].productSpecLineList[l].stockCount
                    })
                  }
                }
              }
              if (newForm.isGroup) {
                newForm.productSpecGroup = {
                  shareImageList: [{
                    key: mewRes.productSpecList[0].productSpecGroup.shareImage,
                    url: mewRes.productSpecList[0].productSpecGroup.shareImageUrl
                  }],
                  id: mewRes.productSpecList[0].productSpecGroup.id,
                  duration: mewRes.productSpecList[0].productSpecGroup.duration, // 分钟
                  groupPrice: mewRes.productSpecList[0].productSpecGroup.groupPrice, // 拼单价格
                  isSuccess: mewRes.productSpecList[0].productSpecGroup.isSuccess, // 到时间是否默认成功
                  limitPeos: mewRes.productSpecList[0].productSpecGroup.limitPeos, // 最低拼单人数
                  shareContent: mewRes.productSpecList[0].productSpecGroup.shareContent, // 分享内容
                  shareTitle: mewRes.productSpecList[0].productSpecGroup.shareTitle, // 分享标题
                  shareImage: mewRes.productSpecList[0].productSpecGroup.shareImage, // 分享图片
                  sponsorCoupRatio: mewRes.productSpecList[0].productSpecGroup.sponsorCoupRatio // 发起人优惠百分比
                }
              }
              for (var n = 0; n < mewRes.productSpecList[0].productSpecUserGradeList.length; n++) {
                newForm.productSpecUserGradeList.push({
                  id: mewRes.productSpecList[0].productSpecUserGradeList[n].id,
                  userGradeId: mewRes.productSpecList[0].productSpecUserGradeList[n].userGradeId,
                  retailPrice: mewRes.productSpecList[0].productSpecUserGradeList[n].retailPrice,
                  storePrice: mewRes.productSpecList[0].productSpecUserGradeList[n].storePrice,
                  platFormPrice: mewRes.productSpecList[0].productSpecUserGradeList[n].platFormPrice,
                  discountPrice: mewRes.productSpecList[0].productSpecUserGradeList[n].discountPrice,
                  vipPrice: mewRes.productSpecList[0].productSpecUserGradeList[n].vipPrice,
                  limitNum: mewRes.productSpecList[0].productSpecUserGradeList[n].limitNum,
                  minNum: mewRes.productSpecList[0].productSpecUserGradeList[n].minNum
                })
              }
              const newStockCount = mewRes.productSpecList[0].productSpecStock
              if (newStockCount !== '' && newStockCount !== undefined && newStockCount !== null) {
                newForm.productSpecStock = {
                  id: mewRes.productSpecList[0].productSpecStock.id,
                  specId: mewRes.productSpecList[0].productSpecStock.specId,
                  stockFictitiousCount: mewRes.productSpecList[0].productSpecStock.stockFictitiousCount,
                  stockLimitCount: mewRes.productSpecList[0].productSpecStock.stockLimitCount,
                  stockCount: mewRes.productSpecList[0].productSpecStock.stockCount
                }
              }
              /* 商品图片*/
              newForm.productImgList = []
              if (mewRes.productSpecList[0].productImgList != null){
                for (var i = 0; i < mewRes.productSpecList[0].productImgList.length; i++) {
                  var pamers = {
                    key: mewRes.productSpecList[0].productImgList[i].image,
                    image: mewRes.productSpecList[0].productImgList[i].image,
                    url: mewRes.productSpecList[0].productImgList[i].imageUrl,
                    defaultShow: mewRes.productSpecList[0].productImgList[i].defaultShow,
                    id: mewRes.productSpecList[0].productImgList[i].id,
                    languageId: mewRes.productSpecList[0].productImgList[i].languageId,
                    productId: mewRes.productSpecList[0].productImgList[i].productId,
                    sortNo: mewRes.productSpecList[0].productImgList[i].sortNo,
                    specId: mewRes.productSpecList[0].productSpecStock.specId,
                    specs: mewRes.productSpecList[0].productImgList[i].specs,
                    name: mewRes.productSpecList[0].productImgList[i].specs,
                    status: mewRes.productSpecList[0].productImgList[i].status
                  }
                  newForm.productImgList.push(pamers)
                }
              }
              newForm.duoguige = 2
            } else {
              newForm.duoguige = 1
              newForm.languageId = mewRes.productSpecList[0].languageId
              const newSpecList = []
              newForm.productImgguigeList = []

              for (let i = 0; i < mewRes.productSpecList.length; i++) {
                if (mewRes.productSpecList[i].productImgList != null){
                  for (let m = 0; m < mewRes.productSpecList[i].productImgList.length; m++) {
                    const pamers = {
                      key: mewRes.productSpecList[i].productImgList[m].image,
                      url: mewRes.productSpecList[i].productImgList[m].imageUrl,
                      defaultShow: mewRes.productSpecList[i].productImgList[m].defaultShow,
                      id: mewRes.productSpecList[i].productImgList[m].id,
                      image: mewRes.productSpecList[i].productImgList[m].image,
                      languageId: mewRes.productSpecList[i].productImgList[m].languageId,
                      productId: mewRes.productSpecList[i].productImgList[m].productId,
                      sortNo: mewRes.productSpecList[i].productImgList[m].sortNo,
                      specId: mewRes.productSpecList[i].productImgList[m].specId,
                      specs: mewRes.productSpecList[i].productImgList[m].specs,
                      status: mewRes.productSpecList[i].productImgList[m].status
                    }
                    newForm.productImgguigeList.push(pamers)
                  }
                }
                mewRes.productSpecList[i].newproductSpecLineList = []
                if (mewRes.productType === 8 && mewRes.productSpecList[i].productSpecLineList !== null) {
                  if (mewRes.productSpecList[i].productSpecLineList.length > 0) {
                    for (var ls = 0; ls < mewRes.productSpecList[i].productSpecLineList.length; ls++) {
                      mewRes.productSpecList[i].newproductSpecLineList = [{
                        date: mewRes.productSpecList[i].productSpecLineList[ls].saleDate,
                        content: mewRes.productSpecList[i].productSpecLineList[ls].price,
                        contents: mewRes.productSpecList[i].productSpecLineList[ls].stockCount
                      }]
                    }
                  }
                }
                const pamers = {
                  id: mewRes.productSpecList[i].id,
                  productSpecs: mewRes.productSpecList[i].productSpecs,
                  unit: mewRes.productSpecList[i].unit,
                  purchasePrice: mewRes.productSpecList[i].purchasePrice,
                  barCode: mewRes.productSpecList[i].barCode,
                  productSpecUserGradeListVisibles: false, // 控制多规格多商品价格体系显示
                  productSpecUserGradeList: mewRes.productSpecList[i].productSpecUserGradeList,
                  productSpeclintvisible: false, // 控制多规格多商品价格体系显示
                  productSpecLineList: mewRes.productSpecList[i].newproductSpecLineList,

                  stockCount: mewRes.productSpecList[i].productSpecStock.stockCount,
                  stockLimitCount: mewRes.productSpecList[i].productSpecStock.stockLimitCount,
                  stockFictitiousCount: mewRes.productSpecList[i].productSpecStock.stockFictitiousCount,
                  productSpecStock: {
                    id: mewRes.productSpecList[i].productSpecStock.id,
                    specId: mewRes.productSpecList[i].productSpecStock.specId,
                    stockFictitiousCount: mewRes.productSpecList[i].productSpecStock.stockFictitiousCount,
                    stockLimitCount: mewRes.productSpecList[i].productSpecStock.stockLimitCount,
                    stockCount: mewRes.productSpecList[i].productSpecStock.stockCount
                  },
                  isGroup: mewRes.productSpecList[i].isGroup,
                  languageId: mewRes.productSpecList[i].languageId
                }
                if (pamers.isGroup) {
                  pamers.productSpecGroup = {
                    id: mewRes.productSpecList[i].productSpecGroup.id,
                    specId: mewRes.productSpecList[i].productSpecGroup.specId,
                    productId: mewRes.productSpecList[i].productSpecGroup.productId,
                    duration: mewRes.productSpecList[i].productSpecGroup.duration, // 分钟
                    groupPrice: mewRes.productSpecList[i].productSpecGroup.groupPrice, // 拼单价格
                    isSuccess: mewRes.productSpecList[i].productSpecGroup.isSuccess, // 到时间是否默认成功
                    limitPeos: mewRes.productSpecList[i].productSpecGroup.limitPeos, // 最低拼单人数
                    shareContent: mewRes.productSpecList[i].productSpecGroup.shareContent, // 分享内容
                    shareTitle: mewRes.productSpecList[i].productSpecGroup.shareTitle, // 分享标题
                    shareImage: mewRes.productSpecList[i].productSpecGroup.shareImage, // 分享图片
                    sponsorCoupRatio: mewRes.productSpecList[i].productSpecGroup.sponsorCoupRatio // 发起人优惠百分比
                  }
                  pamers.shareImageList = [{
                    key: mewRes.productSpecList[i].productSpecGroup.shareImage,
                    url: mewRes.productSpecList[i].productSpecGroup.shareImageUrl
                  }]
                } else {
                  pamers.productSpecGroup = {
                    duration: '', // 分钟
                    groupPrice: '', // 拼单价格
                    isSuccess: true, // 到时间是否默认成功
                    limitPeos: '', // 最低拼单人数
                    shareContent: '', // 分享内容
                    shareTitle: '', // 分享标题
                    shareImage: '', // 分享图片
                    sponsorCoupRatio: '' // 发起人优惠百分比
                  }
                  pamers.shareImageList = []
                }
                for (var nn = 0; nn < mewRes.productSpecList[i].productSpecUserGradeList.length; nn++) {
                  newForm.productSpecUserGradeList.push({
                    id: mewRes.productSpecList[i].productSpecUserGradeList[nn].id,
                    userGradeId: mewRes.productSpecList[i].productSpecUserGradeList[nn].userGradeId,
                    retailPrice: mewRes.productSpecList[i].productSpecUserGradeList[nn].retailPrice,
                    storePrice: mewRes.productSpecList[i].productSpecUserGradeList[nn].storePrice,
                    platFormPrice: mewRes.productSpecList[i].productSpecUserGradeList[nn].platFormPrice,
                    discountPrice: mewRes.productSpecList[i].productSpecUserGradeList[nn].discountPrice,
                    vipPrice: mewRes.productSpecList[i].productSpecUserGradeList[nn].vipPrice,
                    limitNum: mewRes.productSpecList[i].productSpecUserGradeList[nn].limitNum,
                    minNum: mewRes.productSpecList[i].productSpecUserGradeList[nn].minNum
                  })
                }
                newSpecList.push(pamers)
              }
              newForm.productSpecList = newSpecList
              newForm.xunhuan = []
              newForm.xunhuan = newForm.productSpecList
              for (let i = 0; i < newForm.xunhuan.length; i++) {
                newForm.xunhuan[i].productImgguigeList = []
                for (var s = 0; s < newForm.productImgguigeList.length; s++) {
                  if (newForm.xunhuan[i].id === newForm.productImgguigeList[s].specId) {
                    newForm.xunhuan[i].productImgguigeList.push(newForm.productImgguigeList[s])
                  }
                }
              }
            }
            /* 是否独立提成*/

            if (newForm.costType !== '' && newForm.costType !== undefined && newForm.costType !== null) {
              newForm.Commission = true
            } else {
              newForm.Commission = false
            }
            /* 票务类型商品*/
            if (mewRes.productTicket !== '' && mewRes.productTicket !== undefined && mewRes.productTicket !== null) {
              newForm.productTicket = mewRes.productTicket
              if (newForm.productTicket.isRealName !== '' && newForm.productTicket.isRealName === false) {
                newForm.productTicket.isRealName = 0
              } else {
                newForm.productTicket.isRealName = 1
              }
              if (newForm.productTicket.isBooking !== '' && newForm.productTicket.isBooking === false) {
                newForm.productTicket.isBooking = 0
              } else {
                newForm.productTicket.isBooking = 1
              }
              const dateList = []
              for (let i = 0; i < mewRes.productTicket.unAvailableDateList.length; i++) {
                dateList.push(mewRes.productTicket.unAvailableDateList[i].unAvailableDate)
              }
              newForm.productTicket.unAvailableDateList = dateList
            }

            // /* 多规格标题*/
            // if (mewRes.productAttributeList.length > 0) {
            //   for (let s = 0; s < mewRes.productAttributeList.length; s++) {
            //     newForm.attribute = mewRes.productAttributeList[0].attribute
            //     if (mewRes.productAttributeList.length === 2) {
            //       newForm.dialogFormVisibles = true
            //       newForm.deletsss = true
            //       newForm.attributes = mewRes.productAttributeList[1].attribute
            //     }
            //   }
            //   if (mewRes.productAttributeList.length === 2) {
            //     newForm.attributeValueLists = []
            //     for (let ss = 0; ss < mewRes.productAttributeList[1].attributeValueList.length; ss++) {
            //       newForm.attributeValueLists.push(mewRes.productAttributeList[1].attributeValueList[ss])
            //     }
            //   }
            //   newForm.attributeValueList = []
            //   for (let ss = 0; ss < mewRes.productAttributeList[0].attributeValueList.length; ss++) {
            //     newForm.attributeValueList.push(mewRes.productAttributeList[0].attributeValueList[ss])
            //   }
            // }

            crud.resetForm(JSON.parse(JSON.stringify(newForm)))
            if (!(callVmHook(crud, CRUD.HOOK.beforeToEdit, crud.form) && callVmHook(crud, CRUD.HOOK.beforeToCU, crud.form))) {
              return
            }
            crud.status.edit = CRUD.STATUS.PREPARED
            crud.getDataStatus(crud.getDataId(newForm)).edit = CRUD.STATUS.PREPARED
            callVmHook(crud, CRUD.HOOK.afterToEdit, crud.form)
            callVmHook(crud, CRUD.HOOK.afterToCU, crud.form)
          } else {
            crud.notify(msg, CRUD.NOTIFICATION_TYPE.ERROR)
          }
        })
      } else {
        crud.resetForm(JSON.parse(JSON.stringify(data)))
        if (!(callVmHook(crud, CRUD.HOOK.beforeToEdit, crud.form) && callVmHook(crud, CRUD.HOOK.beforeToCU, crud.form))) {
          return
        }
        crud.status.edit = CRUD.STATUS.PREPARED
        crud.getDataStatus(crud.getDataId(data)).edit = CRUD.STATUS.PREPARED
        callVmHook(crud, CRUD.HOOK.afterToEdit, crud.form)
        callVmHook(crud, CRUD.HOOK.afterToCU, crud.form)
      }
    },
    /**
     * 启动删除
     * @param {*} data 数据项
     */
    toDelete(data) {
      crud.getDataStatus(crud.getDataId(data)).delete = CRUD.STATUS.PREPARED
    },
    /**
     * 取消删除
     * @param {*} data 数据项
     */
    cancelDelete(data) {
      if (!callVmHook(crud, CRUD.HOOK.beforeDeleteCancel, data)) {
        return
      }
      crud.getDataStatus(crud.getDataId(data)).delete = CRUD.STATUS.NORMAL
      callVmHook(crud, CRUD.HOOK.afterDeleteCancel, data)
    },
    /**
     * 取消新增/编辑
     */
    cancelCU() {
      const addStatus = crud.status.add
      const editStatus = crud.status.edit
      if (addStatus === CRUD.STATUS.PREPARED) {
        if (!callVmHook(crud, CRUD.HOOK.beforeAddCancel, crud.form)) {
          return
        }
        crud.status.add = CRUD.STATUS.NORMAL
      }
      if (editStatus === CRUD.STATUS.PREPARED) {
        if (!callVmHook(crud, CRUD.HOOK.beforeEditCancel, crud.form)) {
          return
        }
        crud.status.edit = CRUD.STATUS.NORMAL
        crud.getDataStatus(crud.getDataId(crud.form)).edit = CRUD.STATUS.NORMAL
      }
      crud.resetForm()
      if (addStatus === CRUD.STATUS.PREPARED) {
        callVmHook(crud, CRUD.HOOK.afterAddCancel, crud.form)
      }
      if (editStatus === CRUD.STATUS.PREPARED) {
        callVmHook(crud, CRUD.HOOK.afterEditCancel, crud.form)
      }
      // 清除表单验证
      if (crud.findVM('form').$refs['form']) {
        crud.findVM('form').$refs['form'].clearValidate()
      }
    },
    /**
     * 提交新增/编辑
     */
    submitCU() {
      if (!callVmHook(crud, CRUD.HOOK.beforeValidateCU)) {
        return
      }
      crud.findVM('form').$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        if (!callVmHook(crud, CRUD.HOOK.afterValidateCU)) {
          return
        }
        if (crud.status.add === CRUD.STATUS.PREPARED) {
          crud.doAdd()
        } else if (crud.status.edit === CRUD.STATUS.PREPARED) {
          crud.doEdit()
        }
      })
    },
    /**
     * 执行添加
     */
    doAdd() {
      if (!callVmHook(crud, CRUD.HOOK.beforeSubmit)) {
        return
      }
      crud.status.add = CRUD.STATUS.PROCESSING

      if (crud.form.type1List !== '' && crud.form.type1List !== undefined && crud.form.type2List !== '' && crud.form.type2List !== undefined && crud.form.type3List !== '' && crud.form.type3List !== undefined) {
        crud.form.specialAreaList = []
        for (let i = 0; i < crud.form.type1List.length; i++) {
          crud.form.specialAreaList.push(crud.form.type1List[i])
        }
        for (let i = 0; i < crud.form.type2List.length; i++) {
          crud.form.specialAreaList.push(crud.form.type2List[i])
        }
        for (let i = 0; i < crud.form.type3List.length; i++) {
          crud.form.specialAreaList.push(crud.form.type3List[i])
        }
        if (crud.form.postageIncl === true) {
          crud.form.valuationModel = 4
          crud.form.postageInclProviso = false
          crud.form.specialAreaList = []
          crud.form.inclProvisoList = []
        }
      }
      if(crud.url=='admin/product_spec/page_list'){
        let productSpecRequestList=[]
        productSpecRequestList.push(crud.form)
        crud.crudMethod.add(productSpecRequestList,crud.form.productId).then((res) => {
          const code = res.code
          const msg = res.msg
          if (code === '0') {
            crud.status.add = CRUD.STATUS.NORMAL
            crud.resetForm()
            crud.addSuccessNotify()
            callVmHook(crud, CRUD.HOOK.afterSubmit)
            crud.toQuery()
          } else {
            crud.notify(msg, CRUD.NOTIFICATION_TYPE.ERROR)
            crud.status.add = CRUD.STATUS.PREPARED
          }
        }).catch(() => {
          crud.status.add = CRUD.STATUS.PREPARED
          callVmHook(crud, CRUD.HOOK.afterAddError)
        })
      }else {
        crud.crudMethod.add(crud.form).then((res) => {
          const code = res.code
          const msg = res.msg
          if (code === '0') {
            crud.status.add = CRUD.STATUS.NORMAL
            crud.resetForm()
            crud.addSuccessNotify()
            callVmHook(crud, CRUD.HOOK.afterSubmit)
            crud.toQuery()
          } else {
            crud.notify(msg, CRUD.NOTIFICATION_TYPE.ERROR)
            crud.status.add = CRUD.STATUS.PREPARED
          }
        }).catch(() => {
          crud.status.add = CRUD.STATUS.PREPARED
          callVmHook(crud, CRUD.HOOK.afterAddError)
        })
      }

    },
    /**
     * 执行编辑
     */
    doEdit() {
      if (!callVmHook(crud, CRUD.HOOK.beforeSubmit)) {
        return
      }
      /* 商品专用*/
      // if (crud.form.unit !== '' && crud.form.unit !== undefined && crud.form.unit !== null && crud.form.productSpecList.length === 0) {
      //   return
      // }
      /* ----*/
      const id = crud.form.id
      crud.status.edit = CRUD.STATUS.PROCESSING
      if (crud.form.type1List !== '' && crud.form.type1List !== undefined && crud.form.type2List !== '' && crud.form.type2List !== undefined && crud.form.type3List !== '' && crud.form.type3List !== undefined) {
        crud.form.specialAreaList = []
        for (let i = 0; i < crud.form.type1List.length; i++) {
          crud.form.specialAreaList.push(crud.form.type1List[i])
        }
        for (let i = 0; i < crud.form.type2List.length; i++) {
          crud.form.specialAreaList.push(crud.form.type2List[i])
        }
        for (let i = 0; i < crud.form.type3List.length; i++) {
          crud.form.specialAreaList.push(crud.form.type3List[i])
        }
        if (crud.form.postageIncl === true) {
          crud.form.valuationModel = 4
          crud.form.postageInclProviso = false
          crud.form.specialAreaList = []
          crud.form.inclProvisoList = []
        }
      }
      if (id === null) {
        crud.crudMethod.edit(crud.form).then((res) => {
          const code = res.code
          const msg = res.msg
          if (code === '0') {
            crud.status.edit = CRUD.STATUS.NORMAL
            // crud.getDataStatus(crud.getDataId(crud.form)).edit = CRUD.STATUS.NORMAL
            crud.editSuccessNotify()
            crud.resetForm()
            callVmHook(crud, CRUD.HOOK.afterSubmit)
            crud.refresh()
          } else {
            crud.notify(msg, CRUD.NOTIFICATION_TYPE.ERROR)
            crud.status.edit = CRUD.STATUS.PREPARED
          }
        }).catch(() => {
          crud.status.edit = CRUD.STATUS.PREPARED
          callVmHook(crud, CRUD.HOOK.afterEditError)
        })
      } else {
        if(crud.url=='admin/product_spec/page_list'){
          let productSpecRequestList=[]
          productSpecRequestList.push(crud.form)
          crud.crudMethod.edit(crud.form.productId, productSpecRequestList,crud.form.languageId).then((res) => {
            const code = res.code
            const msg = res.msg
            if (code === '0') {
              crud.status.edit = CRUD.STATUS.NORMAL
              crud.getDataStatus(crud.getDataId(crud.form)).edit = CRUD.STATUS.NORMAL
              crud.editSuccessNotify()
              crud.resetForm()
              callVmHook(crud, CRUD.HOOK.afterSubmit)
              crud.refresh()
            } else {
              crud.notify(msg, CRUD.NOTIFICATION_TYPE.ERROR)
              crud.status.edit = CRUD.STATUS.PREPARED
            }
          }).catch(() => {
            crud.status.edit = CRUD.STATUS.PREPARED
            callVmHook(crud, CRUD.HOOK.afterEditError)
          })
        }else {
          crud.crudMethod.edit(id, crud.form).then((res) => {
            const code = res.code
            const msg = res.msg
            if (code === '0') {
              crud.status.edit = CRUD.STATUS.NORMAL
              crud.getDataStatus(crud.getDataId(crud.form)).edit = CRUD.STATUS.NORMAL
              crud.editSuccessNotify()
              crud.resetForm()
              callVmHook(crud, CRUD.HOOK.afterSubmit)
              crud.refresh()
            } else {
              crud.notify(msg, CRUD.NOTIFICATION_TYPE.ERROR)
              crud.status.edit = CRUD.STATUS.PREPARED
            }
          }).catch(() => {
            crud.status.edit = CRUD.STATUS.PREPARED
            callVmHook(crud, CRUD.HOOK.afterEditError)
          })
        }

      }
    },
    /**
     * 执行删除
     * @param {*} data 数据项
     */
    doDelete(data) {
      let delAll = false
      let dataStatus
      const ids = []
      if (data instanceof Array) {
        delAll = true
        data.forEach(val => {
          ids.push(this.getDataId(val))
        })
      } else {
        ids.push(this.getDataId(data))
        dataStatus = crud.getDataStatus(this.getDataId(data))
      }
      if (!callVmHook(crud, CRUD.HOOK.beforeDelete, data)) {
        return
      }
      if (!delAll) {
        dataStatus.delete = CRUD.STATUS.PROCESSING
      }
      return crud.crudMethod.del(ids).then((res) => {
        const code = res.code
        const msg = res.msg
        if (code === '0') {
          dataStatus.delete = CRUD.STATUS.PREPARED
          crud.dleChangePage(1)
          crud.delSuccessNotify()
          callVmHook(crud, CRUD.HOOK.afterDelete, data)
          crud.refresh()
        } else {
          crud.notify(msg, CRUD.NOTIFICATION_TYPE.warning)
          callVmHook(crud, CRUD.HOOK.afterDelete, data)
          crud.refresh()
        }
      }).catch(() => {
        if (delAll) {
          crud.delAllLoading = false
        } else dataStatus.delete = CRUD.STATUS.PREPARED
      })
    },
    /**
     * 通用导出
     */
    doExport() {
      crud.downloadLoading = true
      var data = Object.assign(crud.params, crud.query)
      if (crud.exportUrl === 'admin/order_community_header/export' || crud.exportUrl === 'admin/product_spec/export' || crud.exportUrl === 'admin/user_door_head/download') {
        download(crud.exportUrl, data).then(result => {
          downloadFile(result, crud.title + '数据', 'xlsx')
          crud.downloadLoading = false
        }).catch(() => {
          crud.downloadLoading = false
        })
      } else if (crud.exportUrl === 'https://test-cashier-service.guolaiwan.net/api/settlement_info/export' || crud.exportUrl === 'https://cashier-service.guolaiwan.net/api/settlement_info/export') {
        if (data.startSettlementDate === '' || data.startSettlementDate === undefined || data.startSettlementDate === null) {
          crud.notify('查询导出开始时间是必填', CRUD.NOTIFICATION_TYPE.ERROR)
          crud.downloadLoading = false
          return
        } else if (data.endSettlementDate === '' || data.endSettlementDate === undefined || data.endSettlementDate === null) {
          crud.notify('查询导出结束时间是必填', CRUD.NOTIFICATION_TYPE.ERROR)
          crud.downloadLoading = false
          return
        } else {
          download(crud.exportUrl, data).then(result => {
            downloadFile(result, crud.title + '数据', 'xlsx')
            crud.downloadLoading = false
          }).catch(() => {
            crud.downloadLoading = false
          })
        }
      } else {
        if (data.startCreatedTime === '' || data.startCreatedTime === undefined || data.startCreatedTime === null) {
          crud.notify('查询导出开始时间是必填', CRUD.NOTIFICATION_TYPE.ERROR)
          crud.downloadLoading = false
          return
        } else if (data.endCreatedTime === '' || data.endCreatedTime === undefined || data.endCreatedTime === null) {
          crud.notify('查询导出结束时间是必填', CRUD.NOTIFICATION_TYPE.ERROR)
          crud.downloadLoading = false
          return
        } else {
          download(crud.exportUrl, data).then(result => {
            downloadFile(result, crud.title + '数据', 'xlsx')
            crud.downloadLoading = false
          }).catch(() => {
            crud.downloadLoading = false
          })
        }
      }
    },

    /**
     * 获取查询参数
     */
    getQueryParams: function() {
      // 清除参数无值的情况
      Object.keys(crud.query).length !== 0 && Object.keys(crud.query).forEach(item => {
        if (crud.query[item] === null || crud.query[item] === '') crud.query[item] = undefined
      })
      Object.keys(crud.params).length !== 0 && Object.keys(crud.params).forEach(item => {
        if (crud.params[item] === null || crud.params[item] === '') crud.params[item] = undefined
      })
      return {
        // sort: crud.sort,
        ...crud.query,
        ...crud.params
      }
    },
    /** 获取分页参数 */
    getPageParams: function() {
      return {
        pageNo: crud.page.page,
        pageSize: crud.page.size
      }
    },
    // 当前页改变
    pageChangeHandler(e) {
      crud.page.page = e
      crud.refresh()
    },
    // 每页条数改变
    sizeChangeHandler(e) {
      crud.page.size = e
      crud.page.page = 1
      crud.refresh()
    },
    // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
    dleChangePage(size) {
      if (crud.data.length === size && crud.page.page !== 1) {
        crud.page.page -= 1
      }
    },
    // 选择改变
    selectionChangeHandler(val) {
      crud.selections = val
    },
    /**
     * 重置查询参数
     * @param {Boolean} toQuery 重置后进行查询操作
     */
    resetQuery(toQuery = true) {
      const defaultQuery = JSON.parse(JSON.stringify(crud.defaultQuery))
      const query = crud.query
      Object.keys(query).forEach(key => {
        query[key] = defaultQuery[key]
      })
      if (toQuery) {
        crud.toQuery()
      }
    },
    /**
     * 重置表单
     * @param {Array} data 数据
     */
    resetForm(data) {
      const form = data || (typeof crud.defaultForm === 'object' ? JSON.parse(JSON.stringify(crud.defaultForm)) : crud.defaultForm.apply(crud.findVM('form')))
      const crudFrom = crud.form
      for (const key in form) {
        if (crudFrom.hasOwnProperty(key)) {
          crudFrom[key] = form[key]
        } else {
          Vue.set(crudFrom, key, form[key])
        }
      }
    },
    /**
     * 重置数据状态
     */
    resetDataStatus() {
      const dataStatus = {}
      function resetStatus(datas) {
        datas.forEach(e => {
          dataStatus[crud.getDataId(e)] = {
            delete: 0,
            edit: 0
          }
          if (e.children) {
            resetStatus(e.children)
          }
        })
      }
      resetStatus(crud.data)
      crud.dataStatus = dataStatus
    },
    /**
     * 获取数据状态
     * @param {Number | String} id 数据项id
     */
    getDataStatus(id) {
      return crud.dataStatus[id]
    },
    /**
     * 用于树形表格多选, 选中所有
     * @param selection
     */
    selectAllChange(selection) {
      // 如果选中的数目与请求到的数目相同就选中子节点，否则就清空选中
      if (selection && selection.length === crud.data.length) {
        selection.forEach(val => {
          crud.selectChange(selection, val)
        })
      } else {
        crud.getTable().clearSelection()
      }
    },
    /**
     * 用于树形表格多选，单选的封装
     * @param selection
     * @param row
     */
    selectChange(selection, row) {
      // 如果selection中存在row代表是选中，否则是取消选中
      if (selection.find(val => { return crud.getDataId(val) === crud.getDataId(row) })) {
        if (row.children) {
          row.children.forEach(val => {
            crud.getTable().toggleRowSelection(val, true)
            selection.push(val)
            if (val.children) {
              crud.selectChange(selection, val)
            }
          })
        }
      } else {
        crud.toggleRowSelection(selection, row)
      }
    },
    /**
     * 切换选中状态
     * @param selection
     * @param data
     */
    toggleRowSelection(selection, data) {
      if (data.children) {
        data.children.forEach(val => {
          crud.getTable().toggleRowSelection(val, false)
          if (val.children) {
            crud.toggleRowSelection(selection, val)
          }
        })
      }
    },
    findVM(type) {
      return crud.vms.find(vm => vm && vm.type === type).vm
    },
    notify(title, type = CRUD.NOTIFICATION_TYPE.INFO) {
      crud.vms[0].vm.$notify({
        title,
        type,
        duration: 2500
      })
    },
    updateProp(name, value) {
      Vue.set(crud.props, name, value)
    },
    getDataId(data) {
      return data[this.idField]
    },
    getTable() {
      return this.findVM('presenter').$refs.table
    },
    attchTable() {
      const table = this.getTable()
      const columns = []
      table.columns.forEach((e, index) => {
        if (!e.property || e.type !== 'default') {
          return
        }
        e.__index = index
        columns.push({
          property: e.property,
          index,
          label: e.label,
          visible: true
        })
      })
      this.updateProp('tableColumns', columns)
      this.updateProp('table', table)

      const that = this
      table.$on('expand-change', (row, expanded) => {
        if (!expanded) {
          return
        }
        const lazyTreeNodeMap = table.store.states.lazyTreeNodeMap
        const children = lazyTreeNodeMap[row.id]
        row.children = children
        children.forEach(ele => {
          const id = crud.getDataId(ele)
          if (that.dataStatus[id] === undefined) {
            that.dataStatus[id] = {
              delete: 0,
              edit: 0
            }
          }
        })
      })
    }
  }
  const crud = Object.assign({}, data)
  // 可观测化
  Vue.observable(crud)
  // 附加方法
  Object.assign(crud, methods)
  // 记录初始默认的查询参数，后续重置查询时使用
  Object.assign(crud, {
    defaultQuery: JSON.parse(JSON.stringify(data.query)),
    // 预留4位存储：组件 主页、头部、分页、表单，调试查看也方便找
    vms: Array(4),
    /**
     * 注册组件实例
     * @param {String} type 类型
     * @param {*} vm 组件实例
     * @param {Number} index 该参数内部使用
     */
    registerVM(type, vm, index = -1) {
      const vmObj = {
        type,
        vm: vm
      }
      if (index < 0) {
        this.vms.push(vmObj)
        return
      }
      if (index < 4) { // 内置预留vm数
        this.vms[index] = vmObj
        return
      }
      this.vms.length = Math.max(this.vms.length, index)
      this.vms.splice(index, 1, vmObj)
    },
    /**
     * 取消注册组件实例
     * @param {*} vm 组件实例
     */
    unregisterVM(type, vm) {
      for (let i = this.vms.length - 1; i >= 0; i--) {
        if (this.vms[i] === undefined) {
          continue
        }
        if (this.vms[i].type === type && this.vms[i].vm === vm) {
          if (i < 4) { // 内置预留vm数
            this.vms[i] = undefined
          } else {
            this.vms.splice(i, 1)
          }
          break
        }
      }
    }
  })
  // 冻结处理，需要扩展数据的话，使用crud.updateProp(name, value)，以crud.props.name形式访问，这个是响应式的，可以做数据绑定
  Object.freeze(crud)
  return crud
}

// hook VM
function callVmHook(crud, hook) {
  if (crud.debug) {
    console.log('callVmHook: ' + hook)
  }
  const tagHook = crud.tag ? hook + '$' + crud.tag : null
  let ret = true
  const nargs = [crud]
  for (let i = 2; i < arguments.length; ++i) {
    nargs.push(arguments[i])
  }
  // 有些组件扮演了多个角色，调用钩子时，需要去重
  const vmSet = new Set()
  crud.vms.forEach(vm => vm && vmSet.add(vm.vm))
  vmSet.forEach(vm => {
    if (vm[hook]) {
      ret = vm[hook].apply(vm, nargs) !== false && ret
    }
    if (tagHook && vm[tagHook]) {
      ret = vm[tagHook].apply(vm, nargs) !== false && ret
    }
  })
  return ret
}

function mergeOptions(src, opts) {
  const optsRet = {
    ...src
  }
  for (const key in src) {
    if (opts.hasOwnProperty(key)) {
      optsRet[key] = opts[key]
    }
  }
  return optsRet
}

/**
 * 查找crud
 * @param {*} vm
 * @param {string} tag
 */
function lookupCrud(vm, tag) {
  tag = tag || vm.$attrs['crud-tag'] || 'default'
  // function lookupCrud(vm, tag) {
  if (vm.$crud) {
    const ret = vm.$crud[tag]
    if (ret) {
      return ret
    }
  }
  return vm.$parent ? lookupCrud(vm.$parent, tag) : undefined
}

/**
 * crud主页
 */
function presenter(crud) {
  if (crud) {
    console.warn('[CRUD warn]: ' + 'please use $options.cruds() { return CRUD(...) or [CRUD(...), ...] }')
  }
  return {
    data() {
      // 在data中返回crud，是为了将crud与当前实例关联，组件观测crud相关属性变化
      return {
        crud: this.crud
      }
    },
    beforeCreate() {
      this.$crud = this.$crud || {}
      let cruds = this.$options.cruds instanceof Function ? this.$options.cruds() : crud
      if (!(cruds instanceof Array)) {
        cruds = [cruds]
      }
      cruds.forEach(ele => {
        if (this.$crud[ele.tag]) {
          console.error('[CRUD error]: ' + 'crud with tag [' + ele.tag + ' is already exist')
        }
        this.$crud[ele.tag] = ele
        ele.registerVM('presenter', this, 0)
      })
      this.crud = this.$crud['defalut'] || cruds[0]
    },
    methods: {
      parseTime
    },
    created() {
      for (const k in this.$crud) {
        if (this.$crud[k].queryOnPresenterCreated) {
          this.$crud[k].toQuery()
        }
      }
    },
    destroyed() {
      for (const k in this.$crud) {
        this.$crud[k].unregisterVM('presenter', this)
      }
    },
    mounted() {
      // 如果table未实例化（例如使用了v-if），请稍后在适当时机crud.attchTable刷新table信息
      if (this.$refs.table !== undefined) {
        this.crud.attchTable()
      }
    }
  }
}

/**
 * 头部
 */
function header() {
  return {
    data() {
      return {
        crud: this.crud,
        query: this.crud.query
      }
    },
    beforeCreate() {
      this.crud = lookupCrud(this)
      this.crud.registerVM('header', this, 1)
    },
    destroyed() {
      this.crud.unregisterVM('header', this)
    }
  }
}

/**
 * 分页
 */
function pagination() {
  return {
    data() {
      return {
        crud: this.crud,
        page: this.crud.page
      }
    },
    beforeCreate() {
      this.crud = lookupCrud(this)
      this.crud.registerVM('pagination', this, 2)
    },
    destroyed() {
      this.crud.unregisterVM('pagination', this)
    }
  }
}

/**
 * 表单
 */
function form(defaultForm) {
  return {
    data() {
      return {
        crud: this.crud,
        form: this.crud.form
      }
    },
    beforeCreate() {
      this.crud = lookupCrud(this)
      this.crud.registerVM('form', this, 3)
    },
    created() {
      this.crud.defaultForm = defaultForm
      this.crud.resetForm()
    },
    destroyed() {
      this.crud.unregisterVM('form', this)
    }
  }
}

/**
 * crud
 */
function crud(options = {}) {
  const defaultOptions = {
    type: undefined
  }
  options = mergeOptions(defaultOptions, options)
  return {
    data() {
      return {
        crud: this.crud
      }
    },
    beforeCreate() {
      this.crud = lookupCrud(this)
      this.crud.registerVM(options.type, this)
    },
    destroyed() {
      this.crud.unregisterVM(options.type, this)
    }
  }
}

/**
 * CRUD钩子
 */
CRUD.HOOK = {
  /** 刷新 - 之前 */
  beforeRefresh: 'beforeCrudRefresh',
  /** 刷新 - 之后 */
  afterRefresh: 'afterCrudRefresh',
  /** 删除 - 之前 */
  beforeDelete: 'beforeCrudDelete',
  /** 删除 - 之后 */
  afterDelete: 'afterCrudDelete',
  /** 删除取消 - 之前 */
  beforeDeleteCancel: 'beforeCrudDeleteCancel',
  /** 删除取消 - 之后 */
  afterDeleteCancel: 'afterCrudDeleteCancel',
  /** 新建 - 之前 */
  beforeToAdd: 'beforeCrudToAdd',
  /** 新建 - 之后 */
  afterToAdd: 'afterCrudToAdd',
  /** 编辑 - 之前 */
  beforeToEdit: 'beforeCrudToEdit',
  /** 编辑 - 之后 */
  afterToEdit: 'afterCrudToEdit',
  /** 开始 "新建/编辑" - 之前 */
  beforeToCU: 'beforeCrudToCU',
  /** 开始 "新建/编辑" - 之后 */
  afterToCU: 'afterCrudToCU',
  /** "新建/编辑" 验证 - 之前 */
  beforeValidateCU: 'beforeCrudValidateCU',
  /** "新建/编辑" 验证 - 之后 */
  afterValidateCU: 'afterCrudValidateCU',
  /** 添加取消 - 之前 */
  beforeAddCancel: 'beforeCrudAddCancel',
  /** 添加取消 - 之后 */
  afterAddCancel: 'afterCrudAddCancel',
  /** 编辑取消 - 之前 */
  beforeEditCancel: 'beforeCrudEditCancel',
  /** 编辑取消 - 之后 */
  afterEditCancel: 'afterCrudEditCancel',
  /** 提交 - 之前 */
  beforeSubmit: 'beforeCrudSubmitCU',
  /** 提交 - 之后 */
  afterSubmit: 'afterCrudSubmitCU',
  afterAddError: 'afterCrudAddError',
  afterEditError: 'afterCrudEditError'
}

/**
 * CRUD状态
 */
CRUD.STATUS = {
  NORMAL: 0,
  PREPARED: 1,
  PROCESSING: 2
}

/**
 * CRUD通知类型
 */
CRUD.NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
  ERROR: 'error'
}

export default CRUD

export {
  presenter,
  header,
  form,
  pagination,
  crud
}
