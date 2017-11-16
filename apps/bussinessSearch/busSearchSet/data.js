export function getMeta() {
	return {
		name: 'root',
		component: '::div',
        className: 'mk-busSearchSet',
		children: [{
			name: 'head',
			component: '::div',
            className: 'mk-busSearchSet-head',
			children: '请输入关键字：(请用空格分隔)'
		}, {
			name: 'keyValue',
			component: 'Input',
            className: 'mk-busSearchSet-keyValue',
            value: '{{data.keyValue && data.keyValue.join(" ")}}',
            onChange: '{{$handleChange("keyValue")}}'
		}, {
            name: 'clear',
            component: '::div',
            className: 'mk-busSearchSet-clear',
            children: [ '推荐关键字：', {
                name: 'clearTitle',
                component: '::a',
                children: '清空',
                onClick: '{{$handleClear}}'
            }]
        }, {
            name: 'clearValue',
            component: '::div',
            className: 'mk-busSearchSet-clearValue',
            children: '{{data.clearValue && data.clearValue.join("/")}}'
        }]
	}
}

export function getInitState() {
	return {
		data: {
			keyValue: [],
            clearValue: [],
            rowInfo: {}
		}
	}
}