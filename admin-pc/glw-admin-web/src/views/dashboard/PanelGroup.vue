<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('orderDatePrices')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            交易总金额
          </div>
<!--          <count-to :start-val="0" :end-val="countData.sumTotalPrice" :decimals="2" :duration="3200" class="card-panel-num" />-->
                    <count-to :start-val="0" :end-val="50022181.58" :decimals="2" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('orderDateCounts')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            交易订单总量
          </div>
<!--          <count-to :start-val="0" :end-val="countData.totalOrderCount" :duration="3600" class="card-panel-num" />-->
                    <count-to :start-val="0" :end-val="306100" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('footprintDateCounts')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            商户总数
          </div>
<!--          <count-to :start-val="0" :end-val="countData.merchantCount" :duration="2600" class="card-panel-num" />-->
                    <count-to :start-val="0" :end-val="782" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('favoriteDateCounts')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户总数
          </div>
<!--          <count-to :start-val="0" :end-val="countData.userCount" :duration="3000" class="card-panel-num" />-->
                    <count-to :start-val="0" :end-val="1152000" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('favoriteDateCounts')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="user" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户访问量
          </div>
          <count-to :start-val="0" :end-val="60920145" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('favoriteDateCounts')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="user1" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            好评率
          </div>
          <count-to  end-val="98"  class="card-panel-num" />%

        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    countData: {
      type: Object,
      required: true
    }
  },
  watch: {
    countData: {
      deep: true,
      handler(val) {
        // this.dashboardData = val
      }
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      margin-right: 20px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 2vh;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 2.2vh;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
