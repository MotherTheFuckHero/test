<template>
    <div class="shopCar-container">
      <Search></Search>
      <div class="shopCar-content">
        <div class="shopCar-content-div">
          <h2>{{this.$t("shopCar.allProducts")}}</h2>
          <div class="shopCar-content-div-shop">
            <Table
              ref="shopTable"
              :columns="shopColumns"
              :data="shopData"
              size="large"
              aria-labelledby
              :no-data-text='this.$t("shopCar.noShopCar")'
              @on-selection-change="getShopSelection()">
              <tr><th id=""></th></tr>
            </Table>
            <div class="shopCar-content-div-shop-footer">
              <p>
                {{this.$t("shopCar.totalPrice")}}：{{total}}
                <span @click="deleteAllList">
                  {{this.$t("shopCar.batchDelete")}}
                </span>
              </p>
              <button @click="goToShopCarPay">{{this.$t("shopCar.settleAccount")}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { getShopCarList, deleteShopCar, deleteShopCarList } from '../api/shopCar';
import { BigNumber } from 'bignumber.js';
import Search from '@/components/Search';
export default {
  name: 'ShopCar',
  components: {
    Search
  },
  data () {
    return {
      selectShop: [],
      shopColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t("shopCar.productPicture"),
          width: 140,
          key: 'picUrl',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.picUrl
                },
                style: {
                  width: '50px',
                  height: '50px'
                }
              })
            ]);
          }
        },
        {
          title: this.$t("shopCar.productName"),
          width: 130,
          key: 'productName',
          align: 'center'
        },
        {
          title: this.$t("shopCar.specification"),
          width: 130,
          key: 'specName',
          align: 'center'
        },
        {
          title: this.$t("shopCar.unitPrice"),
          width: 130,
          key: 'price',
          align: 'center'
        },
        {
          title: this.$t("shopCar.number"),
          key: 'number',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('InputNumber', {
                props: {
                  max: 100,
                  min: 0,
                  value: params.row.productNum
                },
                on: {
                  'on-change': (value) => {
                    this.shopData[params.index].productNum = value;
                    this.shopData[params.index].allPrice = (value * params.row.price).toFixed(2);
                    this.selectShop = [];
                  }
                }
              })
            ]);
          }
        },
        {
          title: this.$t("shopCar.totalPrice"),
          key: 'allPrice',
          align: 'center',
          render: (h, params) => {
            // eslint-disable-next-line no-return-assign
            return h('div', [
              h('span', this.shopData[params.index].allPrice = (params.row.productNum * params.row.price).toFixed(2))
            ]);
          }
        },
        {
          title: this.$t("shopCar.operation"),
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '删除',
                      content: '确定删除该商品吗？',
                      onOk: () => {
                        deleteShopCar(params.row.id).then(res => {
                          if (res.code === '0'){
                            this.$Notice.success({title: '删除成功', desc: ''});
                            this.getList();
                          }else{
                            this.$Notice.warning({title: '警告', desc: res.msg});
                          }
                        })
                      },
                      onCancel: () => {
                        this.$Message.info('取消删除');
                      }
                    });
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      shopData: []
    };
  },
  computed: {
    total () {
      if (this.selectShop.length === 0) {
        return 0;
      } else {
        const num = this.selectShop.reduce((a, b) => {
          return new BigNumber(a).plus(new BigNumber(b.productNum).multipliedBy(b.price));
        }, 0);
        return new BigNumber(num).toFixed(2);
      }
    }
  },
  created () {
    this.getList();
  },
  methods: {
    getList() {
      getShopCarList().then(res => {
        if (res.code === '0') {
          if (res.data !== []) {
            let shopDataList = res.data;
            let newArr = [];
            for (let i in shopDataList) {
              for (let j in shopDataList[i].shopCartResponseList) {
                newArr.push(shopDataList[i].shopCartResponseList[j])
              }
            }
            this.shopData = newArr;
          }
        } else {
          this.$Notice.warning({title: '警告', desc: res.msg});
        }
      });
    },
    getShopSelection () {
      this.selectShop = this.$refs.shopTable.getSelection();
    },
    goToShopCarPay() {
      if (this.selectShop.length === 0) {
        this.$Notice.warning({title: '警告', desc: '请勾选要购买的商品，再结算'});
      } else {
        this.$router.push({
          path: '/toShopCarPay',
          query: {shopCarList: this.selectShop}
        })
        // let specRequests =[];
        // for (let i in this.selectShop) {
        //   let newObj = {
        //     specId: this.selectShop[i].specId,
        //     productNum: this.selectShop[i].productNum,
        //     bookingDate: new Date().getFullYear() + '-' +
        //             ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
        //             (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' ' +
        //             (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' +
        //             (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + ':' +
        //             (new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()),
        //   };
        //   specRequests.push(newObj)
        // }
        // let data = {
        //   source: 2,
        //   orderType: 9,
        //   currency: 'CNY',
        //   specRequests: specRequests
        // };
        // buyShopSubmit(data).then(res => {
        //   if (res.code === '0') {
        //       this.$route.push({
        //           path: '/toShopPay',
        //           query: {shopCarList: this.selectShop}
        //       })
        //   }else{
        //     this.$Notice.warning({title: '警告', desc: res.msg});
        //   }
        // })
      }
    },
    deleteAllList() {
        if (this.selectShop.length !== 0) {
            this.$Modal.confirm({
                title: '删除',
                content: this.$t("shopCar.delete"),
                onOk: () => {
                    let newArr = [];
                    this.selectShop.forEach(item => {
                        newArr.push(item.id)
                    });
                    deleteShopCarList(newArr).then(res => {
                        if (res.code === '0'){
                            this.$Notice.success({title: '删除成功', desc: ''});
                            this.getList();
                        }else{
                            this.$Notice.warning({title: '警告', desc: res.msg});
                        }
                    })
                },
                onCancel: () => {
                    this.$Message.info('取消删除');
                }
            });
        }else {
            this.$Notice.warning({title: '警告', desc: this.$t("shopCar.selectDelete")});
        }
    }
  }
};
</script>

<style scoped>
.shopCar-container{
  background-color: #F5F5F5;
}
.shopCar-content {
  width: 1008px;
  margin: 0px auto;
  padding: 30px 0;
}
.shopCar-content-div{
  width: 100%;
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
}
.shopCar-content-div>h2{
  width: 100%;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #E0E0E0;
}
.shopCar-content-div-shop{
  width: 100%;
  padding: 30px 0 0 0;
}
.shopCar-content-div-shop-footer{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.shopCar-content-div-shop-footer>p{
  font-size: 22px;
  font-weight: 800;
}
.shopCar-content-div-shop-footer>p>span{
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  margin-left: 20px;
  cursor: pointer;
}
.shopCar-content-div-shop-footer>p>span:hover{
  color: #f40;
  text-decoration: underline;
}
.shopCar-content-div-shop-footer>button{
  width: 120px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  border-style: none;
  outline: none;
  background-color: rgb(255, 0, 54);
  color: #ffffff;
}
</style>
