import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        return this.metaReducer.init(state, initState)
    }

    load = (state, response) => {
        state = this.metaReducer.sf(state, 'data.list', fromJS(response))
        state = this.metaReducer.sf(state, 'data.allManualKeys', fromJS(response))
//        state = this.metaReducer.sf(state, 'data.pagination', fromJS(response.pagination))
//        state = this.metaReducer.sf(state, 'data.filter', fromJS(response.filter))
        return state
    }
    
    searchKeys = (state, searchValue, type, value) => {
        state = this.metaReducer.sf(state, 'data.list', fromJS(searchValue))
        state = this.metaReducer.sf(state, 'data.' + type, value)
        return state
    }
    
    editRow = (state, rowIndex, value) => {
        let list = this.metaReducer.gf(state, 'data.list')
        list = list.set(rowIndex, value)
        state = this.metaReducer.sf(state, 'data.list', list)
        return state
    }
    
    clearEditKeys = (state, rowIndex) => {
        let list = this.metaReducer.gf(state, 'data.list'),
            editRow = list.get('rowIndex')
        list = list.setIn([rowIndex, 'extKeys'], [])
        state = this.metaReducer.sf(state, 'data.list', list)
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}