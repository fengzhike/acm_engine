import { config, start, componentFactory } from 'mk-meta-engine'
import * as mkComponents from 'mk-component'
import myConfig  from './config'

import createCategory from './apps/acm-voucher/apps/createCategory/index.js'
import interface_data_card from './apps/acm-voucher/apps/interface-data-card/index.js'
import invoice_rule from './apps/acm-voucher/apps/invoice-rule/index.js'
import invoice_rule2 from './apps/acm-voucher/apps/invoice-rule2/index.js'
import acm_voucher from './apps/acm-voucher/index.js'
import busSearchSet from './apps/bussinessSearch/busSearchSet/index.js'
import bussinessSearch from './apps/bussinessSearch/index.js'
import mk_app_login from './apps/login/index.js'
import mk_app_import from './apps/mk-app-import/index.js'
import mk_app_root_about from './apps/mk-app-root/apps/mk-app-root-about/index.js'
import mk_app_root_helloWorld from './apps/mk-app-root/apps/mk-app-root-helloWorld/index.js'
import mk_app_root from './apps/mk-app-root/index.js'
import mk_app_template from './apps/mk-app-template/index.js'
import mk_app_portal_about from './apps/portal/apps/mk-app-portal-about/index.js'
import mk_app_portal from './apps/portal/index.js'

const apps = {
		
	[createCategory.name]: createCategory,	
	[interface_data_card.name]: interface_data_card,	
	[invoice_rule.name]: invoice_rule,	
	[invoice_rule2.name]: invoice_rule2,	
	[acm_voucher.name]: acm_voucher,	
	[busSearchSet.name]: busSearchSet,	
	[bussinessSearch.name]: bussinessSearch,	
	[mk_app_login.name]: mk_app_login,	
	[mk_app_import.name]: mk_app_import,	
	[mk_app_root_about.name]: mk_app_root_about,	
	[mk_app_root_helloWorld.name]: mk_app_root_helloWorld,	
	[mk_app_root.name]: mk_app_root,	
	[mk_app_template.name]: mk_app_template,	
	[mk_app_portal_about.name]: mk_app_portal_about,	
	[mk_app_portal.name]: mk_app_portal,
}

apps.config = (options) => {
	Object.keys(options).forEach(key => {
		const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
		Object.keys(apps).forEach(appName => {
			if (appName != 'config') {
				if (reg.test(appName)) {
					apps[appName].config(options[key])
				}
			}
		})
	})
}

apps.config({ '*': { apps } })

config(myConfig({ apps }))

Object.keys(mkComponents).forEach(key=>{
	componentFactory.registerComponent(key, mkComponents[key])
})
	
start()