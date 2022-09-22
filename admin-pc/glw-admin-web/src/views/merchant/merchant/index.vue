<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="id" label="编号" width="100" />
      <el-table-column prop="companyName" label="公司" width="100px" />
      <el-table-column prop="name" label="商家名称" width="150px" />
      <el-table-column prop="userName" label="店主名称" width="150px" />
      <el-table-column prop="bizTypeDesc" label="商家类型" width="100px" />
      <el-table-column prop="code" label="商家编码" width="100px" />
      <el-table-column prop="cityName" label="城市" width="100px" />
      <el-table-column prop="statusDesc" label="状态" width="100px" />
      <el-table-column prop="auditUserName" label="审核人" width="150px" />
      <el-table-column prop="auditOpinion" label="审核意见" :show-overflow-tooltip="true" width="150px" />
      <el-table-column label="是否自动打印" prop="isAutoPrint" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isAutoPrint"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="是否大商户" prop="isLarge" width="120">
        <template slot-scope="scope">
          {{ scope.row.isLarge === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否个体户" prop="isSelfEmployed" width="120">
        <template slot-scope="scope">
          {{ scope.row.isSelfEmployed === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['merchant_info_update','merchant_info_delete']"
        label="操作"
        width="320px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />

          <el-button v-if="scope.row.status === 2" v-permission="['merchant_info_update']" style="margin: 0 !important;" size="mini" class="filter-item" type="danger" plain @click="examineEdit(scope.$index, scope.row)">审核</el-button>
          <el-button v-if="scope.row.status === 3" v-permission="['merchant_info_update']" style="margin: 0 !important;" size="mini" class="filter-item" type="danger" plain @click="takeEdit(scope.$index, scope.row)">下架</el-button>
          <el-button v-if="scope.row.status === 1 || scope.row.status === 4 || scope.row.status === 5" v-permission="['merchant_info_update']" style="margin: 0 !important;" size="mini" class="filter-item" type="danger" @click="reviewedEdit(scope.$index, scope.row)">提交审核</el-button>
          <el-dropdown size="mini" split-button type="primary">
            其他操作
            <el-dropdown-menu slot="dropdown" style="text-align: center">
              <el-dropdown-item>
                <el-button v-permission="['merchant_info_update']" style="margin: 2px 0" size="mini" class="filter-item" type="primary" @click="contactEdit(scope.$index, scope.row)">联系人</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-permission="['merchant_info_update']" style="margin: 2px 0" class="filter-item" type="primary" @click="AccessoryEdit(scope.$index, scope.row)">附件</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-permission="['merchant_info_update']" style="margin: 2px 0" class="filter-item" type="primary" @click="settlementEdit(scope.$index, scope.row)">结算</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-permission="['merchant_info_update']" style="margin: 2px 0" size="mini" class="filter-item" type="primary" @click="categorysEdit(scope.$index, scope.row)">类目</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-permission="['merchant_info_update']" style="margin: 2px 0" size="mini" class="filter-item" type="primary" @click="extendEdit(scope.$index, scope.row)">扩展</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-permission="['merchant_info_update']" style="margin: 2px 0" size="mini" class="filter-item" type="primary" @click="batchEdit(scope.$index, scope.row)">轮播图</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-permission="['merchant_info_update']" style="margin: 2px 0" size="mini" class="filter-item" type="danger" @click="shopEdit(scope.$index, scope.row)">更换店主</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-if="scope.row.status === 3" v-permission="['distributor_info_add']" style="margin: 2px 0" size="mini" class="filter-item" type="danger" @click="distributorEdit(scope.$index, scope.row)">申请分销</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-permission="['merchant_desc_select']" style="display: inline-block;margin:2px 0!important;" size="mini" type="primary" @click="merchantDesc(scope.row)">基本语言管理</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-permission="['merchant_extend_select']" style="display: inline-block;margin:2px 0 !important;" size="mini" type="primary" @click="extendDesc(scope.row)">扩展语言管理</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" class="demo-addForm">
      <el-dialog title="商户审核" :visible.sync="dialogFormVisible" width="600px">
        <el-form-item label="审核结果" prop="statuss">
          <el-radio-group v-model="addForm.statuss">
            <el-radio class="radio" :label="3">审核通过</el-radio>
            <el-radio class="radio" :label="4">审核未通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见" prop="auditOpinion">
          <el-input v-model="addForm.auditOpinion" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForms('addForm')">完成</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>

    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" class="demo-addForm">
      <el-dialog title="轮播图管理" :visible.sync="lunVisible" width="1140px">
        <div v-for="(v,index) in addForm.lun" :key="index" style="width: 100%;display:inline">
          <div style="width: 200px;display: inline-block;text-align: center">
            <img style="width: 180px;height: 150px;border-radius: 4px;display: inline" :src="v.imgUrl" alt="">
            <p><el-button type="primary" @click="addsss(v,index)">完善图片信息</el-button><el-button type="primary" @click="lunDelete(v,index)">删除</el-button></p>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" style="position:relative">
          <input id="file" ref="myfile" style="position: absolute;opacity: 0;right: 70px;overflow: hidden;z-index: 11;height:38px;width:80px !important;" type="file" accept="image/gif,image.jpg,image/png,image/jpeg,.mp4" @change="fileAdds()">
          <el-button type="primary">上传图片</el-button>
          <el-button type="primary" style="z-index:22 " @click="submitForm('addForm')">完成</el-button>
        </div>
      </el-dialog>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >

      <el-form ref="addForm" :model="addForm" :rules="ruless" label-width="100px" class="demo-addForm">
        <el-form-item label="类型" prop="type" style="display: inline-block">
          <el-select v-model="addForm.type" clearable style="width: 200px;" placeholder="类型" @change="typechange">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="addForm.type===1" label="关联选择" prop="valueId" style="display: inline-block" :rules="[{ required: true, message: '请选择关联数据', trigger: 'blur' }]">
          <el-select v-model="addForm.valueId" clearable filterable style="width: 200px;">
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="addForm.type===2" label="关联选择" prop="valueId" style="display: inline-block" :rules="[{ required: true, message: '请选择关联数据', trigger: 'blur' }]">
          <el-select v-model="addForm.valueId" clearable filterable style="width: 200px;">
            <el-option
              v-for="item in merchantList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="addForm.type===3" label="关联选择" prop="valueId" style="display: inline-block" :rules="[{ required: true, message: '请选择关联数据', trigger: 'blur' }]">
          <el-select v-model="addForm.valueId" clearable style="width: 200px;">
            <el-option
              v-for="item in dictList"
              :key="item.id"
              :label="item.dataValue"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="addForm.type===5" label="链接地址" prop="linkUrl" style="display: inline-block" :rules="[{ required: true, message: '请输入链接地址', trigger: 'blur' }]">
          <el-input v-model="addForm.linkUrl" maxlength="64" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="标题" prop="title" style="display: inline-block">
          <el-input v-model="addForm.title" maxlength="65535" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="子标题" prop="subtitle" style="display: inline-block">
          <el-input v-model="addForm.subtitle" maxlength="128" style="width: 200px;" />
        </el-form-item>

        <el-form-item label="阅读量" prop="readCount" style="display: inline-block">
          <el-input v-model="addForm.readCount" type="number" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="排序" prop="sortNo" style="display: inline-block">
          <el-input v-model="addForm.sortNo" type="number" maxlength="3" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="状态" prop="status" style="display: inline-block">
          <el-radio-group v-model="addForm.status" style="width: 200px;">
            <el-radio class="radio" :label="1">显示</el-radio>
            <el-radio class="radio" :label="2">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="店铺轮播图片" prop="shopQualifications" style="display: block">
          <el-upload
            action="/"
            :http-request="fileAdd"
            :limit="1"
            :file-list="fileList"
            :on-exceed="handleExceed"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.mp4"
            :on-remove="handleRemove"
          >
            <em class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item v-if="addForm.type===4" label="内容" prop="content" style="overflow: hidden" :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]">
          <Editor v-model="addForm.content" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addpush('addForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="商户联系人信息" :visible.sync="contactVisible" width="700px">
      <el-form ref="contactForm" :model="contactForm" label-width="120px" class="demo-addForm">
        <el-form-item label="联系人姓名" prop="linkPerson" :rules="[{ required: true, message: '请输入联系人姓名', trigger: 'blur' }]">
          <el-input v-model="contactForm.linkPerson" style="width: 200px;" maxlength="16" />
        </el-form-item>
        <el-form-item label="联络电话" prop="linkPhone" :rules="[{ required: true, message: '请输入联络电话', trigger: 'blur' },{ pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的手机号' }]">
          <el-input v-model="contactForm.linkPhone" style="width: 200px;" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="11" />
        </el-form-item>
        <el-form-item label="联系人邮箱" prop="linkEmail" :rules="[{ required: true, message: '请输入联系人邮箱', trigger: 'blur' }]">
          <el-input v-model="contactForm.linkEmail" style="width: 200px;" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" maxlength="50" />
        </el-form-item>
        <el-form-item label="财务联系人" prop="financePerson" :rules="[{ required: true, message: '请输入财务联系人', trigger: 'blur' }]">
          <el-input v-model="contactForm.financePerson" style="width: 200px;" maxlength="16" />
        </el-form-item>
        <el-form-item label="财务联系人电话" prop="financePhone" :rules="[{ required: true, message: '请输入财务联系人电话', trigger: 'blur' },{ pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的手机号' }]">
          <el-input v-model="contactForm.financePhone" style="width: 200px;" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="11" />
        </el-form-item>
        <el-form-item label="财务联系人邮箱" prop="financeEmail" :rules="[{ required: true, message: '请输入财务联系人邮箱', trigger: 'blur' }]">
          <el-input v-model="contactForm.financeEmail" style="width: 200px;" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" maxlength="50" />
        </el-form-item>
        <el-form-item style="float: right;margin-right: 20px;">
          <el-button v-if="infoadd" type="primary" @click="infoaddclick('contactForm')">保存(添加)</el-button>
          <el-button v-if="infoedit" type="primary" @click="infoeditclick('contactForm')">保存(修改)</el-button>
        </el-form-item>
        <p />
      </el-form>
    </el-dialog>
    <el-dialog title="商户附件信息" :visible.sync="accessoryVisible" width="1000px">
      <el-form ref="accessoryForm" :model="accessoryForm" label-width="120px" class="demo-addForm">
        <div class="accessory">
          <el-form-item label="营业执照">
            <el-upload
              action="/"
              :http-request="licenseAdd"
              :limit="1"
              :file-list="licenseList"
              :on-exceed="licenseExceed"
              list-type="picture-card"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-remove="licenseRemove"
            >
              <em class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </div>
        <div class="accessory">
          <el-form-item label="法人身份证正面">
            <el-upload
              action="/"
              :http-request="frontAdd"
              :limit="1"
              :file-list="frontList"
              :on-exceed="frontExceed"
              list-type="picture-card"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-remove="frontRemove"
            >
              <em class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </div>
        <div class="accessory">
          <el-form-item label="法人身份证背面">
            <el-upload
              action="/"
              :http-request="behindAdd"
              :limit="1"
              :file-list="behindList"
              :on-exceed="behindExceed"
              list-type="picture-card"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-remove="behindRemove"
            >
              <em class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </div>
        <div class="accessory">
          <el-form-item label="组织机构代码证">
            <el-upload
              action="/"
              :http-request="OrganizationAdd"
              :limit="1"
              :file-list="OrganizationList"
              :on-exceed="OrganizationExceed"
              list-type="picture-card"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-remove="OrganizationRemove"
            >
              <em class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </div>
        <div class="accessory">
          <el-form-item label="税务登记证">
            <el-upload
              action="/"
              :http-request="TaxationAdd"
              :limit="1"
              :file-list="TaxationList"
              :on-exceed="TaxationExceed"
              list-type="picture-card"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-remove="TaxationRemove"
            >
              <em class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </div>
        <div class="accessory">
          <el-form-item label="食品安全许可证">
            <el-upload
              action="/"
              :http-request="FoodlicenseAdd"
              :limit="1"
              :file-list="FoodlicenseList"
              :on-exceed="FoodlicenseExceed"
              list-type="picture-card"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-remove="FoodlicenseRemove"
            >
              <em class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item style="float: right;margin-right: 20px;">
          <el-button v-if="accessoryadd" type="primary" @click="accessoryaddclick('accessoryForm')">保存(添加)</el-button>
          <el-button v-if="accessoryedit" type="primary" @click="accessoryeditclick('accessoryForm')">保存(修改)</el-button>
        </el-form-item>
        <p />
      </el-form>
    </el-dialog>

    <el-dialog title="商户结算信息" :visible.sync="settlementVisible" width="700px">
      <el-form ref="settlementForm" :model="settlementForm" label-width="120px" class="demo-addForm">
        <el-form-item label="商户开户行" prop="shopOpenBank" :rules="[{ required: true, message: '请输入商户开户行', trigger: 'blur' }]">
          <el-input v-model="settlementForm.shopOpenBank" style="width: 200px;" maxlength="32" />
        </el-form-item>
        <el-form-item label="开户人名称" prop="bankShopName" :rules="[{ required: true, message: '请输入开户人名称', trigger: 'blur' }]">
          <el-input v-model="settlementForm.bankShopName" style="width: 200px;" maxlength="32" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="shopBankCardNumber" :rules="[{ required: true, message: '请输入银行卡号', trigger: 'blur' }]">
          <el-input v-model="settlementForm.shopBankCardNumber" style="width: 200px;" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="19" />
        </el-form-item>
        <el-form-item label="开户行所在地" prop="shopBankCity" :rules="[{ required: true, message: '请输入开户行所在地', trigger: 'blur' }]">
          <el-input v-model="settlementForm.shopBankCity" maxlength="32" style="width: 200px" />
        </el-form-item>
        <el-form-item label="结算方式" prop="settlementType" :rules="[{ required: true, message: '请选择结算方式', trigger: 'blur' }]">
          <el-select v-model="settlementForm.settlementType" clearable filterable>
            <el-option
              v-for="item in settlementTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="费用类型" prop="costType" :rules="[{ required: true, message: '请选择费用类型', trigger: 'blur' }]">
          <el-select v-model="settlementForm.costType" style="width: 200px;" filterable clearable>
            <el-option
              v-for="item in costTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="settlementForm.costType===1" label="比例" prop="proportion" :rules="[{ required: true, message: '请输入比例', trigger: 'blur' }]">
          <el-input v-model.number="settlementForm.proportion" style="width: 200px;" type="number" />
        </el-form-item>
        <el-form-item v-if="settlementForm.costType===2 || settlementForm.costType===3" label="佣金(￥)" prop="amount" :rules="[{ required: true, message: '请输入佣金', trigger: 'blur' }]">
          <el-input v-model.number="settlementForm.amount" style="width: 200px;" type="number" onkeyup="value=value.replace(/[^0-9.]|(0?\.\d{3,})|\.{2,}/ig,'')" />
        </el-form-item>
        <el-form-item style="float: right;margin-right: 20px;">
          <el-button v-if="settlementadd" type="primary" @click="settlementaddclick('settlementForm')">保存(添加)</el-button>
          <el-button v-if="settlementedit" type="primary" @click="settlementeditclick('settlementForm')">保存(修改)</el-button>
        </el-form-item>
        <p />
      </el-form>
    </el-dialog>

    <el-dialog title="商户类目信息" :visible.sync="categoryVisible" width="700px">
      <el-form ref="categoryForm" :model="categoryForm" label-width="120px" class="demo-addForm">
        <el-form-item label="经营类目" prop="categoryIds">
          <el-tree ref="tree" v-model="categoryForm.categoryIds" :data="resultLists" show-checkbox node-key="id" :props="defaultProps" :default-checked-keys="categoryForm.categoryIds" />
        </el-form-item>

        <p style="height: 15px;">  <el-form-item style="float: right;margin-right: 20px;">
          <el-button v-if="categoryadd" type="primary" @click="categoryaddclick('categoryForm')">保存(添加)</el-button>
          <el-button v-if="categoryedit" type="primary" @click="categoryeditclick('categoryForm')">保存(修改)</el-button>
        </el-form-item></p>
      </el-form>
    </el-dialog>

    <el-dialog title="商户扩展信息" :visible.sync="extendVisible" width="700px">
      <el-form ref="extendForm" :model="extendForm" label-width="120px" class="demo-addForm">
        <el-form-item label="商家QQ号" prop="shopQq">
          <el-input v-model="extendForm.shopQq" style="width: 200px;" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="10" />
        </el-form-item>
        <el-form-item label="商户特色" prop="shopFeature">
          <el-input v-model="extendForm.shopFeature" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="人均消费(￥)" prop="averagePrice">
          <el-input v-model="extendForm.averagePrice" style="width: 200px;" onkeyup="value=value.replace(/[^0-9.]|(0?\.\d{3,})|\.{2,}/ig,'')" />
        </el-form-item>
        <el-form-item label="营业时间" prop="bizDate">
          <el-input v-model="extendForm.bizDate" style="width: 200px;" placeholder="格式 8:00-23:00" />
        </el-form-item>
        <el-form-item label="商家公告" prop="noticeDesc">
          <el-input v-model="extendForm.noticeDesc" placeholder="生鲜小程序使用" maxlength="128" style="width: 524px;" />
        </el-form-item>
        <el-form-item label="坐标经度" prop="shopLongitude">
          <el-input v-model="extendForm.shopLongitude" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="坐标纬度" prop="shopLatitude">
          <el-input v-model="extendForm.shopLatitude" style="width: 200px;" />
        </el-form-item>
        <p style="height: 15px;">
          <el-form-item style="float: right;margin-right: 20px;">
            <el-button v-if="extendadd" type="primary" @click="extendaddclick('extendForm')">保存(添加)</el-button>
            <el-button v-if="extendedit" type="primary" @click="extendeditclick('extendForm')">保存(修改)</el-button>
          </el-form-item>
        </p><p />
      </el-form>
    </el-dialog>
    <el-dialog title="商户更换店主" :visible.sync="userVisible" width="600px">
      <el-form ref="userForm" :model="userForm" label-width="90px" class="demo-addForm">
        <el-form-item label="用户列表" prop="newUserId" :rules="[{ required: true, message: '请选择要更换的店主', trigger: 'blur' }]">
          <el-select v-model="userForm.newUserId" clearable filterable remote placeholder="请输入用户昵称关键字搜索" :remote-method="remoteMethod" style="width: 450px;">
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
        <p style="height: 15px;">
          <el-form-item style="float: right;margin-right: 20px;">
            <el-button type="primary" @click="usereditclick('userForm')">保存(修改)</el-button>
          </el-form-item>
        </p><p />
      </el-form>
    </el-dialog>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog v-if="merchantDescVisible" title="基本信息语言" :visible.sync="merchantDescVisible" :close-on-click-modal="false" :before-close="handleCloses" width="1000px">
      <indexs />
    </el-dialog>
    <el-dialog v-if="extendDescVisible" title="扩展信息语言" :visible.sync="extendDescVisible" :close-on-click-modal="false" :before-close="handleClosess" width="1000px">
      <indexss />
    </el-dialog>
    <el-form ref="addForm" :model="distributoraddForm" :rules="rules" label-width="100px" class="demo-addForm">
      <el-dialog title="申请分销" :visible.sync="dialogFormdistributorVisible" width="680px" :before-close="handleClose">
        <el-form-item label="分销商名称" prop="name" :rules="[{ required: true, message: '请输入分销商名称', trigger: 'blur' }]">
          <el-input v-model="distributoraddForm.name" :disabled="readOnlied" style="width: 200px" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCardNum" :rules="[{ required: true, message: '请输入身份证号', trigger: 'blur' }]">
          <el-input v-model="distributoraddForm.idCardNum" :disabled="readOnlied" style="width: 200px" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" :rules="[{ required: true, message: '请输入联系电话', trigger: 'blur' }]">
          <el-input v-model="distributoraddForm.phone" :disabled="readOnlied" style="width: 200px" />
        </el-form-item>
        <el-form-item label="代理级别" prop="levelId" :rules="[{ required: true, message: '请选择代理级别', trigger: 'blur' }]">
          <el-select v-model="distributoraddForm.levelId" :disabled="readOnlied" style="width: 200px;" clearable filterable @change="levelchange">
            <el-option
              v-for="item in levelIdList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所在城市" prop="regionId" :rules="[{ required: true, message: '请选择所在城市', trigger: 'blur' }]">
          <el-select v-model="distributoraddForm.regionId" :disabled="readOnlied" style="width: 200px;" clearable filterable>
            <el-option v-if="distributoraddForm.levelId===1" :key="0" :value="0" label="总代专属" />
            <el-option
              v-for="item in regionIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上级代理" prop="parentId" :rules="[{ required: true, message: '请选择上级代理', trigger: 'blur' }]">
          <el-select v-model="distributoraddForm.parentId" :disabled="readOnlied" style="width: 200px;" clearable filterable>
            <el-option v-if="distributoraddForm.levelId===1" :key="0" :value="0" label="无" />
            <el-option v-if="distributoraddForm.levelId===2" :key="0" :value="0" label="总代" />
            <el-option
              v-for="item in parentIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="结算方式" prop="expensesType" :rules="[{ required: true, message: '请选择佣金结算方式', trigger: 'blur' }]">
          <el-select v-model="distributoraddForm.expensesType" :disabled="readOnlied" style="width: 200px;" clearable filterable>
            <el-option
              v-for="item in ExpensesTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="平台佣金" prop="expensesValue" :rules="[{ required: true, message: '请输入平台佣金费用', trigger: 'blur' }]">
          <el-input v-model="distributoraddForm.expensesValue" :disabled="readOnlied" style="width: 200px" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankCard" :rules="[{ required: true, message: '请输入银行卡号', trigger: 'blur' }]">
          <el-input v-model="distributoraddForm.bankCard" :disabled="readOnlied" style="width: 200px" />
        </el-form-item>
        <el-form-item label="审核进度" prop="statusDesc">
          <el-input v-model="distributoraddForm.statusDesc" :readonly="true" style="width: 200px" />
        </el-form-item>
        <el-form-item v-if="distributoraddForm.auditOpinion!=='' && distributoraddForm.auditOpinion!==null " label="审核结果">
          <el-input v-model="distributoraddForm.auditOpinion" :readonly="true" style="width: 507px" />
        </el-form-item>
        <div>
          <el-form-item label="营业执照" prop="businessLicenseImgKey" :rules="[{ required: true, message: '请上传营业执照', trigger: 'blur' }]">
            <el-upload
              v-model="distributoraddForm.businessLicenseImgKey"
              action="/"
              :http-request="distributorfileAdd"
              :disabled="readOnlied"
              :limit="1"
              :file-list="distributoraddForm.distributorfileList"
              :on-exceed="distributorhandleExceed"
              list-type="picture-card"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-remove="distributorhandleRemove"
              value-key="form.businessLicenseImgKey"
              multiple
            >
              <em class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button v-if="!isdistributor" type="primary" @click="submitdistributorA('addForm')">提交申请</el-button>
          <el-button v-else-if="distributoraddForm.status===2 || distributoraddForm.status===3" type="primary" @click="submitdistributorE('addForm')">再次提交申请</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import crudJob, { examinePut, batchGet, batchEdit, getmerchantLists, editisAutoPrint, contactGet, contactdit, contactadd, accessoryGet, batchadd, batchedit, settlementGet, settlementadd, settlementedit, CosttypeLists, SettlementypeLists, categorysGet, categoryedit, extendGet, extendadd, extendedit, shopkeeperEdit } from '@/api/merchant/merchant'
import { divideGet } from '@/api/product/category'
import { getproductLists } from '@/api/product/product'
import { paneltypeList } from '@/api/panel/panelcontent'
import { getdictdataLists } from '@/api/system/dictDetail'
import eHeader from './header'
import eForm from './form'
import indexs from './desc/index'
import indexss from './descs/index'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
import { sysfileAdds } from '@/api/upload'
import Editor from '../../Editor'
import { getcityLists } from '@/api/system/city'
import { getuserinfoLists } from '@/api/user/userinfo'
import { getIsDistribution, postDistribution, DistributorInfoLevelLists, getParentDistribution, DistributorInfoExpensesTypeLists, postDistributions } from '@/api/distributor/distributorInfo'
export default {
  name: '商户列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation, Editor, indexs, indexss },
  cruds() {
    return CRUD({
      title: '商户管理',
      url: 'admin/merchant_info/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      dialogFormVisible: false,
      merchantDescVisible: false,
      extendDescVisible: false,
      lunVisible: false,
      dialogVisible: false,
      fileList: [],
      kong: '',
      typeList: [],
      productList: [],
      merchantList: [],
      dictList: [],
      addForm: {
        id: '',
        auditOpinion: '',
        lun: [],
        merchantId: '',
        languageId: 1,
        type: '',
        valueId: '',
        status: 1,
        statuss: 3,
        readCount: '',
        content: '',
        title: '',
        subtitle: '',
        linkUrl: '',
        sortNo: ''
      },

      /* 联系人*/
      contactVisible: false,
      infoadd: false,
      infoedit: false,
      contactForm: {
        id: '',
        languageId: '',
        merchantId: '',
        linkPerson: '',
        linkPhone: '',
        linkEmail: '',
        financePerson: '',
        financePhone: '',
        financeEmail: ''
      },

      /* 附件信息*/
      accessoryVisible: false,
      accessoryadd: false,
      accessoryedit: false,
      accessoryForm: {
      },
      licenseList: [],
      frontList: [],
      behindList: [],
      OrganizationList: [],
      TaxationList: [],
      FoodlicenseList: [],

      /* 结算信息*/
      settlementVisible: false,
      settlementadd: false,
      settlementedit: false,
      shopBankList: [],
      settlementTypeList: [],
      costTypeList: [],
      settlementForm: {
        id: '',
        languageId: '',
        merchantId: '',
        shopOpenBank: '',
        bankShopName: '',
        shopBankCity: '',
        shopBankCardNumber: '',
        settlementType: '',
        costType: '',
        proportion: 0,
        amount: 0
      },

      /* 类目信息*/
      categoryVisible: false,
      categoryadd: false,
      categoryedit: false,
      resultLists: [],
      categoryForm: {
        categoryIds: []
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },

      /* 扩展信息*/
      extendVisible: false,
      extendadd: false,
      extendedit: false,
      extendForm: {
        id: '',
        languageId: '',
        merchantId: '',
        shopQq: '',
        shopFeature: '',
        averagePrice: '',
        bizDate: '',
        noticeDesc: '',
        shopLongitude: '',
        shopLatitude: ''
      },
      userVisible: false,
      userIdList: [],
      userForm: {
        id: '',
        newUserId: ''
      },
      rules: {
        statuss: [
          {
            required: true,
            message: '请选择审核结果',
            trigger: 'blur'
          }
        ],
        auditOpinion: [
          {
            required: true,
            message: '请输入审核意见',
            trigger: 'blur'
          }
        ]
      },
      ruless: {

        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }
        ],
        sortNo: [
          {
            required: true,
            message: '请输入排序编号',
            trigger: 'blur'
          }
        ],
        readCount: [
          {
            required: true,
            message: '请输入阅读数量',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        subtitle: [
          {
            required: true,
            message: '请输入子标题',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
        ]

      },

      dialogFormdistributorVisible: false,
      isdistributor: false,
      readOnlied: false,
      regionIdList: [],
      levelIdList: [],
      parentIdList: [],
      ExpensesTypeList: [],
      distributoraddForm: {
        id: '',
        name: '',
        idCardNum: '',
        phone: '',
        regionId: '',
        levelId: '',
        parentId: '',
        bankCard: '',
        expensesType: '',
        expensesValue: '',
        businessLicenseImgKey: '',
        status: 1,
        statusDesc: '',
        auditOpinion: '',
        distributorfileList: []
      },
      permission: {
        add: ['merchant_info_add'],
        edit: ['merchant_info_update'],
        del: ['merchant_info_delete']
      }
    }
  },
  watch: {
    'distributoraddForm.regionId': function(newQuestion, oldQuestion) {
      if (this.distributoraddForm.regionId !== '' && this.distributoraddForm.regionId !== undefined && this.distributoraddForm.regionId !== null) {
        getParentDistribution(this.distributoraddForm.regionId).then(res => {
          this.parentIdList = res.data
        })
      }
    },
    'distributoraddForm.levelId': function(newQuestion, oldQuestion) {
      if (this.distributoraddForm.levelId !== '' && this.distributoraddForm.levelId !== undefined) {
        const data = {
          status: 1,
          levelType: this.distributoraddForm.levelId - 1
        }
        getcityLists(data).then(res => {
          this.regionIdList = res.data
        })
      }
    }
  },
  methods: {
    merchantDesc(row) {
      var obj = Object.assign({}, row)
      localStorage.setItem('merchantId', JSON.stringify(obj.id))
      this.merchantDescVisible = true
    },
    handleCloses(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    extendDesc(row) {
      var obj = Object.assign({}, row)
      localStorage.setItem('merchantId', JSON.stringify(obj.id))
      this.extendDescVisible = true
    },
    handleClosess(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    levelchange() {
      this.distributoraddForm.parentId = ''
      this.distributoraddForm.regionId = ''
      this.parentIdList = []
      this.regionIdList = []
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    distributorEdit(index, row) {
      this.dialogFormdistributorVisible = true
      var obj = Object.assign({}, row)
      this.distributoraddForm.status = 1
      this.distributoraddForm.id = obj.id
      getIsDistribution(this.distributoraddForm.id).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          // const data = {
          //   status: 1,
          // }
          // getcityLists(data).then(res => {
          //   this.regionIdList = res.data
          // })
          DistributorInfoLevelLists().then(res => {
            this.levelIdList = res.data
          })
          DistributorInfoExpensesTypeLists().then(res => {
            this.ExpensesTypeList = res.data
          })

          if (res.data === null) {
            this.isdistributor = false
            this.readOnlied = false
            settlementGet(this.distributoraddForm.id).then(res => {
              this.distributoraddForm.bankCard = res.data.shopBankCardNumber
            })
            accessoryGet(this.distributoraddForm.id).then(res => {
              this.distributoraddForm.distributorfileList = []
              for (const i in res.data) {
                if (res.data[i].type === 2) {
                  this.distributoraddForm.distributorfileList.push(res.data[i])
                  this.distributoraddForm.businessLicenseImgKey = res.data[i].key
                }
              }
            })
          } else {
            if (res.data.status === 2 || res.data.status === 3) {
              this.readOnlied = false
            } else {
              this.readOnlied = true
            }
            this.isdistributor = true
            this.distributoraddForm.id = res.data.id
            this.distributoraddForm.name = res.data.name
            this.distributoraddForm.idCardNum = res.data.idCardNum
            this.distributoraddForm.phone = res.data.phone
            this.distributoraddForm.regionId = res.data.regionId
            this.distributoraddForm.levelId = res.data.levelId
            this.distributoraddForm.parentId = res.data.parentId
            this.distributoraddForm.bankCard = res.data.bankCard
            this.distributoraddForm.status = res.data.status
            this.distributoraddForm.expensesType = res.data.expensesType
            this.distributoraddForm.expensesValue = res.data.expensesValue
            this.distributoraddForm.businessLicenseImgKey = res.data.businessLicenseImgKey
            this.distributoraddForm.statusDesc = res.data.statusDesc
            this.distributoraddForm.distributorfileList = []
            this.distributoraddForm.distributorfileList.push({
              key: res.data.businessLicenseImgKey,
              url: res.data.businessLicenseImgUrl
            })
          }
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    // 图片提交
    distributorhandleRemove(file, fileList) {
      this.distributoraddForm.distributorfileList = fileList
    },
    distributorhandleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.distributoraddForm.distributorfileList = fileList
    },
    // 选择文件
    distributorfileAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.distributoraddForm.distributorfileList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.distributoraddForm.businessLicenseImgKey = res.data.key
        } else {
          _this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    // 提交申请
    submitdistributorA(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var id = this.distributoraddForm.id
            var data = {
              name: this.distributoraddForm.name,
              idCardNum: this.distributoraddForm.idCardNum,
              phone: this.distributoraddForm.phone,
              regionId: this.distributoraddForm.regionId,
              levelId: this.distributoraddForm.levelId,
              parentId: this.distributoraddForm.parentId,
              bankCard: this.distributoraddForm.bankCard,
              status: this.distributoraddForm.status,
              expensesType: this.distributoraddForm.expensesType,
              expensesValue: this.distributoraddForm.expensesValue,
              businessLicenseImgKey: this.distributoraddForm.businessLicenseImgKey
            }
            var _this = this
            postDistribution(data, id)
              .then(
                function(response) {
                  var code = response.code
                  var msg = response.msg
                  if (code === '0') {
                    _this.$message({
                      message: msg,
                      type: 'success'
                    })
                    _this.dialogFormdistributorVisible = false
                    _this.crud.refresh()
                  } else {
                    _this.$message({
                      message: msg,
                      type: 'warning'
                    })
                  }
                })
          })
        } else {
          return false
        }
      })
    },
    // 再次提交申请
    submitdistributorE(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var id = this.distributoraddForm.id
            var data = {
              name: this.distributoraddForm.name,
              idCardNum: this.distributoraddForm.idCardNum,
              phone: this.distributoraddForm.phone,
              regionId: this.distributoraddForm.regionId,
              levelId: this.distributoraddForm.levelId,
              parentId: this.distributoraddForm.parentId,
              bankCard: this.distributoraddForm.bankCard,
              status: 1,
              expensesType: this.distributoraddForm.expensesType,
              expensesValue: this.distributoraddForm.expensesValue,
              businessLicenseImgKey: this.distributoraddForm.businessLicenseImgKey
            }
            var _this = this
            postDistributions(data, id)
              .then(
                function(response) {
                  var code = response.code
                  var msg = response.msg
                  if (code === '0') {
                    _this.$message({
                      message: msg,
                      type: 'success'
                    })
                    _this.dialogFormdistributorVisible = false
                    _this.crud.refresh()
                  } else {
                    _this.$message({
                      message: msg,
                      type: 'warning'
                    })
                  }
                })
          })
        } else {
          return false
        }
      })
    },

    examineEdit(index, row) {
      this.dialogFormVisible = true
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
    },
    // 状态审核
    submitForms(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          if (this.addForm.auditOpinion === '' || this.addForm.auditOpinion === undefined) {
            this.$message({
              message: '请输入审核意见',
              type: 'warning'
            })
            return
          }
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var urlId = this.addForm.id
            var data = {
              status: this.addForm.statuss,
              auditOpinion: this.addForm.auditOpinion
            }
            var _this = this
            examinePut(urlId, data)
              .then(
                function(response) {
                  var code = response.code
                  var msg = response.msg
                  if (code === '0') {
                    _this.$message({
                      message: msg,
                      type: 'success'
                    })
                    _this.dialogFormVisible = false
                    _this.crud.refresh()
                  } else {
                    this.$message({
                      message: msg,
                      type: 'warning'
                    })
                  }
                })
          })
        } else {
          return false
        }
      })
    },
    // 下架
    takeEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      var urlId = this.addForm.id
      var _this = this
      var data = {
        status: 5,
        auditOpinion: '店铺关闭'
      }
      this.$confirm('确认下架此商户吗？', '提示', {}).then(() => {
        examinePut(urlId, data)
          .then(
            function(response) {
              var code = response.code
              var msg = response.msg
              if (code === '0') {
                _this.$message({
                  message: '关闭成功',
                  type: 'success'
                })
                _this.crud.refresh()
              } else {
                _this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
      })
    },
    // 待审核
    reviewedEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      var urlId = this.addForm.id
      var _this = this
      var data = {
        status: 2,
        auditOpinion: '提交审核'
      }
      this.$confirm('确认提交审核此商户吗？', '提示', {}).then(() => {
        examinePut(urlId, data)
          .then(
            function(response) {
              var code = response.code
              var msg = response.msg
              if (code === '0') {
                _this.$message({
                  message: msg,
                  type: 'success'
                })
                _this.crud.refresh()
              } else {
                _this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
      })
    },

    // 轮播图查询
    batchEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      var urlId = this.addForm.id
      this.lunVisible = true
      this.addForm.lun = []
      batchGet(urlId).then(res => {
        this.addForm.lun = res.data
      })
    },
    typechange() {
      this.addForm.valueId = ''
      this.addForm.content = ''
      this.addForm.linkUrl = ''
    },
    // 选择文件
    fileAdds(fileList) {
      const myfile = this.$refs.myfile
      const files = myfile.files
      const file = files[0]
      const _this = this
      if (_this.addForm.lun.length >= 5) {
        this.$message({
          message: '抱歉,最多添加5张轮播图',
          type: 'warning'
        })
        return
      }
      var formData = new FormData()
      formData.append('file', file)
      sysfileAdds(formData)
        .then(
          function(response) {
            _this.addForm.lun.push({
              'name': response.data.fileName,
              'imgKey': response.data.key,
              'size': response.data.size,
              'imgUrl': response.data.url
            })
          })
    },
    // 轮播图提交
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`抱歉,最多添加1张轮播图`)
      this.fileList = fileList
    },
    // 选择文件
    fileAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData)
        .then(
          function(response) {
            _this.fileList.push({
              'name': response.data.fileName,
              'key': response.data.key,
              'size': response.data.size,
              'url': response.data.url
            })
          })
    },
    lunDelete(v, index) {
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        this.addForm.lun.splice(index, 1)
      })
    },
    addsss(v, index) {
      this.addForm.merchantId = this.addForm.id
      this.addForm.type = v.type
      this.addForm.languageId = v.languageId
      this.addForm.valueId = v.valueId
      this.addForm.status = v.status
      this.addForm.readCount = v.readCount
      this.addForm.content = v.content
      this.addForm.subtitle = v.subtitle
      this.addForm.title = v.title
      this.addForm.linkUrl = v.linkUrl
      this.addForm.sortNo = v.sortNo
      var urlList = []
      urlList.push({
        key: v.imgKey,
        url: v.imgUrl
      })
      this.fileList = urlList
      this.kong = index
      this.dialogVisible = true

      const data = {
        status: 1
      }
      const datas = {
        status: 3
      }
      const _this = this
      getproductLists(datas)
        .then(
          function(response) {
            _this.productList = response.data
          })
      getmerchantLists(datas)
        .then(
          function(response) {
            _this.merchantList = response.data
          })
      getdictdataLists(data)
        .then(
          function(response) {
            _this.dictList = response.data
          })
      paneltypeList(data)
        .then(
          function(response) {
            _this.typeList = response.data
          })
    },
    addpush(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认保存吗？', '提示', {}).then(() => {
            var data = {
              merchantId: this.addForm.merchantId,
              type: this.addForm.type,
              languageId: this.addForm.languageId,
              valueId: this.addForm.valueId,
              status: this.addForm.status,
              readCount: this.addForm.readCount,
              content: this.addForm.content,
              subtitle: this.addForm.subtitle,
              title: this.addForm.title,
              linkUrl: this.addForm.linkUrl,
              sortNo: this.addForm.sortNo,
              imgUrl: this.fileList[0].url,
              imgKey: this.fileList[0].key
            }
            this.addForm.lun[this.kong] = data
            this.dialogVisible = false
          })
        }
      })
    },
    submitForm() {
      const id = this.addForm.id
      const data = this.addForm.lun
      console.log(data)
      if (data.length === 0) {
        this.$message({
          message: '请添加商户轮播图',
          type: 'warning'
        })
        return
      }
      var functionss = []
      for (let i = 0; i < data.length; i++) {
        functionss = data[i]
      }
      if (functionss.type !== '' && functionss.type !== undefined) {
        batchEdit(id, data).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.lunVisible = false
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      } else {
        this.$message({
          message: '请完善图片信息',
          type: 'warning'
        })
      }
    },
    changeStatus(val) {
      editisAutoPrint(val.id, val.isAutoPrint).then(res => {
        var code = res.code
        var msg = res.msg
        if (code !== '0') {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },

    /* 联系人信息查询*/
    contactEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      this.contactVisible = true
      contactGet(this.addForm.id).then(res => {
        if (res.data === undefined) {
          this.infoadd = true
          this.infoedit = false
        } else {
          this.contactForm = res.data
          this.infoadd = false
          this.infoedit = true
        }
      })
    },
    /* 联系人信息添加*/
    infoaddclick(contactForm) {
      this.$refs[contactForm].validate(valid => {
        if (valid) {
          this.contactForm.merchantId = this.addForm.id
          this.contactForm.languageId = 1
          const data = this.contactForm
          this.$confirm('确认修改吗？', '提示', {}).then(() => {
            contactadd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.contactVisible = false
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
    /* 联系人信息修改*/
    infoeditclick(contactForm) {
      this.$refs[contactForm].validate(valid => {
        if (valid) {
          const id = this.contactForm.id
          const data = this.contactForm
          this.$confirm('确认修改吗？', '提示', {}).then(() => {
            contactdit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.contactVisible = false
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

    /* 附件信息查询*/
    AccessoryEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      this.accessoryVisible = true
      accessoryGet(this.addForm.id).then(res => {
        if (res.data.length === 0) {
          this.accessoryadd = true
          this.accessoryedit = false
        } else {
          this.accessoryadd = false
          this.accessoryedit = true
          this.licenseList = []
          this.frontList = []
          this.behindList = []
          this.OrganizationList = []
          this.TaxationList = []
          this.FoodlicenseList = []
          this.accessoryList = res.data
          for (var i = 0; i < this.accessoryList.length; i++) {
            if (this.accessoryList[i].type === 2) {
              // 营业执照
              this.licenseList.push(res.data[i])
            } else if (this.accessoryList[i].type === 3) {
              // 法人身份证正面
              this.frontList.push(res.data[i])
            } else if (this.accessoryList[i].type === 4) {
              // 法人身份证背面
              this.behindList.push(res.data[i])
            } else if (this.accessoryList[i].type === 5) {
              // 组织机构代码
              this.OrganizationList.push(res.data[i])
            } else if (this.accessoryList[i].type === 6) {
              // 税务登记证
              this.TaxationList.push(res.data[i])
            } else if (this.accessoryList[i].type === 7) {
              // 食品许可证
              this.FoodlicenseList.push(res.data[i])
            }
          }
        }
      })
    },
    // 营业执照提交
    licenseRemove(licenseList) {
      const _this = this
      _this.licenseList = []
    },
    licenseExceed(licenseList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.licenseList = licenseList
    },
    // 选择文件
    licenseAdd(licenseList) {
      const myfile = licenseList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData)
        .then(
          function(response) {
            var license = {
              merchantId: _this.merchantId,
              languageId: _this.languageId,
              'type': 2,
              'name': response.data.fileName,
              'key': response.data.key,
              'size': response.data.size,
              'url': response.data.url
            }
            _this.licenseList.push(license)
          })
    },

    // 法人正面提交
    frontRemove(frontList) {
      const _this = this
      _this.frontList = []
    },
    frontExceed(frontList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.frontList = frontList
    },
    // 选择文件
    frontAdd(frontList) {
      const myfile = frontList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData)
        .then(
          function(response) {
            var front = {
              merchantId: _this.merchantId,
              languageId: _this.languageId,
              'type': 3,
              'name': response.data.fileName,
              'key': response.data.key,
              'size': response.data.size,
              'url': response.data.url
            }
            _this.frontList.push(front)
          })
    },

    // 法人背面提交
    behindRemove(behindList) {
      const _this = this
      _this.behindList = []
    },
    behindExceed(behindList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.behindList = behindList
    },
    // 选择文件
    behindAdd(behindList) {
      const myfile = behindList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData)
        .then(
          function(response) {
            var behind = {
              merchantId: _this.merchantId,
              languageId: _this.languageId,
              'type': 4,
              'name': response.data.fileName,
              'key': response.data.key,
              'size': response.data.size,
              'url': response.data.url
            }
            _this.behindList.push(behind)
          })
    },

    // 组织机构代码证
    OrganizationRemove(OrganizationList) {
      const _this = this
      _this.OrganizationList = []
    },
    OrganizationExceed(OrganizationList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.OrganizationList = OrganizationList
    },
    // 选择文件
    OrganizationAdd(OrganizationList) {
      const myfile = OrganizationList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData)
        .then(
          function(response) {
            var Organization = {
              merchantId: _this.merchantId,
              languageId: _this.languageId,
              'type': 5,
              'name': response.data.fileName,
              'key': response.data.key,
              'size': response.data.size,
              'url': response.data.url
            }
            _this.OrganizationList.push(Organization)
          })
    },

    // 税务登记证
    TaxationRemove(TaxationList) {
      const _this = this
      _this.TaxationList = []
    },
    TaxationExceed(TaxationList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.TaxationList = TaxationList
    },
    // 选择文件
    TaxationAdd(TaxationList) {
      const myfile = TaxationList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData)
        .then(
          function(response) {
            var Taxation = {
              merchantId: _this.merchantId,
              languageId: _this.languageId,
              'type': 6,
              'name': response.data.fileName,
              'key': response.data.key,
              'size': response.data.size,
              'url': response.data.url
            }
            _this.TaxationList.push(Taxation)
          })
    },
    // 食品安全许可证
      FoodlicenseRemove(FoodlicenseList) {
      const _this = this
      _this.FoodlicenseList = []
    },
      FoodlicenseExceed(FoodlicenseList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.FoodlicenseList = FoodlicenseList
    },
    // 选择文件
    FoodlicenseAdd(FoodlicenseList) {
      const myfile = FoodlicenseList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData)
        .then(
          function(response) {
            var Taxation = {
              merchantId: _this.merchantId,
              languageId: _this.languageId,
              'type': 7,
              'name': response.data.fileName,
              'key': response.data.key,
              'size': response.data.size,
              'url': response.data.url
            }
            _this.FoodlicenseList.push(Taxation)
          })
    },
    accessoryaddclick() {
      const data = []
      if (this.licenseList.length !== 0) {
        data.push(this.licenseList[0])
      }
      if (this.frontList.length !== 0) {
        data.push(this.frontList[0])
      }
      if (this.behindList.length !== 0) {
        data.push(this.behindList[0])
      }
      if (this.OrganizationList.length !== 0) {
        data.push(this.OrganizationList[0])
      }
      if (this.TaxationList.length !== 0) {
        data.push(this.TaxationList[0])
      }
      if (this.FoodlicenseList.length !== 0) {
        data.push(this.FoodlicenseList[0])
      }
      const id = this.addForm.id
      batchadd(id, data).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.crud.refresh()
          this.accessoryVisible = false
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    accessoryeditclick() {
      const data = []
      if (this.licenseList.length !== 0) {
        data.push(this.licenseList[0])
      }
      if (this.frontList.length !== 0) {
        data.push(this.frontList[0])
      }
      if (this.behindList.length !== 0) {
        data.push(this.behindList[0])
      }
      if (this.OrganizationList.length !== 0) {
        data.push(this.OrganizationList[0])
      }
      if (this.TaxationList.length !== 0) {
        data.push(this.TaxationList[0])
      }
      if (this.FoodlicenseList.length !== 0) {
          data.push(this.FoodlicenseList[0])
      }
      const id = this.addForm.id
      batchedit(id, data).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.crud.refresh()
          this.accessoryVisible = false
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    /* 结算信息查询*/
    settlementEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      this.settlementVisible = true
      const data = {
        status: 1
      }
      getcityLists(data).then(res => {
        this.shopBankList = res.data
      })
      CosttypeLists(data).then(res => {
        this.costTypeList = res.data
      })
      SettlementypeLists(data).then(res => {
        this.settlementTypeList = res.data
      })
      settlementGet(this.addForm.id).then(res => {
        if (res.data === undefined) {
          this.settlementadd = true
          this.settlementedit = false
        } else {
          this.settlementForm = res.data
          this.settlementadd = false
          this.settlementedit = true
        }
      })
    },
    /* 结算信息添加*/
    settlementaddclick(settlementForm) {
      if (this.settlementForm.costType === 1 && this.settlementForm.proportion > 1) {
        this.$message({
          message: '请输入正确比例',
          type: 'warning'
        })
        return
      }
      this.$refs[settlementForm].validate(valid => {
        if (valid) {
          this.settlementForm.merchantId = this.addForm.id
          this.settlementForm.languageId = 1
          const data = this.settlementForm
          this.$confirm('确认添加吗？', '提示', {}).then(() => {
            settlementadd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.settlementVisible = false
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
    /* 结算信息修改*/
    settlementeditclick(settlementForm) {
      if (this.settlementForm.costType === 1 && this.settlementForm.proportion > 1) {
        this.$message({
          message: '请输入正确比例',
          type: 'warning'
        })
        return
      }
      this.$refs[settlementForm].validate(valid => {
        if (valid) {
          const id = this.settlementForm.id
          const data = this.settlementForm
          this.$confirm('确认修改吗？', '提示', {}).then(() => {
            settlementedit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.settlementVisible = false
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
    /* 类目信息查询*/
    categorysEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      this.categoryVisible = true
      divideGet().then(res => {
        this.resultLists = res.data
      })
      categorysGet(this.addForm.id).then(res => {
        if (res.data.length < 1) {
          this.categoryadd = true
          this.categoryedit = false
        } else {
          const _this = this
          for (let i = 0; i < res.data.length; i++) {
            _this.categoryForm.categoryIds.push(res.data[i].categoryId)
            _this.$refs.tree.setCheckedKeys(_this.categoryForm.categoryIds)
          }
          this.categoryadd = false
          this.categoryedit = true
        }
      })
    },
    /* 类目信息添加*/
    categoryaddclick(categoryForm) {
      this.$refs[categoryForm].validate(valid => {
        if (valid) {
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
          this.$confirm('确认添加吗？', '提示', {}).then(() => {
            const id = this.addForm.id
            categoryedit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.categoryVisible = false
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
    /* 类目信息修改*/
    categoryeditclick(categoryForm) {
      this.$refs[categoryForm].validate(valid => {
        if (valid) {
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
          this.$confirm('确认修改吗？', '提示', {}).then(() => {
            const id = this.addForm.id
            categoryedit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.categoryVisible = false
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

    /* 扩展信息查询*/
    extendEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      this.extendVisible = true
      extendGet(this.addForm.id).then(res => {
        if (res.data === undefined) {
          this.extendadd = true
          this.extendedit = false
        } else {
          this.extendForm = res.data
          this.extendadd = false
          this.extendedit = true
        }
      })
    },

    /* 扩展信息添加*/
    extendaddclick(extendForm) {
      this.$refs[extendForm].validate(valid => {
        if (valid) {
          this.extendForm.merchantId = this.addForm.id
          this.extendForm.languageId = 1
          const data = this.extendForm
          this.$confirm('确认添加吗？', '提示', {}).then(() => {
            extendadd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.extendVisible = false
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
    /* 扩展信息修改*/
    extendeditclick(extendForm) {
      this.$refs[extendForm].validate(valid => {
        if (valid) {
          const id = this.extendForm.id
          const data = this.extendForm
          this.$confirm('确认修改吗？', '提示', {}).then(() => {
            extendedit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.extendVisible = false
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
    remoteMethod(query) {
      const data = {
        nickName: query,
        status: 1
      }
      getuserinfoLists(data).then(res => {
        this.userIdList = res.data
      })
    },
    /* 查看现任店主*/
    shopEdit(index, row) {
      var obj = Object.assign({}, row)
      this.userForm.id = obj.id
      this.userForm.newUserId = obj.userId
      const data = {
        id: obj.userId
      }
      getuserinfoLists(data).then(res => {
        this.userIdList = res.data
      })
      this.userVisible = true
    },
    /* 更换店主*/
    usereditclick(userForm) {
      this.$refs[userForm].validate(valid => {
        if (valid) {
          const id = this.userForm.id
          const newUserId = this.userForm.newUserId
          this.$confirm('确认更换该店主吗？', '提示', {}).then(() => {
            shopkeeperEdit(id, newUserId).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.userVisible = false
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
  ::v-deep .ql-editor{
    padding: 12px 15px 80px 15px !important;
  }
  .editor {
    width: 560px!important;
  }
  .el-form-item{
    display: inline-block;
  }
  .accessory {
    width: 49%;
    display: inline-block;
  }
</style>
