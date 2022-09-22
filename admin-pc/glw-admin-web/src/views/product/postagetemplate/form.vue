<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="700px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="发货时间(小时)" prop="deliveryTime">
        <el-input v-model="form.deliveryTime" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="模板类型" prop="type">
        <el-select v-model="form.type" clearable style="width: 200px;" placeholder="模板类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type===2" label="商家" prop="merchantId" :rules="[{ required: true, message: '请选择商家', trigger: 'blur' }]">
        <el-select v-model="form.merchantId" clearable filterable style="width: 200px;">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否包邮" prop="postageIncl">
        <el-radio-group v-model="form.postageIncl" style="width: 200px;">
          <el-radio class="radio" :label="false">自定义运费</el-radio>
          <el-radio class="radio" :label="true">卖家承担运费</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.postageIncl===false">
        <el-form-item label="计价方式" prop="valuationModel" :rules="[{ required: true, message: '请选择计价方式', trigger: 'blur' }]">
          <el-select v-model="form.valuationModel" clearable style="width: 200px;" placeholder="计价方式">
            <el-option
              v-for="item in valuationModelList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="定制包邮条件" prop="postageInclProviso" :rules="[{ required: true, message: '请选择是否定制包邮条件', trigger: 'blur' }]">
          <el-radio-group v-model="form.postageInclProviso" style="width: 200px;">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="运送方式" prop="transportType">
          <el-checkbox-group v-model="transportType" style="width: 500px;">
            <!--            <el-checkbox label="1">快递</el-checkbox>-->
            <!--            <el-checkbox label="2">EMS</el-checkbox>-->
            <!--            <el-checkbox label="3">平邮</el-checkbox>-->
            <el-checkbox v-for="item in productTransportLists" :key="item.value" :label="item.value" :value="item.value">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <template v-if="type1s">
          <el-table :data="form.type1List" border center="center" style="width: 750px">
            <el-table-column fixed prop="cityName" label="城市" width="150" />
            <el-table-column prop="firstCondition" :label="danwei" width="120" />
            <el-table-column prop="firstAmount" label="首费" width="120" />
            <el-table-column prop="secondCondition" :label="xuwei" width="120" />
            <el-table-column prop="secondAmount" label="续费" width="120" />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="handleClick1(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 10px">
            <el-button @click="transporttype1Add()">+设置快递运费规则</el-button>
          </div>
        </template>
        <template v-if="type2s">
          <el-table :data="form.type2List" border center="center" style="width: 750px">
            <el-table-column fixed prop="cityName" label="城市" width="150" />
            <el-table-column prop="firstCondition" :label="danwei" width="120" />
            <el-table-column prop="firstAmount" label="首费" width="120" />
            <el-table-column prop="secondCondition" :label="xuwei" width="120" />
            <el-table-column prop="secondAmount" label="续费" width="120" />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="handleClick2(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 10px">
            <el-button @click="transporttype2Add()">+设置EMS运费规则</el-button>
          </div>
        </template>
        <template v-if="type3s">
          <el-table :data="form.type3List" border center="center" style="width: 750px">
            <el-table-column fixed prop="cityName" label="城市" width="150" />
            <el-table-column prop="firstCondition" :label="danwei" width="120" />
            <el-table-column prop="firstAmount" label="首费" width="120" />
            <el-table-column prop="secondCondition" :label="xuwei" width="120" />
            <el-table-column prop="secondAmount" label="续费" width="120" />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="handleClick3(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 10px">
            <el-button @click="transporttype3Add()">+设置平邮运费规则</el-button>
          </div>
        </template>
        <template v-if="type4s">
          <el-table :data="form.type4List" border center="center" style="width: 750px">
            <el-table-column fixed prop="cityName" label="城市" width="150" />
            <el-table-column prop="firstCondition" :label="danwei" width="120" />
            <el-table-column prop="firstAmount" label="首费" width="120" />
            <el-table-column prop="secondCondition" :label="xuwei" width="120" />
            <el-table-column prop="secondAmount" label="续费" width="120" />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="handleClick4(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 10px">
            <el-button @click="transporttype4Add()">+设置社区配送运费规则</el-button>
          </div>
        </template>
      </div>
      <template v-if="form.postageInclProviso===true">
        <el-table :data="form.inclProvisoList" border center="center" style="width: 700px">
          <el-table-column fixed prop="cityName" label="城市" width="150" />
          <el-table-column prop="condition" :label="`最大${danwei}`" width="120" />
          <el-table-column prop="minAmount" label="最低金额" width="120" />
        </el-table>
        <div style="margin-top: 10px">
          <el-button @click="inclProvisoAdd()">+设置定制包邮运费规则</el-button>
        </div>
      </template>
      <!--    //显示快递添加-->
      <el-form label-width="150px" class="demo-addForm">
        <el-dialog title="添加快递模板" :visible.sync="transporttype1" append-to-body>
          <el-form-item label="城市" prop="cityId">
            <el-select v-model="transportType1list.cityId" clearable style="width: 200px">
              <el-option
                v-for="item in cityIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                @click.native="cityname1(item)"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="`${danwei}(kg)`" prop="firstCondition">
            <el-input v-model="transportType1list.firstCondition" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="首费(元)" prop="firstAmount">
            <el-input v-model="transportType1list.firstAmount" style="width: 200px;" />
          </el-form-item>
          <el-form-item :label="`${xuwei}(kg)`" prop="secondCondition">
            <el-input v-model="transportType1list.secondCondition" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="续费(元)" prop="secondAmount">
            <el-input v-model="transportType1list.secondAmount" style="width: 200px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Add1">完成</el-button>
          </el-form-item>
        </el-dialog>
      </el-form>
      <!--    //显示EMS添加-->
      <el-form label-width="150px" class="demo-addForm">
        <el-dialog title="添加快递模板" :visible.sync="transporttype2" append-to-body>
          <el-form-item label="城市" prop="cityId">
            <el-select v-model="transportType2list.cityId" clearable style="width: 200px">
              <el-option
                v-for="item in cityIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                @click.native="cityname2(item)"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="`${danwei}(kg)`" prop="firstCondition">
            <el-input v-model="transportType2list.firstCondition" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="首费(元)" prop="firstAmount">
            <el-input v-model="transportType2list.firstAmount" style="width: 200px;" />
          </el-form-item>
          <el-form-item :label="`${xuwei}(kg)`" prop="secondCondition">
            <el-input v-model="transportType2list.secondCondition" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="续费(元)" prop="secondAmount">
            <el-input v-model="transportType2list.secondAmount" style="width: 200px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Add2">完成</el-button>
          </el-form-item>
        </el-dialog>
      </el-form>
      <!--    //显示平邮添加-->
      <el-form label-width="150px" class="demo-addForm">
        <el-dialog title="添加快递模板" :visible.sync="transporttype3" append-to-body>
          <el-form-item label="城市" prop="cityId">
            <el-select v-model="transportType3list.cityId" clearable style="width: 200px">
              <el-option
                v-for="item in cityIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                @click.native="cityname3(item)"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="`${danwei}(kg)`" prop="firstCondition">
            <el-input v-model="transportType3list.firstCondition" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="首费(元)" prop="firstAmount">
            <el-input v-model="transportType3list.firstAmount" style="width: 200px;" />
          </el-form-item>
          <el-form-item :label="`${xuwei}(kg)`" prop="secondCondition">
            <el-input v-model="transportType3list.secondCondition" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="续费(元)" prop="secondAmount">
            <el-input v-model="transportType3list.secondAmount" style="width: 200px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Add3">完成</el-button>
          </el-form-item>
        </el-dialog>
      </el-form>
      <!--    //显示社区配送添加-->
      <el-form label-width="150px" class="demo-addForm">
        <el-dialog title="添加快递模板" :visible.sync="transporttype4" append-to-body>
          <el-form-item label="城市" prop="cityId">
            <el-select v-model="transportType4list.cityId" clearable style="width: 200px">
              <el-option
                v-for="item in cityIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                @click.native="cityname5(item)"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="`${danwei}(kg)`" prop="firstCondition">
            <el-input v-model="transportType4list.firstCondition" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="首费(元)" prop="firstAmount">
            <el-input v-model="transportType4list.firstAmount" style="width: 200px;" />
          </el-form-item>
          <el-form-item :label="`${xuwei}(kg)`" prop="secondCondition">
            <el-input v-model="transportType4list.secondCondition" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="续费(元)" prop="secondAmount">
            <el-input v-model="transportType4list.secondAmount" style="width: 200px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Add4">完成</el-button>
          </el-form-item>
        </el-dialog>
      </el-form>
      <!--    //显示包邮添加-->
      <el-form label-width="150px" class="demo-addForm">
        <el-dialog title="添加包邮模板" :visible.sync="inclProviso" append-to-body>
          <el-form-item label="城市" prop="cityId">
            <el-select v-model="inclProvisoist.cityId" clearable style="width: 200px;">
              <el-option
                v-for="item in cityIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                @click.native="cityname4(item)"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="`最大${danwei}(kg)`" prop="condition">
            <el-input v-model="inclProvisoist.condition" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="最低金额(元)" prop="minAmount">
            <el-input v-model="inclProvisoist.minAmount" style="width: 200px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="inclProvisoAdds">完成</el-button>
          </el-form-item>
        </el-dialog>
      </el-form>

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
import { postagetemplateModelLists, postagetemplatetypeLists } from '@/api/product/postagetemplate'
import { getmerchantLists } from '@/api/merchant/merchant'
import { TransportTypeList } from '@/api/product/product'
import { getcityLists } from '@/api/system/city'
const defaultForm = {
  id: null,
  name: '',
  type: '',
  merchantId: '',
  deliveryTime: '',
  postageIncl: '',
  valuationModel: '',
  postageInclProviso: false,
  specialAreaList: [],
  inclProvisoList: [],
  type1List: [],
  type2List: [],
  type3List: [],
  type4List: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      danwei: '首单',
      xuwei: '续单',
      transportType: [],
      productTransportLists: [],
      typeList: [],
      citynames: '',
      citynamess: '',
      citynamesss: '',
      citynamessss: '',
      citynamesssss: '',

      type1s: false,
      transporttype1: false,
      transportType1list: [],

      type2s: false,
      transporttype2: false,
      transportType2list: [],

      type3s: false,
      transporttype3: false,
      transportType3list: [],

      type4s: false,
      transporttype4: false,
      transportType4list: [],

      inclProviso: false,
      inclProvisoist: [],

      valuationModelList: [],
      merchantIdList: [],
      cityIdList: [],
      postageInclList: [
        {
          value: true,
          name: '是'
        },
        {
          value: false,
          name: '否'
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: '请输入模板名称',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择模板类型',
            trigger: 'blur'
          }
        ],
        deliveryTime: [
          {
            required: true,
            message: '请选择发货时间',
            trigger: 'blur'
          }
        ],
        postageIncl: [
          {
            required: true,
            message: '请选择是否包邮',
            trigger: 'blur'
          }
        ],
        postageInclProviso: [
          {
            required: true,
            message: '请选择是否定制包邮',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    'form.specialAreaList': function(newQuestion, oldQuestion) {
      if (this.form.specialAreaList.length > 0) {
        for (var i = 0; i < this.form.specialAreaList.length; i++) {
          if (this.form.specialAreaList[i].transportType === 1) {
            this.form.type1List.push(this.form.specialAreaList[i])
            this.type1s = true
            this.transportType.push(1)
          } else if (this.form.specialAreaList[i].transportType === 2) {
            this.form.type2List.push(this.form.specialAreaList[i])
            this.type2s = true
            this.transportType.push(2)
          } else if (this.form.specialAreaList[i].transportType === 3) {
            this.form.type3List.push(this.form.specialAreaList[i])
            this.type3s = true
            this.transportType.push(3)
          } else if (this.form.specialAreaList[i].transportType === 4) {
            this.form.type4List.push(this.form.specialAreaList[i])
            this.type4s = true
            this.transportType.push(4)
          }
        }
      }
    },
    'form.valuationModel': function(newQuestion, oldQuestion) {
      if (this.form.valuationModel !== '') {
        const val = this.form.valuationModel
        if (val === 1) {
          this.danwei = '首件'
          this.xuwei = '续件'
        } else if (val === 2) {
          this.danwei = '首重'
          this.xuwei = '续重'
        } else if (val === 3) {
          this.danwei = '首立方'
          this.xuwei = '续立方'
        } else if (val === 4) {
          this.danwei = '首单'
          this.xuwei = '续单'
        }
      }
    },
    'transportType': function(newQuestion, oldQuestion) {
      if (this.transportType.includes(1)) {
        this.type1s = true
      } else {
        this.type1s = false
      }
      if (this.transportType.includes(2)) {
        this.type2s = true
      } else {
        this.type2s = false
      }
      if (this.transportType.includes(3)) {
        this.type3s = true
      } else {
        this.type3s = false
      }
      if (this.transportType.includes(4)) {
        this.type4s = true
      } else {
        this.type4s = false
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    postagetemplateModelLists(data).then(res => {
      this.valuationModelList = res.data
    })
    postagetemplatetypeLists(data).then(res => {
      this.typeList = res.data
    })
    getcityLists(data).then(res => {
      this.cityIdList = res.data
    })
    TransportTypeList(data).then(res => {
      this.productTransportLists = res.data
    })
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
  },
  methods: {
    handleClick1(row, index) {
      this.form.type1List.splice(index, 1)
    },
    transporttype1Add() {
      this.transporttype1 = true
    },
    cityname1(val) {
      this.citynames = val.name
    },
    Add1(form) {
      var pamers = {
        'cityId': this.transportType1list.cityId,
        'cityName': this.citynames,
        'transportType': 1,
        'isDefault': true,
        'firstCondition': this.transportType1list.firstCondition,
        'firstAmount': this.transportType1list.firstAmount,
        'secondCondition': this.transportType1list.secondCondition,
        'secondAmount': this.transportType1list.secondAmount
      }
      if (pamers.firstCondition === '' || pamers.firstAmount === '' || pamers.secondCondition === '' || pamers.secondAmount === '') {
        this.$message({
          message: '请完善相关数据',
          type: 'warning'
        })
        return
      }
      if (pamers.firstCondition === undefined || pamers.firstAmount === undefined || pamers.secondCondition === undefined || pamers.secondAmount === undefined) {
        this.$message({
          message: '请完善相关数据',
          type: 'warning'
        })
        return
      } else {
        this.form.type1List.push(pamers)
        this.transporttype1 = false
        this.transportType1list.cityId = ''
        this.transportType1list.firstCondition = ''
        this.transportType1list.firstAmount = ''
        this.transportType1list.secondCondition = ''
        this.transportType1list.secondAmount = ''
      }
    },
    handleClick2(row, index) {
      this.form.type2List.splice(index, 1)
    },
    transporttype2Add() {
      this.transporttype2 = true
    },
    cityname2(val) {
      this.citynamess = val.name
    },
    Add2(form) {
      var pamers = {
        'cityId': this.transportType2list.cityId,
        'cityName': this.citynamess,
        'transportType': 2,
        'isDefault': true,
        'firstCondition': this.transportType2list.firstCondition,
        'firstAmount': this.transportType2list.firstAmount,
        'secondCondition': this.transportType2list.secondCondition,
        'secondAmount': this.transportType2list.secondAmount
      }
      if (pamers.firstCondition === '' || pamers.firstAmount === '' || pamers.secondCondition === '' || pamers.secondAmount === '') {
        this.$message({
          message: '请完善相关数据',
          type: 'warning'
        })
        return
      }
      if (pamers.firstCondition === undefined || pamers.firstAmount === undefined || pamers.secondCondition === undefined || pamers.secondAmount === undefined) {
        this.$message({
          message: '请完善相关数据',
          type: 'warning'
        })
        return
      } else {
        this.form.type2List.push(pamers)
        this.transporttype2 = false
        this.transportType2list.cityId = ''
        this.transportType2list.firstCondition = ''
        this.transportType2list.firstAmount = ''
        this.transportType2list.secondCondition = ''
        this.transportType2list.secondAmount = ''
      }
    },

    handleClick3(row, index) {
      this.form.type3List.splice(index, 1)
    },
    transporttype3Add() {
      this.transporttype3 = true
    },
    cityname3(val) {
      this.citynamesss = val.name
    },
    Add3(form) {
      var pamers = {
        'cityId': this.transportType3list.cityId,
        'cityName': this.citynamesss,
        'transportType': 3,
        'isDefault': true,
        'firstCondition': this.transportType3list.firstCondition,
        'firstAmount': this.transportType3list.firstAmount,
        'secondCondition': this.transportType3list.secondCondition,
        'secondAmount': this.transportType3list.secondAmount
      }
      if (pamers.firstCondition === '' || pamers.firstAmount === '' || pamers.secondCondition === '' || pamers.secondAmount === '') {
        this.$message({
          message: '请完善相关数据',
          type: 'warning'
        })
        return
      }
      if (pamers.firstCondition === undefined || pamers.firstAmount === undefined || pamers.secondCondition === undefined || pamers.secondAmount === undefined) {
        this.$message({
          message: '请完善相关数据',
          type: 'warning'
        })
        return
      } else {
        this.form.type3List.push(pamers)
        this.transporttype3 = false
        this.transportType3list.cityId = ''
        this.transportType3list.firstCondition = ''
        this.transportType3list.firstAmount = ''
        this.transportType3list.secondCondition = ''
        this.transportType3list.secondAmount = ''
      }
    },

    handleClick4(row, index) {
      this.form.type4List.splice(index, 1)
    },
    transporttype4Add() {
      this.transporttype4 = true
    },
    cityname5(val) {
      this.citynamesssss = val.name
    },
    Add4(form) {
      var pamers = {
        'cityId': this.transportType4list.cityId,
        'cityName': this.citynamesssss,
        'transportType': 4,
        'isDefault': true,
        'firstCondition': this.transportType4list.firstCondition,
        'firstAmount': this.transportType4list.firstAmount,
        'secondCondition': this.transportType4list.secondCondition,
        'secondAmount': this.transportType4list.secondAmount
      }
      if (pamers.firstCondition === '' || pamers.firstAmount === '' || pamers.secondCondition === '' || pamers.secondAmount === '') {
        this.$message({
          message: '请完善相关数据',
          type: 'warning'
        })
        return
      }
      if (pamers.firstCondition === undefined || pamers.firstAmount === undefined || pamers.secondCondition === undefined || pamers.secondAmount === undefined) {
        this.$message({
          message: '请完善相关数据',
          type: 'warning'
        })
        return
      } else {
        this.form.type4List.push(pamers)
        this.transporttype4 = false
        this.transportType4list.cityId = ''
        this.transportType4list.firstCondition = ''
        this.transportType4list.firstAmount = ''
        this.transportType4list.secondCondition = ''
        this.transportType4list.secondAmount = ''
      }
    },

    // 显示包邮添加弹窗
    inclProvisoAdd() {
      this.inclProviso = true
    },
    cityname4(val) {
      this.citynamessss = val.name
    },
    inclProvisoAdds() {
      var pamers = {
        'cityId': this.inclProvisoist.cityId,
        'cityName': this.citynamessss,
        'condition': this.inclProvisoist.condition,
        'minAmount': this.inclProvisoist.minAmount
      }
      if (pamers.cityId === '' || pamers.condition === '' || pamers.minAmount === '') {
        this.$message({
          message: '请完善相关数据',
          type: 'warning'
        })
        return
      }
      if (pamers.cityId === undefined || pamers.condition === undefined || pamers.minAmount === undefined) {
        this.$message({
          message: '请完善相关数据',
          type: 'warning'
        })
        return
      } else {
        this.form.inclProvisoList.push(pamers)
        this.inclProviso = false
        this.inclProvisoist.cityId = ''
        this.inclProvisoist.condition = ''
        this.inclProvisoist.minAmount = ''
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
</style>
