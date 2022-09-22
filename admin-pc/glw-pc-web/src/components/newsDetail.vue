<template>
    <div class="container">
      <Search></Search>
      <HomeNav :parentPanelList="panelList"></HomeNav>
      <div class="news-detail" v-if="newDetailObj">
        <div class="news-content">
          <h1 style="text-align: center">{{newDetailObj.title}}</h1>
          <div v-html="newDetailObj.content" style="line-height: 28px;color: #000000;font-size: 14px"></div>
        </div>
      </div>
    </div>
</template>

<script>
    import { getNews } from '../api/news'
    import Search from '@/components/Search'
    import HomeNav from '@/components/nav/HomeNav'
    export default {
        name: "newsDetail",
        components: {
            Search,
            HomeNav,
        },
        data(){
          return {
              panelList: JSON.parse(localStorage.getItem("newPanelList")),
              newDetailObj: null
          }
        },
        beforeRouteEnter(to, from, next){
            next( vm => {
                let id = to.query.id;
                vm.getData(id);
            })
        },
        methods: {
            getData(id){
                getNews(id).then(res => {
                    if (res.code === '0'){
                        this.newDetailObj = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .container {
    background-color: #F5F5F5;
  }
  .news-detail{
    width: 1008px;
    height: auto;
    margin: 0 auto;
  }
  .news-content{
    width: 100%;
    margin: 15px auto;
    padding: 10px;
    background: #ffffff;
  }
</style>
