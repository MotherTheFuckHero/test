<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="960px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="商家" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable placeholder="商家" style="width: 200px;">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="productDesc.title" :rules="[[`productDesc.title`],{ required: true, message: '请输入商品名称', trigger: 'blur' }]">
        <el-input v-model="form.productDesc.title" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="邮费模板" prop="postageId">
        <el-select v-model="form.postageId" clearable style="width: 200px;">
          <el-option
            v-for="item in postageIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="退款方式" prop="refundType">
        <el-select v-model="form.refundType" clearable style="width: 200px;">
          <el-option
            v-for="item in refundTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关键字" prop="productDesc.keyword" :rules="[[`productDesc.keyword`],{ required: true, message: '请输入关键字', trigger: 'blur' }]">
        <el-input v-model="form.productDesc.keyword" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商品卖点" prop="productDesc.sellPoint" :rules="[[`productDesc.sellPoint`],{ required: true, message: '请输入商品卖点', trigger: 'blur' }]">
        <el-input v-model="form.productDesc.sellPoint" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="单位" prop="productDesc.unit" :rules="[[`productDesc.unit`],{ required: true, message: '请输入单位', trigger: 'blur' }]">
        <el-input v-model="form.productDesc.unit" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="营业时间" prop="productDesc.availableDates" :rules="[[`productDesc.availableDates`],{ required: true, message: '请输入营业时间', trigger: 'blur' }]">
        <el-input v-model="form.productDesc.availableDates" placeholder="0:00——24:00" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="排序编号" prop="sortNo" :rules="[{ required: true, message: '请输入排序编号', trigger: 'blur' }]">
        <el-input v-model="form.sortNo" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item  label="商品编号" prop="code" :rules="[{ required: true, message: '请输入商品编号', trigger: 'blur' }]">
        <el-input v-model="form.code" type="number" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="是否独立提成" prop="Commission">
        <el-radio-group v-model="form.Commission" style="width: 200px;" @change="Commissionchange">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.Commission===true" label="费用类型" prop="costType" :rules="[{ required: true, message: '请选择费用类型', trigger: 'blur' }]">
        <el-select v-model="form.costType" clearable style="width: 200px;">
          <el-option
            v-for="item in costTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.costType===1 && form.Commission===true" label="比例" prop="proportion" :rules="[{ required: true, message: '请输入比例', trigger: 'blur' }]">
        <el-input v-model.number="form.proportion" type="number" maxlength="5" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item v-if="form.costType===2 || form.costType===3 && form.Commission===true" label="佣金(￥)" prop="amount" :rules="[{ required: true, message: '请输入佣金', trigger: 'blur' }]">
        <el-input v-model="form.amount" type="number" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="是否多规格" prop="">
        <el-radio-group v-model="form.duoguige" style="width: 200px;">
          <el-radio class="radio" :label="1">是</el-radio>
          <el-radio class="radio" :label="2">否</el-radio>
        </el-radio-group>
        <el-button v-if="form.duoguige===1" type="text" style="margin-left: -60px" @click="productAttrs">添加多规格</el-button>
        <el-button v-if="form.duoguige===2" type="text" @click="clickLine">设置线路日期价格</el-button>
      </el-form-item>
      <el-dialog title="线路日期价格" :visible.sync="lintvisible" width="980px" append-to-body>
        <calendar
          :datedef="form.productSpecLineList"
          :effective-time-limit="effectiveTimeLimit"
        />
      </el-dialog>
      <div v-if="form.duoguige===2" label-width="100px">
        <el-form-item label="规格" prop="productSpecs" :rules="[{ required: true, message: '请输入商品规格', trigger: 'blur' }]">
          <el-input v-model="form.productSpecs" maxlength="32" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="商品库存" prop="productSpecStock.stockCount" :rules="[{ required: true, message: '请输入库存数量', trigger: 'blur' }]">
          <el-input v-model="form.productSpecStock.stockCount" type="number" :disabled="stockCountdisabled" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
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
          </el-row>
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
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
          >
            <em class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.productDesc.remarks" type="textarea" style="width: 810px;" maxlength="65535" />
      </el-form-item>
      <el-form-item label="注意信息" prop="notes">
        <el-input v-model="form.productDesc.notes" type="textarea" style="width: 810px;" maxlength="65535" />
      </el-form-item>
      <el-form-item label="成本信息" prop="costMessage">
        <el-input v-model="form.productDesc.costMessage" type="textarea" style="width:810px;" maxlength="65535" />
      </el-form-item>
      <el-form-item label="商品描述" prop="productDesc">
        <Editor v-model="form.productDesc.productDesc" />
      </el-form-item>
      <el-form-item label="商品标签" style="display: inline">
        <el-tag
          v-for="tag in form.productLabelList"
          :key="tag.labelName"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag.labelName }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag" size="small" style="margin-left: 20px;" @click="showInput">添加标签</el-button>
      </el-form-item>
      <el-form-item label="运送方式" prop="kong" style="display: inline;">
        <template>
          <el-checkbox-group
            v-model="form.kong"
            @change="changeFun"
          >
            <el-checkbox v-for="item in productTransportLists" :key="item.value" :label="item.value" :value="item.value">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
          <el-radio-group v-model="form.isDefault">
            <el-radio v-show="form.isDefaultone" :label="1">默认快递</el-radio>
            <el-radio v-show="form.isDefaulttwo" :label="2">默认到店领取</el-radio>
            <el-radio v-show="form.isDefaultthree" :label="3">默认兑换码兑换</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="是否跨境" prop="crossBorder">
        <el-radio-group v-model="form.crossBorder">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!--    多规格-->
    <el-form :model="form" label-width="100px" class="demo-addForm">
      <el-dialog title="商品多规格添加" :visible.sync="form.dialogFormVisible" width="600px" append-to-body>
        <el-form-item label="规格一标题" prop="attribute" style="width: 100%;">
          <el-input v-model="form.attribute" maxlength="32" placeholder="请输入标题，如颜色尺码等" />
        </el-form-item>
        <el-form-item label="规格">
          <el-tag
            v-for="tag in form.attributeValueList"
            :key="tag.value"
            closable
            :disable-transitions="false"
            @close="attributeClose(tag)"
          >
            {{ tag.value }}
          </el-tag>
          <el-input
            v-if="form.attributeVisible"
            ref="saveTagInput"
            v-model="form.attributeValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="attributeConfirm"
            @blur="attributeConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="attributeadd">添加规格</el-button>
        </el-form-item>

        <p><el-button type="text" @click="attributetwo">+添加规格分类二</el-button>   <el-button v-show="form.deletsss" style="margin-left: 250px;" type="text" @click="attributeDeledt">删除</el-button></p>
        <div v-show="form.dialogFormVisibles">
          <el-form-item label="规格二标题" prop="attributes" style="width: 100%;">
            <el-input v-model="form.attributes" maxlength="32" placeholder="请输入标题，如颜色尺码等" />
          </el-form-item>
          <el-form-item label="规格">
            <el-tag
              v-for="tag in form.attributeValueLists"
              :key="tag.value"
              closable
              :disable-transitions="false"
              @close="attributeCloses(tag)"
            >
              {{ tag.value }}
            </el-tag>
            <el-input
              v-if="form.attributeVisibles"
              ref="saveTagInput"
              v-model="form.attributeValues"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="attributeConfirms"
              @blur="attributeConfirms"
            />
            <el-button v-else class="button-new-tag" size="small" @click="attributeadds">添加规格</el-button>
          </el-form-item>
        </div>
        <el-form-item style="display: inline">
          <el-button type="primary" @click="attributeAdds('addForm')">下一步</el-button>
          <el-button v-if="form.xunhuan.length>0" type="primary" @click="attributeEdits('addForm')">编辑</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>
    <!-- 多规格商品数据录入 -->
    <el-form ref="addForm" :model="form" label-width="100px" class="demo-addForm">
      <el-dialog title="商品多规格数据录入" :visible.sync="form.dialogFormproduct" width="980px" append-to-body>
        <template v-if="form.ok">
          <el-row v-for="(item,index) in form.xunhuan" :key="index" style="margin-top: 20px">
            <div style="margin-bottom: 20px;">
              <el-badge :value="index+1" class="item" type="primary" style="padding: 5px;">
                <p>{{ item.productSpecs }}</p>
              </el-badge>
            </div>
            <el-form-item label="单位">
              <input v-model="item.unit" class="myinput" style="width: 200px;">
            </el-form-item>
            <el-form-item label="库存">
              <input v-model="item.productSpecStock.stockCount" class="myinput" :disabled="stockCountdisabled" onkeyup="value=value.replace(/[^0-9]/ig,'')" type="number" style="width: 200px;" @mousewheel.native.prevent>
            </el-form-item>
            <el-form-item label="虚拟库存">
              <input v-model="item.productSpecStock.stockFictitiousCount" class="myinput" onkeyup="value=value.replace(/[^0-9]/ig,'')" type="number" style="width: 200px;" @mousewheel.native.prevent>
            </el-form-item>
            <el-form-item label="预警库存">
              <input v-model="item.productSpecStock.stockLimitCount" class="myinput" onkeyup="value=value.replace(/[^0-9]/ig,'')" type="number" style="width: 200px;" @mousewheel.native.prevent>
            </el-form-item>
            <el-form-item label="采购价" prop="purchasePrice">
              <el-input v-model="item.purchasePrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
            </el-form-item>
            <el-button type="text" style="margin-left: 60px" @click="clickLines(index)">设置线路日期价格</el-button>
            <el-dialog title="线路日期价格" :visible.sync="item.productSpeclintvisible" width="980px" append-to-body>
              <calendar
                :datedef="item.productSpecLineList"
                :effective-time-limit="effectiveTimeLimit"
              />
            </el-dialog>
            <template v-for="(items,indexs) in item.productSpecUserGradeList">
              <el-row v-if="indexs<=0" :key="indexs">
                <el-form-item label="用户等级">
                  <el-select v-model="items.userGradeId" clearable style="width: 200px;" :disabled="indexs === 0">
                    <el-option
                      v-for="itemd in userGradeIdLists"
                      :key="itemd.id"
                      :label="itemd.gradeName+'(折扣比例'+itemd.discount+'折)'"
                      :value="itemd.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="限购数量">
                  <input v-model="items.limitNum" class="myinput" onkeyup="value=value.replace(/[^0-9]/ig,'')" type="number" style="width: 200px;" @mousewheel.native.prevent>
                </el-form-item>
                <el-form-item label="最低购买数量">
                  <input v-model="items.minNum" class="myinput" onkeyup="value=value.replace(/[^0-9]/ig,'')" type="number" style="width: 200px;" @mousewheel.native.prevent>
                </el-form-item>
                <el-form-item label="建议零售价" prop="retailPrice">
                  <input v-model="items.retailPrice" class="myinput" type="number" style="width: 200px;" maxlength="32" @mousewheel.native.prevent>
                </el-form-item>
                <el-form-item label="线下门店价格" prop="storePrice">
                  <input v-model="items.storePrice" class="myinput" type="number" style="width: 200px;" maxlength="32" @mousewheel.native.prevent>
                </el-form-item>
                <el-form-item label="平台价" prop="platFormPrice">
                  <input v-model="items.platFormPrice" class="myinput" type="number" style="width: 200px;" maxlength="32" @mousewheel.native.prevent>
                </el-form-item>
                <el-form-item label="折扣价" prop="discountPrice">
                  <input v-model="items.discountPrice" class="myinput" type="number" style="width: 200px;" maxlength="32" @mousewheel.native.prevent>
                </el-form-item>
                <el-form-item label="会员价" prop="vipPrice">
                  <input v-model="items.vipPrice" class="myinput" type="number" style="width: 200px;" maxlength="32" @mousewheel.native.prevent>
                </el-form-item>
              </el-row>
            </template>
            <el-form-item label="商品图片" style="display: inline;">
              <el-upload
                ref="upload"
                action="/"
                :http-request="fileguigeAdd"
                :data="{'index':index}"
                :limit="5"
                :file-list="item.productImgguigeList"
                :on-exceed="handleguigeExceed"
                list-type="picture-card"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                :on-remove="handleguigeRemove"
                :before-upload="beforeAvatarUploads"
              >
                <em class="el-icon-plus" />
              </el-upload>
            </el-form-item>
          </el-row>
        </template>
        <el-form-item style="display: inline">
          <el-button type="primary" style="float: right" @click="productAttributeListAdd('addForm')">保存</el-button>
        </el-form-item>
      </el-dialog>
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
import { getmerchantLists, CosttypeLists } from '@/api/merchant/merchant'
import { RefundTypeList, TransportTypeList } from '@/api/product/product'
import { getuserGradeLists } from '@/api/user/userGrade'
import { getpostagetemplateLists } from '@/api/product/postagetemplate'
import { sysfileAdds } from '@/api/upload'
import CRUD from '@crud/crud'
import Editor from '../../Editor'
import calendar from './calendar'
import { productSpecBatch } from '@/api/product/productSpec'
const defaultForm = {
  id: null,

  amount: '',
  proportion: '',
  costType: '',
  productType: 8,
  catId: 0,
  code:'',
  refundType: '',
  multiSpec: '',
  merchantId: '',
  sortNo: 100,
  crossBorder: '',
  status: 1,
  productDesc: {
    id: '',
    'languageId': 1,
    'title': '',
    'productDesc': '',
    'keyword': '',
    'sellPoint': '',
    'remarks': '',
    'notes': '',
    'costMessage': '',
    'availableDates': '0:00-23:59',
    'unit': ''
  },
  productImgList: [],
  kong: [],
  productTransportList: [],
  productLabelList: [],
  productSpecList: [],
  productAttributeList: [],

  /* 单规格*/
  productIds: '',
  productSpecs: '',
  unit: '',
  languageId: 1,
  isGroup: false,
  // 拼团参数
  productSpecGroup: {},
  purchasePrice: '',
  productSpecUserGradeList: [
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

  productSpecLineList: [],

  productSpecStock: {
    stockCount: '',
    stockFictitiousCount: '',
    stockLimitCount: '',
    specId: '',
    id: ''
  },
  /* 运送方式*/
  isDefaultone: false,
  isDefaulttwo: false,
  isDefaultthree: false,

  /* 是否独立提成*/
  Commission: false,

  /* 是否多规格   1多规格  2单规格*/
  duoguige: 2,

  /* 商品类型为票务类型*/
  productTicket: {},

  /* 商品多规格*/
  dialogFormVisible: false,
  dialogFormVisibles: false,
  dialogFormproduct: false,
  ok: false,
  deletsss: false,
  xunhuan: '',
  bianji: false,
  zum: [],
  // 多规格商品图片
  productImgguigeList: [],

  // 规格一
  attributeVisible: false,
  attributeValue: '',
  attributeValueList: [],
  // 规格二
  attributeVisibles: false,
  attributeValues: '',
  attributeValueLists: []
}
export default {
  components: { Editor, calendar },
  mixins: [form(defaultForm)],
  data() {
    return {
      effectiveTimeLimit: '',
      // 禁止库存编辑
      stockCountdisabled: false,
      lintvisible: false,
      inputVisible: false,
      inputValue: '',

      merchantIdList: [],
      userGradeIdLists: [],
      postageIdList: [],
      refundTypeList: [],
      costTypeList: [],
      productTransportLists: [],

      rules: {

        merchantId: [
          {
            required: true,
            message: '请选择商家',
            trigger: 'blur'
          }
        ],
        crossBorder: [
          {
            required: true,
            message: '请选择是否跨境',
            trigger: 'blur'
          }
        ],
        productSpecList: [
          {
            required: true,
            message: '请选择商品规格',
            trigger: 'blur'
          }
        ],
        productDesc: [
          {
            required: true,
            message: '请输入商品介绍',
            trigger: 'blur'
          },
          {
            required: true,
            message: '请输入商品单位',
            trigger: 'blur'
          }
        ],
        kong: [
          {
            required: true,
            message: '请选择运输方式',
            trigger: 'blur'
          }
        ],
        refundType: [
          {
            required: true,
            message: '请选择退款方式',
            trigger: 'blur'
          }
        ],
        productTicket: [
          {
            required: true,
            message: '完善票务信息',
            trigger: 'blur'
          }
        ],
        postageId: [
          {
            required: true,
            message: '请选择运费模板',
            trigger: 'blur'
          }
        ]

      }
    }
  },
  watch: {
    'form.merchantId': function(newQuestion, oldQuestion) {
      if (this.form.merchantId !== '') {
        var merchantIds = [this.form.merchantId, 1]
        const datax = {
          merchantIds: merchantIds
        }
        getuserGradeLists(datax).then(res => {
          this.userGradeIdLists = res.data
        })
      }
    }
  },
  created() {
    const datas = {
      status: 3
    }
    const data = {
      status: 1
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
    RefundTypeList(data).then(res => {
      this.refundTypeList = res.data
    })
    getpostagetemplateLists(data).then(res => {
      this.postageIdList = res.data
    })
    CosttypeLists(data).then(res => {
      this.costTypeList = res.data
    })
    TransportTypeList(data).then(res => {
      this.productTransportLists = res.data
    })
  },

  methods: {
    clickLine() {
      this.lintvisible = true
    },
    clickLines(index) {
      this.form.xunhuan[index].productSpeclintvisible = true
    },
    // 新增打开前做的操作  //允许编辑库存
    [CRUD.HOOK.beforeToAdd]() {
      this.stockCountdisabled = false
    },
    // 编辑打开前做的操作  //禁止编辑库存
    [CRUD.HOOK.beforeToEdit]() {
      this.stockCountdisabled = true
    },
    // 新增与编辑提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud, form) {
      if (this.form.costType === 1 && this.form.proportion > 1) {
        this.$message({
          message: '请输入正确比例',
          type: 'warning'
        })
        return
      }
      if (this.form.duoguige === 1) {
        crud.form.productImgList = []
        for (var s = 0; s < this.form.productImgguigeList.length; s++) {
          crud.form.productImgList.push(this.form.productImgguigeList[s])
        }
      } else if (this.form.duoguige === 2) {
        const newIMG = []
        for (let s = 0; s < this.form.productImgList.length; s++) {
          newIMG.push({
            'defaultShow': this.form.productImgList[s].defaultShow,
            'id': this.form.productImgList[s].id,
            'image': this.form.productImgList[s].image,
            'languageId': this.form.productImgList[s].languageId,
            'name': this.form.productSpecs,
            'specs': this.form.productSpecs,
            'productId': this.form.productImgList[s].productId,
            'sortNo': this.form.productImgList[s].sortNo,
            'specId': this.form.productImgList[s].specId,
            'status': this.form.productImgList[s].status,
            'uid': this.form.productImgList[s].uid,
            'url': this.form.productImgList[s].url
          })
        }
        crud.form.productImgList = newIMG
      }
      crud.form.productTransportList = []
      for (let i = 0; i < crud.form.kong.length; i++) {
        var pamers = {
          'transportType': crud.form.kong[i],
          'isDefault': false
        }
        crud.form.productTransportList.push(pamers)
      }
      var ii = this.form.isDefault
      for (var ss = 0; ss < crud.form.productTransportList.length; ss++) {
        if (crud.form.productTransportList[ss].transportType === ii) {
          crud.form.productTransportList[ss].isDefault = true
        }
      }
      if (crud.form.productSpecList.length > 1) {
        crud.form.multiSpec = true
        crud.form.productSpecList = []
        const newproductSpecLineList = []
        for (var i = 0; i < this.form.xunhuan.length; i++) {
          for (var l = 0; l < this.form.xunhuan[i].productSpecLineList.length; l++) {
            newproductSpecLineList.push({
              saleDate: this.form.xunhuan[i].productSpecLineList[l].date,
              price: this.form.xunhuan[i].productSpecLineList[l].content,
              stockCount: this.form.xunhuan[i].productSpecLineList[l].contents
            })
          }
          const pamers = {
            'id': this.form.xunhuan[i].id,
            'productSpecs': this.form.xunhuan[i].productSpecs,
            'unit': this.form.xunhuan[i].unit,
            'purchasePrice': this.form.xunhuan[i].purchasePrice,
            'productSpecUserGradeList': this.form.xunhuan[i].productSpecUserGradeList,
            'languageId': this.form.languageId,
            'isGroup': this.form.xunhuan[i].isGroup,
            'productSpecLineList': newproductSpecLineList,
            'productSpecStock': {
              'id': this.form.xunhuan[i].productSpecStock.id,
              'specId': this.form.xunhuan[i].productSpecStock.specId,
              'stockCount': this.form.xunhuan[i].productSpecStock.stockCount,
              'stockFictitiousCount': this.form.xunhuan[i].productSpecStock.stockFictitiousCount,
              'stockLimitCount': this.form.xunhuan[i].productSpecStock.stockLimitCount
            }
          }
          crud.form.productSpecList.push(pamers)
        }
      } else {
        crud.form.multiSpec = false
        const newproductSpecLineList = []
        if (this.form.productSpecLineList.length === 0) {
          this.$message({
            message: '请选择线路售卖日期',
            type: 'warning'
          })
          return
        } else {
          for (var ls = 0; ls < this.form.productSpecLineList.length; ls++) {
            newproductSpecLineList.push({
              saleDate: this.form.productSpecLineList[ls].date,
              price: this.form.productSpecLineList[ls].content,
              stockCount: this.form.productSpecLineList[ls].contents
            })
          }
          this.form.productSpecLineList = newproductSpecLineList
        }
        var pamerss = {
          'id': this.form.productIds,
          'productSpecs': this.form.productSpecs,
          'unit': this.form.unit,
          'purchasePrice': this.form.purchasePrice,
          'productSpecUserGradeList': this.form.productSpecUserGradeList,
          'productSpecLineList': this.form.productSpecLineList,
          'productSpecGroup': this.form.productSpecGroup,
          'productImgList': this.form.productImgList,
          'isGroup': this.form.isGroup,
          'languageId': this.form.languageId,
          'productSpecStock': {
            'id': this.form.productSpecStock.id,
            'specId': this.form.productSpecStock.specId,
            'stockFictitiousCount': this.form.productSpecStock.stockFictitiousCount,
            'stockLimitCount': this.form.productSpecStock.stockLimitCount,
            'stockCount': this.form.productSpecStock.stockCount
          }
        }

        if (pamerss.productSpecs === '' || pamerss.productSpecs === undefined || pamerss.productSpecStock.stockCount === '' || pamerss.productSpecStock.stockCount === undefined || pamerss.productSpecStock.stockFictitiousCount === '' || pamerss.productSpecStock.stockFictitiousCount === undefined || pamerss.productSpecStock.stockLimitCount === '' || pamerss.productSpecStock.stockLimitCount === undefined) {
          this.$message({
            message: '请完善规格数据',
            type: 'warning'
          })
          crud.form.productSpecList = []
        } else {
          var isbreak = false
          for (var se = 0; se < pamerss.productSpecUserGradeList.length; se++) {
            if (pamerss.productSpecUserGradeList[se].minNum > pamerss.productSpecUserGradeList[se].limitNum) {
              isbreak = true
            }
          }
          if (isbreak) {
            this.$message({
              message: '最低购买数量不能大于限购数量',
              type: 'warning'
            })
          } else {
            crud.form.productSpecList.push(pamerss)
            if (this.form.id !== null) {
              const data = crud.form.productSpecList
              productSpecBatch(this.form.id, this.form.languageId, data).then(res => {

              })
            }
          }
        }
      }
    },
    // 添加商品标签
    handleClose(tag) {
      this.form.productLabelList.splice(this.form.productLabelList.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        var pamers = {
          labelName: inputValue
        }
        this.form.productLabelList.push(pamers)
      }
      this.inputVisible = false
      this.inputValue = ''
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
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('上传商品图片大小不能超过 1MB!')
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
      sysfileAdds(formData)
        .then(
          function(response) {
            var params = {
              'languageId': 1,
              'status': 1,
              'sortNo': 1,
              'defaultShow': false,
              'specs': _this.form.productSpecs,
              'specId': _this.form.productIds,
              'image': response.data.key,
              'key': response.data.key,
              'url': response.data.url,
              'name': response.data.fileName
            }
            _this.form.productImgList.push(params)
          })
    },
    changeFun(value) {
      if (value.includes(1) === true) {
        this.form.isDefaultone = true
      } else {
        this.form.isDefaultone = false
      }
      if (value.includes(2) === true) {
        this.form.isDefaulttwo = true
      } else {
        this.form.isDefaulttwo = false
      }
      if (value.includes(3) === true) {
        this.form.isDefaultthree = true
      } else {
        this.form.isDefaultthree = false
      }
      this.form.productTransportList = []
      this.form.kong = value
    },
    Commissionchange() {
      this.form.costType = ''
      this.form.proportion = ''
      this.form.amount = ''
    },
    productAttrs() {
      this.form.dialogFormVisible = true
    },

    // 添加商品规格一
    attributeClose(tag) {
      this.form.attributeValueList.splice(this.form.attributeValueList.indexOf(tag), 1)
    },
    attributeadd() {
      this.form.attributeVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    attributeConfirm() {
      const attributeValue = this.form.attributeValue
      if (attributeValue) {
        var pamers = {
          value: attributeValue
        }
        this.form.attributeValueList.push(pamers)
      }
      this.form.attributeVisible = false
      this.form.attributeValue = ''
    },

    // 添加商品规格二
    attributeCloses(tag) {
      this.form.attributeValueLists.splice(this.form.attributeValueLists.indexOf(tag), 1)
    },
    attributeadds() {
      this.form.attributeVisibles = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    attributeConfirms() {
      const attributeValues = this.form.attributeValues
      if (attributeValues) {
        var pamers = {
          value: attributeValues
        }
        this.form.attributeValueLists.push(pamers)
      }
      this.form.attributeVisibles = false
      this.form.attributeValues = ''
    },
    // 第二种规格显示
    attributetwo() {
      this.form.dialogFormVisibles = true
      this.form.deletsss = true
    },
    // 第二种规格隐藏
    attributeDeledt() {
      this.form.dialogFormVisibles = false
      this.form.deletsss = false
      this.form.attributeValueLists = []
      this.form.attributes = ''
      this.form.productAttributeList = []
    },

    // 下一步
    attributeAdds() {
      this.form.productAttributeList = []
      if (this.form.attributeValueList.length < 1) {
        this.$message({
          message: '请完善规格一数据',
          type: 'warning'
        })
        this.form.productAttributeList = []
        return
      } else if (this.form.attribute === '') {
        this.$message({
          message: '请完善规格一数据',
          type: 'warning'
        })
        this.form.productAttributeList = []
        return
      } else {
        this.form.productAttributeList.push({
          attribute: this.form.attribute,
          attributeValueList: this.form.attributeValueList
        })
      }
      if (this.form.deletsss === true && this.form.attributeValueLists.length < 1) {
        this.$message({
          message: '请完善规格二数据',
          type: 'warning'
        })
        this.form.productAttributeList = []
        return
      } else if (this.form.deletsss === true && this.form.attributes === '') {
        this.$message({
          message: '请完善规格二数据',
          type: 'warning'
        })
        this.form.productAttributeList = []
        return
      } else if (this.form.deletsss === true) {
        this.form.productAttributeList.push({
          attribute: this.form.attributes,
          attributeValueList: this.form.attributeValueLists
        })
      }
      if (this.form.attributeValueList.length < 2 && this.form.attributeValueLists.length < 2) {
        this.$message({
          message: '多规格商品最少添加两种规格',
          type: 'warning'
        })
        return
      }
      this.form.productSpecs = ''
      this.form.retailPrice = ''
      this.form.storePrice = ''
      this.form.platFormPrice = ''
      this.form.discountPrice = ''
      this.form.vipPrice = ''
      this.form.limitNum = ''
      this.form.minNum = ''
      this.form.languageId = 1
      this.form.productSpecStock.stockCount = ''
      this.form.productSpecStock.stockFictitiousCount = ''
      this.form.productSpecStock.stockLimitCount = ''
      this.form.isGroup = false
      this.form.productSpecGroup = {}
      this.form.productImgguigeList = this.$refs.upload
      if (this.form.productImgguigeList && this.form.productImgguigeList.length) {
        this.form.productImgguigeList.forEach(item => {
          item.clearFiles()
        })
      }
      this.form.productImgguigeList = []
      this.form.dialogFormVisible = false
      this.form.dialogFormproduct = true
      this.form.ok = true

      this.form.zum = []

      this.form.xunhuan = this.form.productAttributeList
      for (const index in this.form.xunhuan) { // 循环的次数
        this.getDate(this.form.zum, this.form.xunhuan[index])
      }

      for (const index in this.zum) {
        this.form.zum[index].unit = ''// 单位
        this.form.zum[index].purchasePrice = ''// 采购价
        this.form.zum[index].productSpecStock.stockCount = ''// 库存
        this.form.zum[index].productSpecStock.stockFictitiousCount = ''// 虚拟库存
        this.form.zum[index].productSpecStock.stockLimitCount = ''// 预警库存

        this.form.zum[index].productSpeclintvisible = false// 显示隐藏
        this.form.zum[index].productSpecLineList = []// 日历//
        this.form.zum[index].languageId = 1
        this.form.zum[index].isGroup = false
        this.form.zum[index].productSpecUserGradeList = [
          {
            userGradeId: 1000,
            retailPrice: '',
            storePrice: '',
            platFormPrice: '',
            discountPrice: '',
            vipPrice: '',
            limitNum: '',
            minNum: ''
          }
        ]// 价格体系
      }
      this.form.xunhuan = this.form.zum
    },
    getDate(zum, first) { // 公共存的集合  第一个集合
      if (zum.length !== 0) {
        const item = first.attributeValueList
        const zumto = []
        for (const index in zum) {
          for (const to in item) {
            const ss = {}
            ss.productSpecs = zum[index].productSpecs + ',' + first.attribute + ':' + item[to].value
            ss.productSpecStock = {}// 库存
            ss.productSpecGroup = {}// 拼团
            ss.languageId = 1
            ss.isGroup = false
            ss.productSpeclintvisible = false
            ss.productSpecLineList = []
            ss.productSpecStock = {
              stockCount: '',
              stockFictitiousCount: '',
              stockLimitCount: ''
            }// 库存
            ss.productSpecUserGradeList = [
              {
                userGradeId: 1000,
                retailPrice: '',
                storePrice: '',
                platFormPrice: '',
                discountPrice: '',
                vipPrice: '',
                limitNum: '',
                minNum: ''
              }
            ]
            zumto.push(ss)
          }
        }
        this.form.zum = zumto
      } else {
        const item = first.attributeValueList
        for (const index in item) {
          const ss = {}
          ss.productSpecs = first.attribute + ':' + item[index].value
          ss.productSpecStock = {}// 库存
          ss.productSpecGroup = {}// 拼团
          ss.isGroup = false
          ss.languageId = 1
          ss.productSpeclintvisible = false
          ss.productSpecLineList = []
          ss.productSpecStock = {
            stockCount: '',
            stockFictitiousCount: '',
            stockLimitCount: ''
          }// 库存
          ss.productSpecUserGradeList = [
            {
              userGradeId: 1000,
              retailPrice: '',
              storePrice: '',
              platFormPrice: '',
              discountPrice: '',
              vipPrice: '',
              limitNum: '',
              minNum: ''
            }
          ]
          zum.push(ss)
        }
        this.form.zum = zum
      }
    },
    // 展示多规格商品数据
    attributeEdits() {
      this.form.ok = true
      this.form.dialogFormproduct = true
      this.form.dialogFormVisible = false
    },

    // 多规格商品轮播图删除
    handleguigeRemove(file, productImgList) {
      for (const i in this.form.xunhuan) {
        for (const j in this.form.xunhuan[i].productImgguigeList) {
          if (this.form.xunhuan[i].productImgguigeList[j].id === file.id) {
            this.form.xunhuan[i].productImgguigeList.splice(j, 1)
          }
        }
      }
    },
    beforeAvatarUploads(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('上传商品图片大小不能超过 1MB!')
      }
      return isLt1M
    },
    handleguigeExceed(files, productImgList) {
      this.$message.warning(`当前限制选择 5 个文件`)
      this.form.productImgguigeList = productImgList
    },

    // 多规格商品轮播图添加
    fileguigeAdd(productImgList) {
      const myfile = productImgList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      var newspecs = ''
      sysfileAdds(formData)
        .then(
          function(response) {
            for (var i = 0; i < _this.form.xunhuan.length; i++) {
              const index = myfile.data.index
              _this.form.xunhuan[index].productImgguigeList = []
              newspecs = _this.form.xunhuan[index].productSpecs
              var params = {
                'languageId': 1,
                'status': 1,
                'sortNo': 1,
                'defaultShow': false,
                'specs': newspecs,
                'image': response.data.key,
                'url': response.data.url
              }
              _this.form.xunhuan[index].productImgguigeList.push(params)
            }
          })
    },
    // 多规格数据添加
    productAttributeListAdd() {
      this.form.xunhuan.forEach(item => {
        if (item.productImgguigeList.length < 1) {
          this.$message({
            message: '请添加多规格图片',
            type: 'warning'
          })
        }
      })
      this.form.productSpecList = []
      for (var i = 0; i < this.form.xunhuan.length; i++) {
        const pamers = {
          'id': this.form.xunhuan[i].id,
          'productSpecs': this.form.xunhuan[i].productSpecs,
          'unit': this.form.xunhuan[i].unit,
          'purchasePrice': this.form.xunhuan[i].purchasePrice,
          'productImgList': this.form.xunhuan[i].productImgguigeList,
          'isGroup': this.form.isGroup,
          'languageId': this.form.languageId,
          'productSpecUserGradeList': this.form.xunhuan[i].productSpecUserGradeList,
          'productSpecStock': {
            'id': this.form.xunhuan[i].productSpecStock.id,
            'specId': this.form.xunhuan[i].productSpecStock.specId,
            'stockCount': this.form.xunhuan[i].productSpecStock.stockCount,
            'stockFictitiousCount': this.form.xunhuan[i].productSpecStock.stockFictitiousCount,
            'stockLimitCount': this.form.xunhuan[i].productSpecStock.stockLimitCount
          }
        }
        if (pamers.unit === '' || pamers.purchasePrice === '' || pamers.productSpecStock.stockCount === '' || pamers.productSpecStock.stockFictitiousCount === '' || pamers.productSpecStock.stockLimitCount === '') {
          this.$message({
            message: '请完善多规格数据',
            type: 'warning'
          })
          this.form.productSpecList = []
          break
        } else {
          for (var s = 0; s < pamers.productSpecUserGradeList.length; s++) {
            if (pamers.productSpecUserGradeList[s].minNum > pamers.productSpecUserGradeList[s].limitNum) {
              this.$message({
                message: '最低购买数量不能大于限购数量',
                type: 'warning'
              })
              break
            } else {
              this.form.productSpecList.push(pamers)
              this.form.dialogFormproduct = false
            }
          }
        }
      }
      if (this.form.productSpecList.length !== 0) {
        if (this.form.id !== null) {
          productSpecBatch(this.form.id, this.form.languageId, this.form.productSpecList).then(res => {})
        }
      }
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
  .myinput{
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
</style>
<style>
  .editor{
    width: 810px !important;
  }
</style>
