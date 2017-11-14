/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    businessTypeTemplate: {
        init:()=> fetch.post('/v1/web/businessTypeTemplate/init',{}),
        query:(option)=> fetch.post('/v1/businessTypeTemplate/query',option),
        accountQuery:(option) => fetch.post('/v1/account/getPresetAccounts',option),
        update:(option)=> fetch.post('/v1/businessTypeTemplate/update',option),
        delete:(option)=> fetch.post('/v1/businessTypeTemplate/delete',option),
        create:(option)=> fetch.post('/v1/businessTypeTemplate/create',option),
        delete:(option)=> fetch.post('/v1/businessTypeTemplate/delete',option),
        move: (option) => fetch.post('/v1/businessTypeTemplate/move', option),
        createCategory: (option) => fetch.post('/v1/businessType/createCategory', option),
        businessDelete: (option) => fetch.post('/v1/businessTypeTemplate/delete', option),
        updateCategory: (option) => fetch.post('/v1/businessType/updateCategory', option),
        businessTypeTemplateBackup: (option) => fetch.post('/v1/businessTypeTemplate/backup', option),
    },

    tree: {
        query: (option) => fetch.post('/v1/tree/query', option)
    }
}
