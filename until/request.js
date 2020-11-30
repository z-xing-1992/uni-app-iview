const baseUrl = 'https://serverless-runtime-api.pagoda.com.cn/exc/community_ware_distribution'; //此为测试地址,并非真实地址
// const baseUrl = 'https://serverless-runtime-api.pagoda.com.cn/uat_exc/community_ware_distribution'; //此为测试地址,并非真实地址
var token=uni.getStorageSync('userMessage').token
if(token){
		token=uni.getStorageSync('userMessage').token
	}else{
		token=''
}	
// 定义基础请求路径(后端服务器地址)
const request = (opts) => {
	var token=uni.getStorageSync('userMessage').token
	if(token){
			token=uni.getStorageSync('userMessage').token
		}else{
			token=''
	}	
	let baseDefaultOpts = {
		url: baseUrl + opts.url,
		// 请求接口地址
		data: opts.data,
		// 传入请求参数
		method: opts.method,	
		// 配置请求类型
		header: opts.method == 'GET' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8",
			'authorization' :token,
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8',
			'authorization' :token,
		},
		// 配置请求头
		dataType: 'json',
	};
			// 显示加载中 效果
			uni.showLoading({
				mask: false,
			});

	let promise = new Promise(function(resolve, reject) {
		uni.request(baseDefaultOpts).then(
			(res) => {
					setTimeout(function() {
					    uni.hideLoading();
					}, 1000);
					if(res[1].data.resultCode == '-1001' || res[1].data.resultCode == -1001){
							uni.showModal({
								title: '提示',
								content: '授权登录',
								showCancel:false,
								success: function(res) {
									if (res.confirm) {
										uni.removeStorageSync('userMessage')
										uni.switchTab({
											url:'../index/index'
										})
									} 
								}
							});
					}
					if(res[1].data.resultCode == '-1002' || res[1].data.resultCode == -1002){
							uni.showModal({
								title: '提示',
								content: '登录过期,请重新登录',
								showCancel:false,
								success: function(res) {
									if (res.confirm) {
										uni.removeStorageSync('userMessage')
										uni.switchTab({
											url:'../index/index'
										})
									} 
								}
							});
					}
					resolve(res[1].data)				
			}
		).catch(
			(erro) => {
				setTimeout(function() {
				    uni.hideLoading();
				}, 1000);
				reject(erro)
			}
		)
	})
	return promise
};

export default request
