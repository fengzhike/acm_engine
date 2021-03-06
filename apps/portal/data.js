export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-portal',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-portal-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-portal-header-left',
				children: [{
					name: 'logo',
					component: '::img',
					className: 'mk-app-portal-header-left-logo',
					src: '{{$getLogo()}}'
				}, {
					name: 'siteName',
					component: '::h1',
					children: '北京人人时代科技有限公司'
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'mk-app-portal-header-right',
				children: [{
					name: 'topMenu',
					component: 'Menu',
					mode: 'horizontal',
					theme: 'dark',
					style: { backgroundColor: '#333' },
					onClick: '{{$topMenuClick}}',
					selectedKeys: [],
					children: [/*{
						name: 'gitter',
						component: 'Menu.Item',
						key: 'gitter',
						children: [{
							name: 'icon',
							component: 'Icon',
							type: 'smile-o'
						}, '聊天']
					}, {
						name: 'github',
						component: 'Menu.Item',
						key: 'github',
						children: [{
							name: 'icon',
							component: 'Icon',
							type: 'github'
						}, '源代码']
					}, */{
						name: 'my',
						component: 'Menu.SubMenu',
						key: 'my',
						title: {
							name: 'myTitle',
							component: '::span',
							className: 'mk-app-portal-header-right-my-title',
							children: [{
								name: 'photo',
								component: '::img',
								className: 'mk-app-portal-header-right-photo',
								src: '{{$getPhoto()}}'
							}, {
								name:'name',
								component:'::span',
								children:'{{data.username}}'
							}]
						},
						children: [{
							name: 'logout',
							component: 'Menu.Item',
							key: 'logout',
							children: '注销'
						}]
					}]
				}]
			}]
		}, {
			name: 'content',
			component: 'Layout',
			className: 'mk-app-portal-content',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-portal-content-left',
				children: [{
					name: 'menu',
					component: 'Menu',
					mode: 'inline',
					theme: 'dark',
					defaultSelectedKeys: "{{data.menuDefaultSelectedKeys}}",
					defaultOpenKeys: "{{data.menuDefaultOpenKeys}}",
					onClick: '{{$menuClick}}',
					children: '{{$getMenuChildren()}}'
				}]
			}, {
				name: 'main',
				component: 'Layout',
				className: 'mk-app-portal-content-main',
				_visible: '{{!!data.content.appName}}',
				children: {
					name: 'app',
					component: 'AppLoader',
					appName: '{{data.content.appName}}',
					'...': '{{data.content.appParams}}'
				}
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			menu: [],
			menuDefaultSelectedKeys: [],
			menuDefaultOpenKeys: [],
			content: {},
			username:'我的'
		}
	}
}
