<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    @close="closeMap"
    width="940px"
  >
  <el-steps :active="form.active" align-center finish-status="success" style="margin-bottom: 20px">
    <el-step title="基本信息" />
    <el-step title="附件信息" />
  </el-steps>

    <el-form v-if="form.info" ref="form" :model="form" :rules="rules" size="small" label-width="140px">
      <el-form-item label="分公司" prop="companyId">
        <el-select v-model="form.companyId" clearable style="width: 300px">
          <el-option
            v-for="item in companyIdList"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称" prop="enterpriseName">
        <el-input v-model="form.enterpriseName" maxlength="32" style="width: 300px" />
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="enterpriseCode">
        <el-input v-model="form.enterpriseCode" maxlength="32" placeholder="此信用代码不能重复，每个企业信用代码唯一" style="width: 300px" />
      </el-form-item>
      <el-form-item label="联系人" prop="connectorName">
        <el-input v-model="form.connectorName" placeholder="配送收货信息，请准确填写" maxlength="32" style="width: 300px" />
      </el-form-item>
      <el-form-item label="联系电话" prop="connectorPhone">
        <el-input v-model="form.connectorPhone" placeholder="配送收货信息，请准确填写" maxlength="32" style="width: 300px" />
      </el-form-item>
<!--      <el-form-item label="企业状态" prop="status">-->
<!--        <el-select v-model="form.status" clearable style="width: 300px;">-->
<!--          <el-option-->
<!--            v-for="item in enterpriseStatusList"-->
<!--            :key="item.value"-->
<!--            :label="item.name"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="赊账额度" prop="debtLimit">
        <el-input v-model="form.debtLimit" placeholder="0为不允许赊账" maxlength="32" style="width: 300px" />
      </el-form-item>

      <el-form-item label="用户等级" prop="userGradeId">
        <el-select v-model="form.userGradeId" clearable style="width: 300px;">
          <el-option
            v-for="item in userGradeIdLists"
            :key="item.id"
            :label="item.gradeName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="账期每月几号" prop="debtDay">-->
<!--        <el-select v-model="form.debtDay" clearable style="width: 300px;">-->
<!--          <el-option-->
<!--            v-for="item in debtDayList"-->
<!--            :key="item.value"-->
<!--            :label="item.name"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="结算类型" prop="settlementType">
        <el-select v-model="form.settlementType" clearable style="width: 300px;">
          <el-option
            v-for="item in settlementTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开票说明" prop="ticketContent">
        <el-input v-model="form.ticketContent" maxlength="32" style="width: 300px" />
      </el-form-item>
      <el-form-item label="银行开户名称" prop="bankShopName">
        <el-input v-model="form.bankShopName" maxlength="32" style="width: 300px" />
      </el-form-item>
      <el-form-item label="银行卡号" prop="shopBankCardNumber">
        <el-input v-model="form.shopBankCardNumber" maxlength="32" style="width: 300px" />
      </el-form-item>
      <el-form-item label="开户行" prop="shopOpenBank">
        <el-input v-model="form.shopOpenBank" maxlength="32" style="width: 300px" />
      </el-form-item>
      <el-form-item label="开户行所在地" prop="shopBankCity">
        <el-input v-model="form.shopBankCity" maxlength="32" style="width: 300px" />
      </el-form-item>
      <el-form-item label="支付密码" prop="payPassword">
        <el-input maxlength="6" :disabled="true" placeholder="默认为666666修改后如忘记可在列表直接重置" v-model.number="form.payPassword" @keyup.native="form.payPassword = isPayPassword(form.payPassword)"  style="width: 300px" />
      </el-form-item>
      <el-form-item label="经度" prop="lon">
        <el-input v-model.number="form.lon" style="width: 300px" />
      </el-form-item>
      <el-form-item label="纬度" prop="lat">
        <el-input v-model.number="form.lat" style="width: 300px" />
      </el-form-item>
      <el-form-item label="关键字搜索">
        <el-input id="tipinput" v-model="locationMsg.keyword" style="width: 300px;" placeholder="所在地址模糊搜索" />
      </el-form-item>
      <el-form-item label="销售员" prop="merchantSalesId">
        <el-select v-model="form.merchantSalesId" clearable style="width: 300px">
          <el-option
            v-for="item in merchantSalesIdList"
            :key="item.id"
            :label="item.userName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在地址" prop="addressInfo">
        <el-input id="address" v-model="form.addressInfo" style="width: 740px;" placeholder="配送收货信息，请准确填写" />
      </el-form-item>
      <div id="container" class="mymap" />
    </el-form>
    <div
      v-if="form.info"
      slot="footer"
      class="dialog-footer"
    >
      <el-button v-if="form.enterpriseId !=null" type="primary" @click="enterpriseinfoForms('form')">下一步(修改)</el-button>
      <el-button v-else type="primary" @click="enterpriseinfoForm('form')">下一步(添加)</el-button>
    </div>
    <!--附件信息-->
    <el-form v-if="form.batch" ref="form" :model="form" size="small" label-width="120px">
      <el-form-item label="营业执照" prop="licenseList" style="width: 49%;display: inline-block">
        <el-upload
          action="/"
          :http-request="licenseAdd"
          :limit="1"
          :file-list="form.licenseList"
          :on-exceed="licenseExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="licenseRemove"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="法人身份证正面" prop="frontList" style="width: 49%;display: inline-block">
        <el-upload
          action="/"
          :http-request="frontAdd"
          :limit="1"
          :file-list="form.frontList"
          :on-exceed="frontExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="frontRemove"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="法人身份证背面" prop="behindList" style="width: 49%;display: inline-block">
        <el-upload
          action="/"
          :http-request="behindAdd"
          :limit="1"
          :file-list="form.behindList"
          :on-exceed="behindExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="behindRemove"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="经营许可证" prop="OrganizationList" style="width: 49%;display: inline-block">
        <el-upload
          action="/"
          :http-request="OrganizationAdd"
          :limit="1"
          :file-list="form.OrganizationList"
          :on-exceed="OrganizationExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="OrganizationRemove"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
    </el-form>
    <div
      v-if="form.batch"
      slot="footer"
      class="dialog-footer"
    >
      <el-button v-if="form.isAdd" type="primary" @click="enterprisebatchForms('form')">确认(修改)</el-button>
      <el-button v-else type="primary" @click="enterprisebatchForm('form')">确认(添加)</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'
import { getcompanyLists } from '@/api/system/company'
import { getuserGradeLists } from '@/api/user/userGrade'
import { enterpriseStatusList, settlementTypeList,infoadd,infoedit,add,edit,get } from '@/api/enterprise/enterpriseIndex'
import {getmerchantsalesLists} from '@/api/enterprise/enterpriseSales'
import AMap from 'AMap'
import { sysfileAdds } from '@/api/upload'
import CRUD from '@crud/crud'
const defaultForm = {
  active:0,
  info:true,
  batch:false,
  isAdd:false,
  id: null,
  enterpriseId: null,
  merchantSalesId: '',
  connectorName: '',
  connectorPhone: '',
  enterpriseName: '',
  debtLimit: '',
  lat: '',
  lon: '',
  remark: '',
  status:1,
  userGradeId: '',
  companyId: '',
  settlementType: '',
  payPassword: '',
  ticketContent: '',
  // debtDay: '',
  addressInfo: '',
  enterpriseCode:"",
  bankShopName:"",
  shopBankCardNumber:"",
  shopOpenBank:"",
  shopBankCity:"",



  /* 附件信息*/
  licenseList: [],
  frontList: [],
  behindList: [],
  OrganizationList: [],
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {

      locationMsg: {
        keyword: '',
        lnglat: '',
        address: ''
      },
      companyIdList: [],
      enterpriseStatusList: [],
      settlementTypeList: [],
      userGradeIdLists: [],
      merchantSalesIdList: [],
      // debtDayList: [
      //   { value: 1, name: '1号' },
      //   { value: 2, name: '2号' },
      //   { value: 3, name: '3号' },
      //   { value: 4, name: '4号' },
      //   { value: 5, name: '5号' },
      //   { value: 6, name: '6号' },
      //   { value: 7, name: '7号' },
      //   { value: 8, name: '8号' },
      //   { value: 9, name: '9号' },
      //   { value: 10, name: '10号' },
      //   { value: 11, name: '11号' },
      //   { value: 12, name: '12号' },
      //   { value: 13, name: '13号' },
      //   { value: 14, name: '14号' },
      //   { value: 15, name: '15号' },
      //   { value: 16, name: '16号' },
      //   { value: 17, name: '17号' },
      //   { value: 18, name: '18号' },
      //   { value: 19, name: '19号' },
      //   { value: 20, name: '20号' },
      //   { value: 21, name: '21号' },
      //   { value: 22, name: '22号' },
      //   { value: 23, name: '23号' },
      //   { value: 24, name: '24号' },
      //   { value: 25, name: '25号' },
      //   { value: 26, name: '26号' },
      //   { value: 27, name: '27号' },
      //   { value: 28, name: '28号' }
      // ],
      rules: {
        companyId: [{ required: true, message: '请选择分公司', trigger: 'change' }],
        enterpriseName: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        connectorName: [{ required: true, message: '请填写联系人名称', trigger: 'blur' }],
        connectorPhone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }],
        lon: [{ required: true, message: '请选择经度', trigger: 'change' }],
        lat: [{ required: true, message: '请选择纬度', trigger: 'change' }],
        addressInfo: [{ required: true, message: '请选择地址', trigger: 'change' }],
        merchantSalesId: [{ required: true, message: '请选择企业销售员', trigger: 'change' }],
        // status: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
        debtLimit: [{ required: true, message: '请填写赊账额度', trigger: 'blur' }],
        userGradeId: [{ required: true, message: '请选择用户等级', trigger: 'change' }],
        settlementType: [{ required: true, message: '请选择结算类型', trigger: 'change' }],
        // payPassword: [{ required: true, message: '请填写支付密码', trigger: 'blur' }],
        ticketContent: [{ required: true, message: '请填写开票说明', trigger: 'blur' }],
        enterpriseCode: [{ required: true, message: '请填统一社会信用代码', trigger: 'blur' }],
        // bankShopName: [{ required: true, message: '请填写银行开户名称', trigger: 'blur' }],
        // shopBankCardNumber: [{ required: true, message: '请填写银行卡号', trigger: 'blur' }],
        // shopOpenBank: [{ required: true, message: '请填写开户行', trigger: 'blur' }],
        // shopBankCity: [{ required: true, message: '请填写开户行所在地', trigger: 'blur' }],
        // debtDay: [{ required: true, message: '请选择企业账期每月几号', trigger: 'change' }]
      },
      mapObj: null
    }
  },
  created() {
    const data = {
      status: 1
    }
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
      getmerchantsalesLists(data).then(res => {
      this.merchantSalesIdList = res.data
    })
    enterpriseStatusList(data).then(res => {
      this.enterpriseStatusList = res.data
    })
    settlementTypeList(data).then(res => {
      this.settlementTypeList = res.data
    })
    const data1 = {
      // merchantId: 1
    }
    getuserGradeLists(data1).then(res => {
      this.userGradeIdLists = res.data
    })
  },
  updated() {
    if (this.form.id !== null) {
        this.form.enterpriseId = this.form.id
    }
    if (this.locationMsg.keyword !== '' || this.locationMsg.lnglat !== '') return
    this.loadmap()
  },
  methods: {

      // 基本信息添加
      enterpriseinfoForm(addForm) {
          this.$refs[addForm].validate(valid => {
              if (valid) {
                  this.$confirm('确认提交吗？', '提示', {}).then(() => {
                      var data = {
                          connectorName: this.form.connectorName,
                          connectorPhone: this.form.connectorPhone,
                          enterpriseName: this.form.enterpriseName,
                          debtLimit: this.form.debtLimit,
                          lat: this.form.lat,
                          lon: this.form.lon,
                          remark: this.form.remark,
                          status: this.form.status,
                          shopBankCity: this.form.shopBankCity,
                          shopOpenBank: this.form.shopOpenBank,
                          shopBankCardNumber: this.form.shopBankCardNumber,
                          bankShopName: this.form.bankShopName,
                          enterpriseCode: this.form.enterpriseCode,
                          addressInfo: this.form.addressInfo,
                          ticketContent: this.form.ticketContent,
                          payPassword: this.form.payPassword,
                          settlementType: this.form.settlementType,
                          companyId: this.form.companyId,
                          userGradeId: this.form.userGradeId,
                          merchantSalesId: this.form.merchantSalesId,
                      }
                      infoadd(data).then(res => {
                          var code = res.code
                          var msg = res.msg
                          if (code === '0') {
                              this.$message({
                                  message: msg,
                                  type: 'success'
                              })
                              this.form.enterpriseId = res.data
                              this.form.active++
                              this.form.info = false
                              this.form.batch = true
                          } else {
                              this.$message({
                                  message: msg,
                                  type: 'warning'
                              })
                          }
                      })
                  })
              }
          })
      },
      // 基本信息修改
      enterpriseinfoForms(addForm) {
          this.$refs[addForm].validate(valid => {
              if (valid) {
                  this.$confirm('确认提交吗？', '提示', {}).then(() => {
                      let id=this.form.enterpriseId
                      var data = {
                          connectorName: this.form.connectorName,
                          connectorPhone: this.form.connectorPhone,
                          enterpriseName: this.form.enterpriseName,
                          debtLimit: this.form.debtLimit,
                          lat: this.form.lat,
                          lon: this.form.lon,
                          remark: this.form.remark,
                          status: this.form.status,
                          shopBankCity: this.form.shopBankCity,
                          shopOpenBank: this.form.shopOpenBank,
                          shopBankCardNumber: this.form.shopBankCardNumber,
                          bankShopName: this.form.bankShopName,
                          enterpriseCode: this.form.enterpriseCode,
                          addressInfo: this.form.addressInfo,
                          ticketContent: this.form.ticketContent,
                          payPassword: this.form.payPassword,
                          settlementType: this.form.settlementType,
                          companyId: this.form.companyId,
                          userGradeId: this.form.userGradeId,
                          merchantSalesId: this.form.merchantSalesId,
                      }
                      infoedit(id,data).then(res => {
                          var code = res.code
                          var msg = res.msg
                          if (code === '0') {
                              this.$message({
                                  message: msg,
                                  type: 'success'
                              })
                              this.form.active++
                              this.form.info = false
                              this.form.batch = true
                              /* 附件信息查询*/
                              get(id).then(res => {
                                  if (res.data.length > 0 && res.data !== undefined) {
                                      this.form.isAdd=true
                                      for (var i = 0; i < res.data.length; i++) {
                                          if (res.data[i].type === 2) {
                                              this.form.licenseList.push(res.data[i])
                                          } else if (res.data[i].type === 3) {
                                              this.form.frontList.push(res.data[i])
                                          } else if (res.data[i].type === 4) {
                                              this.form.behindList.push(res.data[i])
                                          } else if (res.data[i].type === 5) {
                                              this.form.OrganizationList.push(res.data[i])
                                          }
                                      }
                                  }else {
                                      this.form.isAdd=false
                                  }
                              })
                          } else {
                              this.$message({
                                  message: msg,
                                  type: 'warning'
                              })
                          }
                      })
                  })
              }
          })
      },

      // 附件信息添加
      enterprisebatchForm(addForm) {
          this.$refs[addForm].validate(valid => {
              if (valid) {
                  this.$confirm('确认提交吗？', '提示', {}).then(() => {
                      let id=this.form.enterpriseId
                      var data = []
                      if (this.form.licenseList.length !== 0) {
                          data.push(this.form.licenseList[0])
                      }
                      if (this.form.frontList.length !== 0) {
                          data.push(this.form.frontList[0])
                      }
                      if (this.form.behindList.length !== 0) {
                          data.push(this.form.behindList[0])
                      }
                      if (this.form.OrganizationList.length !== 0) {
                          data.push(this.form.OrganizationList[0])
                      }
                      add(id,data).then(res => {
                          var code = res.code
                          var msg = res.msg
                          if (code === '0') {
                              this.$message({
                                  message: msg,
                                  type: 'success'
                              })
                              this.crud.refresh()
                              this.crud.resetForm()
                              this.crud.toQuery()
                              this.crud.editSuccessNotify()
                              this.crud.status.edit = CRUD.STATUS.NORMAL
                              this.loadmap()
                              this.locationMsg.keyword = ''
                              this.locationMsg.lnglat = ''
                              this.locationMsg.address = ''
                          } else {
                              this.$message({
                                  message: msg,
                                  type: 'warning'
                              })
                          }
                      })
                  })
              }
          })
      },
      // 附件信息修改
      enterprisebatchForms(addForm) {
          this.$refs[addForm].validate(valid => {
              if (valid) {
                  this.$confirm('确认提交吗？', '提示', {}).then(() => {
                      let id=this.form.enterpriseId
                      var data = []
                      if (this.form.licenseList.length !== 0) {
                          data.push(this.form.licenseList[0])
                      }
                      if (this.form.frontList.length !== 0) {
                          data.push(this.form.frontList[0])
                      }
                      if (this.form.behindList.length !== 0) {
                          data.push(this.form.behindList[0])
                      }
                      if (this.form.OrganizationList.length !== 0) {
                          data.push(this.form.OrganizationList[0])
                      }
                      edit(id,data).then(res => {
                          var code = res.code
                          var msg = res.msg
                          if (code === '0') {
                              this.$message({
                                  message: msg,
                                  type: 'success'
                              })
                              this.crud.refresh()
                              this.crud.resetForm()
                              this.crud.toQuery()
                              this.crud.editSuccessNotify()
                              this.crud.status.edit = CRUD.STATUS.NORMAL
                              this.loadmap()
                              this.locationMsg.keyword = ''
                              this.locationMsg.lnglat = ''
                              this.locationMsg.address = ''
                          } else {
                              this.$message({
                                  message: msg,
                                  type: 'warning'
                              })
                          }
                      })
                  })
              }
          })
      },



      // 营业执照提交
      licenseRemove(file, fileList) {
          this.form.licenseList = fileList
      },
      licenseExceed(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件`)
          this.form.licenseList = fileList
      },
      // 选择文件
      licenseAdd(fileList) {
          const myfile = fileList
          const file = myfile.file
          var formData = new FormData()
          formData.append('file', file)
          var _this = this
          sysfileAdds(formData).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                  _this.form.licenseList.push({
                      enterpriseId:this.form.enterpriseId,
                      'type': 2,
                      'name': res.data.fileName,
                      'key': res.data.key,
                      'size': res.data.size,
                      'url': res.data.url
                  })
              } else {
                  _this.$message({
                      message: msg,
                      type: 'warning'
                  })
              }
          })
      },
      // 法人正面提交
      frontRemove(file, fileList) {
          this.form.frontList = fileList
      },
      frontExceed(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件`)
          this.form.frontList = fileList
      },
      // 选择文件
      frontAdd(fileList) {
          const myfile = fileList
          const file = myfile.file
          var formData = new FormData()
          formData.append('file', file)
          var _this = this
          sysfileAdds(formData).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                  _this.form.frontList.push({
                      enterpriseId:this.form.enterpriseId,
                      'type': 3,
                      'name': res.data.fileName,
                      'key': res.data.key,
                      'size': res.data.size,
                      'url': res.data.url
                  })
              } else {
                  _this.$message({
                      message: msg,
                      type: 'warning'
                  })
              }
          })
      },
      // 法人背面提交
      behindRemove(file, fileList) {
          this.form.behindList = fileList
      },
      behindExceed(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件`)
          this.form.behindList = fileList
      },
      // 选择文件
      behindAdd(fileList) {
          const myfile = fileList
          const file = myfile.file
          var formData = new FormData()
          formData.append('file', file)
          var _this = this
          sysfileAdds(formData).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                  _this.form.behindList.push({
                      enterpriseId:this.form.enterpriseId,
                      'type': 4,
                      'name': res.data.fileName,
                      'key': res.data.key,
                      'size': res.data.size,
                      'url': res.data.url
                  })
              } else {
                  _this.$message({
                      message: msg,
                      type: 'warning'
                  })
              }
          })
      },
      // 组织机构代码证
      OrganizationRemove(file, fileList) {
          this.form.OrganizationList = fileList
      },
      OrganizationExceed(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件`)
          this.form.OrganizationList = fileList
      },
      // 选择文件
      OrganizationAdd(fileList) {
          const myfile = fileList
          const file = myfile.file
          var formData = new FormData()
          formData.append('file', file)
          var _this = this
          sysfileAdds(formData).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                  _this.form.OrganizationList.push({
                      enterpriseId:this.form.enterpriseId,
                      'type': 5,
                      'name': res.data.fileName,
                      'key': res.data.key,
                      'size': res.data.size,
                      'url': res.data.url
                  })
              } else {
                  _this.$message({
                      message: msg,
                      type: 'warning'
                  })
              }
          })
      },




    isPayPassword(num){
        let str = num
        // // 正则替换
        str = str.replace(/[^\.\d]/g, '')
        str = str.replace('.', '')
        return str
    },
    // 地图js
    loadmap() {
      var _this = this
      // var windowsArr = []
      // var marker = [];
      var map = new AMap.Map('container', {
        zoom: 9,
        resizeEnable: true,
        keyboardEnable: false
      })
      _this.mapObj = map
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', function(e) {
        _this.locationMsg.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        _this.form.lon = e.lnglat.getLng()
        _this.form.lat = e.lnglat.getLat()
      })

      // 输入搜索和点击获取经纬度
      AMap.plugin(
        ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder'],
        function() {
          // 回调函数
          // 实例化Autocomplete  输入搜索
          var autoOptions = {
            input: 'tipinput' // 使用联想输入的input的id
          }
          var autocomplete = new AMap.Autocomplete(autoOptions)
          // 点击获取经纬度
          var placeSearch = new AMap.PlaceSearch({
            map: map
          })
          AMap.event.addListener(autocomplete, 'select', function(e) {
            var marker = new AMap.Marker({
                position: new AMap.LngLat(e.poi.location.lng, e.poi.location.lat),
            });
            // TODO 针对选中的poi实现自己的功能
            // placeSearch.setCity(e.poi.adcode)
            // placeSearch.search(e.poi.name)
            map.add(marker)
            map.setCenter([e.poi.location.lng, e.poi.location.lat])
            map.setZoom(20)
          }) // 注册监听，当选中某条记录时会触发

          // 点击设置地址
          var geocoder = new AMap.Geocoder({
            map: map
          })
          map.on('click', function(e) {
            geocoder.getAddress(e.lnglat, function(status, result) {
              // 判断是否存在位置信息
              if (status === 'complete') {
                _this.form.addressInfo = result.regeocode.formattedAddress
              } else {
                _this.form.addressInfo = ''
                _this.$message.error('无法获取当前位置信息')
              }
            })
          })
        }
      )
    },
    closeMap(){
        this.loadmap()
        this.locationMsg.keyword = ''
        this.locationMsg.lnglat = ''
        this.locationMsg.address = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
  .el-form-item{
    display: inline-block;
  }
</style>
<style>

  .mymap {
    width: 100%;
    height: 500px;
  }
  .amap-sug-result {
    z-index: 4000!important;
  }
  #tangram-suggestion--TANGRAM__u-main{
    z-index: 3000!important;
  }
</style>
