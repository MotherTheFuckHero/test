<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="1000px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="语言" prop="languageId">
        <el-select v-model="form.languageId" clearable style="width: 200px;" placeholder="语言">
          <el-option
            v-for="item in languageIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="productSpecs" :rules="[{ required: true, message: '请输入商品规格', trigger: 'blur' }]">
        <el-input v-model="form.productSpecs" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商品库存" prop="productSpecStock.stockCount" :rules="[{ required: true, message: '请输入库存数量', trigger: 'blur' }]">
        <el-input v-model="form.productSpecStock.stockCount" type="number"  onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
        <!--          <el-input v-model="form.productSpecStock.stockCount" type="number" :disabled="stockCountdisabled" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />-->
      </el-form-item>
      <el-form-item label="虚拟库存" prop="productSpecStock.stockFictitiousCount" :rules="[{ required: true, message: '请输入虚拟库存数量', trigger: 'blur' }]">
        <el-input v-model="form.productSpecStock.stockFictitiousCount" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="预警库存" prop="productSpecStock.stockLimitCount" :rules="[{ required: true, message: '请输入预警库存数量', trigger: 'blur' }]">
        <el-input v-model="form.productSpecStock.stockLimitCount" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="单位" prop="unit" :rules="[{ required: true, message: '请输入商品单位', trigger: 'blur' }]">
        <el-input v-model="form.unit" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="采购价" prop="purchasePrice" :rules="[{ required: true, message: '采购价', trigger: 'blur' }]">
        <el-input v-model="form.purchasePrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="商品条码" prop="barCode" >
        <el-input v-model="form.barCode" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="是否拼团" prop="isGroup">
        <el-radio-group v-model="form.isGroup" style="width: 180px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <template v-for="(item,index) in form.productSpecUserGradeList">
        <el-row v-if="index<=0" :key="index">
          <el-form-item label="用户等级" :prop="`productSpecUserGradeList.${index}.userGradeId`" :rules="[{ required: true, message: '请选择用户等级', trigger: 'blur' }]">
            <el-select v-model="item.userGradeId" clearable style="width: 200px;" :disabled="index === 0">
              <el-option
                v-for="itemd in userGradeIdLists"
                :key="itemd.id"
                :label="itemd.gradeName+'(折扣比例'+itemd.discount+'折)'"
                :value="itemd.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="限购数量" :prop="`productSpecUserGradeList.${index}.limitNum`" :rules="[{ required: true, message: '请输入限购数量', trigger: 'blur' }]">
            <el-input v-model="item.limitNum" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
          </el-form-item>
          <el-form-item label="最低购买" :prop="`productSpecUserGradeList.${index}.minNum`" :rules="[{ required: true, message: '请输入最低购买', trigger: 'blur' }]">
            <el-input v-model="item.minNum" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
          </el-form-item>
          <el-form-item label="建议零售价" :prop="`productSpecUserGradeList.${index}.retailPrice`" :rules="[{ required: true, message: '请输入建议零售价', trigger: 'blur' }]">
            <el-input v-model="item.retailPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
          </el-form-item>
          <el-form-item label="门店价格" :prop="`productSpecUserGradeList.${index}.storePrice`" :rules="[{ required: true, message: '请输入门店价格', trigger: 'blur' }]">
            <el-input v-model="item.storePrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
          </el-form-item>
          <el-form-item label="平台价" :prop="`productSpecUserGradeList.${index}.platFormPrice`" :rules="[{ required: true, message: '请输入平台价', trigger: 'blur' }]">
            <el-input v-model="item.platFormPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
          </el-form-item>
          <el-form-item label="折扣价" :prop="`productSpecUserGradeList.${index}.discountPrice`" :rules="[{ required: true, message: '请输入折扣价', trigger: 'blur' }]">
            <el-input v-model="item.discountPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
          </el-form-item>
          <el-form-item label="会员价" :prop="`productSpecUserGradeList.${index}.vipPrice`" :rules="[{ required: true, message: '请输入会员价', trigger: 'blur' }]">
            <el-input v-model="item.vipPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
          </el-form-item>
          <el-form-item label="操作">
            <el-button @click="addproductSpecUserGrade()">+设置商品价格价格体系</el-button>
          </el-form-item>
        </el-row>
      </template>
      <el-dialog title="商品多价格添加" :visible.sync="productSpecUserGradeListVisible" width="1000px" append-to-body>
        <el-button type="primary" plain icon="el-icon-plus" @click="addproductSpecUserGradeList">添加多价格</el-button>
        <template v-for="(item,index) in form.productSpecUserGradeList">
          <el-row v-if="index>=1" :key="index">
            <el-form-item label="用户等级" :prop="`productSpecUserGradeList.${index}.userGradeId`" :rules="[{ required: true, message: '请选择用户等级', trigger: 'blur' }]">
              <el-select v-model="item.userGradeId" clearable style="width: 200px;" :disabled="index === 0">
                <el-option
                  v-for="itemd in userGradeIdLists"
                  :key="itemd.id"
                  :label="itemd.gradeName+'(折扣比例'+itemd.discount+'折)'"
                  :value="itemd.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="限购数量" :prop="`productSpecUserGradeList.${index}.limitNum`" :rules="[{ required: true, message: '请输入限购数量', trigger: 'blur' }]">
              <el-input v-model="item.limitNum" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="最低购买" :prop="`productSpecUserGradeList.${index}.minNum`" :rules="[{ required: true, message: '请输入最低购买', trigger: 'blur' }]">
              <el-input v-model="item.minNum" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="建议零售价" :prop="`productSpecUserGradeList.${index}.retailPrice`" :rules="[{ required: true, message: '请输入建议零售价', trigger: 'blur' }]">
              <el-input v-model="item.retailPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="门店价格" :prop="`productSpecUserGradeList.${index}.storePrice`" :rules="[{ required: true, message: '请输入门店价格', trigger: 'blur' }]">
              <el-input v-model="item.storePrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="平台价" :prop="`productSpecUserGradeList.${index}.platFormPrice`" :rules="[{ required: true, message: '请输入平台价', trigger: 'blur' }]">
              <el-input v-model="item.platFormPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="折扣价" :prop="`productSpecUserGradeList.${index}.discountPrice`" :rules="[{ required: true, message: '请输入折扣价', trigger: 'blur' }]">
              <el-input v-model="item.discountPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="会员价" :prop="`productSpecUserGradeList.${index}.vipPrice`" :rules="[{ required: true, message: '请输入会员价', trigger: 'blur' }]">
              <el-input v-model="item.vipPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="操作">
              <el-button v-if="index !== 0" type="danger" plain icon="el-icon-delete" @click="deleteproductSpecUserGradeList(index)">删除</el-button>
            </el-form-item>
          </el-row>
        </template>
        <el-form-item style="display: inline">
          <el-button type="primary" style="float:right;margin-right: 50px;" @click="addproductSpecUserGrades">确定</el-button>
        </el-form-item>
      </el-dialog>
      <template v-if="form.isGroup===true">
        <el-form-item label="到时间是否默认拼团成功" prop="productSpecGroup.isSuccess" label-width="150" style="width: 500px;" :rules="[{ required: true, message: '请选择到时间是否默认成功', trigger: 'blur' }]">
          <el-radio-group v-model="form.productSpecGroup.isSuccess" style="width: 180px;">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <br>
        <el-form-item label="拼团时长(分钟)" label-width="120" style="width: 300px;" prop="productSpecGroup.duration" :rules="[{ required: true, message: '请输入拼团时长(分钟)', trigger: 'blur' }]">
          <el-input v-model="form.productSpecGroup.duration" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 180px;" @mousewheel.native.prevent />
        </el-form-item>
        <el-form-item label="商品拼团价格" prop="productSpecGroup.groupPrice" label-width="120" style="width: 300px;" :rules="[{ required: true, message: '请输入拼单价格', trigger: 'blur' }]">
          <el-input v-model="form.productSpecGroup.groupPrice" type="number" maxlength="32" style="width: 180px;" @mousewheel.native.prevent />
        </el-form-item>
        <el-form-item label="最低拼单人数" prop="productSpecGroup.limitPeos" label-width="120" style="width: 300px;" :rules="[{ required: true, message: '请输入最低拼单人数', trigger: 'blur' }]">
          <el-input v-model="form.productSpecGroup.limitPeos" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 180px;" @mousewheel.native.prevent />
        </el-form-item>
        <el-form-item label="拼团分享标题" prop="productSpecGroup.shareTitle" label-width="120" style="width: 300px;" :rules="[{ required: true, message: '请输入分享标题', trigger: 'blur' }]">
          <el-input v-model="form.productSpecGroup.shareTitle" maxlength="32" style="width: 180px;" />
        </el-form-item>
        <el-form-item label="拼团分享内容" prop="productSpecGroup.shareContent" label-width="120" style="width: 300px;" :rules="[{ required: true, message: '请输入分享内容', trigger: 'blur' }]">
          <el-input v-model="form.productSpecGroup.shareContent" maxlength="32" style="width: 180px;" />
        </el-form-item>
        <el-form-item label="分享图片" prop="productSpecGroup.shareImage" style="display: block" :rules="[{ required: true, message: '请上传分享图片', trigger: 'blur' }]">
          <el-upload
            v-model="form.productSpecGroup.shareImage"
            action="/"
            :http-request="fileshareImageAdd"
            :limit="1"
            :file-list="form.productSpecGroup.shareImageList"
            :on-exceed="handleshareImageExceed"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            :on-remove="handleshareImageRemove"
            :before-upload="beforeAvatarshareImageUpload"
          >
            <em class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </template>
      <el-form-item label="商品图片" prop="productImgList" style="display: block" :rules="[{ required: true, message: '请上传商品图片', trigger: 'blur' }]">
        <el-upload
          v-model="form.productImgList"
          action="/"
          :http-request="fileAdd"
          :limit="5"
          :file-list="form.productImgList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.mp4"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="crud.cancelCU"
      >
        取消
      </el-button>
      <el-button
        :loading="crud.status.cu === 2"
        type="primary"
        @click="crud.submitCU"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'
import { getlanguageLists } from '@/api/system/language'
import { getuserGradeLists } from '@/api/user/userGrade'
import Editor from '../../../Editor'
import CRUD from '@crud/crud'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  languageId: '',
  productSpecs: '',
  purchasePrice: '',
  barCode: '',
  productId: '',
  isGroup: false,
  productSpecStock:{},
  productSpecGroup:{
      id: '',
      duration: '', // 分钟
      groupPrice: '', // 拼单价格
      isSuccess: true, // 到时间是否默认成功
      limitPeos: '', // 最低拼单人数
      shareContent: '', // 分享内容
      shareTitle: '', // 分享标题
      shareImage: '', // 分享图片
      sponsorCoupRatio: 0, // 发起人优惠百分比
      shareImageList: []
  },
  productSpecUserGradeList:[
      {
          id: '',
          userGradeId: 1000,
          retailPrice: '',
          storePrice: '',
          platFormPrice: '',
          discountPrice: '',
          vipPrice: '',
          limitNum: '',
          minNum: ''
      }
  ],
  productImgList:[],
  unit: ''
}
export default {
  components: { Editor },
  mixins: [form(defaultForm)],
  data() {
    return {
      languageIdList: [],
      userGradeIdLists: [],
      productSpecUserGradeListVisible:false,
      rules: {
        unit: [
          {
            required: true,
            message: '请输入单位',
            trigger: 'blur'
          }
        ],
        languageId: [
          {
            required: true,
            message: '请选择语言类型',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
    var merchantIds = [this.form.merchantId, 1]

    const datax = {
        merchantIds: merchantIds
    }
    getuserGradeLists(datax).then(res => {
        this.userGradeIdLists = res.data
    })
  },
  methods: {
    // 新增与编辑提交前做的操作
    [CRUD.HOOK.beforeSubmit](crud, form) {
      if (crud.form.productId === '') {
        crud.form.productId = JSON.parse(localStorage.getItem('productId'))
      }
    },
    [CRUD.HOOK.beforeToEdit](crud, form) {
        if (crud.form.productImgList != null && crud.form.productImgList.length>0) {
          let newImglist=[]
        for (var i = 0; i <crud.form.productImgList.length; i++) {
            var pamers = {
                key:crud.form.productImgList[i].image,
                image:crud.form.productImgList[i].image,
                url:crud.form.productImgList[i].imageUrl,
                defaultShow:crud.form.productImgList[i].defaultShow,
                id:crud.form.productImgList[i].id,
                languageId:crud.form.productImgList[i].languageId,
                productId:crud.form.productImgList[i].productId,
                sortNo:crud.form.productImgList[i].sortNo,
                specId:crud.form.productSpecStock.specId,
                specs:crud.form.productImgList[i].specs,
                name:crud.form.productImgList[i].specs,
                status:crud.form.productImgList[i].status
            }
            newImglist.push(pamers)
        }
        this.form.productImgList=newImglist
        }
    },
      // 轮播图提交
      handleRemove(file, productImgList) {
          this.form.productImgList = productImgList
      },
      handleExceed(files, productImgList) {
          this.$message.warning(`当前最多提交5张图片`)
          this.form.productImgList = productImgList
      },
      beforeAvatarUpload(file) {
          const isLt1M = file.size / 1024 / 1024 < 0.34
          if (!isLt1M) {
              this.$message.error('上传商品图片大小不能超过 300KB!')
          }
          return isLt1M
      },
      // 选择文件
      fileAdd(productImgList) {
          const myfile = productImgList
          const file = myfile.file
          var formData = new FormData()
          formData.append('file', file)
          var _this = this
          return sysfileAdds(formData)
              .then(
                  function(response) {
                      var params = {
                          'languageId': _this.form.languageId,
                          'status': '1',
                          'sortNo': 1,
                          'defaultShow': false,
                          'specs': _this.form.productSpecs,
                          'specId': _this.form.productIds,
                          'image': response.data.key,
                          'url': response.data.url,
                          'name': response.data.fileName
                      }
                      _this.form.productImgList.push(params)
                  })
      },
      // 分享图片
      handleshareImageRemove(file, productImgList) {
          this.form.productSpecGroup.shareImageList = productImgList
      },
      handleshareImageExceed(files, productImgList) {
          this.$message.warning(`当前最多提交1张图片`)
          this.form.productSpecGroup.shareImageList = productImgList
      },
      beforeAvatarshareImageUpload(file) {
          const isLt1M = file.size / 1024 / 1024 < 1
          if (!isLt1M) {
              this.$message.error('上传图片大小不能超过 1MB!')
          }
          return isLt1M
      },
      // 选择文件
      fileshareImageAdd(productImgList) {
          const myfile = productImgList
          const file = myfile.file
          var formData = new FormData()
          formData.append('file', file)
          var _this = this
          sysfileAdds(formData)
              .then(
                  function(response) {
                      var params = {
                          'size': response.data.size,
                          'key': response.data.key,
                          'url': response.data.url,
                          'name': response.data.fileName
                      }
                      _this.form.productSpecGroup.shareImageList.push(params)
                      _this.form.productSpecGroup.shareImage = response.data.key
                  })
      },
      // 显示单规格添加多价格
      addproductSpecUserGrade() {
          this.productSpecUserGradeListVisible = true
      },
      // 确定单规格添加多价格
      addproductSpecUserGrades() {
          var istrue = ''
          var GradeList = []
          for (var s = 0; s < this.form.productSpecUserGradeList.length; s++) {
              GradeList.push(this.form.productSpecUserGradeList[s].userGradeId)
              if (this.form.productSpecUserGradeList[s].userGradeId === '' || this.form.productSpecUserGradeList[s].retailPrice === '' || this.form.productSpecUserGradeList[s].storePrice === '' || this.form.productSpecUserGradeList[s].platFormPrice === '' || this.form.productSpecUserGradeList[s].discountPrice === '' || this.form.productSpecUserGradeList[s].vipPrice === '' || this.form.productSpecUserGradeList[s].limitNum === '' || this.form.productSpecUserGradeList[s].minNum === '') {
                  istrue = false
                  break
              } else {
                  istrue = true
              }
          }
          if (istrue) {
              if (GradeList.length === 1) {
                  this.productSpecUserGradeListVisible = false
              } else {
                  var nary = GradeList.sort()
                  for (var i = 0; i < nary.length - 1; i++) {
                      if (nary[i] === nary[i + 1]) {
                          this.$message({
                              message: '用户等级不能重复',
                              type: 'warning'
                          })
                          break
                      } else {
                          this.productSpecUserGradeListVisible = false
                      }
                  }
              }
          } else {
              this.$message({
                  message: '请完善商品多价格信息',
                  type: 'warning'
              })
          }
      },
      // 单规格添加多价格
      addproductSpecUserGradeList() {
          this.form.productSpecUserGradeList.push({
              userGradeId: '',
              retailPrice: '',
              storePrice: '',
              platFormPrice: '',
              discountPrice: '',
              vipPrice: '',
              limitNum: '',
              minNum: ''
          })
      },
      // 单规格删除多价格
      deleteproductSpecUserGradeList(index) {
          this.form.productSpecUserGradeList.splice(index, 1)
      },
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
  ::v-deep  .editor{
    width: 510px !important;
  }
</style>
