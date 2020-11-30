<template>
	<view class="cloud-item"  @click="cloudDetail">
		<view class="item-left">
			{{item.shipOrder}}     
		</view>
		<view class="item-right">
			<view class="cloud-code">
				<text class="_label">团点代码：</text>
				<text class="_label-detail">{{item.consigneeNo}}</text>
			</view>
			<view class="cloud-name" >
				<text class="_label">团点名称：</text>
				<text>{{item.storeName}}</text>
			</view>
			<view class="cloud-name">
				<text class="_label">团点地址：</text>
				<text>{{item.address}}</text>
			</view>
			<view class="phone-location">
				<view class="checkphone"  @click.stop.prevent="tellphone(item.mobilephone,item.telephone)">
					<image src="../static/icon/boda.png" mode=""></image>
					<text>拨打</text>
				</view>
				<view class="location-logo" @click.stop.prevent="navigation(item.latitude,item.longitude)">
					<image src="../static/icon/navigation.png" mode=""></image>
					<text>导航</text>
				</view>
			</view>
		</view>
		<view class="zhezhao" v-if="item.status=='30交付完成'||item.status=='99放弃'">
			<text v-if="item.status=='30交付完成'">此任务已交付完成</text>
			<text v-if="item.status=='99放弃'">此任务异常</text>
			<text>查看明细</text>
			<view class="success" v-if="item.status=='30交付完成'">
				 <image src="../static/icon/checkbox-circle.png" mode=""></image>
				 已交付
			</view>
			<view class="abnormal" v-if="item.status=='99放弃'">
				<image src="../static/icon/error-warning-line.png" mode=""></image>
				异常
			</view>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '../until/qqmap-wx-jssdk.min.js'
	export default {
		props: {
			item: Object,
			opera:String,
			required: true
		},
		data() {
			return {
			
				
			};
		},
		onLoad() {
			console.log(this.opera)
		},
		methods: {
			cloudDetail() {  //点击跳到团点详情
				uni.navigateTo({
					url: '../cloudDetail/cloudDetail?orderId=' + this.item.id
				})
			},
			tellphone(mobilephone,telephone){ //点击电话	
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
			navigation(latitude,longitude){ //导航
				console.log(latitude,longitude)
				let that=this
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
							// 		     console.log('success');
							// 		}
							// 	})
							// }
							success(res){
								uni.openLocation({
									 latitude:Number(latitude),
									 longitude:Number(longitude),
									 address:that.item.address,
									 success: function () {
									     console.log('success');
									}
								})
							}
						})
					}
				})				 
			}
		}
	}
</script>

<style>
	.cloud-item {
		width: 702upx;
		height: 374upx;
		background: #FFFFFF;
		box-shadow: 0px 0upx 16px 0px rgba(62, 65, 79, 0.1);
		border-radius: 8upx;
		margin: 0upx auto 20upx;
		position: relative;
	}

	.item-left {
		width: 152upx;
		background: rgba(190, 191, 194, 0.8);
		font-size: 100upx;
		font-family: Alibaba PuHuiTi;
		float: left;
		font-weight: bold;
		font-style: italic;
		color: #FFFFFF;
		text-align: center;
		line-height: 374upx;
		border-radius: 8upx 0px 0px 8upx;
	}

	.item-right {
		float: left;
		padding: 0 26upx 0 38upx;
		width: 550upx;
	}

	._label {
		font-size: 26upx;
		color: #777777;
	}

	._label-detail {
		font-size: 26upx;
		color: #3E414F;
		font-weight: bold;
	}

	.cloud-code,
	.cloud-name,
	.phone-location {
		margin-top: 26upx;
	}

	.phone-location {
		width: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20upx;
	}

	.checkphone {
		display: block;
		width: 194upx;
		height: 60upx;
		background: #FF8833;
		border-radius: 8upx;
		line-height: 60upx;
	}

	.checkphone image {
		width: 29upx;
		height: 29upx;
		display: block;
		float: left;
		margin: 16upx 10upx 16upx 48upx;
	}

	.location-logo {
		display: block;
		width: 194upx;
		height: 60upx;
		background: #4868FB;
		border-radius: 8upx;
		line-height: 60upx;
	}

	.location-logo image {
		width: 27upx;
		height: 27upx;
		display: block;
		float: left;
		margin: 16upx 10upx 16upx 48upx;
	}

	.checkphone text,
	.location-logo text {
		font-size: 30upx;
		color: #fff;
	}
	.zhezhao{
		width: 100%;
		height: 374upx;
		background: rgba(120,121,131,0.9);	
		border-radius: 8upx;
		position: absolute;
		top: 0;
		left: 0;
	}
	.zhezhao text{display: block;width: 100%;overflow: hidden;text-align: center;}
	.zhezhao text:nth-of-type(1){font-size: 34upx;color: #fff;margin-top: 83upx;}
	.zhezhao text:nth-of-type(2){font-size: 32upx;color: #fff;text-decoration: underline;margin: 50upx 0 81upx 0;}
	.success{width: 206upx;height: 74upx;position: absolute;top: 0;right: 0;border-radius: 0upx 8upx 0upx 8upx;line-height: 74upx;font-size: 38upx;color: #06BD7D;
	background: #E5F8F1;}
	.abnormal{width: 206upx;height: 74upx;position: absolute;top: 0;right: 0;border-radius: 0upx 8upx 0upx 8upx;line-height: 74upx;font-size: 38upx;color: #FF5959;
	background: #F8E5E5;}
	.success image,.abnormal image{display: block;width: 40upx;height: 40upx;margin: 17upx 10upx 17upx 22upx;float: left;}
</style>
