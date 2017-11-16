import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import { fromJS } from "immutable"

let CB

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        
        if(this.component.props.setOkListener) {
            this.component.props.setOkListener(this.onOk)
        } 
        CB = this.component.props.handleEditCb
        injections.reduce('init', this.component.props.rowInfo)
    }

    handleChange = (type) => (e) => {
        let {metaAction} = this
        if(type == 'keyValue') {
            let value
            if(e && e.target && e.target.value) {
                value = e.target.value
            }
            this.injections.reduce('changeKeyValue', value.split(' '))
        }
    }
    
    handleClear = async () => {
        let rowInfo = this.metaAction.gf('data.rowInfo')
        if(!rowInfo.get('extKeys') || !rowInfo.get('extKeys').length) {
            this.metaAction.toast('error', '此业务没有关键字')
            return 
        }
        
        const response = await this.webapi.search.clearExtKeys({businessCode: rowInfo.get('businessCode')})
        
        if(response) {
            this.metaAction.toast('success', '清除推荐关键字成功!')
            this.injections.reduce('clearValue')
            CB({result: true })
        }
    }
    
    onOk = () => {
        let rowInfo = this.metaAction.gf('data.rowInfo').toJS(),
            keyValue = rowInfo.keys, keyValue1 = []
        keyValue.map((o,i) => {
            if(!!o) {
                keyValue1.push(o)
            }
        })
        
        rowInfo.keys = keyValue1
        
        return {result:true, value: fromJS(rowInfo)}
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}