<template>
	<view class="pickGoods-container">
		<view class="main">
			<view class="title">
				<text>异常原因:</text>
			</view>
			<view class="select">
				<text class="actove"  :class="{'active': isActive.indexOf(index)!=-1}"  @click="pickCheck(index,item)" v-for="(item,index) in orderReason" :key="item">{{item.name}}</text>
			</view>
			<view class="title">
				<text>上传照片:</text>
			</view>
			<view class="photo">
				<view class="backPhoto" v-for="item in imageList" :key="item">
					<image :src="item" mode=""></image>
				</view>
				<view class="chooseImg" v-if="show"  @click="choose">
					<image src="../../static/icon/cameraTake.png" mode=""></image>
					<text>最多6张</text>
				</view>
			</view>
			<view class="title">
				<text>备注:</text>
			</view>
			<view class="note">
				<textarea value="" placeholder="多行文本输入" v-model="description"/>
			</view>
		</view>
		<view class="zhanwei"></view>
		<view class="abnormal">
			<text @click="cancel">取消</text>
			<text @click="sureResaon">确定提交</text>
		</view>
	</view>
</template>

<script>
	import request from '../../until/request.js'
	export default {
		data() {
			return {
				orderReason:[],//异常原因列表
				show:true,
				imageList:[],
				accessKey:'',
				signature:'',
				isActive:[],
				operType:'',//原因
				httpImgList:[],
				refMediaIds:'',//线上附地址
				description:''
			}
		},
		onLoad() {
			let that=this
			this.getorderReason()
			this.getUploadSign()
		},
		methods: {
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
			getorderReason(){ //获取异常原因
				let that=this
				that.$request({
					url: '/data/orderReason',
					method: 'GET',
					data:'',
				}).then(res => {
					if(res.resultCode==0){
						for(let i=0;i<res.data.length;i++){
							that.orderReason[i]={name:res.data[i],check:false}
						}
					}
				}).catch(erro => {
				
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
			cancel(){ //取消返回上个页面
				uni.navigateBack({
					delta:1
				})
			},
			choose(){ //选择图片
				let that = this
				uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
					count: 1, //默认选择1张图片
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					success: (res) => {
						that.imageList.push(res.tempFilePaths[0])
						if(that.imageList.length==6)that.show=false
						uni.uploadFile({ //将本地资源上传到开发者服务器
							url: 'https://fastdfs-uploading.pagoda.com.cn', //接口地址
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
									let that=this					
										that.httpImgList.push(JSON.parse(uploadFileRes.data).data.fileUrl)
										that.refMediaIds=that.httpImgList.toString()
							}
						});
					}
				});
				//  图片上传接口：test 环境：https://fastdfs-uploading.test.pagoda.com.cn
				// /file/common/commonUpload
				
				// 生产环境：https://fastdfs-uploading.pagoda.com.cn/file/common/commonUpload
			},
			sureResaon(){//确认提交
				let that=this
				uni.showModal({
					title: '提示',
					content: '确认提交异常信息',
					success: function(res) {
						if (res.confirm) {
							let cloudPoint = uni.getStorageSync('cloudPoint')
							uni.getLocation({
								type:'gcj02',//
								success:function(result){
									that.$request({  
										url: '/clique/closeCliqueOrder?orderId='+cloudPoint.id,
										method: 'POST',
										data:{
											phone:cloudPoint.phone,
											lat:result.latitude,
											lng:result.longitude,
											operType:that.operType,
											refMediaIds:that.refMediaIds,
											description:that.description,
										},
									}).then(res => {
										if(res.resultCode==0){
											// uni.navigateTo({
											// 	url: '../cloudDetail/cloudDetail?orderId='+cloudPoint.id
											// })
											// uni.navigateTo({
											// 	url: '../cloudPoint/cloudPoint'
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
		}
	}
</script>

<style>
	page{width: 100%;height: 100%;}
	.pickGoods-container{width: 100%;height: 100%;background: #F6F5F5;position: relative;}
	.main{width: 100%;overflow: hidden;padding: 0 49upx;background: #fff;margin-top: 20upx;}
	.title {margin:40upx 0 20upx 0;font-size: 30upx;color: #3E414F;width: 100%;}
	.select{width: 100%;overflow: hidden;}
	.select text{display: inline-block;min-width:200upx ;height: 66upx;text-align: center;line-height: 66upx;
	font-size:26upx ;border-radius: 8upx;margin-bottom: 20upx;margin-right: 10upx;float: left;}
	.active{background: #FFF3EA;border: 2upx solid #FF8833;border-radius: 8upx;color: #FF8833;}
	.actove{background: #F5F7FA;border-radius: 8upx;}
	.note{width: 100%;overflow: hidden;}
	.note textarea{width: 100%;background: #F6F5F5;border-radius: 8upx;height: 158upx;margin-bottom: 30upx;padding: 24upx 27upx;}
	.abnormal{width: 100%;height: 120upx;background: #fff;
	position: fixed;left: 0;bottom: 0;
	}
	.abnormal text{display: block;float: left;}
	.abnormal text:nth-of-type(1){font-size: 30upx;color: #3E414F;width: 260upx;
height: 90upx;text-align: center;line-height: 90upx;
border: 2upx solid #C5C9D1;
border-radius: 8upx;margin: 15upx 30upx 15upx 24upx;}
	.abnormal text:nth-of-type(2){font-size: 30upx;color: #fff;width: 412upx;
height: 90upx;text-align: center;line-height: 90upx;
background: linear-gradient(270deg, #FF8833 0%, #FAA951 100%);
border-radius: 8upx;margin: 15upx 0upx 15upx 0upx;}
.zhanwei{width: 100%;height: 150upx;}
.chooseImg{width: 180upx;height:180upx;float: left;
	border: 2upx dashed #C5C9D1;
	border-radius: 8upx;margin-left: 20upx;margin-top: 10upx;}
	.photo{width: 100%;overflow: hidden;}
	.chooseImg image{width: 54upx;height: 51upx;display: block;margin: 42upx auto 19upx;}
	.chooseImg text{display: block;width: 100%;font-size: 26upx;color:#3E414F;text-align: center;}
	.backPhoto{width: 180upx;height: 180upx;float: left;margin-left:20upx;margin-top: 10upx;border-radius: 8upx;}
	.backPhoto image{width:180upx;height:180upx;border-radius: 8upx;}
</style>
