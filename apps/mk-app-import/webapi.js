/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'mk-utils'

const post = fetch.post

export default {
	api: {
		imports: (data, type) => {
			switch(type){
				case '2':
					return post('/v1/businessTypeTemplate/import', data)
					break
				case '3':
					return post('/v1/businessTypeDocRange/import', data)
					break
				case '4':
					return post('/v1/businessTypeTax/import', data)
					break
				case '5':
					return post('/v1/businessTypeInventoryProperty/import', data)
					break
				case '6':
					return post('/v1/taxClassificationCode/import', data)
					break
				case '7':
					return post('/v1/HelpTips/import', data)
					break
			}
		}
	}
}