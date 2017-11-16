export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className: 'mk-app-template',
		children: [
			getTabs()
		]

	}
}

function getTabs() {
	return {
		name: 'tabs',
		component: 'Tabs',
		className: 'new-stock-tabs',
		activeKey: '{{data.tabKey}}',
		//defaultActiveKey: '1',
		onChange: '{{$tabChange}}',
		children:[{
			name: 'voucherTemplate',
			key: '1',
			component: 'Tabs.TabPane',
			tab: '凭证模版',
			children: [{
				name: 'voucherTemplate',
				component: 'AppLoader',
				appName: "{{data.tabKey == '1' ? 'acm-voucher' : ''}}",
				initData: "{{data.tabKey}}"
			}]
		}, {
			name: 'templateImport',
			key: '2',
			component: 'Tabs.TabPane',
			tab: '凭证模板Excel导入',
			children: [{
				name: 'voucherTemplate',
				component: 'AppLoader',
				appName: "{{data.tabKey == '2' ? 'mk-app-import' : ''}}",
				initData: "{{data.tabKey}}"
			}]
		}, {
			name: 'subject',
			key: '3',
			component: 'Tabs.TabPane',
			tab: '允许客户自行修改科目的业务',
			children: [{
				name: 'voucherTemplate',
				component: 'AppLoader',
				appName: "{{data.tabKey == '3' ? 'mk-app-import' : ''}}",
				initData: "{{data.tabKey}}"
			}]
		}, {
			name: 'incomeType',
			key: '4',
			component: 'Tabs.TabPane',
			tab: '收入类型对应属性表',
			children: [{
				name: 'voucherTemplate',
				component: 'AppLoader',
				appName: "{{data.tabKey == '4' ? 'mk-app-import' : ''}}",
				initData: "{{data.tabKey}}"
			}]
		}, {
			name: 'businessType',
			key: '5',
			component: 'Tabs.TabPane',
			tab: '业务类型存货关系表',
			children: [{
				name: 'voucherTemplate',
				component: 'AppLoader',
				appName: "{{data.tabKey == '5' ? 'mk-app-import' : ''}}",
				initData: "{{data.tabKey}}"
			}]
		}, {
			name: 'invoiceImport',
			key: '6',
			component: 'Tabs.TabPane',
			tab: '发票导入存货对照',
			children: [{
				name: 'voucherTemplate',
				component: 'AppLoader',
				appName: "{{data.tabKey == '6' ? 'mk-app-import' : ''}}",
				initData: "{{data.tabKey}}"
			}]
		}, {
			name: 'helpTips',
			key: '7',
			component: 'Tabs.TabPane',
			tab: '帮助提示导入',
			children: [{
				name: 'voucherTemplate',
				component: 'AppLoader',
				appName: "{{data.tabKey == '7' ? 'mk-app-import' : ''}}",
				initData: "{{data.tabKey}}"
			}]
		}, {
			name: 'search',
			key: '8',
			component: 'Tabs.TabPane',
			tab: '业务类型搜索',
			children: [{
				name: 'voucherTemplate',
				component: 'AppLoader',
				appName: "{{data.tabKey == '8' ? 'bussinessSearch' : ''}}",
				initData: "{{data.tabKey}}"
			}]
		}]
	}
}

export function getData() {
	return {
		data: {
			tabKey: '1'
		}
	}
}