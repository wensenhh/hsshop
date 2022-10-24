<template>
	<view class="login-wrapper" :data-theme="theme">
		<view class="bgimg">
			<image src="../../../static/images/register_bg.png" mode=""></image>
		</view>
		<view class="mainbody">
			<view class="hytext">
				欢迎 <br/>
				使用恒生商城
			</view>
			<view style="margin-top: 68rpx;">
				<u-tabs :list="navlist" @click="navclick" :current="navindex" :activeStyle="{
						color: '#000000',
						fontWeight: 'bold',
						transform: 'scale(1.6)'
					}"
					:inactiveStyle="{
						color: '#999999',
						transform: 'scale(1)'
					}"
					lineWidth="0"
					style
				></u-tabs>
			</view>
			<view class="" v-if="navindex == 0">
				<u--input
				    placeholder="请输入您的手机号"
					type="number"
					shape="circle"
				    border="none"
				    v-model="account"
					class="ipt_main"
				  ></u--input>
				<u--input
				    placeholder="请输入您的登陆密码"
					type="password"
					shape="circle"
				    border="none"
				    v-model="password"
					class="ipt_main"
				  ></u--input>
			</view>
			<view class="" v-if="navindex == 1">
				<u--input
				    placeholder="请输入您的手机号"
					type="number"
					shape="circle"
				    border="none"
				    v-model="account"
					class="ipt_main"
				  ></u--input>
				<u--input
				    placeholder="请输入您的登陆密码"
					type="password"
					shape="circle"
				    border="none"
				    v-model="password"
					class="ipt_main"
				  ></u--input>
				<u--input
				    placeholder="请确定您的登陆密码"
					type="password"
					shape="circle"
				    border="none"
				    v-model="password2"
					class="ipt_main"
				  ></u--input>
				<u--input
				    placeholder="请输入您的上级邀请码"
					type="text"
					shape="circle"
				    border="none"
				    v-model="invitecode"
					class="ipt_main"
				  ></u--input>
				<u--input
				    placeholder="请输入验证码" 
					type="number"
					shape="circle"
				    border="none"
				    v-model="verifycode"
					class="ipt_main"
				  >
					<template slot="suffix">
						<u-code
							ref="uCode"
							@change="codeChange"
							seconds="20"
							changeText="X秒重新获取"
						></u-code>
						<text @tap="getCode" style="color: #FD4D1F;padding-right: 20rpx;">{{tips}}</text>
					</template>
				  </u--input>
			</view>
			<view class="registerbtn" @tap="submit" v-if="navindex == 0">
				登陆
			</view>
			<view class="registerbtn" @tap="register" v-if="navindex == 1">
				注册
			</view>
			<view class="xyradio" style="">
				<label class="">
					<checkbox value="cb" :checked="xyradio" @click="checkBox()" /> 登录则表示您同意遵守恒生商城 
				</label>
				<text @tap="gotoagree(2)">《注册协议》</text> <text @tap="gotoagree(1)">《隐私协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		loginMobile,
		registerVerify,
		loginH5,
		getUserInfo
	} from "@/api/user";
	import {Debounce} from '@/utils/validate.js'
	const BACK_URL = "login_back_url";
	let app = getApp();
	export default {
		data() {
			return {
				theme:app.globalData.theme,
				navlist: [{
					name: '登陆',
				},{
					name: '注册'
				}],
				navindex: 0,
				account: '',
				password: '',
				password2: '',
				invitecode: '',
				verifycode: '',
				tips: '发送验证码',
				xyradio: false
			}
		},
		onLoad() {
			console.log('register')
		},
		methods: {
			codeChange(text) {
				console.log(text)
				this.tips = text;
			},
			checkBox(){
				this.xyradio = !this.xyradio
			},
			gotoagree(type){
				uni.navigateTo({
					url: '/pages/users/agreement/agreement?type=' + type
				})
			},
			submit:Debounce(function() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写账号'
				});
				if (!/^[\w\d]{5,16}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的账号'
				});
				if (!that.password) return that.$util.Tips({
					title: '请填写密码'
				});
				if(!that.xyradio){
					return that.$util.Tips({
						title: '请认真阅读协议并同意后登陆'
					});
				} 
				loginH5({
						account: that.account,
						password: that.password,
						spread_spid: that.$Cache.get("spread")
					}).then(({data}) => {
						this.$store.commit("LOGIN", {
							'token': data.token
						});
						that.getUserInfo(data);	
					})
					.catch(e => {
						that.$util.Tips({
							title: e
						});
					});
			}),
			async register() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.verifycode) return that.$util.Tips({
					title: '请填写验证码'
				});
				if (!/^[\w\d]+$/i.test(that.verifycode)) return that.$util.Tips({
					title: '请输入正确的验证码'
				});
				if (!that.password) return that.$util.Tips({
					title: '请填写密码'
				});
				if (!that.password2) return that.$util.Tips({
					title: '请填写确认密码'
				});
				if (that.password !== that.password2) return that.$util.Tips({
					title: '两次密码不一致'
				});
				if (!that.invitecode) return that.$util.Tips({
					title: '请填写上级邀请码'
				});
				// if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/i.test(that.password)) return that.$util.Tips({
				// 	title: '您输入的密码过于简单'
				// });
				if(!that.xyradio){
					return that.$util.Tips({
						title: '请认真阅读协议并同意后即可注册'
					});
				} 
				loginMobile({
						phone: that.account,
						captcha: that.verifycode,
						pwd: that.password,
						spread_spid: that.$Cache.get("spread"),
						inviteCode: that.invitecode
					})
					.then(({data}) => {
						this.$store.commit("LOGIN", {
							'token': data.token
						});
						that.getUserInfo(data);
						that.$util.Tips({
							title: '注册成功'
						});
						// that.formItem = 1;
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async getCode() {
				let that = this;
				if (this.$refs.uCode.canGetCode) {
				  // 模拟向后端请求验证码
				  uni.showLoading({
					title: '正在获取验证码'
				  })
				  if(!this.account || !this.$u.test.mobile(this.account)){
					  return uni.showToast({
					  	title: '请输入正确的手机号',
					  	icon: 'none',
					  	duration: 2000
					  })
				  }
				  await registerVerify(that.account)
				  	.then(res => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
				  	})
				} else {
				  uni.$u.toast('倒计时结束后再发送');
				}
			},
			getUserInfo(data){
				this.$store.commit("SETUID", data.uid); 
				getUserInfo().then(res => {
					this.$store.commit("UPDATE_USERINFO", res.data);
					let backUrl = this.$Cache.get(BACK_URL) || "/pages/index/index";
					if (backUrl.indexOf('/pages/users/login/index') !== -1) { 
						backUrl = '/pages/index/index';
					}
					uni.reLaunch({
						url: backUrl
					});
				})
			},
			navclick(item) {
                console.log('item', item);
				this.xyradio = false;
				this.account = '';
				this.password = '';
				this.navindex = item.index
            }
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF !important;
	}
	.login-wrapper{
		.mainbody{
			padding: 30rpx;
			margin-top: -240rpx;
			.hytext{
				font-size: 60rpx;
				color: #000000;
				font-weight: bold;
			}
		}
		.bgimg{
			width: 100%;
			height: 452rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.logon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 86rpx;
			margin-top: 80rpx;
			background-color: $theme-color;
			border-radius: 120rpx;
			color: #FFFFFF;
			font-size: 30rpx;
		}
		.ipt_main{
			background-color: #f5f5f5;
			height: 88rpx;
			margin-top: 32rpx;
			padding-left: 32rpx !important
		}
		.registerbtn{
			margin-top: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FD4D1F;
			border-radius: 44rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			height: 88rpx;
		}
		.xyradio{
			padding-left: 20rpx;
			margin-top: 40rpx;
			font-size: 24rpx;
			text{
				color: #FD4D1F
			}
		}
	}
	.bg_color{
		@include main_bg_color(theme);
	}
</style>
