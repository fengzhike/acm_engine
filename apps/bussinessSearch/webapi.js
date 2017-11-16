/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    
    search: {
        query: () => fetch.post('/v1/search/manualKey/getAllManualKeys', {}),
        searchBussiness: (key) => fetch.post('/v1/search/searchBusiness', {key}),
        update: (option) => fetch.post('/v1/search/manualKey/update', option),
        refresh: (option) => fetch.post('/v1/search/manualKey/refresh', option),
        clearExtKeys: (option) => fetch.post('/v1/search/manualKey/clearExtKeys', option),
    }
} 