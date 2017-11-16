import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, rowInfo) => {
        const initState = getInitState()
        if(rowInfo) {
            initState.data.keyValue = rowInfo.keys
            initState.data.clearValue = rowInfo.extKeys
            initState.data.rowInfo = rowInfo
        }
        return this.metaReducer.init(state, initState)
    }
    
    changeKeyValue = (state, value) => {
        state = this.metaReducer.sf(state, 'data.keyValue', value)
        let rowInfo = this.metaReducer.gf(state, 'data.rowInfo')
        rowInfo = rowInfo.set('keys', value)
        state = this.metaReducer.sf(state, 'data.rowInfo', rowInfo)
        return state
    }
    
    clearValue = (state) => {
        state = this.metaReducer.sf(state, 'data.clearValue', '')
        let rowInfo = this.metaReducer.gf(state, 'data.rowInfo')
        rowInfo = rowInfo.set('extKeys', [])
        state = this.metaReducer.sf(state, 'data.rowInfo', rowInfo)
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}