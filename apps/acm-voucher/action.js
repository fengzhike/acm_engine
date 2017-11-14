import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import * as consts from './consts'
import { Map,fromJS } from 'immutable'
import * as util from './util'
import { Tree,Input ,DataGrid,Select,TreeSelect} from 'mk-component'
const TreeNode = Tree.TreeNode

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections

        if(!sessionStorage['_accessToken'] && top.location.href !=location.href ){// 未登录不允许操作
            top.location.href = top.location.protocol+'//'+top.location.hostname+':'+top.location.port
            return
        }

        // 防止越过权限直接访问
        let re = new RegExp('share/acm_engine')

        if(re.test(window.top.location.href) && top.location.href !=location.href){
            window.top.location.href = window.top.location.protocol+'//'+window.top.location.hostname+':'+window.top.location.port
        }

        injections.reduce('init')
        this.queryTree()
        this.getAccountList(18)
    }
    queryTree = async () => {
        let response = await this.webapi.businessTypeTemplate.init(),
            ret = {}
        //收支数据
        ret.incomeTypes = util.enumToArray(JSON.parse(JSON.stringify(response)).paymentsTypeList)
        //业务类型
        ret.bizTypes = util.enumToArray(JSON.parse(JSON.stringify(response)).businessTypeList)
        //左树数据
        ret.types = util.typesToTree(JSON.parse(JSON.stringify(response)).businessTypeList)
        // response.filter = filter

        this.injections.reduce('initTree', ret, JSON.parse(JSON.stringify(response)).businessTypeList)
        this.injections.reduce('saveData',response)
    }
    btnClick = () => {
        this.injections.reduce('modifyContent')
    }

    addBusiness = async () =>{
		let treeType = this.metaAction.gf('data.businessTypeList') ? this.metaAction.gf('data.businessTypeList').toJS() : [],
			treeType1 = this.metaAction.gf('data.businessTypeList') ? this.metaAction.gf('data.businessTypeList').toJS() : [],
			ret = {},
			classDataSource = consts.incomeType

		const rets = await this.metaAction.modal('show', {
			title: '业务类型分类新增',
			width: 300,
			children: this.metaAction.loadApp('createCategory', {
				store: this.component.props.store,
				initData: {classDataSource}
			})
		})
		if(rets.result) {
			const response = await this.webapi.businessTypeTemplate.createCategory(rets.value)

			this.metaAction.toast('success', '创建成功!')

			treeType.map((o, i) => {
				if(o.id == response.paymentsType) {
					treeType.splice(i + 1, 0, response)
				}
			})
			treeType1.map((o, i) => {
				if(o.id == response.paymentsType) {
					treeType1.splice(i + 1, 0, response)
				}
			})

			ret.types = util.typesToTree(JSON.parse(JSON.stringify(treeType)))

			this.injections.reduce('initTree', ret, treeType1)
		}
    }
    // sql脚本导出
    businessTypeTemplateBackup = async ()=>{
        let ret = await this.webapi.businessTypeTemplate.businessTypeTemplateBackup()
        if(ret){
            this.metaAction.toast('success', ret)
        }
    }
    busNameSave = async() => {
		let selectInOrOutInfo = this.metaAction.gf('data.other.selectInOrOutInfo'),
			treeType = this.metaAction.gf('data.businessTypeList') ? this.metaAction.gf('data.businessTypeList').toJS() : [],
			treeType1 = this.metaAction.gf('data.businessTypeList') ? this.metaAction.gf('data.businessTypeList').toJS() : [],
			name = this.metaAction.gf('data.right1.busName'),
			ret = {}, params = {}

		params.code = selectInOrOutInfo['data-code']
		params.name = name
		params.isShow = true

		const response = await this.webapi.businessTypeTemplate.updateCategory(params)

		this.metaAction.toast('success', '修改成功')

		treeType.map((o, i) => {
			if(o.code == selectInOrOutInfo['data-code']) {
				o.name = name
			}
		})
		treeType1.map((o, i) => {
			if(o.code == selectInOrOutInfo['data-code']) o.name = name
		})

		ret.types = util.typesToTree(JSON.parse(JSON.stringify(treeType)))

		return this.injections.reduce('initTree', ret, treeType1)
	}
	busNameDel = async() => {

		let selectInOrOutInfo = this.metaAction.gf('data.other.selectInOrOutInfo'),
			treeType = this.metaAction.gf('data.businessTypeList') ? this.metaAction.gf('data.businessTypeList').toJS() : [],
			treeType1 = this.metaAction.gf('data.businessTypeList') ? this.metaAction.gf('data.businessTypeList').toJS() : [],
			ret = {}

		const delBusiness = await this.metaAction.modal('confirm', {
			title: '警告',
			content: '确定进行删除?'
		})
		const response = await this.webapi.businessTypeTemplate.businessDelete({code: selectInOrOutInfo['data-code']})

		this.metaAction.toast('success', '删除成功')

		treeType.map((o, i) => {
			if(o.code == selectInOrOutInfo['data-code']) {
				treeType.splice(i, 1)
			}
		})
		treeType1.map((o, i) => {
			if(o.code == selectInOrOutInfo['data-code']) {
				treeType1.splice(i, 1)
			}
		})
		ret.types = util.typesToTree(JSON.parse(JSON.stringify(treeType)))
		return this.injections.reduce('initTree', ret, treeType1)
	}
    onSearch = (val)=>{
        let treeTypes = this.metaAction.gf('data.businessTypeList').toJS(),
            re = new RegExp(val),
            searchedTreeTypes = treeTypes.filter(o=>{
                return (re.test(o.name) || o.code.length == 2)
            })



        if(searchedTreeTypes.length){

            let types = util.typesToTree(JSON.parse(JSON.stringify(searchedTreeTypes)))

            this.injections.reduce('initTree', {types}, treeTypes)
        }

    }
    onSearchChange = (e)=>{
        this.onSearch(e.target.value)
    }
    handleSelect=(checkedNode,selectedNode)=>{
		this.injections.reduce('selectInOrOutInfo', selectedNode.node.props)
        if(selectedNode.node.props.className === 'z-tree-parent'){//点父级  不查询
			return //this.setNewBusiness(selectedNode.node.props)
        }

        let code = selectedNode.node.props['data-code']
        this.queryTemplate(code)
    }
    getTypeName = (code)=>{
        let typeName = '1'
        if(!code) return typeName

        return code.substr(0,1)
    }


    newBusiness = ()=>{
        this.initTemplate()
    }

    queryTemplate = async (code)=>{
        let response = await this.webapi.businessTypeTemplate.query({code})
        // console.log(response)



        // let response2 = await this.webapi.businessTypeTemplate.update(response)
        // return

        this.initTemplate(response,code)


    }
    initTemplate = (response,code)=>{
        let typeName = this.getTypeName(code).substr(0,1)
        if(response){
            this.injections.reduce('initTemplate',JSON.parse(JSON.stringify(response)),typeName)
            this.injections.reduce('initForm',this.transData4List(response))
        }else{
            this.injections.reduce('newBusiness',typeName)
        }

    }
    handleCheck = () => {

    }
    parseRuleList = (ruleList) => {
        // let res = []
        let res = ruleList.map(o=>{
            o.direction = !o.direction? '借':'贷'
            // o.isSettlement = o.isSettlement? '结算方式':'本表'
            o.taxType = o.taxType? '一般计税':'简易计税'
            o.vatTaxpayer = o.vatTaxpayer == 41? '一般纳税人':'小规模纳税人'
            if(o.personAttr == 10050){
                o.personAttr ='管理人员'
            }
            if(o.personAttr == 10051){
                o.personAttr ='生产人员'
            }
            return o
        })
        return res
    }
    handleStandardChange = (e)=>{
        this.metaAction.sf('data.standard', e.target.value)
        this.getAccountList( e.target.value*1)
        // let ruleData = this.metaAction.gf('data.templateData').toJS().docTemplateList,
        //     ruleList = []
        // if(ruleData){
        //     if(e.target.value == 18){
        //         ruleList = ruleData[0]? ruleData[0].details:[]
        //     }else{
        //         ruleList = ruleData[1]? ruleData[1].details:[]
        //     }
        //
        //     this.injections.reduce('initRuleList',ruleList)
        // }
    }
    transData4List = (res,typeName)=> {
        res = JSON.parse(JSON.stringify(res))
        let interfaceData = res.tacticsList,
            ruleData = res.docTemplateList,
            interfaceDataList = [],
            resData = {},
            standard = this.metaAction.gf('data.standard'),
            dataSources = this.metaAction.gf('data.interface.dataSources').toJS()


        interfaceData.map((o,i)=>{
            let item = {}

            // let invoiceType = consts.ticketType.filter(obj=>{
            //     return obj.id ==  o.invoiceId
            // })[0]

            item.invoiceType = o.invoiceId
            item.industryIdList = o.industryIdList

            for (let attr in consts.columns){
                let temp = o.details.filter( oo =>{
                    return oo.columnsId ==  consts.columns[attr].id
                })[0] || {}

                item[attr] = temp.flag
                if(o.columnsName){
                    item[attr+'Title'] = o.columnsName
                }



                if(temp.columnsId == 14){// 结算方式
                    let settlements = temp.specialList

                    item.settlement = []

                    settlements && settlements.length && settlements.map(obj=>{
                        item.settlement.push(obj.optionValue)
                    })
                }
                if(temp.columnsId == 16){// 税率
                    let rates = temp.specialList,
                        rateSource = consts.taxRateType,
                        smallRate=[],normalRate=[]

                    rates && rates.map(oRates=>{
                        if(oRates.vatTaxpayer == 41){
                            normalRate.push(oRates.optionValue)
                        }else{
                            smallRate.push(oRates.optionValue)
                        }
                    })

                    item.normalRate = normalRate
                    item.smallRate = smallRate
                }

            }
            interfaceDataList.push(item)

        })

        // if(interfaceDataList.length<4){
        //     let a = 4 - interfaceDataList.length
        //
        //     for(let i = 0;i <a;i++){
        //         interfaceDataList.push({})
        //     }
        // }
        resData.interface = {
            other:{
                focusCellInfo:undefined
            },
            list: interfaceDataList
        }
        // let ruleDataList = ruleData.map(o=>{return o.details})
        resData.rule = {
            other:{
                focusCellInfo:undefined
            },
            list18:ruleData[0]? ruleData[0].details:[],
            list19:ruleData[1]? ruleData[1].details:[]
        }
        // if(resData.rule.list.length<4){
        //     let a = 4 - resData.rule.list.length
        //     for(let i = 0;i<a;i++){
        //         resData.rule.list.push({})
        //     }
        // }
        return resData

    }

    onDrop = async(info) => {
        let sourceCode = info.dragNode.props['data-code'],
            moveCodeInfo = info.node.props,
            treeType = this.metaAction.gf('data.businessTypeList').toJS(),
            treeType1 = this.metaAction.gf('data.businessTypeList').toJS(),
            option = {
                "source": { //-- 需要移动的业务类型
                    "code": "" //-- 编码
                  },
                //   "previous": { //-- 目标位置前一个业务类型
                //     "code": ""
                //   },
                //   "next": { //-- 目标位置后一个业务类型，previous 有值以 previous 为准
                //     "code": ""
                //   },
                //   "parent": { //-- 目标位置上级业务类型
                //     "code": ""
                //   }
            }, ret = {}

        option.source.code = sourceCode
        if(moveCodeInfo.className == "z-tree-leaf") {
            if(moveCodeInfo.dragOverGapBottom) {
                option.previous = {}
                option.previous.code = moveCodeInfo['data-code']
            } else if(moveCodeInfo.dragOverGapTop) {
                option.next = {}
                option.next.code = moveCodeInfo['data-code']
            }
        } else if(moveCodeInfo.className == "z-tree-parent") {
            option.parent = {}
            option.parent.code = moveCodeInfo['data-code']
        }

        let response = await this.webapi.businessTypeTemplate.move(option)

        if(response.isActualMove) {
            this.metaAction.toast('success','移动成功!')
            let sortTypeFuns = (treeType) => {
                treeType.map((o, i) => {
					if(o.code == response.source.code) {
						o.treeCode = response.source.treeCode
					}
                })
            }
            sortTypeFuns(treeType)
            sortTypeFuns(treeType1)
            ret.types = util.typesToTree(JSON.parse(JSON.stringify(treeType)))
            this.injections.reduce('initTree', ret, treeType1, info.dragNode.props, info.node.props)
        }
    }

	hadleExpand = (expandedKeys, option) => {
		let ifExpand = option.expanded
		this.injections.reduce('setExpandedKeys', expandedKeys)
	}

    getTreeNode = (types) =>{
        let parseNade = (types)=>{
            let ret =[]
            for (let o of types){
                if(o.subTypes){

                    ret.push(
                        <TreeNode  className = 'z-tree-parent' title={o.name} key={o.id} data-code = {o.code}>
                            {parseNade(o.subTypes)}
                        </TreeNode>
                    )
                }else{
                    ret.push(
                        <TreeNode  className = 'z-tree-leaf' title={o.name} key={o.id} data-code = {o.code}>
                        </TreeNode>
                    )
                }
            }
            return ret
        }
        return parseNade(types)
    }
    getTreeChild = () =>{
        if(!this.metaAction.gf('data.tree')) return []

        return this.getTreeNode(this.metaAction.gf('data.tree').toJS())
    }

    isFocusCell = (ps, columnKey,type) => {
        const focusCellInfo = type == 'rule'?
        this.metaAction.gf('data.rule.other.focusCellInfo'):
        this.metaAction.gf('data.interface.other.focusCellInfo')

        if (!focusCellInfo)
            return false
        return focusCellInfo.columnKey == columnKey && focusCellInfo.rowIndex == ps.rowIndex
    }
    cellClick = (ps, columnKey,type) => (e) => {
        e.stopPropagation()
        let {metaAction} = this


        if(type == 'rule'){
            if(!this.isBizCheck()) return

            return metaAction.sf('data.rule.other.focusCellInfo', { rowIndex: ps.rowIndex, columnKey })
        }
        if(columnKey === 'invoiceType'){
            if(!this.isBizCheck()) return

            let item  = metaAction.gf(`data.interface.list.${ps.rowIndex}`).toJS()

            this.addInvoiceType(item,ps.rowIndex)

        }
        // else{
        //     this.metaAction.sf('data.interface.other.focusCellInfo', { rowIndex: ps.rowIndex, columnKey })
        //
        // }

    }
    handleChange = (key)=>(a,b,c,d)=>{
		if(key == 'busName') {
			return this.injections.reduce("changeData", key, a.target.value)
		} else {
			if(!this.isBizCheck()) return
		}
    }

    handleInfluenceChange = (columnKey,ps,dataSource)=>(val)=>{
        debugger
        if(columnKey === 'industryIdList'){
            return this.injections.reduce('setRuleList',columnKey,ps,val)
        }
        let selected = dataSource.filter(o=>{
            return o.id == val
        })[0]

        this.injections.reduce('setRuleList',columnKey,ps,val,selected)
    }
    getAccountList =  async(accountingStandardsId)=>{
        let val = await this.webapi.businessTypeTemplate.accountQuery({
                    accountingStandardsId,
                    "industryIds":"1,2,3,4"
                })


        this.injections.reduce('setAccountSource',this.formatAccountList(val) )
    }
    formatAccountList = (accountList)=>{
        let account = [],temp = []

        for(let attr in accountList){


            temp = !account.length?
                accountList[attr]:
                accountList[attr].filter(o=>{
                    let isRepeat = true
                    for(let oo of account){
                        if(o.code == oo.code){
                            isRepeat = false
                            break;
                        }

                    }
                    return isRepeat
                })
            account = account.concat(temp)
        }






        return account
    }
    nameChange =(ps,columnKey)=>(e)=>{
        let standard = this.metaAction.gf('data.standard')
        this.metaAction.sf(`data.rule.list${standard}.${ps.rowIndex}.${columnKey}`,e.target.value)

        // console.log(ps)
    }
    interfaceChange = (columnKey,ps)=>(val)=>{
        this.metaAction.sf(`data.interface.list.${ps.rowIndex}.${columnKey}`,val)
    }
    deleteRow = async (e,path)=>{
        let list = this.metaAction.gf('data.interface.list').toJS()
        let ret = await this.metaAction.modal('confirm', {
			title: '删除',
			content: '确定进行删除?'
		})
        if(ret){
            list.splice(path.rowIndex,1)
            this.metaAction.sf('data.interface.list',fromJS(list))
        }
    }
    deleteRuleRow = async (e,path)=>{
        let standard = this.metaAction.gf('data.standard'),
            list = this.metaAction.gf('data.rule.list'+standard).toJS()

        let ret = await this.metaAction.modal('confirm', {
			title: '删除',
			content: '确定进行删除?'
		})

        if(ret){
            list.splice(path.rowIndex,1)
            this.injections.reduce('initRuleList',list)
            // this.metaAction.sf('data.rule.list'+standard,fromJS(list))
        }
    }
    cellGetterRule = (columnKey,type) => (ps) => {
        let metaAction = this.metaAction,
            standard = this.metaAction.gf('data.standard')

        let cellValue = this.metaAction.gf(`data.rule.list${standard}.${ps.rowIndex}.${columnKey}`)

        let list = this.metaAction.gf(`data.rule.list${standard}.${ps.rowIndex}`),
            option = this.metaAction.gf(`data.rule.other.dataSource${standard}.${columnKey}.${ps.rowIndex}`)

        var showValue = cellValue
        if(columnKey == 'direction'){
            debugger
        }

        if(type == 'text'){
            showValue = cellValue
        }else{
            option && (showValue = option.get('name'))
            if(columnKey == 'accountName' ){
                let account = this.metaAction.gf(`data.rule.other.dataSource${standard}.account.${ps.rowIndex}`)
                account? (showValue =account.get('value')+'-'+ account.get('name')):
                this.metaAction.gf(`data.rule.list${standard}.${ps.rowIndex}.accountCode`)+'-'+
                this.metaAction.gf(`data.rule.list${standard}.${ps.rowIndex}.accountName`)

            }
            if(columnKey == 'accountCode' ){
                let account = this.metaAction.gf(`data.rule.other.dataSource${standard}.account.${ps.rowIndex}`)
                account && (showValue = account.get('value'))
            }
            if(columnKey == 'extendAttr'){
                let influenceOption = this.metaAction.gf(`data.rule.other.dataSource${standard}.influence.${ps.rowIndex}`),
                id = influenceOption ? influenceOption.get('id'):''
                if(!consts.extendAttr[id]) return <span>不存在扩展因素</span>

                if(id == 12){// 公式
                    showValue = cellValue
                }else{
                    showValue = consts[consts.extendAttr[id]].filter(oo=>{
                        return oo.id == cellValue
                    })[0]
                    showValue = showValue? showValue.name:cellValue
                }
            }
            if(columnKey == 'industryIdList'){
                let industryIdList = []
                showValue && showValue.map(o=>{
                    if(o == 1){
                        industryIdList.push('工业')
                    }else if (o == 2) {
                        industryIdList.push('商贸')
                    }else if (o == 3) {
                        industryIdList.push('服务')
                    }else if (o == 4){
                        industryIdList.push('信息技术')
                    }
                })
                showValue = industryIdList.join(',')
            }
        }


        if (!this.isFocusCell(ps, columnKey,'rule')) {
            return (
                <DataGrid.TextCell
                    onClick={::this.cellClick(ps, columnKey,'rule')}
                    value={showValue}
                />
            )
        }
        if(type == 'text' ){
            return (
                <Input
                    className='mk-app-editable-table-cell'
                    onChange={this.nameChange(ps,columnKey)}
                    value={cellValue}
                    ref={o => this.refName = o}
                />
            )
        }else{
            // let data = this.metaAction.gf(`data.dataSources`).toJS()
            let dataSource,option

            if(columnKey == 'accountName'||columnKey == 'accountCode'){
                dataSource = this.metaAction.gf(`data.dataSources.accountSource`)?
                    this.metaAction.gf(`data.dataSources.accountSource`).toJS():
                    []
                option =this.metaAction.gf(`data.rule.other.dataSource${standard}.account.${ps.rowIndex}`)?
                    this.metaAction.gf(`data.rule.other.dataSource${standard}.account.${ps.rowIndex}`).toJS():
                    {}
            }else{
                option = this.metaAction.gf(`data.rule.other.dataSource${standard}.${columnKey}.${ps.rowIndex}`)?
                    this.metaAction.gf(`data.rule.other.dataSource${standard}.${columnKey}.${ps.rowIndex}`).toJS():
                    []
                dataSource = consts[columnKey]
            }
            if(columnKey == 'extendAttr' ){
                let influenceOption = this.metaAction.gf(`data.rule.other.dataSource${standard}.influence.${ps.rowIndex}`),
                    id = influenceOption ? influenceOption.get('id'):''

                if(!consts.extendAttr[id]) return <span>不存在扩展因素</span>

                dataSource = consts[consts.extendAttr[id]]
                option = this.metaAction.gf(`data.rule.other.dataSource${standard}.${consts.extendAttr[id]}.${ps.rowIndex}`)?
                    this.metaAction.gf(`data.rule.other.dataSource${standard}.${consts.extendAttr[id]}.${ps.rowIndex}`):{}

                if(id == 12){// 公式
                    return (
                        <Input
                            className='mk-app-editable-table-cell'
                            onChange={this.nameChange(ps,columnKey)}
                            value={showValue}
                            ref={o => this.refName = o}
                        />
                    )
                }else if (true) {

                }
            }
            if(columnKey == 'industryIdList'){
                let value = []
                if(cellValue && cellValue.size){
                    value = cellValue.toJS().map(o=>{
                        return o+''
                    })
                }
                return (
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="多选模式"
                        value = {value}
                        onChange={::this.handleInfluenceChange(columnKey,ps)}>

                        <Option key={'1'} >工业</Option>
                        <Option key={'2'} >商贸</Option>
                        <Option key={'3'} >服务</Option>
                        <Option key={'4'} >信息技术</Option>

                    </Select>
                )
            }
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder={showValue}
                    value = {option.id}
                    optionFilterProp="children"
                    optionLabelProp="children"

                    onChange={::this.handleInfluenceChange(columnKey,ps,dataSource)}>
                    {
                        dataSource.map(o=>{
                            return <Select.Option
                                value={o.id}>
                                {columnKey == 'accountCode'?o.value :(columnKey == 'accountName'?o.value +'-'+o.name:o.name)}
                            </Select.Option>
                        })
                    }
                </Select>
            )
        }
    }
    cellGetter = (columnKey,type) => (ps) => {
        let metaAction = this.metaAction
        var cellValue = this.metaAction.gf(`data.interface.list.${ps.rowIndex}.${columnKey}`),
            cellValue2 = ''
        if(type === 'ext'){
            cellValue2 = this.metaAction.gf(`data.interface.list.${ps.rowIndex}.${columnKey}Title`)
            cellValue2 && (cellValue = cellValue + ','+cellValue2)
        }

        if(columnKey === 'settlement' || columnKey === 'smallRate' ||columnKey === 'normalRate'||columnKey === 'industryIdList'){
            let dataSource = []

            if(columnKey === 'settlement'){
                dataSource = consts.settlementType
            }else if(columnKey === 'smallRate' || columnKey === 'normalRate'){
                dataSource = consts.taxRateType
            }else if(columnKey === 'industryIdList' ){
                dataSource = consts.industryType
            }
            if(cellValue && cellValue.size){
                let aVal = []
                // console.log(cellValue.toJS())
                cellValue.map(o=>{
                    aVal.push(
                        dataSource.filter(oo=>{
                            return oo.id == o
                        })[0].name
                    )
                })

                cellValue = aVal.join(',')
            }else{
                cellValue = ''
            }
        }
        if(columnKey =='invoiceType'){
            let a  = consts.ticketType.filter(o=>{
                return o.id == cellValue
            })[0]
            cellValue =a ? a.name:cellValue
            return (
                <DataGrid.TextCell
                    onClick={this.cellClick(ps, columnKey)}
                    style = {{color: '#2db7f5',cursor:'pointer'}}
                    value={cellValue}
                />
            )
        }
        var showValue =  cellValue

        if (!this.isFocusCell(ps, columnKey)) {
            return (
                <DataGrid.TextCell
                    onClick={this.cellClick(ps, columnKey)}
                    value={showValue}
                />
            )
        }

    }
    handlePreview = ()=>{
        return this.metaAction.toast('error','尚未开发')
    }

    handleDelete = async()=>{
        const ret = await this.metaAction.modal('confirm', {
			title: '警告',
			content: '确定删除此业务类型?'
		})
        if(ret){
            let code = this.metaAction.gf('data.templateData.businessType.code')

            let response = await this.webapi.businessTypeTemplate.delete({code})


            this.metaAction.toast('success','删除成功')
            this.metaAction.sf('data.other.rightVisible',false)
            this.queryTree()
        }

    }
    handleRefresh = ()=>{
        let code = this.metaAction.gf('data.templateData.businessType.code')
        this.queryTree()
        if(code) this.queryTemplate(code)
    }
    handleSave = async()=>{
        if(!this.isBizCheck()) return

        let metaAction = this.metaAction,
            templateData = metaAction.gf('data.templateData').toJS(),
            interfaceData = metaAction.gf('data.interface').toJS(),
            status = this.metaAction.gf('data.other.status'),
            standard = this.metaAction.gf('data.standard')

        let ruleData = metaAction.gf('data.rule').toJS(),
            tacticsList = this.parseTacticsList(templateData,interfaceData),
            docTemplateList18 = this.parseDocTemplateList(ruleData.list18),
            docTemplateList19 = this.parseDocTemplateList(ruleData.list19)

        templateData.tacticsList = tacticsList
        templateData.docTemplateList = [
            {
                accountingStandardId:18,
                details:docTemplateList18
            },
            {
                accountingStandardId:19,
                details:docTemplateList19
            }
        ]


        // delete templateData.businessType.typeName

        // return true

        let response
        if(templateData.taxProperty && !templateData.taxProperty.attrCode){
            delete(templateData.taxProperty)
        }

        if(status){
            response = await this.webapi.businessTypeTemplate.create(templateData)

            if(response.businessType){
                this.metaAction.toast('success','新增成功！')
            }
        }else{
            response = await this.webapi.businessTypeTemplate.update(templateData)
            if(response.businessType){
                this.metaAction.toast('success','修改成功！')
            }
        }


        let typeName = response.businessType.code.substr(0,1)
        this.queryTree()
        this.injections.reduce('initTemplate',JSON.parse(JSON.stringify(response)),typeName)
        this.injections.reduce('initForm',this.transData4List(response))

    }
    parseTacticsList = (templateData,interfaceData)=>{
        let tacticsList = [],
            list = interfaceData.list


        list.map((o,i)=>{// interfaceData
            tacticsList[i] = {}
            tacticsList[i].invoiceId = o.invoiceType
            tacticsList[i].industryIdList = o.industryIdList

            if(templateData.tacticsList[i] && templateData.tacticsList[i].details){
                tacticsList[i].details = templateData.tacticsList[i].details
                tacticsList[i].details = tacticsList[i].details.map(oo=>{// templateData
                    oo.flag = !isNaN(o[this.getColumnsById(oo.columnsId)])?o[this.getColumnsById(oo.columnsId)]: oo.flag
                    if(o.columnsName){
                        oo.columnsName = o.columnsName
                    }
                    if(oo.columnsId == 14){
                        let specialList = []
                        o.settlement.map((ooo,oooIdx)=>{
                            specialList.push({
                                columnsId: 12,
                                isDefault: 0,
                                optionValue:ooo,
                                idList:(oo.specialList && oo.specialList[oooIdx])? oo.specialList[oooIdx].idList:undefined
                            })
                        })
                        specialList[0] && (specialList[0].isDefault = 1)
                        oo.specialList = specialList
                    }
                    if(oo.columnsId == 16){
                        let specialList = []
                        o.normalRate.map((ooo,oooIdx)=>{
                            specialList.push({
                                "columnsId": 16,
                                "isDefault": 0,
                                "vatTaxpayer": 41,
                                "optionValue": ooo,
                                idList:(oo.specialList && oo.specialList[oooIdx])? oo.specialList[oooIdx].idList:undefined
                            })
                        })
                        o.smallRate.map((ooo,oooIdx)=>{
                            specialList.push({
                                "columnsId": 16,
                                "isDefault": 0,
                                "vatTaxpayer": 42,
                                "optionValue": ooo,
                                idList:(oo.specialList && oo.specialList[oooIdx])?oo.specialList[oooIdx].idList:undefined
                            })
                        })
                        specialList[0] && (specialList[0].isDefault = 1)
                        oo.specialList = specialList
                    }
                    return oo
                })

            }else{
                tacticsList[i].details = []
                for(let attr in o){
                    if(
                        attr == 'industryIdList'||
                        attr == 'normalRate'||
                        attr == 'smallRate'||
                        attr == 'invoiceType'||
                        attr == 'settlement'||
                        /Title/.test(attr)
                    ){
                        continue
                    }
                    let specialList = [],
                        temp = {
                            columnsId:consts.columns[attr].id,
                            flag:o[attr]
                        }
                    if(temp.columnsId>= 1000 && o[attr+'Title']){
                        temp.columnsName = o[attr+'Title']
                    }
                    if(attr == 'taxRate'){
                        o.normalRate && o.normalRate.map((ooo,oooIdx)=>{
                            specialList.push({
                                "columnsId": 16,
                                "isDefault": !oooIdx ? 1:0,
                                "vatTaxpayer": 41,
                                "optionValue": ooo
                            })
                        })
                        o.smallRate && o.smallRate.map((ooo,oooIdx)=>{
                            specialList.push({
                                "columnsId": 16,
                                "isDefault": !oooIdx ? 1:0,
                                "vatTaxpayer": 42,
                                "optionValue": ooo
                            })
                        })
                        temp.specialList = specialList
                    }
                    if(attr == 'bankAccount'){
                        o.settlement && o.settlement.map((ooo,oooIdx)=>{
                            specialList.push({
                                columnsId: 12,
                                isDefault: !oooIdx? 1:0,
                                optionValue:ooo
                            })
                        })
                        temp.specialList = specialList
                    }

                    tacticsList[i].details.push(temp)
                }
            }
        })
        return tacticsList
    }
    parseDocTemplateList = (list)=>{
        let docTemplate = list.map((o,i)=>{
                let item = {}

                item.fundSource = o.fundSource
                item.flag = o.flag
                item.isSettlement = o.isSettlement
                item.taxType = o.taxType
                item.vatTaxpayer = o.vatTaxpayer
                item.accountName = o.accountName
                item.influence = o.influence

                item.accountCode = o.accountCode
                item.orgId = o.orgId
                item.direction = o.direction
                if(o.departmentAttr){
                    item.departmentAttr = o.departmentAttr
                }
                if(o.personAttr){
                    item.personAttr = o.personAttr
                }
                if(o.qualification){
                    item.qualification = o.qualification
                }

                if(item.influence){
                    let id = consts.influence.filter(oo=>{
                            return oo.value == item.influence
                        })[0].id
                    if(consts.extendAttr[id]){
                            item.extendAttr = consts[consts.extendAttr[id]].filter(oo=>{
                            return (oo.value == o.extendAttr || oo.id == o.extendAttr)
                        })[0].value
                    }

                }


                item.industryIdList = o.industryIdList.map(o=>{return o*1})
                item.idList = o.idList

                return item
            })


            return docTemplate
    }
    getColumnsById = (id)=>{
        let columns = consts.columns
        for( let attr in columns){
            if(columns[attr].id == id){
                return attr
            }
        }
    }

    // business set

    bizAttrChange = (key)=>(val,path)=>{
        if(!this.isBizCheck()) return
        let value = val.target.value
        if(key == 'code'){
            value = this.metaAction.gf('data.typeName')+"0"+val.target.value
            this.metaAction.sf('data.templateData.businessType.treeCode',value)
        }
        this.metaAction.sf(`data.templateData.businessType.${key}`,value)

    }

    taxPropertyChange =(key)=> (val,path)=>{
        if(!this.isBizCheck()) return

        let taxPropertyList = consts.taxPropertyList,
            item = taxPropertyList.filter(o=>{
                return o.attrCode == val
            })[0]

        if(key === 'small'){
            this.metaAction.sfs({
                'data.templateData.taxProperty.smallScaleAttrCode':val,
                'data.templateData.taxProperty.smallScaleAttrName':item.attrName
            })
        }else{
            this.metaAction.sfs({
                'data.templateData.taxProperty.attrCode':val,
                'data.templateData.taxProperty.attrName':item.attrName
            })
        }
    }
    onRightChange =(key)=>(e)=>{
        if(!this.isBizCheck()) return
        if(key == 'isHide'){

            this.metaAction.sf(`data.templateData.businessType.isShow`,!e.target.checked)
            this.metaAction.sf(`data.other.isHide`,e.target.checked)
        }else{
            this.metaAction.sf(`data.templateData.businessType.${key}`,e.target.checked)
        }

    }
    onRightIsShowChange = (e)=>{
        if(!this.isBizCheck()) return
        this.metaAction.sf(`data.templateData.businessType.isShow`,e.target.checked)
    }

    handleReportChange =(val)=>{
        if(!this.isBizCheck()) return
        this.metaAction.sf(`data.templateData.businessType.report`,val)
    }
    handleTypeNameChange = (val)=>{
        let code = this.metaAction.gf('data.templateData.businessType.code')?
            this.metaAction.gf('data.templateData.businessType.code').substr(2):'',
            paymentsType = 10000

        switch (val) {
            case '1':
                paymentsType = 10000
                break
            case '2':
                paymentsType = 10001
                break
            case '3':
                paymentsType = 10002
                break
            case '4':
                paymentsType = 10003
                break
            case '5':
                paymentsType = 10004
                break
            case '6':
                paymentsType = 10005
                break
        }





        this.metaAction.sfs({
            'data.typeName':val,
            'data.templateData.businessType.code':val+"0"+ code,
            'data.templateData.businessType.treeCode':val+"0"+ code,
            'data.templateData.businessType.paymentsType':paymentsType
        })
    }

    isBizCheck = ()=>{//   检测是否选择业务类型
        let {metaAction} = this

        if(!metaAction.gf('data.typeName')){
            metaAction.toast('error','请先选择业务类型')
            return
        }else{
            return true
        }


    }
    treeSelectNode =(inventoryPropertyList)=>{
        if(!inventoryPropertyList) return []
        let ret = [],
            list = inventoryPropertyList.toJS()


        list.map((o,i)=>{
            if(o.detailList){
                ret.push(
                    <TreeSelect.TreeNode value = {o.name} key = {`1-${i}`} title = {o.name} >
                        {
                            o.detailList.map((oo,idx)=>{
                                return <TreeSelect.TreeNode value = {oo.name} key = {`1-${i}-${idx}`} title = {oo.name} />
                            })
                        }

                    </TreeSelect.TreeNode>
                )
            }else{
                ret.push(<TreeSelect.TreeNode value = {o.name} key = {`1-${i}`} title = {o.name} />)
            }

        })

        return ret
    }
    getInventoryTreeNode= ()=>{
        let {metaAction} = this,
            inventoryPropertyList = metaAction.gf('data.dataSources.inventoryPropertyList'),
            treeSelectNode = this.treeSelectNode(inventoryPropertyList)

        return treeSelectNode
    }


    // 设置可选存货属性
    setInventoryProperty = (val)=>{
        if(!this.isBizCheck()) return
        this.injections.reduce('setInventoryProperty',val)
    }


    // 弹框 界面元数据
    addInvoiceType = async (data,rowIndex) => {
        if(!this.isBizCheck()) return
        let {metaAction} = this

        if(data.target) data = undefined
        const ret = await metaAction.modal('show', {
            title: '新增/编辑界面元数据',
            width:900,
            children: metaAction.loadApp('interface-data-card', {
                store: this.component.props.store,
                initData:{form:data,dataSources:metaAction.gf('data.interface.dataSources').toJS(),rowIndex}
            })
        })

        if (ret) {
            let list = metaAction.gf('data.interface.list').toJS(),
                val = ret.value.list

            for (var i = 0; i < list.length; i++) {
                if (i != rowIndex){
                    if(list[i].invoiceType === val.invoiceType){
                        return metaAction.toast('error','票据类型重复')
                    }
                }
            }

            !isNaN(rowIndex)? (list[rowIndex]= val):(list.push(val))

            this.metaAction.sf('data.interface.list',fromJS(list))

        }

    }
    // 弹框 新增规则1（多个添加)
    newInvoiceRule = async ()=>{
        return this.metaAction.toast('error','功能尚未开发')
        if(!this.isBizCheck()) return

        const ret = await this.metaAction.modal('show', {
            title: '新增/编辑凭证规则：',
            width:900,
            children: this.metaAction.loadApp('invoice-rule', {
                store: this.component.props.store,
            })
        })

        if (ret) {
            const response = await this.webapi.education.query()
            this.metaAction.sfs({
                'data.other.educationDataSource': fromJS(response),
                'data.form.education': fromJS(ret)
            })
        }
    }
    // 弹框 新增规则2
    newInvoiceRule2 = async ()=>{
        if(!this.isBizCheck()) return

        let dataSources ={
            influence:consts.influence,
            extendAttr:consts.extendAttr,
            vatTaxpayer:consts.vatTaxpayer,
            departmentAttr:consts.departmentAttr,
            personAttr:consts.personAttr,
            inventoryAttr:consts.inventoryAttr,
            taxType:consts.taxType,
            qualification:consts.qualification,
            punishmentAttr:consts.punishmentAttr,
            borrowAttr:consts.borrowAttr,
            assetAttr:consts.assetAttr,
            direction:consts.direction,
            isSettlement:consts.isSettlement,
            industryIdList:['工业','商贸','服务','信息技术']
        }

        dataSources.accountSource = this.metaAction.gf('data.dataSources.accountSource').toJS()


        const ret = await this.metaAction.modal('show', {
            title: '新增/编辑凭证规则2：',
            width:400,
            children: this.metaAction.loadApp('invoice-rule2', {
                store: this.component.props.store,
                initData:dataSources
            })
        })

        if (ret) {
            let standard = this.metaAction.gf('data.standard')

            let list =this.metaAction.gf('data.rule.list'+standard).toJS()
            list.push(ret.value.list)

            this.injections.reduce('initRuleList',list)
        }
    }



}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}
