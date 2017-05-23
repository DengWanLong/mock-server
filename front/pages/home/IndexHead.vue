<template>
  <div>
    <div class="index-head head-height animated bounceInDown">
        <div class="logo menu-button logo-button">
          <router-link :to="{ name: 'index'}" title="首页"><img src="../../assets/logo.png"></router-link>
        </div>
        <a class="ui menu-button" @click="showMenu()" title="菜单"><i class="sidebar icon"></i>Menu</a>
        <div class="right"><div class="user-info">{{userInfo.userName}}&nbsp;&nbsp;|&nbsp;&nbsp;<a class="ui menu-button logout">退出</a></div></div>
    </div>
    <div class="head-height"></div>
  </div>
</template>

<script>
// import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
		};
	},
	computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
	},
  mounted() {
    this.$nextTick(function () {
      this.getUserInfo();
      $(".logout").click(() => {
        this.logout();
      });
    })
  },
	methods: {
    ...mapActions(['getUserInfo', 'logout']),
    showMenu() {
      //.sidebar('setting', 'transition', 'overlay').sidebar('setting', 'closable', false)
      $('.ui.labeled.icon.sidebar').sidebar('setting', 'dimPage', false).sidebar('toggle');
    }
	}
}
</script>

<style scoped lang="less">
.head-height {
  height: 80px;
  line-height: 80px;
}
.index-head {
    width: 100%;
    // border-bottom: 3px solid rgba(176, 196, 222, .8);
    padding: 0px 100px;
    background-color: #59e0c8;
    font-size: 22px;
    font-weight: bold;
    font-family: 微软雅黑;
    color: rgba(255, 255, 255, .9);
    position: fixed;
    top: 0px;
    left: 0px;
    //box-shadow: 0 0 20px rgba(89, 224, 200, .9);

    a {
      color: rgba(255, 255, 255, .9);
      cursor: pointer;
    }

    a:hover {
      color: rgba(255, 255, 255, 1);
    }

    .menu-button {
      color: rgba(255, 255, 255, .9);
      border-radius: 4px;
      padding: 5px;
      padding-left: 13px;
      padding-right: 10px;
      vertical-align: middle;
    }

    .menu-button:hover {
      background-color: rgba(255, 255, 255, .3);
      color: rgba(255, 255, 255, 1);
    }

    .logo-button {
      padding: 0px;
    }

    .logo {
      display: inline-block;
      height: 90px;
      overflow: hidden;
      vertical-align: middle;
      margin-top: -6px;
      margin-left: -20px;

      img {
        height: 90px;
      }
    }

    .right {
      float: right;

      .user-info {
        display: inline-block;
        vertical-align: middle;
      }
    }
}
</style>
