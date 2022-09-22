<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="handleClose"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="980px"
  >
    <el-steps :active="active" align-center finish-status="success" style="margin-bottom: 20px">
      <el-step title="基本信息" />
      <el-step title="联系人" />
      <el-step title="附件" />
      <el-step title="结算" />
      <el-step title="可经营类目" />
      <el-step title="扩展信息" />
    </el-steps>

    <!--基本信息-->
    <el-form v-if="info" ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="商家名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商家编码" prop="code">
        <el-input v-model="form.code" maxlength="32" placeholder="仅支持英文" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="所在地址" prop="address">
        <el-input v-model="form.address" maxlength="64" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="分公司" prop="companyId">
        <el-select v-model="form.companyId" clearable style="width: 200px;">
          <el-option
            v-for="item in companyIdList"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择店主" prop="userId">
        <el-select v-model="form.userId" clearable filterable remote placeholder="请输入用户昵称关键字搜索" :remote-method="remoteMethod" style="width: 200px;">
          <template v-for="item in userIdList">
            <el-option
              v-if="item.nickName !==''"
              :key="item.id"
              :label="item.userName+'('+item.nickName+')'"
              :value="item.id"
            />
            <el-option
              v-else-if="item.nickName ===''"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
            />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="商家类型" prop="bizType">
        <el-select v-model="form.bizType" clearable style="width: 200px;">
          <el-option
            v-for="item in bizTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否大商户" prop="isLarge">
        <el-radio-group v-model="form.isLarge" style="width: 120px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否个体户" prop="isSelfEmployed">
        <el-radio-group v-model="form.isSelfEmployed" style="width: 120px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否自动打印" prop="isAutoPrint">
        <el-radio-group v-model="form.isAutoPrint" style="width: 120px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否县标准店" prop="isCityStore">
        <el-radio-group v-model="form.isCityStore" style="width: 120px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商户头像" prop="headImg" style="display: block">
        <el-upload
          v-model="form.headImg"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.headImg"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="商家介绍" prop="introduction">
        <Editor v-model="form.introduction" />
      </el-form-item>
    </el-form>
    <div
      v-if="info"
      slot="footer"
      class="dialog-footer"
    >
      <!--      <el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <el-button v-if="merchantId===''" type="primary" @click="merchantinfoForm('form')">下一步(添加)</el-button>
      <el-button v-if="merchantId !==''" type="primary" @click="merchantinfoForms('form')">下一步(修改)</el-button>
    </div>

    <!--联系人信息-->
    <el-form v-if="contact" ref="form" :model="form" :rules="rulescontact" size="small" label-width="100px">
      <el-form-item label="联系人姓名" prop="linkPerson">
        <el-input v-model="form.linkPerson" placeholder="请输入姓名" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="联络电话" prop="linkPhone">
        <el-input v-model="form.linkPhone" placeholder="请输入电话" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="联系人邮箱" prop="linkEmail">
        <el-input v-model="form.linkEmail" placeholder="请输入邮箱" maxlength="64" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="财务联系人" prop="financePerson">
        <el-input v-model="form.financePerson" placeholder="请输入姓名" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="财务电话" prop="financePhone">
        <el-input v-model="form.financePhone" placeholder="请输入电话" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="财务邮箱" prop="financeEmail">
        <el-input v-model="form.financeEmail" placeholder="请输入邮箱" maxlength="64" style="width: 200px;" />
      </el-form-item>
    </el-form>
    <div
      v-if="contact"
      slot="footer"
      class="dialog-footer"
    >
      <!--      <el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <el-button v-if="newId===''" type="primary" @click="merchantcontactForm('form')">下一步(添加)</el-button>
      <el-button v-if="newId !==''" type="primary" @click="merchantcontactForms('form')">下一步(修改)</el-button>
    </div>

    <!--附件信息-->
    <el-form v-if="batch" ref="form" :model="form" size="small" label-width="120px">
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
      <el-form-item label="组织机构代码证" prop="OrganizationList" style="width: 49%;display: inline-block">
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
      <el-form-item label="税务登记证" prop="TaxationList" style="width: 49%;display: inline-block">
        <el-upload
          action="/"
          :http-request="TaxationAdd"
          :limit="1"
          :file-list="form.TaxationList"
          :on-exceed="TaxationExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="TaxationRemove"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="食品安全许可证" prop="FoodlicenseList" style="width: 49%;display: inline-block">
        <el-upload
          action="/"
          :http-request="FoodlicenseAdd"
          :limit="1"
          :file-list="form.FoodlicenseList"
          :on-exceed="FoodlicenseExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="FoodlicenseRemove"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
    </el-form>
    <div
      v-if="batch"
      slot="footer"
      class="dialog-footer"
    >
      <!--      <el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <el-button v-if="newId===''" type="primary" @click="merchantbatchForm('form')">下一步(添加)</el-button>
      <el-button v-if="newId !==''" type="primary" @click="merchantbatchForms('form')">下一步(修改)</el-button>
    </div>

    <!--结算信息-->
    <el-form v-if="settlement" ref="form" :model="form" :rules="rulessettlement" size="small" label-width="110px">
      <el-form-item label="商户开户行" prop="shopOpenBank">
        <el-input v-model="form.shopOpenBank" placeholder="请输入开户行" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="开户人名称" prop="bankShopName">
        <el-input v-model="form.bankShopName" placeholder="请输入真实姓名" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="银行卡号" prop="shopBankCardNumber">
        <el-input v-model="form.shopBankCardNumber" placeholder="请输入银行卡号" type="number" maxlength="19" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="开户行所在地" prop="shopBankCity">
        <el-input v-model="form.shopBankCity" maxlength="32" style="width: 200px" />
      </el-form-item>
      <el-form-item label="结算方式" prop="settlementType">
        <el-select v-model="form.settlementType" clearable filterable style="width: 200px;">
          <el-option
            v-for="item in settlementTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="费用类型" prop="costType">
        <el-select v-model="form.costType" filterable clearable style="width: 200px;">
          <el-option
            v-for="item in costTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.costType===1" label="比例" prop="proportion" :rules="[{ required: true, message: '请输入比例', trigger: 'blur' }]">
        <el-input v-model.number="form.proportion" type="number" maxlength="5" placeholder="输入0-1，如：50%，输入0.5" style="width: 200px;" />
      </el-form-item>
      <el-form-item v-if="form.costType===2 || form.costType===3" label="佣金(￥)" prop="amount" :rules="[{ required: true, message: '请输入佣金(￥)', trigger: 'blur' }]">
        <el-input v-model="form.amount" type="number" maxlength="19" style="width: 200px;" />
      </el-form-item>
    </el-form>
    <div
      v-if="settlement"
      slot="footer"
      class="dialog-footer"
    >
      <!--      <el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <el-button v-if="newId===''" type="primary" @click="merchantsettlementForm('form')">下一步(添加)</el-button>
      <el-button v-if="newId !==''" type="primary" @click="merchantsettlementForms('form')">下一步(修改)</el-button>
    </div>

    <!--类目信息-->
    <el-form v-if="category" ref="form" :model="form" size="small" label-width="100px">
      <el-form-item label="经营类目" prop="categoryIds">
        <el-tree ref="tree" v-model="form.categoryIds" :data="resultLists" show-checkbox node-key="id" :props="defaultProps" :default-checked-keys="form.categoryIds" />
      </el-form-item>

    </el-form>
    <div
      v-if="category"
      slot="footer"
      class="dialog-footer"
    >
      <!--      <el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <el-button v-if="newId===''" type="primary" @click="merchantcategoryForms('form')">下一步(添加)</el-button>
      <el-button v-if="newId !==''" type="primary" @click="merchantcategoryForms('form')">下一步(修改)</el-button>
    </div>

    <!--扩展信息-->
    <el-form v-if="extend" ref="form" :model="form" size="small" label-width="100px">
      <el-form-item label="商家QQ号" prop="shopQq">
        <el-input v-model="form.shopQq" type="number" maxlength="10" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商户特色" prop="shopFeature">
        <el-input v-model="form.shopFeature" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="人均消费" prop="averagePrice">
        <el-input v-model="form.averagePrice" type="number" maxlength="64" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="营业时间" prop="bizDate">
        <el-input v-model="form.bizDate" maxlength="32" placeholder="格式 8:00-23:00" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="坐标经度" prop="shopLongitude">
        <el-input v-model="form.shopLongitude" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="坐标纬度" prop="shopLatitude">
        <el-input v-model="form.shopLatitude" type="number" maxlength="64" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商家公告" prop="noticeDesc">
        <el-input v-model="form.noticeDesc" placeholder="生鲜小程序使用" maxlength="128" style="width: 808px;" />
      </el-form-item>
      <el-form-item label="关键字搜索">
        <el-input id="tipinput" v-model="locationMsg.keyword" style="width: 200px;" placeholder="商户地址模糊搜索" />
      </el-form-item>
      <el-form-item label="商户地址">
        <el-input id="address" v-model="locationMsg.address" style="width: 505px;" placeholder="根据经纬度自动生成" />
      </el-form-item>
      <div id="container" class="mymap" />

    </el-form>
    <div
      v-if="extend"
      slot="footer"
      class="dialog-footer"
    >
      <!--      <el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <el-button v-if="newId===''" type="primary" @click="merchantextendForm('form')">完成(添加)</el-button>
      <el-button v-if="newId !==''" type="primary" @click="merchantextendForms('form')">完成(修改)</el-button>
    </div>

  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'
import { getcompanyLists } from '@/api/system/company'
import { merchanttypeLists, CosttypeLists, SettlementypeLists, infoadd, infoedit, contactGet, contactadd, contactdit, accessoryGet, batchadd, batchedit, settlementGet, settlementadd, settlementedit, categorysGet, categoryadd, categoryedit, extendGet, extendadd, extendedit } from '@/api/merchant/merchant'
import { getuserinfoLists } from '@/api/user/userinfo'
import { divideGet } from '@/api/product/category'
import { getcityLists } from '@/api/system/city'
import Editor from '../../Editor'
import { sysfileAdds } from '@/api/upload'
import CRUD from '@crud/crud'
import AMap from 'AMap'
const defaultForm = {
  id: null,

  /* 基本信息*/
  bizType: '',
  name: '',
  code: '',
  userId: '',
  companyId: '',
  address: '',
  headImg: '',
  introduction: '',
  noticeDesc: '',
  isLarge: false,
  isSelfEmployed: false,
  isAutoPrint: false,
  isCityStore: false,
  status: 1,
  starScore: 5,
  languageId: 1,
  fileList: [],

  /* 联系人信息*/
  linkPerson: '',
  linkPhone: '',
  linkEmail: '',
  financePerson: '',
  financePhone: '',
  financeEmail: '',

  /* 附件信息*/
  licenseList: [],
  frontList: [],
  behindList: [],
  OrganizationList: [],
  TaxationList: [],
  FoodlicenseList: [],

  /* 结算信息*/
  shopOpenBank: '',
  bankShopName: '',
  shopBankCity: '',
  shopBankCardNumber: '',
  settlementType: '',
  costType: '',
  proportion: 0,
  amount: 0,

  /* 经营类目*/
  categoryIds: [],

  /* 扩展信息*/
  shopQq: '',
  shopFeature: '',
  averagePrice: '',
  bizDate: '',
  shopLongitude: '',
  shopLatitude: ''
}
export default {
  components: { Editor },
  mixins: [form(defaultForm)],
  data() {
    return {
      locationMsg: {
        keyword: '',
        lnglat: '',
        address: ''
      },

      newId: '',

      active: 0,
      merchantId: '',
      info: true,
      contact: false,
      batch: false,
      settlement: false,
      category: false,
      extend: false,
      companyIdList: [],
      userIdList: [],
      bizTypeList: [],
      shopBankList: [],
      settlementTypeList: [],
      costTypeList: [],
      resultLists: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rules: {
        name: [
          { required: true, message: '请输入商家名称', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '请选择店主', trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请选择分公司', trigger: 'blur' }
        ],
        bizType: [
          { required: true, message: '请选择商家类型', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入商家地址', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入商家介绍', trigger: 'blur' }
        ],
        headImg: [
          { required: true, message: '请选择商家头像', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入商家编码', trigger: 'blur' },
          { pattern: /^[a-zA-Z]+$/, message: '请输入正确的商家编码' }
        ]
      },
      rulescontact: {
        linkPerson: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        linkPhone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          { pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的手机号' }
        ],
        linkEmail: [
          { required: true, message: '请输入联系人邮箱', trigger: 'blur' }
        ],
        financePerson: [
          { required: true, message: '请输入财务联系人姓名', trigger: 'blur' }
        ],
        financePhone: [
          { required: true, message: '请输入财务联系人电话', trigger: 'blur' },
          { pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的手机号' }
        ],
        financeEmail: [
          { required: true, message: '请输入财务联系人邮箱', trigger: 'blur' }
        ]
      },
      rulessettlement: {
        shopOpenBank: [
          {
            required: true,
            message: '请输入店铺开户行',
            trigger: 'blur'
          }
        ],
        bankShopName: [
          {
            required: true,
            message: '请输入开户人名称',
            trigger: 'blur'
          }
        ],
        shopBankCity: [
          {
            required: true,
            message: '请输入开户行所在地',
            trigger: 'blur'
          }
        ],
        shopBankCardNumber: [
          {
            required: true,
            message: '请输入开户行卡号',
            trigger: 'blur'
          },
          { pattern: /^[0-9]\d{9,29}$/, message: '请输入正确的银行卡号 ' }
        ],
        settlementType: [
          {
            required: true,
            message: '请算则结算方式',
            trigger: 'blur'
          }
        ],
        costType: [
          {
            required: true,
            message: '请选择费用类型',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  watch: {
    'form.userId': function(newQuestion, oldQuestion) {
      if (this.form.userId !== '') {
        const data = {
          id: this.form.userId,
          status: 1
        }
        getuserinfoLists(data).then(res => {
          this.userIdList = res.data
        })
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    merchanttypeLists(data).then(res => {
      this.bizTypeList = res.data
    })
    getcityLists(data).then(res => {
      this.shopBankList = res.data
    })
    CosttypeLists(data).then(res => {
      this.costTypeList = res.data
    })
    SettlementypeLists(data).then(res => {
      this.settlementTypeList = res.data
    })
    divideGet().then(res => {
      this.resultLists = res.data
    })
  },
  updated() {
    if (this.form.id !== null) {
      this.merchantId = this.form.id
    }
    if (this.locationMsg.keyword !== '' || this.locationMsg.lnglat !== '') return
    this.loadmap()
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(res => {
          this.active = 0
          this.info = true
          this.contact = false
          this.batch = false
          this.settlement = false
          this.category = false
          this.extend = false
          this.form.id = null
          this.merchantId = ''
          this.newId = ''
          if (this.crud.status.add === 1) {
            this.crud.status.add = CRUD.STATUS.NORMAL
            this.crud.findVM('form').$refs['form'].clearValidate()
          } else {
            this.crud.status.edit = CRUD.STATUS.NORMAL
            this.crud.findVM('form').$refs['form'].clearValidate()
          }
        })
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
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', function(e) {
        _this.locationMsg.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        _this.form.shopLongitude = e.lnglat.getLng()
        _this.form.shopLatitude = e.lnglat.getLat()
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
            // TODO 针对选中的poi实现自己的功能
            placeSearch.setCity(e.poi.adcode)
            placeSearch.search(e.poi.name)
          }) // 注册监听，当选中某条记录时会触发

          // 点击设置地址
          var geocoder = new AMap.Geocoder({
            map: map
          })
          map.on('click', function(e) {
            geocoder.getAddress(e.lnglat, function(status, result) {
              // 判断是否存在位置信息
              if (status === 'complete') {
                _this.locationMsg.address = result.regeocode.formattedAddress
              } else {
                _this.locationMsg.address = ''
                _this.$message.error('无法获取当前位置信息')
              }
            })
          })
        }
      )
    },

    remoteMethod(query) {
      const data = {
        nickName: query,
        status: 1
      }
      getuserinfoLists(data).then(res => {
        this.userIdList = res.data
      })
    },

    // 商户头像提交
    handleRemove(file, fileList) {
      this.form.fileList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileList = fileList
    },
    // 选择文件
    fileAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.form.fileList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.headImg = res.data.key
        } else {
          _this.$message({
            message: msg,
            type: 'warning'
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
            merchantId: this.merchantId,
            languageId: this.form.languageId,
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
            merchantId: this.merchantId,
            languageId: this.form.languageId,
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
            merchantId: this.merchantId,
            languageId: this.form.languageId,
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
            merchantId: this.merchantId,
            languageId: this.form.languageId,
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
    // 税务登记证
    TaxationRemove(file, fileList) {
      this.form.TaxationList = fileList
    },
    TaxationExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.TaxationList = fileList
    },
    // 选择文件
    TaxationAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.form.TaxationList.push({
            merchantId: this.merchantId,
            languageId: this.form.languageId,
            'type': 6,
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
      // 税务登记证
      FoodlicenseRemove(file, fileList) {
          this.form.FoodlicenseList = fileList
      },
      FoodlicenseExceed(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件`)
          this.form.FoodlicenseList = fileList
      },
      // 选择文件
      FoodlicenseAdd(fileList) {
          const myfile = fileList
          const file = myfile.file
          var formData = new FormData()
          formData.append('file', file)
          var _this = this
          sysfileAdds(formData).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                  _this.form.FoodlicenseList.push({
                      merchantId: this.merchantId,
                      languageId: this.form.languageId,
                      'type': 7,
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

    // 基本信息添加
    merchantinfoForm(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              languageId: this.form.languageId,
              bizType: this.form.bizType,
              name: this.form.name,
              code: this.form.code,
              address: this.form.address,
              userId: this.form.userId,
              companyId: this.form.companyId,
              headImg: this.form.headImg,
              introduction: this.form.introduction,
              isLarge: this.form.isLarge,
              isSelfEmployed: this.form.isSelfEmployed,
              isAutoPrint: this.form.isAutoPrint,
              isCityStore: this.form.isCityStore,
              status: this.form.status,
              starScore: this.form.starScore
            }
            infoadd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.merchantId = res.data
                this.active++
                this.info = false
                this.contact = true
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
    merchantinfoForms(addForm) {
      const id = this.merchantId
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              languageId: this.form.languageId,
              bizType: this.form.bizType,
              name: this.form.name,
              code: this.form.code,
              address: this.form.address,
              userId: this.form.userId,
              companyId: this.form.companyId,
              headImg: this.form.headImg,
              introduction: this.form.introduction,
              isLarge: this.form.isLarge,
              isSelfEmployed: this.form.isSelfEmployed,
              isAutoPrint: this.form.isAutoPrint,
              isCityStore: this.form.isCityStore,
              status: this.form.status,
              starScore: this.form.starScore
            }
            infoedit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.active++
                this.info = false
                this.contact = true
                /* 联系人信息查询*/
                contactGet(this.merchantId).then(res => {
                  if (res.data !== '' && res.data !== undefined && res.data !== null) {
                    this.newId = res.data.id
                    this.form.linkPerson = res.data.linkPerson
                    this.form.linkPhone = res.data.linkPhone
                    this.form.linkEmail = res.data.linkEmail
                    this.form.financePerson = res.data.financePerson
                    this.form.financePhone = res.data.financePhone
                    this.form.financeEmail = res.data.financeEmail
                  } else {
                    this.newId = ''
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

    // 联系人信息添加
    merchantcontactForm(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              merchantId: this.merchantId,
              languageId: this.form.languageId,
              linkPerson: this.form.linkPerson,
              linkPhone: this.form.linkPhone,
              linkEmail: this.form.linkEmail,
              financePerson: this.form.financePerson,
              financePhone: this.form.financePhone,
              financeEmail: this.form.financeEmail
            }
            contactadd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.active++
                this.contact = false
                this.batch = true
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
    // 联系人信息修改
    merchantcontactForms(addForm) {
      const id = this.newId
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              merchantId: this.merchantId,
              languageId: this.form.languageId,
              linkPerson: this.form.linkPerson,
              linkPhone: this.form.linkPhone,
              linkEmail: this.form.linkEmail,
              financePerson: this.form.financePerson,
              financePhone: this.form.financePhone,
              financeEmail: this.form.financeEmail
            }
            contactdit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.active++
                this.contact = false
                this.batch = true
                /* 附件信息查询*/
                accessoryGet(this.merchantId).then(res => {
                  if (res.data.length > 0 && res.data !== undefined) {
                    this.newId = res.data.id
                    for (var i = 0; i < res.data.length; i++) {
                      if (res.data[i].type === 2) {
                        this.form.licenseList.push(res.data[i])
                      } else if (res.data[i].type === 3) {
                        this.form.frontList.push(res.data[i])
                      } else if (res.data[i].type === 4) {
                        this.form.behindList.push(res.data[i])
                      } else if (res.data[i].type === 5) {
                        this.form.OrganizationList.push(res.data[i])
                      } else if (res.data[i].type === 6) {
                        this.form.TaxationList.push(res.data[i])
                      }else if (res.data[i].type === 7) {
                        this.form.FoodlicenseList.push(res.data[i])
                      }
                    }
                  } else {
                    this.newId = ''
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
    merchantbatchForm(addForm) {
      const id = this.merchantId
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            const data = []
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
            if (this.form.TaxationList.length !== 0) {
              data.push(this.form.TaxationList[0])
            }
            if (this.form.FoodlicenseList.length !== 0) {
              data.push(this.form.FoodlicenseList[0])
            }
            batchadd(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.active++
                this.batch = false
                this.settlement = true
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
    merchantbatchForms(addForm) {
      const id = this.merchantId
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            const data = []
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
            if (this.form.TaxationList.length !== 0) {
              data.push(this.form.TaxationList[0])
            }
            if (this.form.FoodlicenseList.length !== 0) {
              data.push(this.form.FoodlicenseList[0])
            }
            batchedit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.active++
                this.batch = false
                this.settlement = true

                /* 结算信息查询*/
                settlementGet(this.merchantId).then(res => {
                  if (res.data !== '' && res.data !== undefined && res.data !== null) {
                    this.newId = res.data.id
                    this.form.shopOpenBank = res.data.shopOpenBank
                    this.form.bankShopName = res.data.bankShopName
                    this.form.shopBankCity = res.data.shopBankCity
                    this.form.shopBankCardNumber = res.data.shopBankCardNumber
                    this.form.settlementType = res.data.settlementType
                    this.form.costType = res.data.costType
                    this.form.proportion = res.data.proportion
                    this.form.amount = res.data.amount
                  } else {
                    this.newId = ''
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
    // 结算信息添加
    merchantsettlementForm(addForm) {
      if (this.form.costType === 1 && this.form.proportion > 1) {
        this.$message({
          message: '请输入正确比例',
          type: 'warning'
        })
        return
      }
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              merchantId: this.merchantId,
              languageId: this.form.languageId,
              shopOpenBank: this.form.shopOpenBank,
              bankShopName: this.form.bankShopName,
              shopBankCity: this.form.shopBankCity,
              shopBankCardNumber: this.form.shopBankCardNumber,
              settlementType: this.form.settlementType,
              costType: this.form.costType,
              proportion: this.form.proportion,
              amount: this.form.amount
            }
            settlementadd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.active++
                this.settlement = false
                this.category = true
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
    // 结算信息修改
    merchantsettlementForms(addForm) {
      if (this.form.costType === 1 && this.form.proportion > 1) {
        this.$message({
          message: '请输入正确比例',
          type: 'warning'
        })
        return
      }
      const id = this.newId
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              merchantId: this.merchantId,
              languageId: this.form.languageId,
              shopOpenBank: this.form.shopOpenBank,
              bankShopName: this.form.bankShopName,
              shopBankCity: this.form.shopBankCity,
              shopBankCardNumber: this.form.shopBankCardNumber,
              settlementType: this.form.settlementType,
              costType: this.form.costType,
              proportion: this.form.proportion,
              amount: this.form.amount
            }
            settlementedit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.active++
                this.settlement = false
                this.category = true

                /* 类目信息查询*/
                categorysGet(this.merchantId).then(res => {
                  if (res.data.length > 0 && res.data !== undefined && res.data !== null) {
                    const _this = this
                    for (let i = 0; i < res.data.length; i++) {
                      _this.form.categoryIds.push(res.data[i].categoryId)
                      _this.$refs.tree.setCheckedKeys(_this.form.categoryIds)
                    }
                  } else {
                    this.newId = ''
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
    // 类目信息添加
    merchantcategoryForm(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              categoryIds: this.$refs.tree.getCheckedKeys()
            }
            if (data.categoryIds === '') {
              this.$message({
                message: '请选择类目',
                type: 'warning'
              })
              return
            }
            categoryadd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.active++
                this.category = false
                this.extend = true
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
    // 类目信息修改
    merchantcategoryForms(addForm) {
      const id = this.merchantId
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              categoryIds: this.$refs.tree.getCheckedKeys()
            }
            if (data.categoryIds === '') {
              this.$message({
                message: '请选择类目',
                type: 'warning'
              })
              return
            }
            categoryedit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.active++
                this.category = false
                this.extend = true
                /* 扩展信息查询*/
                extendGet(this.merchantId).then(res => {
                  if (res.data !== '' && res.data !== undefined && res.data !== null) {
                    this.newId = res.data.id
                    this.form.shopQq = res.data.shopQq
                    this.form.shopFeature = res.data.shopFeature
                    this.form.averagePrice = res.data.averagePrice
                    this.form.bizDate = res.data.bizDate
                    this.form.noticeDesc = res.data.noticeDesc
                    this.form.shopLongitude = res.data.shopLongitude
                    this.form.shopLatitude = res.data.shopLatitude
                  } else {
                    this.newId = ''
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
    // 扩展信息添加
    merchantextendForm(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              merchantId: this.merchantId,
              languageId: this.form.languageId,
              shopQq: this.form.shopQq,
              shopFeature: this.form.shopFeature,
              averagePrice: this.form.averagePrice,
              noticeDesc: this.form.noticeDesc,
              bizDate: this.form.bizDate,
              shopLongitude: this.form.shopLongitude,
              shopLatitude: this.form.shopLatitude
            }
            extendadd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                // this.crud.refresh()
                // this.crud.resetForm()
                // this.crud.toQuery()
                // this.crud.addSuccessNotify()
                // this.crud.status.edit = CRUD.STATUS.NORMAL
                // this.active = 0
                // this.merchantId = ''
                // this.newId = ''
                // this.extend = false
                // this.info = true
                this.active++
                setTimeout(() => {
                  location.reload()
                }, 1000)
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
    // 扩展信息修改
    merchantextendForms(addForm) {
      const id = this.newId
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              merchantId: this.merchantId,
              languageId: this.form.languageId,
              shopQq: this.form.shopQq,
              shopFeature: this.form.shopFeature,
              averagePrice: this.form.averagePrice,
              bizDate: this.form.bizDate,
              noticeDesc: this.form.noticeDesc,
              shopLongitude: this.form.shopLongitude,
              shopLatitude: this.form.shopLatitude
            }
            extendedit(id, data).then(res => {
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
                this.active++
                this.active = 0
                this.merchantId = ''
                this.newId = ''
                this.locationMsg.keyword = ''
                this.locationMsg.lnglat = ''
                this.locationMsg.address = ''
                this.extend = false
                this.info = true
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
  ::v-deep .editor{
    width: 810px !important;
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
