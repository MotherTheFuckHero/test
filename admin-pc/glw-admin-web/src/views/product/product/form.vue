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
      <el-form-item label="商品类型" prop="productType">
        <el-select v-model="form.productType" clearable :disabled="productdisabled" style="width: 200px;">
          <el-option
            v-for="item in productTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.productType===1 || form.productType===6" label="商品分类" prop="catId" :rules="[{ required: true, message: '请选择商品分类', trigger: 'blur' }]">
        <el-select v-model="form.catId" clearable style="width: 200px;">
          <el-option
            v-for="item in catIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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
<!--      <el-form-item label="单位" prop="productDesc.unit" :rules="[[`productDesc.unit`],{ required: true, message: '请输入单位', trigger: 'blur' }]">-->
<!--        <el-input v-model="form.productDesc.unit" maxlength="32" style="width: 200px;" />-->
<!--      </el-form-item>-->
      <el-form-item label="营业时间" prop="productDesc.availableDates" :rules="[[`productDesc.availableDates`],{ required: true, message: '请输入营业时间', trigger: 'blur' }]">
        <el-input v-model="form.productDesc.availableDates" placeholder="0:00——24:00" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="排序编号" prop="sortNo" :rules="[{ required: true, message: '请输入排序编号', trigger: 'blur' }]">
        <el-input v-model="form.sortNo" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item  label="商品编号" prop="code" :rules="[{ required: true, message: '请输入商品编号', trigger: 'blur' }]">
        <el-input v-model="form.code"  maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
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
        <el-input v-model.number="form.proportion" type="number" maxlength="5" style="width: 200px;" placeholder="输入0-1，如：50%，输入0.5" @mousewheel.native.prevent />
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
      </el-form-item>

      <!--        票务显示-->
      <div v-if="form.productType===2 || form.productType===3||form.productType===5" style="border: 1px dashed #ccc;padding: 20px 0 5px 0;margin-bottom:20px; ">
        <el-form-item label="开始日期" prop="productTicket.startDate" :rules="[[`productTicket.startDate`],{ required: true, message: '请选择售票开始日期时间', trigger: 'blur' }]" label-width="110px">
          <el-date-picker
            v-model="form.productTicket.startDate"
            type="datetime"
            placeholder="选择售票日期时间"
            style="width: 190px;"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="结束日期" prop="productTicket.endDate" :rules="[[`productTicket.endDate`],{ required: true, message: '请选择售票结束日期时间', trigger: 'blur' }]" label-width="110px">
          <el-date-picker
            v-model="form.productTicket.endDate"
            type="datetime"
            placeholder="选择售票日期时间"
            style="width: 190px;"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="下单次数" prop="productTicket.orderCount" label-width="120px">
          <el-input v-model="form.productTicket.orderCount" type="number" style="width: 180px;" />
        </el-form-item>
        <el-form-item label="使用有效期" prop="productTicket" label-width="120px">
          <el-radio-group v-model="form.productTicket.availableType" style="width:485px;">
            <el-radio class="radio" :label="1">当天</el-radio>
            <el-radio class="radio" :label="2">购票日起n日有效</el-radio>
            <el-radio class="radio" :label="3">选择截止日期</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="减免价格" prop="productTicket.remitPrice" label-width="120px">
          <el-input v-model="form.productTicket.remitPrice" type="number" style="width: 180px;" />
        </el-form-item>
        <el-form-item label="是否实名制" prop="productTicket" label-width="120px">
          <el-radio-group v-model="form.productTicket.isRealName" style="width: 180px;">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="预约售票" prop="productTicket" label-width="120px">
          <el-radio-group v-model="form.productTicket.isBooking" style="width: 180px;">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.productTicket.availableType===2" label="有效日数" prop="productTicket.availableDay" :rules="[{ required: true, message: '请输入有效日数'}]" label-width="120px">
          <el-input v-model="form.productTicket.availableDay" type="number" style="width: 180px;" />
        </el-form-item>
        <el-form-item v-if="form.productTicket.availableType===3" label="有效截止日" prop="productTicket.availableDate" :rules="[{ required: true, message: '请输入有效截止日'}]" label-width="120px">
          <el-date-picker
            v-model="form.productTicket.availableDate"
            type="datetime"
            placeholder="选择日期时间"
            style="width: 180px;"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item v-if="form.productTicket.isBooking===1" label="每日可预约票数" prop="productTicket.bookingCount" :rules="[{ required: true, message: '请输入每日可预约票数' }]" label-width="120px">
          <el-input v-model="form.productTicket.bookingCount" type="number" placeholder="每日可预约票数" style="width: 180px;" />
        </el-form-item>
        <el-form-item v-if="form.productTicket.isBooking===1" label="可预约天数限制" prop="productTicket.bookingDays" :rules="[{ required: true, message: '请输入可预约天数限制' }]" label-width="120px">
          <el-input v-model="form.productTicket.bookingDays" type="number" placeholder="可预约天数限制(天)" style="width: 180px;" />
        </el-form-item>
        <el-form-item v-if="form.productTicket.isBooking===1" label="不可预约" prop="productTicket.unAvailableDateList" label-width="120px">
          <el-date-picker
            ref="datesRef"
            v-model="form.productTicket.unAvailableDateList"
            style="width: 485px;"
            type="dates"
            :editable="false"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择一个或多个日期"
          />
        </el-form-item>
      </div>

      <div v-if="form.duoguige===2" label-width="100px">
        <el-form-item label="语言" prop="languageId" :rules="[{ required: true, message: '请选择规格语言', trigger: 'blur' }]">
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
<!--          <el-input v-model="form.productSpecStock.stockCount" type="number"  onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />-->
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
        <el-form-item label="商品条码" prop="barCode" >
          <el-input v-model="form.barCode" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
        </el-form-item>
        <el-form-item label="是否拼团" prop="isGroup">
          <el-radio-group v-model="form.isGroup" style="width: 180px;">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
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
        <el-form-item label="语言" prop="languageId">
          <el-select v-model="form.languageId" style="width: 460px;" placeholder="语言" @change="languagechange">
            <el-option
              v-for="item in languageIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
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
<!--              <input v-model="item.productSpecStock.stockCount" class="myinput"  onkeyup="value=value.replace(/[^0-9]/ig,'')" type="number" style="width: 200px;" @mousewheel.native.prevent>-->
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
            <el-form-item label="商品条码" prop="barCode">
              <el-input v-model="item.barCode" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="是否拼团" prop="isGroup">
              <el-radio-group v-model="item.isGroup" style="width: 200px;">
                <el-radio class="radio" :label="true">是</el-radio>
                <el-radio class="radio" :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="item.isGroup===true">
              <el-form-item label="到时间是否默认拼团成功" label-width="150" style="width: 500px;">
                <el-radio-group v-model="item.productSpecGroup.isSuccess" style="width: 180px;">
                  <el-radio class="radio" :label="true">是</el-radio>
                  <el-radio class="radio" :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <br>
              <el-form-item label="拼团时长(分钟)" label-width="120" style="width: 300px;" prop="productSpecGroup.duration">
                <el-input v-model="item.productSpecGroup.duration" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 180px;" @mousewheel.native.prevent />
              </el-form-item>
              <el-form-item label="商品拼团价格" prop="productSpecGroup.groupPrice" label-width="120" style="width: 300px;">
                <el-input v-model="item.productSpecGroup.groupPrice" type="number" maxlength="32" style="width: 180px;" @mousewheel.native.prevent />
              </el-form-item>
              <el-form-item label="最低拼单人数" prop="productSpecGroup.limitPeos" label-width="120" style="width: 300px;">
                <el-input v-model="item.productSpecGroup.limitPeos" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 180px;" @mousewheel.native.prevent />
              </el-form-item>
              <el-form-item label="拼团分享标题" prop="productSpecGroup.shareTitle" label-width="120" style="width: 300px;">
                <el-input v-model="item.productSpecGroup.shareTitle" maxlength="32" style="width: 180px;" />
              </el-form-item>
              <el-form-item label="拼团分享内容" prop="productSpecGroup.shareContent" label-width="120" style="width: 300px;">
                <el-input v-model="item.productSpecGroup.shareContent" maxlength="32" style="width: 180px;" />
              </el-form-item>
              <el-form-item label="分享图片" prop="productSpecGroup.shareImage" style="display: block">
                <el-upload
                  ref="upload"
                  action="/"
                  :http-request="fileshareImageListAdd"
                  :limit="1"
                  :data="{'index':index}"
                  :file-list="item.shareImageList"
                  :on-exceed="handleshareImageListExceed"
                  list-type="picture-card"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                  :on-remove="handleshareImageListRemove"
                  :before-upload="beforeAvatarshareImageListUpload"
                >
                  <em class="el-icon-plus" />
                </el-upload>
              </el-form-item>
            </template>
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
                <el-form-item label="操作">
                  <el-button @click="addsproductSpecUserGrade(index)">+设置商品价格价格体系</el-button>
                </el-form-item>
              </el-row>
            </template>
            <el-dialog title="商品多价格添加" :visible.sync="item.productSpecUserGradeListVisibles" width="1000px" append-to-body>
              <el-button type="primary" plain icon="el-icon-plus" @click="addsproductSpecUserGradeList(index)">添加多价格</el-button>
              <template v-for="(items,indexs) in item.productSpecUserGradeList">
                <el-row v-if="indexs>=1" :key="indexs">
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
                  <el-form-item label="操作">
                    <el-button v-if="indexs !== 0" type="danger" plain icon="el-icon-delete" @click="deletesproductSpecUserGradeList(index,indexs)">删除</el-button>
                  </el-form-item>
                </el-row>
              </template>
              <el-form-item style="display: inline">
                <el-button type="primary" style="float:right;margin-right: 50px;" @click="addsproductSpecUserGrades(index)">确定</el-button>
              </el-form-item>
            </el-dialog>
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
                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.mp4"
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
import { ProductTypeList, RefundTypeList, TransportTypeList, getproductattributeList, putproductattributeList } from '@/api/product/product'
import { getuserGradeLists } from '@/api/user/userGrade'
import { divideGet } from '@/api/product/category'
import { getpostagetemplateLists } from '@/api/product/postagetemplate'
import { sysfileAdds } from '@/api/upload'
import { getlanguageLists } from '@/api/system/language'
import CRUD from '@crud/crud'
import Editor from '../../Editor'
import { productSpecBatch } from '@/api/product/productSpec'
const defaultForm = {
  id: null,

  amount: '',
  proportion: '',
  costType: '',
  productType: '',
  catId: '',
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
  purchasePrice: '',
  barCode: '',
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
  productSpecStock: {
    stockCount: '',
    stockFictitiousCount: '',
    stockLimitCount: '',
    specId: '',
    id: ''
  },
  // 拼团参数
  productSpecGroup: {
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
  /* 运送方式*/
  isDefaultone: false,
  isDefaulttwo: false,
  isDefaultthree: false,

  /* 是否独立提成*/
  Commission: false,

  /* 是否多规格   1多规格  2单规格*/
  duoguige: 2,

  /* 商品类型为票务类型*/
  productTicket: {
    'id': '',
    'startDate': '',
    'endDate': '',
    'availableType': 1,
    'remitPrice': '',
    'orderCount': '',
    'availableDate': '',
    'availableDay': '',
    'isRealName': 1,
    'isBooking': 0,
    'bookingCount': 100,
    'bookingDays': 30,
    'unAvailableDateList': [

    ]
  },

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
  // 多规格分享图片
  shareImageList: [],

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
  components: { Editor },
  mixins: [form(defaultForm)],
  data() {
    return {
      languageIdList: [],
      // 禁止库存编辑
      stockCountdisabled: false,
      productdisabled: false,
      inputVisible: false,
      productSpecUserGradeListVisible: false,
      inputValue: '',

      merchantIdList: [],
      userGradeIdLists: [],
      productTypeList: [],
      catIdList: [],
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
        productType: [
          {
            required: true,
            message: '请选择商品类型',
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
        const data = {
          id: this.form.merchantId,
          status: 3
        }
        getmerchantLists(data).then(res => {
          if (res.data[0].bizType === 7) {
            this.form.productType = 6
            this.productdisabled = true
          } else {
            this.productdisabled = false
          }
        })
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
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
    ProductTypeList(data).then(res => {
      this.productTypeList = res.data
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
    divideGet().then(res => {
      for (var i = 0; i < res.data.length; i++) {
        var pamers = {
          'name': res.data[i].name,
          'id': res.data[i].id
        }
        this.catIdList.push(pamers)
        for (var s = 0; s < res.data[i].children.length; s++) {
          var childrens = {
            'name': res.data[i].children[s].name,
            'id': res.data[i].children[s].id
          }
          this.catIdList.push(childrens)
          for (var ss = 0; ss < res.data[i].children[s].children.length; ss++) {
            var childrenss = {
              'name': res.data[i].children[s].children[ss].name,
              'id': res.data[i].children[s].children[ss].id
            }
            this.catIdList.push(childrenss)
          }
        }
      }
    })
  },

  methods: {
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

    // 显示多规格添加多价格
    addsproductSpecUserGrade(index) {
      this.form.xunhuan[index].productSpecUserGradeListVisibles = true
    },
    // 确定多规格添加多价格
    addsproductSpecUserGrades(index) {
      var istrue = ''
      var GradeList = []
      for (var s = 0; s < this.form.xunhuan[index].productSpecUserGradeList.length; s++) {
        GradeList.push(this.form.xunhuan[index].productSpecUserGradeList[s].userGradeId)
        if (this.form.xunhuan[index].productSpecUserGradeList[s].userGradeId === '' || this.form.xunhuan[index].productSpecUserGradeList[s].retailPrice === '' || this.form.xunhuan[index].productSpecUserGradeList[s].storePrice === '' || this.form.xunhuan[index].productSpecUserGradeList[s].platFormPrice === '' || this.form.xunhuan[index].productSpecUserGradeList[s].discountPrice === '' || this.form.xunhuan[index].productSpecUserGradeList[s].vipPrice === '' || this.form.xunhuan[index].productSpecUserGradeList[s].limitNum === '' || this.form.xunhuan[index].productSpecUserGradeList[s].minNum === '') {
          istrue = false
          break
        } else {
          istrue = true
        }
      }
      if (istrue) {
        if (GradeList.length === 1) {
          this.form.xunhuan[index].productSpecUserGradeListVisibles = false
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
              this.form.xunhuan[index].productSpecUserGradeListVisibles = false
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
    // 多规格添加多价格
    addsproductSpecUserGradeList(index) {
      this.form.xunhuan[index].productSpecUserGradeList.push({
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
    // 多规格删除多价格
    deletesproductSpecUserGradeList(index, indexs) {
      this.form.xunhuan[index].productSpecUserGradeList.splice(indexs, 1)
    },

    // 新增打开前做的操作  //允许编辑库存
    [CRUD.HOOK.beforeToAdd]() {
      this.stockCountdisabled = false
    },
    // 编辑打开前做的操作  //禁止编辑库存
    [CRUD.HOOK.beforeToEdit]() {
        console.log(this.form)
        if(this.form.productType==6){
            this.stockCountdisabled = true
        }else {
            this.stockCountdisabled = false
        }
    },
    // 新增与编辑提交前做的操作
    [CRUD.HOOK.beforeSubmit](crud, form) {
      if (this.form.costType === 1 && this.form.proportion > 1) {
        this.$message({
          message: '请输入正确比例',
          type: 'warning'
        })
        return
      }
      if (this.form.productType !== 1 && this.form.productType !== 6 && this.form.productType !== '') {
        this.form.catId = 0
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
        for (var i = 0; i < this.form.xunhuan.length; i++) {
          const pamers = {
            'id': this.form.xunhuan[i].id,
            'productSpecs': this.form.xunhuan[i].productSpecs,
            'unit': this.form.xunhuan[i].unit,
            'purchasePrice': this.form.xunhuan[i].purchasePrice,
            'barCode': this.form.xunhuan[i].barCode,
            'productSpecUserGradeList': this.form.xunhuan[i].productSpecUserGradeList,
            'isGroup': this.form.xunhuan[i].isGroup,
            'languageId': this.form.languageId,
            'productImgList': this.form.xunhuan[i].productImgguigeList,
            'productSpecStock': {
              'id': this.form.xunhuan[i].productSpecStock.id,
              'specId': this.form.xunhuan[i].productSpecStock.specId,
              'stockCount': this.form.xunhuan[i].productSpecStock.stockCount,
              'stockFictitiousCount': this.form.xunhuan[i].productSpecStock.stockFictitiousCount,
              'stockLimitCount': this.form.xunhuan[i].productSpecStock.stockLimitCount
            }

          }
          if (pamers.isGroup) {
            pamers.productSpecGroup = {
              'id': this.form.xunhuan[i].productSpecGroup.id,
              'productId': this.form.xunhuan[i].productSpecGroup.productId,
              'specId': this.form.xunhuan[i].productSpecGroup.specId,
              'duration': this.form.xunhuan[i].productSpecGroup.duration,
              'groupPrice': this.form.xunhuan[i].productSpecGroup.groupPrice,
              'isSuccess': this.form.xunhuan[i].productSpecGroup.isSuccess,
              'limitPeos': this.form.xunhuan[i].productSpecGroup.limitPeos,
              'shareContent': this.form.xunhuan[i].productSpecGroup.shareContent,
              'shareTitle': this.form.xunhuan[i].productSpecGroup.shareTitle,
              'shareImage': this.form.xunhuan[i].productSpecGroup.shareImage,
              'sponsorCoupRatio': 0
            }
          }
          crud.form.productSpecList.push(pamers)
        }
      } else {
        crud.form.multiSpec = false
        var pamerss = {
          'id': this.form.productIds,
          'productSpecs': this.form.productSpecs,
          'unit': this.form.unit,
          'purchasePrice': this.form.purchasePrice,
          'barCode': this.form.barCode,
          'productSpecUserGradeList': this.form.productSpecUserGradeList,
          'productSpecGroup': this.form.productSpecGroup,
          'isGroup': this.form.isGroup,
          'languageId': this.form.languageId,
          'productImgList': this.form.productImgList,
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
      if (crud.form.productType === 2 || crud.form.productType === 3 || crud.form.productType === 5) {
        if (crud.form.productTicket.startDate === '' || crud.form.productTicket.startDate === undefined || crud.form.productTicket.endDate === '' || crud.form.productTicket.endDate === undefined) {
          this.$message({
            message: '请完善票务信息',
            type: 'warning'
          })
          return
        } else {
          const dateList = []
          for (let i = 0; i < crud.form.productTicket.unAvailableDateList.length; i++) {
            dateList.push({ 'unAvailableDate': crud.form.productTicket.unAvailableDateList[i] })
          }
          crud.form.productTicket.unAvailableDateList = []
          crud.form.productTicket.unAvailableDateList = dateList
        }
      } else {
        this.form.productTicket = {}
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
      this.getattributeList()
    },
    getattributeList() {
      if (this.form.id !== null) {
        const data = {
          productId: this.form.id,
          languageId: this.form.languageId
        }
        getproductattributeList(data).then(res => {
          /* 多规格标题*/
          if (res.data.length > 0) {
            // this.form.attribute = ''
              this.$set(this.form,'attribute','')
            // this.form.attributeId=''
            this.form.attributeLanguageId = ''
            for (let s = 0; s < res.data.length; s++) {
              // this.form.attribute = res.data[0].attribute
              this.$set(this.form,'attribute',res.data[0].attribute)
              this.form.attributeId = res.data[0].id
              this.form.attributeLanguageId = res.data[0].attributeLanguageId
              this.form.attributeValueList = []
              for (let ss = 0; ss < res.data[0].productAttributeValueList.length; ss++) {
                this.form.attributeValueList.push(res.data[0].productAttributeValueList[ss])
              }
              if (res.data.length === 2) {
                // this.form.attributes = ''
                this.$set(this.form,'attributes','')
                // this.form.attributeId=''
                this.form.attributeLanguageIds = ''
                this.form.dialogFormVisibles = true
                this.form.deletsss = true
                // this.form.attributes = res.data[1].attribute
                this.$set(this.form,'attributes',res.data[1].attribute)
                this.form.attributeIds = res.data[1].id
                this.form.attributeLanguageIds = res.data[1].attributeLanguageId
                this.form.attributeValueLists = []
                for (let ss = 0; ss < res.data[1].productAttributeValueList.length; ss++) {
                  this.form.attributeValueLists.push(res.data[1].productAttributeValueList[ss])
                }
              }
            }
          } else {
            this.form.attribute = ''
            this.form.attributeValueList = []
            this.attributeDeledt()
          }
        })
      }
    },

    // 多规格语言切换
    languagechange() {
      this.getattributeList()
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
          value: attributeValue,
          languageId: this.form.languageId
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
          value: attributeValues,
          languageId: this.form.languageId
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
          id: this.form.attributeId,
          attributeLanguageId: this.form.attributeLanguageId,
          languageId: this.form.languageId,
          productId: this.form.id !== null ? this.form.id : '',
          productAttributeValueList: this.form.attributeValueList
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
          id: this.form.attributeIds,
          attributeLanguageId: this.form.attributeLanguageIds,
          languageId: this.form.languageId,
          productId: this.form.id !== null ? this.form.id : '',
          productAttributeValueList: this.form.attributeValueLists
        })
      }
      if (this.form.attributeValueList.length < 2 && this.form.attributeValueLists.length < 2) {
        this.$message({
          message: '多规格商品最少添加两种规格',
          type: 'warning'
        })
        return
      }
      // 标多规格题修改
      if (this.form.id !== null) {
        const data = this.form.productAttributeList
        putproductattributeList(data).then(res => { // 修改
        })
      }
      this.form.productSpecs = ''
      this.form.retailPrice = ''
      this.form.storePrice = ''
      this.form.platFormPrice = ''
      this.form.discountPrice = ''
      this.form.vipPrice = ''
      this.form.limitNum = ''
      this.form.minNum = ''
      this.form.productSpecStock.stockCount = ''
      this.form.productSpecStock.stockFictitiousCount = ''
      this.form.productSpecStock.stockLimitCount = ''
      this.form.isGroup = ''
      this.form.languageId = this.form.languageId
      this.form.productSpecGroup = {}
      this.form.productImgguigeList = this.$refs.upload
      if (this.form.productImgguigeList && this.form.productImgguigeList.length) {
        this.form.productImgguigeList.forEach(item => {
          item.clearFiles()
        })
      }
      this.form.productImgguigeList = []
      this.form.shareImageList = this.$refs.upload
      if (this.form.shareImageList && this.form.shareImageList.length) {
        this.form.shareImageList.forEach(item => {
          item.clearFiles()
        })
      }
      this.form.shareImageList = []
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
        this.form.zum[index].barCode = ''// 商品条码
        this.form.zum[index].productSpecUserGradeListVisibles = false// 显示隐藏
        this.form.zum[index].productSpecStock.stockCount = ''// 库存
        this.form.zum[index].productSpecStock.stockFictitiousCount = ''// 虚拟库存
        this.form.zum[index].productSpecStock.stockLimitCount = ''// 预警库存
        this.form.zum[index].isGroup = false
        this.form.zum[index].languageId = ''
        this.form.zum[index].productSpecGroup.duration = ''
        this.form.zum[index].productSpecGroup.groupPrice = ''
        this.form.zum[index].productSpecGroup.isSuccess = true
        this.form.zum[index].productSpecGroup.limitPeos = ''
        this.form.zum[index].productSpecGroup.shareContent = ''
        this.form.zum[index].productSpecGroup.shareTitle = ''
        this.form.zum[index].productSpecGroup.shareImage = ''
        this.form.zum[index].productSpecGroup.sponsorCoupRatio = 0
        this.form.zum[index].shareImageList = []
        this.form.zum[index].productImgguigeList = []
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
        const item = first.productAttributeValueList
        const zumto = []
        for (const index in zum) {
          for (const to in item) {
            const ss = {}
            ss.productSpecs = zum[index].productSpecs + ',' + first.attribute + ':' + item[to].value
            ss.productSpecStock = {}// 库存
            ss.productSpecGroup = {}// 拼团
            ss.shareImageList = []
            ss.productImgguigeList = []
            ss.isGroup = false
            ss.languageId = ''
            ss.productSpecGroup = {
              duration: '', // 分钟
              groupPrice: '', // 拼单价格
              isSuccess: true, // 到时间是否默认成功
              limitPeos: '', // 最低拼单人数
              shareContent: '', // 分享内容
              shareTitle: '', // 分享标题
              shareImage: '', // 分享图片
              sponsorCoupRatio: 0 // 发起人优惠百分比
            }// 库存
            ss.productSpecUserGradeListVisibles = false// 显示隐藏
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
        const item = first.productAttributeValueList
        for (const index in item) {
          const ss = {}
          ss.productSpecs = first.attribute + ':' + item[index].value
          ss.productSpecStock = {}// 库存
          ss.productSpecGroup = {}// 拼团
          ss.isGroup = false
          ss.languageId = ''
          ss.shareImageList = []
          ss.productImgguigeList = []
          ss.productSpecGroup = {
            duration: '', // 分钟
            groupPrice: '', // 拼单价格
            isSuccess: true, // 到时间是否默认成功
            limitPeos: '', // 最低拼单人数
            shareContent: '', // 分享内容
            shareTitle: '', // 分享标题
            shareImage: '', // 分享图片
            sponsorCoupRatio: 0 // 发起人优惠百分比
          }// 库存
          ss.productSpecUserGradeListVisibles = false// 显示隐藏
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
        const isLt1M = file.size / 1024 / 1024 < 0.34
        if (!isLt1M) {
            this.$message.error('上传商品图片大小不能超过 300KB!')
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
      return sysfileAdds(formData)
        .then(
          function(response) {
            for (var i = 0; i < _this.form.xunhuan.length; i++) {
              var index = myfile.data.index
              newspecs = _this.form.xunhuan[index].productSpecs
            }
            var params = {
              'languageId': _this.form.languageId,
              'status': 1,
              'sortNo': 1,
              'defaultShow': false,
              'specs': newspecs,
              'image': response.data.key,
              'url': response.data.url
            }
            _this.form.xunhuan[index].productImgguigeList.push(params)
          })
    },

    // 多规格商品拼团宣传图片上传
    handleshareImageListRemove(file, productImgList) {
      this.form.shareImageList.splice(file, 1)
    },
    beforeAvatarshareImageListUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('上传商品图片大小不能超过 1MB!')
      }
      return isLt1M
    },
    handleshareImageListExceed(files, productImgList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.shareImageList = productImgList
    },

    // 多规格商品拼团宣传图片上传
    fileshareImageListAdd(productImgList) {
      const myfile = productImgList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData)
        .then(
          function(response) {
            const index = myfile.data.index
            var params = {
              'size': response.data.size,
              'key': response.data.key,
              'url': response.data.url,
              'name': response.data.fileName
            }
            _this.form.xunhuan[index].shareImageList = []
            _this.form.xunhuan[index].shareImageList.push(params)
            _this.form.xunhuan[index].productSpecGroup.shareImage = response.data.key
          })
    },

    // 多规格数据添加
    productAttributeListAdd() {
      this.form.productSpecList = []
      for (var i = 0; i < this.form.xunhuan.length; i++) {
        const pamers = {
          'id': this.form.xunhuan[i].id,
          'productSpecs': this.form.xunhuan[i].productSpecs,
          'unit': this.form.xunhuan[i].unit,
          'purchasePrice': this.form.xunhuan[i].purchasePrice,
          'barCode': this.form.xunhuan[i].barCode,
          'productSpecUserGradeList': this.form.xunhuan[i].productSpecUserGradeList,
          'isGroup': this.form.xunhuan[i].isGroup,
          'productImgList': this.form.xunhuan[i].productImgguigeList,
          'languageId': this.form.languageId,
          'productSpecLineList': [],
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
  ::v-deep .editor{
    width: 810px !important;
  }
</style>

