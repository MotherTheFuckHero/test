<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <panel-group :count-data="dashboardData" />

      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData" />
      </el-row>
    </div>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import { get } from '@/api/dashboard'
export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: {},
      dashboardData: {
        totalOrderCount: 0,
        sumTotalPrice: 0.00,
        merchantCount: 0,
        userCount: 0
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      get().then(res => {
        this.dashboardData.totalOrderCount = res.data.totalOrderCount
        this.dashboardData.sumTotalPrice = res.data.sumTotalPrice
        this.dashboardData.merchantCount = res.data.merchantCount
        this.dashboardData.userCount = res.data.userCount
        this.lineChartData = res.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
