export function getMeta() {
	return {
		name: 'root',
		component: '::div',
        className: 'mk-bussinessSearch',
		children: [{
			name: 'option',
			component: '::div',
            className: 'mk-bussinessSearch-option',
			children: [{
                name: 'search',
                component: 'Input',
                placeholder: '请输入关键字搜索',
                value: '{{data.search}}',
                onChange: '{{$handleSearch("search")}}'
            }, {
                name: 'fresh',
                component: 'Icon',
                type: 'reload',
                style: {
                    fontSize: 18
                },
                title: '刷新',
                onClick: '{{$handleFresh("fresh")}}'
            }, {
                name: 'refresh',
                component: 'Button',
                type: 'softly',
                children: '全部重新生成',
                onClick: '{{$handleRefresh}}'
            }]
		}, {
			name: 'content',
			component: 'Layout',
            className: 'mk-bussinessSearch-content',
			children: [{
                name: 'dataGrid',
                component: 'DataGrid',
                headerHeight: 35,
                rowHeight: 35,
                enableSequence: true,
//                startSequence: '{{(data.pagination.current - 1)*data.pagination.pageSize + 1}}',
                rowsCount: '{{$getListRowsCount()}}',
                columns: [{
                    name: 'oprate',
                    component: 'DataGrid.Column',
                    columnKey: 'oprate',
                    fixed: true,
                    width: 80,
                    header: {
                        name: 'header',
                        component: 'DataGrid.Cell',
                        children: '操作'
                    },
                    cell: {
                        name: 'cell',
                        component: 'DataGrid.Cell',
                        _power: '({rowIndex})=>rowIndex',
                        children: [{
                            name: 'edit',
                            component: 'Icon',
                            showStyle: 'showy',
                            type: 'edit',
                            style: {
                                fontSize: 18
                            },
                            title: '编辑',
                            onClick: '{{$editRow}}'
                        }]
                    }
                }, {
                    name: 'busCode',
                    component: 'DataGrid.Column',
                    columnKey: 'bussinessCode',
                    width: 100,
                    header: {
                        name: 'header',
                        component: 'DataGrid.Cell',
                        children: '业务编码'
                    },
                    cell: {
                        name: 'cell',
                        component: 'DataGrid.Cell',
                        children: '{{data.list[_rowIndex] && data.list[_rowIndex].businessCode}}',
                        _power: '({rowIndex}) => rowIndex',
                            
                    }
                }, {
                    name: 'busName',
                    component: 'DataGrid.Column',
                    columnKey: 'busName',
                    width: 200,
                    header: {
                        name: 'header',
                        component: 'DataGrid.Cell',
                        children: '业务名称'
                    },
                    cell: {
                        name: 'cell',
                        component: 'DataGrid.Cell',
                        _power: '({rowIndex}) => rowIndex',
                        children: '{{data.list[_rowIndex] && data.list[_rowIndex].name}}'
                    }
                }, {
                    name: 'busKey',
                    component: 'DataGrid.Column',
                    columnKey: 'busKey',
                    width: 280,
                    header: {
                        name: 'header',
                        component: 'DataGrid.Cell',
                        children: '关键字'
                    },
                    cell: {
                        name: 'cell',
                        component: 'DataGrid.Cell',
                        _power: '({rowIndex}) => rowIndex',
                        children: '{{data.list[_rowIndex].keys && data.list[_rowIndex].keys.join("/")}}'
                    }
                }, {
                    name: 'busExtKey',
                    component: 'DataGrid.Column',
                    columnKey: 'busExtKey',
                    width: 280,
                    header: {
                        name: 'header',
                        component: 'DataGrid.Cell',
                        children: '推荐关键字'
                    },
                    cell: {
                        name: 'cell',
                        component: 'DataGrid.Cell',
                        _power: '({rowIndex}) => rowIndex',
                        children: '{{data.list[_rowIndex].extKeys && data.list[_rowIndex].extKeys.join("/")}}'
                    }
                }] 
            }]
		}, {
            name: 'footer',
            className: 'mk-bussinessSearch-footer',
            component: 'Layout',
            _visible: false,
            children: [{
                name: 'pagination',
                component: 'Pagination',
                showSizeChanger: true,
                pageSize: '{{data.pagination.pageSize}}',
                current: '{{data.pagination.current}}',
                total: '{{data.pagination.total}}',
                onChange: '{{$pageChanged}}',
//                onShowSizeChange: '{{$pageChanged}}'
            }]
        }]
	}
}

export function getInitState() {
	return {
		data: {
			list: [],
            pagination: {current: 1, total: 0, pageSize: 20},
            filter: {},
            other: {}
		}
	}
}