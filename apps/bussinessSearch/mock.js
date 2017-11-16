/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initBussinessType() {
//    if(!mockData.value) {
        mockData.value = []
        for (let i = 0; i < 200; i++) {
            mockData.value.push({
                businessCode: 10000 + i,
                extKeys: ['买' + i, '卖' + i],
                keys: ['收入' + i, '支出' + i],
                name: '业务分类' + i,
                id: i
            })
        }
//    }
}

fetch.mock('/v1/search/manualKey/getAllManualKeys', (option) => {
    initBussinessType()
    
//    const {pagination, filter} = option
    
    var data = mockData.value
 /*    if(filter) {
        
    }
    
    var current = pagination.current
    var pageSize = pagination.pageSize
    var start = (current - 1) * pageSize
    var end = current * pageSize
    
    start = start > data.length - 1 ? 0 : start
    end = start > data.length - 1 ? pageSize : end
    current = start > data.length - 1 ? 1 : current
   */ 
    var ret = {
        result: true,
        value: {
//            pagination: {current, pageSize, total: data.length},
            list: []
        }
    }
    
    for (let j = 0; j < data.length; j++) {
        if(data[j]) 
            ret.value.list.push(data[j])
    }
    
    ret.value.list = ret.value.list.map(o => {
        return {
            ...o,
            
        }
    })
    return ret
})
    
function searchBussiness() {
//    if(!mockData.value) {
        mockData.value = []
        for(let i = 123; i < 135; i++) {
            mockData.value.push({
                businessCode: 10000 + i,
                id: i,
                name: '业务分类' + i,
                source: 2
            })
        }
//    }
} 
    
fetch.mock('/v1/search/searchBusiness', (key) => {
    searchBussiness()
    
    var data = mockData.value
    var ret = {
        result: true,
        value: []
    }
    
    for(let j = 0; j < data.length; j++) {
        if(data[j])
            ret.value.push(data[j])
    }
    
    return ret
})

fetch.mock('/v1/search/manualKey/refresh', (option) => {
    var data = mockData.value
    var ret = {
        result: true,
        value: true
    }
    return ret
})

fetch.mock('/v1/search/manualKey/update', (option) => {
    var data = mockData.value
    var ret = {
        result: true,
        value: true
    }
    return ret
})
    
    
    
    
    
    
    
    
    
    
    
    
    
    
