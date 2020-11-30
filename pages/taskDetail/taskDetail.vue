<template>
	<view class="taskDetail-container">
		<view class="title" v-if="taskDetail.status=='00创建'">
			<image src="../../static/icon/folder-reduce.png" mode=""></image>
			<text>该任务尚未提货</text>
		</view>
		<view class="title" v-if="taskDetail.status=='90完成'">
			<image src="../../static/icon/checkboxSuccess.png" mode=""></image>
			<text>该任务已结束</text>
		</view>
		<view class="title" v-if="taskDetail.status=='20运输中'">
			<image src="../../static/icon/folder-transfer.png" mode=""></image>
			<text>该任务正在进行</text>
		</view>
		<view class="warning" v-if="taskDetail.status=='00创建'&&taskDetail.flag==0">
			<image src="../../static/icon/folder-warning.png" mode=""></image>
			<text>该任务异常且尚未提货</text>
		</view>
		<view class="warning" v-if="taskDetail.status=='20运输中'&&taskDetail.flag==0">
			<image src="../../static/icon/folder-warning.png" mode=""></image>
			<text>该任务异常且运输中</text>
		</view>
		<view class="warning" v-if="taskDetail.status=='90完成'&&taskDetail.flag==0">
			<image src="../../static/icon/folder-warning.png" mode=""></image>
			<text>该任务异常且已完成</text>
		</view>
		<view class='boxes'>
			<view class="main">
				<view class="Id-Name">
					<view class="id">
						<text>任务ID：</text>
						<text>{{taskDetail.id}}</text>
					</view>
					<view class="name"> 
						<text>提货师傅：</text>
						<text>{{taskDetail.driverInfo}}</text>
					</view>
				</view>
				<view class="time">
					<view class="begin-time">
						<text>任务创建日期</text>
						<text >{{beginTime}}</text>
					</view>
					<view>
						<image src="../../static/icon/arrow-right-circle.png" mode=""></image>
					</view>
					<view class="delivery-time">
						<text>要求送货日期</text>
						<text>{{taskDetail.expectedArriveTime}}</text>
					</view>
				</view>
				<view class="number-materials">
					<view class="number">
						<view class="cloud">团点数量</view>
						<view class="number-detail">
							<image src="../../static/icon/yuan.png" mode=""></image>
							<view class="number-detail-num">
								<view>
									<text>{{count}}</text>
									<text>/{{pointNumber}}</text>
								</view>
								<text style="color: #FFFFFF;font-size: 26upx;">剩余/总数</text>
							</view>
						</view>
						<view class="line-rolad">
							<text>线路：</text>
							<text>{{taskDetail.routeCode}}号线</text>
						</view>
					</view>
					<view class="materials">
						<view>包装物情况</view>
						<view v-for="(item,index) in taskDetail.attachment.containers" :key='index' v-if="taskDetail.attachment.containers">
							<text>{{item.name}}</text>
							<text>{{item.qty}}</text>
						</view>
						<view v-if="!taskDetail.attachment.containers">
							<text>暂无包装信息</text>
						</view>
					</view>
				</view>
				<view class="goods">
					<view class="goods-title">
						特殊商品：
					</view>
					<view class="goods-detail" v-if="taskDetail.attachment.specGoods">						
						{{taskDetail.attachment.specGoods}}	
					</view>
					<view class="goods-detail" v-if="!taskDetail.attachment.specGoods">
						暂无特殊商品	
					</view>
				</view>
				<view class="goods">
					<view class="goods-title">
						缺货商品：
					</view>
					<view class="goods-detail" v-if="taskDetail.attachment.stockoutGoods">
						{{taskDetail.attachment.stockoutGoods}}
					</view>
					<view class="goods-detail" v-if="!taskDetail.attachment.stockoutGoods">
						暂无缺货商品
					</view> 
				</view>
				<view class="goods" v-if="taskDetail.flag==0">
					<view class="goods-title">
						异常信息：
					</view>
					<view class="reason">
						原因：{{taskDetail.opers[0].operType}}
					</view>
				</view>
				<view class="goods" v-if="taskDetail.flag==0">
					<view class="goods-title">
						照片：
					</view> 
					<view class="pictureList">
						<image :src="item" mode="" v-for="(item,index) in refMediaIds" :key='index'  @tap="_previewImage(item)"></image>
					</view>
				</view>
				<view class="goods" v-if="taskDetail.flag==0">
					<view class="goods-title">
						备注：
					</view>
					<view class="pictureList" style="margin-bottom: 20upx;">
						<text>{{taskDetail.opers[0].description}}</text>
					</view>
				</view>
			</view>			
			<view class="zhanwei"></view>
			<view class="bottom" v-if="taskDetail.status=='00创建'||operate!='0'">
				<view class="taking-pictures" @click="linkPickGoods">
					<image src="../../static/icon/camera.png" mode=""></image>
					<text>异常拍照</text>
				</view>
				<view class="look" @click="lookCloud">
					<text>查看团点</text>
				</view>
				<view class="sure" @click="sureTake">
					<text>确认提货</text>
				</view>
			</view>
			<view class="bottom" v-if="taskDetail.status=='20运输中'||taskDetail.status=='90完成'||operate=='0'">
				<view class="look" @click="lookCloud">
					<text>查看团点</text>
				</view>
				<view class="back" @click.stop.prevent="backcloudDetail">
					<text>返回</text>
				</view>
			</view>
		</view>
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				taskDetail:{},
				beginTime:'',//任务创建日期
				pointNumber:'',//团队数量
				id:'',//任务ID
				count:0,//剩余数量
				operate:'',//0 遮罩点进来获者历史点进来
				refMediaIds:[],
			}
		},
		onLoad(options) {
			let that=this
			this.getTaskDetail()
			console.log(options.operate)
			that.operate=options.operate
		},
		methods: {
			backcloudDetail(){
				uni.navigateBack({
					delta:1
				})
			},
			linkPickGoods(){ //点击进入提交异常
				let that=this
				uni.setStorage({
					key:'abnormal',
					data:{
						id:that.taskDetail.id,
						phone:that.taskDetail.driverInfo,						
					}
				})
				uni.navigateTo({
					url:'../pickGoods/pickGoods'
				})
			},
			lookCloud(){//点击进入查看团点
				let that=this
				uni.setStorage({
					key:'id',
					data:that.taskDetail.id
				})
				uni.setStorage({
					key:'operate',
					data:that.operate
				})
				uni.navigateTo({
					url:'../cloudPoint/cloudPoint'
				})
			},
			getTaskDetail(){ //获取任务详情
				let that=this
				let id=uni.getStorageSync('id')
				that.$request({  //获取任务详情
					url: '/task/getTaskDetail',
					method: 'GET',
					data:{
						taskId:id
					},
				}).then(res => {
					if(res.resultCode==0){
						let num=0
						for(let i=0;i<res.data.tDetails.length;i++){
							if(res.data.tDetails[i].status!='30交付完成'){
								num++
							}
						}
						that.count=num
						console.log(res)
						that.taskDetail=res.data
						that.pointNumber=res.data.tDetails.length
						that.beginTime=res.data.createdAt.split('T')[0]
						that.refMediaIds=res.data.opers[0].refMediaIds.split(',')
					}
				}).catch(erro => {})	
			},						
			sureTake(){ //确认提货
				let that=this
				uni.showModal({
					title: '提示',
					content: '确认提取任务？',
					success: function(res) {
						if (res.confirm) {
							uni.getLocation({
								type:'gcj02',//
								success:function(result){
									that.$request({  //获取任务详情
										url: '/task/startTask?taskId='+that.taskDetail.id,
										method: 'POST',
										data:{
											phone:that.taskDetail.driverInfo,
											lat:result.latitude,
											lng:result.longitude
										},
									}).then(res => {
										console.log(res)
										if(res.resultCode==0){
											uni.setStorage({ //提交任务后，缓存任务ID
												key:'taskID',
												data:that.taskDetail.id
											})
											let success=0
											for(let i=0;i<res.data.tDetails.length;i++){
												if(res.data.tDetails[i].status=='30交付完成'||res.data.tDetails[i].status=='99放弃'){
													success++
												}
											}
											// uni.navigateTo({
											// 	url:'../cloudPoint/cloudPoint'
											// })
											uni.switchTab({
												url:'../task/task'
											})
										}
									}).catch(erro => {})	
								}
							})
						} 
					}
				});
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
		}
	}
</script>

<style>
	page{width: 100%;height: 100%;}
	.taskDetail-container{width: 100%;height: 100%;background: #F6F5F5;position: relative;}
	.title{width: 100%;overflow: hidden;background: #3E414F;}
	.title image{display: block;width: 80upx;height: 72upx;float: left;margin: 20upx 21upx 75upx 192upx;}
	.title text{display: block;float: left;font-size:38upx ;color: #fff;margin-top: 30upx;}
	.warning{width: 100%;overflow: hidden;background: #3E414F;}
	.warning image{display: block;width: 80upx;height: 72upx;float: left;margin: 20upx 21upx 75upx 136upx;}
	.warning text{display: block;float: left;font-size:38upx ;color: #fff;margin-top: 30upx;}
	.boxes{width: 100%;overflow: hidden;position: absolute;left: 0;top: 130upx;}
	.main{width:702upx ;overflow: hidden;margin: 0 auto;border-radius:8upx ;background: #fff;padding: 30upx 27upx;}
	.Id-Name{display: flex;justify-content: space-between;}
	.id text{display: inline-block;}
	.id text:nth-of-type(1),.name text:nth-of-type(1){font-size:26upx ;color: #777777;}
	.id text:nth-of-type(2),.name text:nth-of-type(2){font-size: 26upx;color: #3E414F;font-weight: bold;}
	.time {display: flex;justify-content: space-between;margin-top: 28upx;border-bottom: 1upx solid #EDEDED;}
	.time view text{display: block;}
	.time view:nth-of-type(2) image{width: 54upx;height: 54upx;display: block;}
	.begin-time text:nth-of-type(1),.delivery-time text:nth-of-type(1){font-size:26upx ;color: #777777;}
	.begin-time text:nth-of-type(2){color:#3E414F;font-weight: bold;margin-top: 16upx;margin-bottom: 35upx;}
	.delivery-time text:nth-of-type(2){color:#FF8833;font-weight: bold;margin-top: 16upx;margin-bottom: 35upx;}
	.number-materials{width: 100%;overflow: hidden;margin-top: 28upx;display: flex;justify-content: space-between;
	border-bottom: 1upx solid #EDEDED;}
	.number{width: 230upx;overflow: hidden;text-align: center;}
	.number-detail image{width: 184upx;height: 184upx;}
	.cloud{font-size: 30upx;color: #3E414F;font-weight: bold;}
	.number-detail{margin:29upx 0 20upx 0;position: relative;}
	.number-detail-num{position: absolute;width: 100%;height: 100%;top: 0;left: 0;}
	.number-detail-num view{margin: 46upx 0 0 0;}
	.number-detail-num view text{font-size: 50upx;font-weight: bold;}
	.number-detail-num view text:nth-of-type(1){color: #FFFFFF;}
	.number-detail-num view text:nth-of-type(2){color: #E7E7E7;}
	.line-rolad text:nth-of-type(1){font-size: 26upx;color: #777777;}
	.line-rolad text:nth-of-type(2){font-size: 26upx;color: #3E414F;font-weight: bold;}
	.materials{text-align: right;}
	.materials text{display: inline-block;}
	.materials view{margin-bottom: 29upx;}
	.materials view:nth-of-type(1){font-size: 30upx;color: #3E414F;font-weight: bold;}
	.materials view text:nth-of-type(1){font-size: 26upx;color: #3E414F;}
	.materials view text:nth-of-type(2){width: 40upx;height: 40upx;background: #3BBCA3;border-radius: 50%;font-size: 24upx;color: #fff;text-align: center;line-height: 40upx;margin-left: 21upx;}
	.goods{width: 100%;overflow: hidden;}
	.goods-title{width: 100%;font-size: 30upx;color: #3E414F;font-weight: bold;margin: 29upx 0 19upx 0;}
	.goods-detail{width: 100%;min-height: 158upx;background: #F6F5F5;border-radius: 8upx;font-size: 28upx;color: #494C5D;padding: 26upx 27upx 26upx 27upx;}
	.bottom{width: 100%;height: 120upx;background: #fff;display: flex;justify-content: space-evenly;position: fixed;bottom: 0;left: 0;}
	.bottom view image{display: block;width: 40upx;height: 38upx;}
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
	.zhanwei{width: 100%;height: 150upx;background: #F6F5F5}
	.pictureList image{width: 203upx;height: 176upx;display: block;float: left;margin-right: 15upx;margin-top: 10upx;}
	.pictureList text{display: block;width: 100%;height: 158upx;background: #F6F5F5;border-radius: 8upx;padding: 26upx;font-size: 28upx;color: #494C5D;}
</style>
