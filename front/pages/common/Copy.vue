<template>
  <span :data-clipboard-text="content" class="copy" v-html="text">{{text}}</span>
</template>

<script>
import dimmer from '../../mixins/ok-dimmer';
import Clipboard from 'clipboard';

export default {
  mixins: [dimmer],
  props: ['text', 'content', 'callback', 'el'],
	data() {
		return {
    }
	},
	mounted() {
    let clipboard = new Clipboard(this.$el);
    clipboard.on('success', (e) => {
      if(typeof this.callback == "function") {
        this.callback && this.callback();
      } else {
        this.showDimmer('复制成功');
      }
      e.clearSelection();
    });

    clipboard.on('error', (e) => {
      this.showDimmer('复制失败');
    });
	},
	methods: {
		onCopy() {

		},
    showDimmer(content) {
      let el = this.el ? $(this.$el).parents(this.el) : 'body';
      this.dimmer({el: el,content: content});
    }
	}
}
</script>
<style>

</style>
<style scoped lang="less">
  .copy {
    display: inline !important;
  }
</style>
