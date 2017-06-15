1.第一步首先引入jquery.js文件；
2.第二部引入log.js文件；
3.调用埋点函数；

ES5例子：
<script type="text/javascript" src="../../../node_modules/jquery/src/jquery.js"></script>
<script type="text/javascript" src="../../../front/libs/log.js"></script>
<script type="text/javascript">
    setPoint({page_id:'store_home', page_name:'商家首页'});
</script>


ES6例子：
import setPoint from '../../../libs/log';
setPoint({page_id:'store_home', page_name:'商家首页', url_page_par: {page_tab: 1}});

参数说明：
page_id             --当前页面ID
page_name           --当前页面名称
url_page_par        --当前页面参数

--上一级页面 可以通过URL传参解决  列入当前页面地址为www.xxxx.com/index.html?ref_page_id=store_home&ref_page_name=商家首页&ref_page_par={"page_tab":1}
ref_page_id         --上一级页面ID
ref_page_name       --上一级页面名称
ref_page_par        --上一级页面参数
