import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
        this.load()
    }
    
    load = async (pagination, filter ={}) => {
        const response = await this.webapi.search.query()
//        response.filter = filter
        this.injections.reduce('load', response)
    }
    
    handleFresh = (type) => () => {
        if(type == 'fresh') {
            this.load()
        }
    }
    
    handleRefresh = async () => {
        const response = await this.webapi.search.refresh({})
        if(response) {
            this.metaAction.toast('success', '关键字全部重新生成成功!')
        } else {
            this.metaAction.toast('error', '关键字全部重新生成失败!')
        }
    }
    
    handleSearch = (type) => async(e) => {
        let {metaAction} = this, value
        
        if(e && e.target && e.target.value) {
            value = e.target.value
        }
        
        if(type == 'search') {
            let allManualKeys = metaAction.gf('data.allManualKeys') ? metaAction.gf('data.allManualKeys').toJS() : [],
                searchValue = []
            
            if(!value) {
                searchValue = allManualKeys
            } else {
                const response = await this.webapi.search.searchBussiness(value)

                if(response && response.length) {
                    response.map(o => {
                        allManualKeys.map(item => {
                            if (o.businessCode == item.businessCode) {
                                searchValue.push(item)
                            }
                        })
                    })
                }
            }
            this.injections.reduce('searchKeys', searchValue, type, value)
        }
    }
    
    editRow = async (...args) => {
        const { rowIndex } = args.pop()
        const row = this.metaAction.gf(`data.list.${rowIndex}`).toJS()
        
        const ret = await this.metaAction.modal('show', {
            title: '',
            children: this.metaAction.loadApp('busSearchSet', {
                store: this.component.props.store,
                rowInfo: row,
                handleEditCb: this.handleEditCb(this.injections, rowIndex)
            })
        })
        if(ret.result) {
            const response = await this.webapi.search.update({businessCode: ret.value.get('businessCode'), keys: ret.value.get('keys')})
            
            if(response) {
                this.metaAction.toast('success', '关键字编辑成功!')
                this.injections.reduce('editRow', rowIndex, ret.value)
            }
        }
    }
    
    handleEditCb = (injections, rowIndex) => {
        return data => {
            if(data && data.result) {
                injections.reduce('clearEditKeys', rowIndex)
            }
        }
    }
    
    getListRowsCount = () => {
        return (this.metaAction.gf('data.list') ? this.metaAction.gf('data.list').size : 0)
    }
    
    pageChanged = (current, pageSize) => {
        const filter = this.metaAction.gf(data.filter).toJS()
        this.load({current, pageSize}, filter)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}