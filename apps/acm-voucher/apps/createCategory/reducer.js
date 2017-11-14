import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, initData) => {
        const initState = getInitState()
		let classDataSource = [
			initData.classDataSource.sr,
			initData.classDataSource.zc,
			initData.classDataSource.cbzjtx,
			initData.classDataSource.cqxj,
			initData.classDataSource.sk,
			initData.classDataSource.kj
		]
		initState.data.classDataSource = classDataSource
        return this.metaReducer.init(state, initState)
    } 

    modifyContent = (state) => {
        const content = this.metaReducer.gf(state, 'data.content')
        return this.metaReducer.sf(state, 'data.content', content + '!')
    }
	
	changeData = (state, key, value) => {
		state = this.metaReducer.sf(state, 'data.' + key, value)
		return state
	}
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}