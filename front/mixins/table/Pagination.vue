<template language="html">
  <div class="ui right floated pagination menu mini">
    <a data-action="first" class="item" :class="{'disabled': !hasPrePage}">首页</a>
    <a data-action="pre" class="page-pre icon item" :class="{'disabled': !hasPrePage}">
      <i class="left chevron icon"></i>
    </a>
    <a v-for="pageNum in pages" class="item" :class="{'active': pageNum==page.pageNo}"
      data-action="page" :data-value="pageNum">{{pageNum}}</a>
    <a data-action="next" class="page-next icon item" :class="{'disabled': hastNextPage}">
      <i class="right chevron icon"></i>
    </a>
    <a data-action="last" class="page-last item" :class="{'disabled': hastNextPage}">末页</a>
    <a class="page-total item disabled">共{{page.totalPage}}页/{{page.totalCount}}记录</a>
  </div>
</template>

<script>
export default {
    props: {
        page: {
            type: Object
        }
    },
    computed: {
      hasPrePage() {
          return this.page.pageNo > 1 && this.page.totalPage > 1;
      },
      hastNextPage() {
          return !(this.page.pageNo < this.page.totalPage && this.page.totalPage > 1);
      },
      pages() {
        var totalPage = this.page.totalPage;
        var pageNo = this.page.pageNo;
  			if(this.page.totalCount <= 0) return [];
  			if(totalPage <= 0) return [];
        if(totalPage == 1) return [1];
        if(totalPage == 2) return [1,2];
        if(totalPage === 3) return [1,2,3];
        if(totalPage === 4) return [1,2,3,4];
        if(totalPage === 5) return [1,2,3,4,5];
        if(pageNo <= 3) return [1,2,3,4,5];
        if(pageNo >= totalPage - 3) return [totalPage-4, totalPage-3, totalPage-2, totalPage-1, totalPage];
        return [pageNo-2, pageNo-1, pageNo, pageNo+1, pageNo+2];
      }
    },
    mounted() {
      this.$nextTick(() => {
        var me = this;
        $(this.$el).on('click', 'a.item', function() {
          if($(this).hasClass('disabled') || $(this).hasClass('active')) return;
          var action = $(this).data('action');
          var value = $(this).data('value');
          me.$parent.$emit('pagination.click', action, value);
        });
      });
    }
}
</script>

<style scoped>
.page-total {
	font-weight: bold !important;
	color: #333 !important;
}
</style>
