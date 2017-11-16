import config from './config'
import * as data from './data'

export default {
	name: "busSearchSet",
	version: "1.0.0",
	description: "busSearchSet",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "busSearchSet")
	}
}