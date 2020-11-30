<template>
	<view class="cloudDetail-container">
		<view class="title" v-if="cludDetails.status=='00创建'">
			<image src="../../static/icon/cloudno.png" mode=""></image>
			<text>提货后即可配送</text>
		</view>
		<view class="title" v-if="cludDetails.status=='20运输中'">
			<image src="../../static/icon/cloud-ongoing.png" mode=""></image>
			<text>该团点配送中</text>
		</view>		
		<view class="title" v-if="cludDetails.status=='30交付完成'">
			<image src="../../static/icon/cloud-checkbox-circle.png" mode=""></image>
			<text>该团点已交付</text>
		</view>		
		<view class="title" v-if="cludDetails.status=='99放弃'">
			<image src="../../static/icon/folder-warning.png" mode=""></image>
			<text>该团点异常</text>
		</view>		
		<view class='cloud-boxes'>
			<view class="cloud-card">
				<view class="Id-Name">
					<view class="id">
						<text>任务ID：</text>
						<text>{{cludDetails.id}}</text>
					</view>
					<view class="name"> 
						<text>提货师傅：</text>
						<text>{{phone}}</text>
					</view>
				</view>
				<view class="Code-Order">
					<view class="cloud-order">
						<text>送货顺序：</text>
						<text>{{cludDetails.shipOrder}}</text>
					</view>
					<view class="cloud-code"> 
						<text>团点代码：</text>
						<text>{{cludDetails.consigneeNo}}</text>
					</view>
				</view>
				<view class="Delivery-time">
					<text>送货日期：</text>
					<text>{{cludDetails.expectedArriveTime}}</text>
				</view>
				<view class="cloud-navigation">
					<view class="cloud-loction-detail">
						<text>团点地址：</text>
						{{cludDetails.address}}
					</view>
					<view class="cloud-map" @click="locationAddress">
						<image src="../../static/icon/cloud-navigation.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="cloud-main">
				<!-- <view class="door-photo">
					<text>门头照片：</text>
				</view>
				<view class="lunbo">
					<u-swiper :list="list" :autoplay='autoplay' :interval='interval' height='320'></u-swiper>
				</view> -->
				<view class="all-goods">
					<view>全部商品：</view>
					<view>
						<text>(注意</text>
						<text></text>
						<text>为保温</text>
						<text></text>
						<text>为常温</text>
						<text></text>
						<text>为冷藏</text>
						<text></text>
						<text>为直领)</text>
					</view>
				</view>
				<view class="all-goods-table">
					<t-table>
					    <t-tr>
					        <t-th>代码</t-th>
					        <t-th>名称</t-th>
					        <t-th>数量</t-th>
					        <t-th>规格</t-th>
					    </t-tr>
					    <t-tr v-for="item in cludDetails.oDetails" :key="item.id">
					        <t-td :colorstyle='item.tempRequest'>{{item.sku}}</t-td>
					        <t-td>{{item.skuName}}</t-td>
					        <t-td>{{item.shippedQty}}</t-td>
					        <t-td>{{item.unit}}</t-td>
					    </t-tr>
					</t-table>
				</view>
				<view class="door-photo" style="margin-top: 39upx;">
					<text>特殊商品：</text>
				</view>
				<view class="cloud-special-goods" v-if="cludDetails.attachment.specGoods">
					{{cludDetails.attachment.specGoods}}
				</view>
				<view class="cloud-special-goods" v-if="!cludDetails.attachment.specGoods">
					暂无特殊商品
				</view>
				<view class="door-photo" style="margin-top: 39upx;">
					<text>缺货商品：</text>
				</view>
				<view class="cloud-special-goods" v-if="cludDetails.attachment.stockoutGoods">
					{{cludDetails.attachment.stockoutGoods}}
				</view>
				<view class="cloud-special-goods" v-if="!cludDetails.attachment.stockoutGoods">
					暂无缺货商品
				</view>
<!---->	
			
				<view class="all-goods" >
					<u-checkbox-group>
						<u-checkbox v-model="addressChecked" shape="square" @change="checkboxChange">{{content}}</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="all-goods" >
					<view>备注：</view>
				</view>
				<view class="address-note">
					<textarea value="" placeholder="多行文本输入" v-model="description"/>
				</view>
<!--  -->																								
				<view class="all-goods" >
					<view>验收图片：</view>
				</view>
				<view class="acceptancePicture"> 
					<view class="backPhoto" v-for="item in imageList" :key="item">
						<image :src="item" mode=""  @tap="_previewImage(item)"></image>
					</view>
					<view class="chooseImg" v-if="show"  @click="choose">
						<image src="../../static/icon/cameraTake.png" mode=""></image>
						<text>最多3张</text>
					</view>
				</view>
				<view class="goods" v-if="cludDetails.status=='99放弃'">
					<view class="goods-title">
						异常信息：
					</view>
					<view class="reason">
						原因：{{cludDetails.opers[0].operType}}
					</view>
				</view>
		<!-- 		<view class="goods" v-if="cludDetails.status=='99放弃'">
					<view class="goods-title">
						照片：
					</view>
					<view class="pictureList">
						<image :src="item" mode="" v-for="(item,index) in  imageList" :key='index'></image>
					</view>
				</view>
				<view class="goods" v-if="cludDetails.status=='99放弃'">
					<view class="goods-title">
						备注：
					</view>
					<view class="pictureList" style="margin-bottom: 20upx;">
						<text>{{cludDetails.opers[0].description}}</text>
					</view>
				</view> -->
			</view>
			<view class="cloud-zhanwei"></view>
			<view class="cloud-bootom" v-if="cludDetails.status=='00创建'||operate!='0'">
				<view class="look" @click="backCloud">
					<text>返回</text>
				</view>
				<view class="back" @click='takeGoods'>
					<text>去提货</text>
				</view>				
			</view>
			<view class="cloud-bootom" v-if="cludDetails.status=='20运输中'&&operate!='0'">
				<!-- <view class="taking-pictures" @click="linkSignGoods"> -->
				<view class="taking-pictures" @click="abnormalPoup=true">
					<image src="../../static/icon/draft-line-cloud.png" mode=""></image>
					<text>无法送达</text>
				</view>
				<view class="look" @click="tellPhone">
					<text>拨打电话</text>
				</view>
				<view class="sure" @click="takingPictures" v-if="takingPicturesShow">
					<text>拍照验收</text>
				</view>
				<view class="sure"  v-if="takingShow" @click="surePicu">
					<text>确认</text>
				</view>
			</view>			
			<view class="cloud-bootom" v-if="cludDetails.status=='30交付完成'||operate=='0'">
				<view class="look" @click="tellPhone">
					<text>拨打电话</text>
				</view>
				<view class="back" @click="backCloud">
					<text>返回</text>
				</view>
			</view>					
			<view class="cloud-bootom" v-if="cludDetails.status=='99放弃'&&operate!='0'">
				<view class="look" @click="tellPhone">
					<text>拨打电话</text>
				</view>
				<view class="sure" @click="takingPictures" v-if="takingPicturesShow">
					<text>拍照验收</text>
				</view>
				<view class="sure"  v-if="takingShow" @click="surePicu">
					<text>提交</text>
				</view>
			</view>		
		
		</view>
		<u-popup v-model="abnormalPoup" mode="bottom"  border-radius="14">
			<view class="abnormality">
				<view class="abnormality-title">
					无法送达原因
				</view>
				<view class="abnormality-reson">
					<view class="abnormality-reson">
						原因(可多选)
					</view>
					<view class="abnormality-reson-item">
						<text class="actove"  :class="{'active': isActive.indexOf(index)!=-1}"  @click="pickCheck(index,item)" v-for="(item,index) in orderReason" :key="item">{{item.name}}</text>	
					</view>
				</view>
				<view class="affirm">
					<text @click="cancel">取消</text>
					<text @click="affirmSure">确认</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import QQMapWX from '../../until/qqmap-wx-jssdk.min.js'
	 import tTable from '../../components/t-table/t-table.vue';
	 import tTh from '../../components/t-table/t-th.vue';
	 import tTr from '../../components/t-table/t-tr.vue';
	 import tTd from '../../components/t-table/t-td.vue';
	 import request from '../../until/request.js'
	export default {
		components:{
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {		
			return {
				show:false,
				autoplay:true,//是否自动轮播
				interval:2000,//图片切换时间
				cludDetails:'',//团点详情
				deliveriedTime:'',//送货日期,
				phone:'',//提货师傅
				refMediaIds:[],//拍照图片
				accessKey:'',
				signature:'',
				imageList:[],
				httpImgList:[],
				takingPicturesShow:true,
				takingShow:false,
				lat:'',
				lng:'',
				phoyoImg:[],
				operate:'',//判断是今日任务还是历史还是遮罩层
				abnormalPoup:false,//点击异常弹窗
				orderReason:[],//异常原因
				operType:'',//异常原因字符串
				isActive:[],
//----------------------------------------------------------
				addressChecked:false,
				checkd:false,
				content:'地址不正确',
				description:'',
//---------------------------------------------------------				
			}
		},
		onLoad(options) {
			let that=this
			let userMessage=uni.getStorageSync('userMessage')
			that.phone=userMessage.phone
			let id=uni.getStorageSync('id')
			that.$request({  //获取任务详情
				url: '/clique/getCliqueDetail',
				method: 'GET',
				data:{
					orderId:options.orderId,
					taskId:id
				},
			}).then(res => {
				if(res.resultCode==0){
					that.cludDetails=res.data					
					that.imageList=res.data.opers[0].refMediaIds.split(',')
					if(res.data.opers[0].operType=="地址不正确"){
						that.addressChecked=true
					}else{
						that.addressChecked=false
					}
					that.description=res.data.opers[0].description
					that.deliveriedTime=res.data.deliveriedTime.split('T')[0]
//--------------------------------------------------------------------------------------------------					
//----------------------------------------------------------------------------------------------------					
				}
			}).catch(erro => {})
			that.getUploadSign()
			that.getorderReason()
			let operate=uni.getStorageSync('operate')
			that.operate=operate
		},
		methods: {
			backCloud(){ //点击返回上一级页面
				uni.navigateBack({
					delta:1
				})
			},
			takeGoods(){ //点击去提货返回到任务详情列表
				uni.navigateTo({
					url:'../taskDetail/taskDetail'
				})
			},
			tellPhone(){ //拨打电话
				let that=this
				let mobilephone=that.cludDetails.mobilephone
				let telephone=that.cludDetails.telephone
				if(mobilephone==undefined&&telephone==undefined){
					return
				}					
				if(mobilephone.length==0&&telephone.length==0){
					return
				}				
				if(mobilephone.length==0||mobilephone==undefined){
					uni.makePhoneCall({
					 	// 手机号
					    phoneNumber: telephone, 				
						// 成功回调
						success: (res) => {
							console.log('调用成功!')	
						},				
						// 失败回调
						fail: (res) => {
							console.log('调用失败!')
						}					
					 })
				}else{
						uni.makePhoneCall({
						 	// 手机号
						    phoneNumber: mobilephone, 				
							// 成功回调
							success: (res) => {
								console.log('调用成功!')	
							},				
							// 失败回调
							fail: (res) => {
								console.log('调用失败!')
							}					
						 })
				}																																											
			},
			// linkSignGoods(){ //签收异常
			// 	let that=this
			// 	uni.setStorage({
			// 		key:"cloudPoint",
			// 		data:{
			// 			id:that.cludDetails.id,
			// 			phone:that.phone
			// 		}
			// 	})
			// 	uni.navigateTo({
			// 		url:'../pickGoods/SignGoods'
			// 	})
			// },
			locationAddress(){ //点击定位
				let that=this
				const latitude=that.cludDetails.latitude
				const longitude=that.cludDetails.longitude
				uni.getLocation({
					type:'gcj02',//
					success:function(res){
						let qqmapsdk = new QQMapWX({
						  key: 'DLLBZ-BC3W4-RENUP-DGTBF-WDWJ3-5AFRW'
						});
						qqmapsdk.reverseGeocoder({
							location:{
								latitude: latitude,
								longitude: longitude
							},
							// success(res){
							// 	console.log(res)
							// 	that.address=res.result.ad_info.city+' '+res.result.ad_info.district
							// 	uni.openLocation({
							// 		 latitude:Number(latitude),
							// 		 longitude:Number(longitude),
							// 		 name:res.result.address,
							// 		 address:res.result.formatted_addresses.recommend,
							// 		 success: function () {
									
							// 		}
							// 	})
							// }
							success(res){
								uni.openLocation({
									 latitude:Number(latitude),
									 longitude:Number(longitude),
									 address:that.cludDetails.address,
									 success: function () {
									
									}
								})
							}
						})
					}
				})				
			},
			getUploadSign(){//获取签名
				let that=this
				that.$request({
					url: '/upload/getUploadSign',
					method: 'GET',
					data:'',
				}).then(res => {
					if(res.resultCode==0){
						that.accessKey=res.data.accessKey
						that.signature=res.data.signature
					}
				}).catch(erro => {
				
				})
			},						
			takingPictures(){ //拍照
				let that=this				
				uni.getLocation({
					type:'gcj02',//
					success:function(result){
						that.lat=result.latitude
						that.lng=result.longitude
						uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
							count: 1, //默认选择1张图片
							sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
							success: (res) => {
								console.log(that.imageList)
								that.imageList.push(res.tempFilePaths[0])
								if(that.imageList.length==1){
									that.takingPicturesShow=false
									that.takingShow=true
									that.show=true
								}
								uni.uploadFile({ //将本地资源上传到开发者服务器
									url: 'https://fastdfs-uploading.pagoda.com.cn/file/common/commonUpload', //接口地址
									filePath:res.tempFilePaths[0], //图片地址
									header: {
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
										"accessKey":that.accessKey,
										"signature":that.signature,
									},
									name: 'file',
									formData: {
										storeServeType:'',
										subDirectory:'',
										accessLevel:'',
										expireDay:'',
									},
									success: (uploadFileRes) => {
										that.httpImgList.push(JSON.parse(uploadFileRes.data).data.fileUrl)
										that.refMediaIds=that.httpImgList.toString()
									}
								});
							}
						});
					}
				})
			},
			choose(){
				let that=this
				uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
					count: 1, //默认选择1张图片
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					success: (res) => {
						that.imageList.push(res.tempFilePaths[0])
						if(that.imageList.length==3){
							that.show=false
						}
						uni.uploadFile({ //将本地资源上传到开发者服务器
							url: 'https://fastdfs-uploading.pagoda.com.cn/file/common/commonUpload', //接口地址
							filePath:res.tempFilePaths[0], //图片地址
							header: {
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
								"accessKey":that.accessKey,
								"signature":that.signature,
							},
							name: 'file',
							formData: {
								storeServeType:'',
								subDirectory:'',
								accessLevel:'',
								expireDay:'',
							},
							success: (uploadFileRes) => {
								that.httpImgList.push(JSON.parse(uploadFileRes.data).data.fileUrl)
								console.log(that.httpImgList)
								that.refMediaIds=that.httpImgList.toString()													
							}
						});
					}
				});
			},
			surePicu(){ //拍照后确认	
				let that=this
				if(that.checkd==false){
					that.operType=''
				}else{
					that.operType='地址不正确'
				}
				uni.showModal({
					title: '提示',
					content: '确认已签收',
					success: function(res) {
						if (res.confirm) {
							that.$request({
								url: '/clique/successCliqueOrder?orderId='+that.cludDetails.id,
								method: 'POST',
								data:{
									phone:that.phone,
									lat:that.lat,
									lng:that.lng,
									refMediaIds:that.refMediaIds,
							//-----------------------------------------------		
									operType:that.operType,
									description:that.description,
							//----------------------------------------------		
								},
							}).then(success => {
									if(success.resultCode==0){
										uni.switchTab({
											url:'../task/task'
										})
									}
							}).catch(erro => {})	
						} 
					}
				});	
			},
			getorderReason(){ //获取异常原因
				let that=this
				that.$request({
					url: '/data/orderReason',
					method: 'GET',
					data:'',
				}).then(res => {
					console.log(res)
					if(res.resultCode==0){
						that.orderReason=res.data
						for(let i=0;i<res.data.length;i++){
							that.orderReason[i]={name:res.data[i],check:false}
						}
					}
				}).catch(erro => {
				
				})
			},
			pickCheck(index,item){
				item.check=true
				var that = this;
					if (that.isActive.indexOf(index) == -1) {
						that.isActive.push(index); //选中添加到数组里
					} else {
						that.isActive.splice(that.isActive.indexOf(index), 1); //取消
				}
				let arr=[]
				for(let i=0;i<that.orderReason.length;i++){
					if(that.orderReason[i].check==true){
						arr.push(that.orderReason[i].name)
					}
				}
				that.operType=arr.toString()
			
			},
			cancel(){ //异常原因点击取消
				this.abnormalPoup=false
			},
			affirmSure(){ //异常原因点击提交
				let that=this
				uni.getLocation({
					type:'gcj02',//
					success:function(result){
						that.$request({  
							url: '/clique/closeCliqueOrder?orderId='+that.cludDetails.id,
							method: 'POST',
							data:{
								phone:that.phone,
								lat:result.latitude,
								lng:result.longitude,
								operType:that.operType
							},
						}).then(res => {
							if(res.resultCode==0){
								uni.switchTab({
									url:'../task/task'
								})
							}
						}).catch(erro => {})	
					}
				})
			},
			_previewImage(image) { //图片放大
				var imgArr = [];
				imgArr.push(image)
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},	
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e)
				this.checkd=e.value
				console.log(this.checkd)
			},		
		}
	}
</script>

<style>
	page{width: 100%;height: 100%;}
	.cloudDetail-container{width: 100%;height: 100%;position: relative;background: #F6F5F5}
	.title{width: 100%;overflow: hidden;background: #3E414F;}
	.title image{display: block;width: 80upx;height: 72upx;float: left;margin: 20upx 21upx 75upx 192upx;}
	.title text{display: block;float: left;font-size:38upx ;color: #fff;margin-top: 30upx;}
	.cloud-boxes{width: 100%;overflow: hidden;position: absolute;left: 0;top: 130upx;}	
	.cloud-card{width:702upx ;overflow: hidden;margin: 0 auto;border-radius:8upx ;background: #fff;padding: 30upx 27upx;}
	.Id-Name,.Code-Order{display: flex;justify-content: space-between;}
	.id text,.cloud-order text,.Delivery-time{display: inline-block;}
	.id text:nth-of-type(1),.name text:nth-of-type(1),.cloud-order text:nth-of-type(1),.cloud-code text:nth-of-type(1),.Delivery-time text:nth-of-type(1){font-size:26upx ;color: #777777;}
	.id text:nth-of-type(2),.name text:nth-of-type(2),.cloud-order text:nth-of-type(2),.cloud-code text:nth-of-type(2){font-size: 26upx;color: #3E414F;font-weight: bold;}
	.Delivery-time text:nth-of-type(2){font-size: 26upx;color: #FF8833;}
	.Code-Order{margin-top: 30upx;}
	.Delivery-time{margin: 30upx 0 10upx 0;}
	.cloud-navigation{width: 100%;overflow: hidden;border-top:2upx solid #EDEDED ;margin-top: 20upx;}
	.cloud-loction-detail{float: left;width: 480upx;overflow: hidden;font-size: 30upx;color: #3E414F;margin-top: 20upx;}
	.cloud-loction-detail text:nth-of-type(1){font-size: 30upx;color: #777777;}
	.cloud-map{float: right;width: 164upx;height: 124upx;}
	.cloud-map image{width: 164upx;height: 124upx;margin-top: 20upx;}
	.cloud-main{width: 100%;overflow: hidden;padding: 20upx 24upx 0 24upx;margin-top:40upx ;background: #fff;}
	.door-photo{width: 100%;overflow: hidden;}
	.door-photo text{display: inline-block;font-size: 30upx;color: #3E414F;font-weight: bold;}
	.lunbo{width: 100%;overflow: hidden;margin-top: 19upx;}
	.all-goods{width: 100%;overflow: hidden;margin-top: 40upx;}
	.all-goods view:nth-of-type(1){font-size: 30upx;color: #3E414F;font-weight: bold;float: left;}
	.all-goods view:nth-of-type(2){float: left;}
	.all-goods view:nth-of-type(2) text{display: block;float: left;}
	.all-goods view:nth-of-type(2) text:nth-of-type(1),.all-goods view:nth-of-type(2) text:nth-of-type(3),
	.all-goods view:nth-of-type(2) text:nth-of-type(5),.all-goods view:nth-of-type(2) text:nth-of-type(7),
	.all-goods view:nth-of-type(2) text:nth-of-type(9){
		font-size: 26upx;color: #3E414F;}
	.all-goods view:nth-of-type(2) text:nth-of-type(2){width: 26upx;height: 26upx;background: #FF5959;margin: 5upx 7upx 0 7upx;}
	.all-goods view:nth-of-type(2) text:nth-of-type(4){width: 26upx;height: 26upx;background: #06BD7D;margin: 5upx 7upx 0 7upx;}
	.all-goods view:nth-of-type(2) text:nth-of-type(6){width: 26upx;height: 26upx;background: #4868FB;margin: 5upx 7upx 0 7upx;}
	.all-goods view:nth-of-type(2) text:nth-of-type(8){width: 26upx;height: 26upx;background: #F6F5F5;margin: 5upx 7upx 0 7upx;}
	.all-goods-table{margin-top: 19upx;}
	.cloud-special-goods{width: 100%;overflow: hidden;background: #F6F5F5;border-radius: 8upx;min-height: 158upx;height: auto;
	padding: 32upx 26upx;margin-top: 19upx;font-size: 28upx;color: #494C5D;}
	.cloud-zhanwei{width: 100%;height: 200upx;}
	.cloud-bootom{width: 100%;height: 120upx;background: #fff;box-shadow: 0px 0px 14px 0px rgba(4, 0, 0, 0.1);position: fixed;left: 0;bottom: 0;
	display: flex;justify-content: space-evenly;}
	.cloud-bootom view image{display: block;width: 40upx;height: 38upx;}
	.taking-pictures{width: 150upx;}
		.taking-pictures image{margin: 18upx auto 10upx;}
		.taking-pictures text{display: block;text-align: center;font-size: 26upx;color: #3E414F;}
		.look {text-align: center;}
		.look text{display: inline-block;width: 260upx;height: 90upx;line-height: 90upx;font-size: 30upx;color: #3E414F;
	border: 2upx solid #C5C9D1;border-radius: 8upx;text-align: center;margin: 15upx 0 15upx 0;}
		.sure text{display: inline-block;width: 260upx;height: 90upx;line-height: 90upx;font-size: 30upx;color: #fff;	
		background: linear-gradient(270deg, #FF8833 0%, #FAA951 100%);border-radius: 8upx;text-align: center;margin: 15upx 0 15upx 0;}
		.back text{display: inline-block;width: 412upx;height: 90upx;line-height: 90upx;font-size: 30upx;color: #fff;
		background: linear-gradient(270deg, #FF8833 0%, #FAA951 100%);border-radius: 8upx;text-align: center;margin: 15upx 0 15upx 0;}
		.goods{width: 100%;overflow: hidden;}
		.goods-title{width: 100%;font-size: 30upx;color: #3E414F;font-weight: bold;margin: 29upx 0 19upx 0;}
		.goods-detail{width: 100%;min-height: 158upx;background: #F6F5F5;border-radius: 8upx;font-size: 28upx;color: #494C5D;padding: 26upx 27upx 26upx 27upx;}
		.pictureList image{width: 203upx;height: 176upx;display: block;float: left;margin-right: 15upx;margin-top: 20upx;}
		.pictureList text{display: block;width: 100%;height: 158upx;background: #F6F5F5;border-radius: 8upx;padding: 26upx;font-size: 28upx;color: #494C5D;}
		.green{background: #06BD7D;}
		.acceptancePicture{width: 100%;overflow: hidden;}
		.chooseImg{width: 180upx;height:180upx;float: left;
		border: 2upx dashed #C5C9D1;
		border-radius: 8upx;margin-left: 20upx;margin-top: 10upx;}
		.chooseImg image{width: 54upx;height: 51upx;display: block;margin: 42upx auto 19upx;}
		.chooseImg text{display: block;width: 100%;font-size: 26upx;color:#3E414F;text-align: center;}
		.backPhoto{width: 180upx;height: 180upx;float: left;margin-left:20upx;margin-top: 10upx;border-radius: 8upx;}
		.backPhoto image{width:180upx;height:180upx;border-radius: 8upx;}
		
		
		
		
		.abnormality{width: 710upx;margin: 0 auto;min-height: 600upx;}
		.abnormality-title{width: 100%;overflow: hidden;font-size: 34upx;text-align: center;margin-top: 20upx;font-weight: bold;}
		.abnormality-reson{width: 100%;overflow: hidden;margin-top: 20upx;font-weight: bold;font-size: 30upx;}
		.abnormality-reson-item{width: 100%;overflow: hidden;margin-top: 20upx;}
		.abnormality-reson-item text{display: inline-block;min-width:200upx ;height: 66upx;text-align: center;line-height: 66upx;
		font-size:26upx ;border-radius: 8upx;margin-bottom: 20upx;margin-right: 10upx;float: left;}
		.affirm{width: 100%;display: flex;justify-content: space-evenly;margin-top: 100upx;}
		.affirm text{display: block;font-size: 30upx;text-align: center;height: 90upx;line-height: 90upx;}
		.affirm text:nth-of-type(1){width: 260upx;border: 2upx solid #C5C9D1;border-radius: 8upx;color: #3E414F;}
		.affirm text:nth-of-type(2){width: 412upx;background: linear-gradient(270deg, #FF8833 0%, #FAA951 100%);border-radius: 8upx;color: #FFFFFF;}
		.active{background: #FFF3EA;border: 2upx solid #FF8833;border-radius: 8upx;color: #FF8833;}
		.actove{background: #F5F7FA;border-radius: 8upx;}
		.address-note{width: 100%;overflow: hidden;}
		.address-note textarea{width: 100%;height: 188upx;background: #F6F5F5;border-radius: 8upx;padding: 32upx 26upx;margin-top: 19upx;font-size: 28upx;color: #494C5D;box-sizing: border-box;}
</style>
