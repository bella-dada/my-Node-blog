<template>
  <div class="wow slideInLeft">
    <article-lists
      :AllArticle="AllArticle"
      :searchTit="searchTit"
      :searchCount="searchCount"
      :isSearch="isSearch"
    ></article-lists>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      @current-change="change"
    >
    </el-pagination>
  </div>
</template>

<script>
import WOW from "wowjs";
import ArticleLists from "../components/articleLists/ArticleLists.vue";
import { mapState, mapMutations } from "vuex";
export default {
  inject: ["reload"],
  components: { ArticleLists },
  data() {
    return {
      AllArticle: [],
      article: [],
      key: this.$route.query.key,
      // 当前的页，默认为第一页
      curPage: 1,
      // 设置每页的数量
      pageSize: 10,
      // 全部文章数量
      count: "",
      searchTit: "",
      searchCount: 0,
      isSearch: false,
    };
  },
  computed: {
    // 查询登录状态
    searchArticleList() {
      return this.$store.state.searchArticleList;
    },
  },
  // computed: mapState(["searchArticleList"]),
  beforeRouteUpdate(to, from, next) {
    this.reload();
    next();
  },
  watch: {
    key(val) {
      alert(val);
    },
  },
  methods: {
    change(val) {
      this.GetAllArticle(val, this.pageSize);
    },
    GetAllArticle(curPage, pageSize) {
      if (this.key) {
        // 获取分类文章信息
        this.$http
          .get("/api/article/list/Singleclassify", {
            params: { classname: this.key },
          })
          .then((res) => {
            if (res.data.code === 0) {
              // 获取文章数组
              this.AllArticle = res.data.data.list;
              console.log("获取分类文章信息", this.AllArticle);
            }
          });
      } else {
        // 获取全部文章信息
        this.$http
          .get("/api/article/typeList", {
            params: { curPage: curPage, pageSize: pageSize },
          })
          .then((res) => {
            if (res.data.code === 0) {
              // 获取文章数组
              this.AllArticle = res.data.data;
              this.count = res.data.coust;
              // this.article = this.$store.state.searchArticleList
              //   ? this.$store.state.searchArticleList
              //   : this.AllArticle;
            }
          });
      }
    },
  },
  created() {
    // 分页请求
    this.GetAllArticle(this.curPage, this.pageSize);
  },
  mounted() {
    let wow = new WOW.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>
