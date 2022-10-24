<template>
	<view class="container">
		<view class="container-content">
			<mp-html :content="html" />
		</view>
	</view>
</template>

<script>
	import request from "@/utils/request.js";
	import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				html: '<div>Hello World!</div>'
			}
		},
		onLoad({type}) {
			if(type == 1){
				uni.setNavigationBarTitle({
					title: '隐私协议'
				})
			}else if(type == 2){
				uni.setNavigationBarTitle({
					title: '注册协议'
				})
			}
			this.getPrivacy(type)
		},
		methods: {
			async getPrivacy(type){
				let res =  await request.get("getAgreement", {
					type: type
				},{ noAuth : true })
				
					if (res.code == 200) {
						this.html=res.data
					} else {
						return that.$util.Tips({
							title: res.msg
						});
					}
			}
		}
	}
</script>

<style>

.container{
	padding: 20rpx;
}
.container-content{
	background-color: #FFFFFF;
	padding:50rpx 30rpx;
	border-radius: 30rpx;
	font-size: 28rpx;
}
.m-b-40{
	margin-bottom: 40rpx;
}
</style>
