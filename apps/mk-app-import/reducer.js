import { reducer as MetaReducer } from 'mk-meta-engine'
import { Map, List, fromJS } from 'immutable'
import config from './config'
import { getData } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, key, fileInfos) => {
        const data = getData()
	    data.data.key = key
	    data.data.fileInfos = fileInfos
        return this.metaReducer.init(state, data)
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}