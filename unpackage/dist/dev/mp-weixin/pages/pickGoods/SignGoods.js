(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pickGoods/SignGoods"],{104:
/*!*******************************************************************!*\
  !*** E:/app/百果园/main.js?{"page":"pages%2FpickGoods%2FSignGoods"} ***!
  \*******************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){n(/*! uni-pages */4);r(n(/*! vue */2));var t=r(n(/*! ./pages/pickGoods/SignGoods.vue */105));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createPage"])},105:
/*!************************************************!*\
  !*** E:/app/百果园/pages/pickGoods/SignGoods.vue ***!
  \************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! ./SignGoods.vue?vue&type=template&id=41e59b36& */106),o=n(/*! ./SignGoods.vue?vue&type=script&lang=js& */108);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n(/*! ./SignGoods.vue?vue&type=style&index=0&lang=css& */110);var a,c=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),s=Object(c["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],a);s.options.__file="pages/pickGoods/SignGoods.vue",t["default"]=s.exports},106:
/*!*******************************************************************************!*\
  !*** E:/app/百果园/pages/pickGoods/SignGoods.vue?vue&type=template&id=41e59b36& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./SignGoods.vue?vue&type=template&id=41e59b36& */107);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},107:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/app/百果园/pages/pickGoods/SignGoods.vue?vue&type=template&id=41e59b36& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return o})),n.d(t,"staticRenderFns",(function(){return a})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return r}));var o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.orderReason,(function(t,n){var r=e.__get_orig(t),o=e.isActive.indexOf(n);return{$orig:r,g0:o}})));e.$mp.data=Object.assign({},{$root:{l0:n}})},i=!1,a=[];o._withStripped=!0},108:
/*!*************************************************************************!*\
  !*** E:/app/百果园/pages/pickGoods/SignGoods.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./SignGoods.vue?vue&type=script&lang=js& */109),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},109:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/app/百果园/pages/pickGoods/SignGoods.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;r(n(/*! ../../until/request.js */37));function r(e){return e&&e.__esModule?e:{default:e}}var o={data:function(){return{orderReason:[],show:!0,imageList:[],accessKey:"",signature:"",isActive:[],operType:"",httpImgList:[],refMediaIds:"",description:""}},onLoad:function(){this.getorderReason(),this.getUploadSign()},methods:{pickCheck:function(e,t){t.check=!0;var n=this;-1==n.isActive.indexOf(e)?n.isActive.push(e):n.isActive.splice(n.isActive.indexOf(e),1);for(var r=[],o=0;o<n.orderReason.length;o++)1==n.orderReason[o].check&&r.push(n.orderReason[o].name);n.operType=r.toString()},getorderReason:function(){var e=this;e.$request({url:"/data/orderReason",method:"GET",data:""}).then((function(t){if(0==t.resultCode)for(var n=0;n<t.data.length;n++)e.orderReason[n]={name:t.data[n],check:!1}})).catch((function(e){}))},getUploadSign:function(){var e=this;e.$request({url:"/upload/getUploadSign",method:"GET",data:""}).then((function(t){0==t.resultCode&&(e.accessKey=t.data.accessKey,e.signature=t.data.signature)})).catch((function(e){}))},cancel:function(){e.navigateBack({delta:1})},choose:function(){var t=this,n=this;e.chooseImage({count:1,sizeType:["original","compressed"],success:function(r){n.imageList.push(r.tempFilePaths[0]),6==n.imageList.length&&(n.show=!1),e.uploadFile({url:"https://fastdfs-uploading.pagoda.com.cn",filePath:r.tempFilePaths[0],header:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",accessKey:n.accessKey,signature:n.signature},name:"file",formData:{storeServeType:"",subDirectory:"",accessLevel:"",expireDay:""},success:function(e){var n=t;n.httpImgList.push(JSON.parse(e.data).data.fileUrl),n.refMediaIds=n.httpImgList.toString()}})}})},sureResaon:function(){var t=this;e.showModal({title:"提示",content:"确认提交异常信息",success:function(n){if(n.confirm){var r=e.getStorageSync("cloudPoint");e.getLocation({type:"gcj02",success:function(n){t.$request({url:"/clique/closeCliqueOrder?orderId="+r.id,method:"POST",data:{phone:r.phone,lat:n.latitude,lng:n.longitude,operType:t.operType,refMediaIds:t.refMediaIds,description:t.description}}).then((function(t){0==t.resultCode&&e.switchTab({url:"../task/task"})})).catch((function(e){}))}})}}})}}};t.default=o}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},110:
/*!*********************************************************************************!*\
  !*** E:/app/百果园/pages/pickGoods/SignGoods.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./SignGoods.vue?vue&type=style&index=0&lang=css& */111),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},111:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/app/百果园/pages/pickGoods/SignGoods.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}},[[104,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/pickGoods/SignGoods.js.map