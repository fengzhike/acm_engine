import logo from './img/logo.png'
import webapi from './webapi'

var _options = {
	webapi,
	goAfterLogout: {
		appName: 'mk-app-login',
		appParams: {}
	},
	menu: [/*{
		key: '1',
		name: '关于',
		appName: 'mk-app-portal-about',
		isDefault: true
	},*/ {
		key: '2',
		name: '流水账模板管理',
		isExpand:true,
		children: [/*{
			key: '201',
			name: '模板编辑',
			appName: 'acm-voucher'
		}, */{
			key: '202',
			name: '模板管理',
			appName: 'mk-app-template'
		}/*, {
			key: '203',
			name: '模板列表',
			appName: 'mk-app-complex-table'
		}*/ ]
	}/*, {
		key: '309',
		name: '开发工具',
		children: [{
			key: '30901',
			name: '开发工具整体',
			appName: 'mk-app-devtools'
		}, {
			key: '30902',
			name: '元数据设计',
			appName: 'mk-app-meta-design'
		}, {
			key: '30903',
			name: 'webapi文档',
			appName: 'mk-app-apidoc'
		}, {
			key: '30904',
			name: 'action监控',
			appName: 'mk-app-trace-action'
		}, {
			key: '30905',
			name: '元数据、状态修改',
			appName: 'mk-app-hot-modify-app'
		}]

	}*/],
	logo
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config
