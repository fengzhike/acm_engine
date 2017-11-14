import { Map,fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import * as consts from './consts'
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

	changeData = (state, key, value) => {
		state = this.metaReducer.sf(state, 'data.right1.' + key, value)
		return state
	}

    modifyContent = (state) => {
        const content = this.metaReducer.gf(state, 'data.content')
        return this.metaReducer.sf(state, 'data.content', content + '!')
    }
    initTree = (state,data, businessTypeList, oldInfo, newInfo)=>{
        state = this.metaReducer.sf(state, 'data.businessTypeList', fromJS(businessTypeList))
        state = this.metaReducer.sf(state, 'data.tree', fromJS(data.types))
		if (!oldInfo || !newInfo)
			return state
		let oldEventKey = oldInfo.eventKey,
			newEventKey = newInfo.eventKey,
			oldIsParent = oldInfo.className == 'z-tree-parent',
			newIsParent = newInfo.className == 'z-tree-parent'
		if(oldEventKey && newEventKey) {
			let expandedKeys = this.metaReducer.gf(state, 'data.other.expandedKeys')
			if(parseInt(oldEventKey.split('-')[2]) > parseInt(newEventKey.split('-')[2])) {
				expandedKeys.toJS().map((o, i) => {
					if(o.split('-')[2]) {
						let formatO = o.split('-')
						//下 -> 上
						if((newEventKey.split('-').length != 4 && !newIsParent) && (oldEventKey.split('-').length != 4 && !oldIsParent)) {
							if((parseInt(oldEventKey.split('-')[2]) > parseInt(o.split('-')[2])) && (parseInt(o.split('-')[2]) > parseInt(newEventKey.split('-')[2]))) {
								formatO[2] = (parseInt(o.split('-')[2]) + 1) + ''
								o = formatO.join('-')
								expandedKeys = expandedKeys.set(i, o)
							}
						}
						//下类 -> 上
						else if((newEventKey.split('-').length != 4 && !newIsParent) && (oldEventKey.split('-').length == 4 || oldIsParent)) {
							if(parseInt(o.split('-')[2]) > parseInt(newEventKey.split('-')[2])) {
								formatO[2] = (parseInt(o.split('-')[2]) + 1) + ''
								o = formatO.join('-')
								expandedKeys = expandedKeys.set(i, o)
							}
						}
						//下 -> 上类
						else if((newEventKey.split('-').length == 4 || newIsParent) && (oldEventKey.split('-').length != 4 && !oldIsParent)) {
							if(parseInt(oldEventKey.split('-')[2]) < parseInt(o.split('-')[2])) {
								formatO[2] = (parseInt(o.split('-')[2]) - 1) + ''
								o = formatO.join('-')
								expandedKeys = expandedKeys.set(i, o)
							}
						}
					}
				})
			} else if(parseInt(oldEventKey.split('-')[2]) < parseInt(newEventKey.split('-')[2])) {
				expandedKeys.toJS().map((o, i) => {
					if(o.split('-')[2]) {
						let formatO = o.split('-')
						//上 -> 下
						if((newEventKey.split('-').length != 4 && !newIsParent) && (oldEventKey.split('-').length != 4 && !oldIsParent)) {
							if((parseInt(oldEventKey.split('-')[2]) < parseInt(o.split('-')[2])) && (parseInt(o.split('-')[2]) < parseInt(newEventKey.split('-')[2]))) {
								formatO[2] = (parseInt(o.split('-')[2]) - 1) + ''
								o = formatO.join('-')
								expandedKeys = expandedKeys.set(i, o)
							}
						}
						//上类 -> 下
						else if((newEventKey.split('-').length != 4 && !newIsParent) && (oldEventKey.split('-').length == 4 || oldIsParent)) {
							if(parseInt(o.split('-')[2]) > parseInt(newEventKey.split('-')[2])) {
								formatO[2] = (parseInt(o.split('-')[2]) + 1) + ''
								o = formatO.join('-')
								expandedKeys = expandedKeys.set(i, o)
							}
						}
						//上 -> 下类
						else if((newEventKey.split('-').length == 4 || newIsParent) && (oldEventKey.split('-').length != 4 && !oldIsParent)) {
							if(parseInt(oldEventKey.split('-')[2]) < parseInt(o.split('-')[2])) {
								formatO[2] = (parseInt(o.split('-')[2]) - 1) + ''
								o = formatO.join('-')
								expandedKeys = expandedKeys.set(i, o)
							}
						}
					}
				})
			}
			state = this.metaReducer.sf(state, 'data.other.expandedKeys', fromJS(expandedKeys))
		}
        return state
    }

	setExpandedKeys = (state, keys) => {
		state = this.metaReducer.sf(state, 'data.other.expandedKeys', fromJS(keys))
		return state
	}

    setInventoryProperty = (state,value)=>{
        let inventoryPropertyList = value.map(o=>{
            return {name:o}
        })
        debugger
        state = this.metaReducer.sf(state,'data.other.inventoryProperty',fromJS(value))
        state = this.metaReducer.sf(state,'data.templateData.inventoryPropertyList',fromJS(inventoryPropertyList))

        return state

    }


    setAccountSource = (state,data)=>{
        let {metaReducer} = this
        let accountSource = data.map((o,i)=>{
            return {id: i+1,value:o.code,name:o.gradeName}
        })
        let standard = this.metaReducer.gf(state,'data.standard')
        // accountSource.unshift({id:0,value:0,name:'默认'}) // 科目不需要默认，是必填

        state = this.metaReducer.sf(state, 'data.dataSources.accountSource', fromJS(accountSource))
        // state = this.metaReducer.sf(state, `data.rule.other.dataSource${standard}.account`, fromJS([accountSource[0]]))
        return state
    }
    setRuleList = (state,columnKey,ps,val,selected)=>{
        let standard = this.metaReducer.gf(state,'data.standard')
        if(columnKey === 'industryIdList'){
            // let industryIdList = []
            // if(val && val.length){
            //     industryIdList = val.map(o=>{
            //         return o*1
            //     })
            // }
            // console.log(industryIdList)
            return this.metaReducer.sf(state,`data.rule.list${standard}.${ps.rowIndex}.${columnKey}`,fromJS(val))
        }
        if(columnKey !=='extendAttr' ){
            val = selected.value
        }

        if(columnKey === 'accountName'||columnKey === 'accountCode'){
            state = this.metaReducer.sf(state,`data.rule.list${standard}.${ps.rowIndex}.accountName`,selected.value+'-'+selected.name)
            state = this.metaReducer.sf(state,`data.rule.list${standard}.${ps.rowIndex}.accountCode`,selected.value)

            state = this.metaReducer.sf(state,`data.rule.other.dataSource${standard}.account.${ps.rowIndex}`,fromJS(selected))
        }else{
            state = this.metaReducer.sf(state,`data.rule.other.dataSource${standard}.${columnKey}.${ps.rowIndex}`,fromJS(selected))
            state = this.metaReducer.sf(state,`data.rule.list${standard}.${ps.rowIndex}.${columnKey}`,selected.value)

        }
        return state
    }
    initRuleList = (state,initRuleList)=>{
        let other = this.metaReducer.gf(state,'data.rule.other').toJS(),
            dataSources = this.metaReducer.gf(state,'data.dataSources').toJS(),
            standard = this.metaReducer.gf(state,'data.standard')

        state = this.metaReducer.sf(state,`data.rule.list${standard}`,fromJS(initRuleList))
        state = this.metaReducer.sf(state,`data.rule.other`,fromJS(parseSelected(other,dataSources,initRuleList,standard)))
        return state
    }
    saveData = (state,data) =>{

        let inventoryPropertyList = JSON.parse(JSON.stringify(data.inventoryPropertyList))

        state = this.metaReducer.sf(state,'data.store',fromJS(data))
        state = this.metaReducer.sf(state,'data.dataSources.inventoryPropertyList',fromJS(inventoryPropertyList))
        return  state
    }
    getDataSource = (data) =>{
        let dataSources = {}
        dataSources.influence = data.influenceList.map(o=>{
            let temp = {id:o}
            switch (o) {
                case 'departmentAttr':
                    temp.name = '部门属性'
                    break;
                case 'departmentAttr,personAttr':
                    temp.name = '部门属性,人员属性'
                    break;
                case 'vatTaxpayer':
                    temp.name = '纳税人身份'
                    break;
                case 'vatTaxpayer,qualification':
                    temp.name = '纳税人身份,认证'
                    break;
                case 'vatTaxpayer,taxType':
                    temp.name = '纳税人身份,计税方式'
                    break;
                case 'punishmentAttr':
                    temp.name = '罚款性质'
                    break;
                case 'borrowAttr':
                    temp.name = '借款期限属性'
                    break;
                case 'inventoryAttr':
                    temp.name = '存货属性'
                    break;
                case 'assetAttr':
                    temp.name = '资产属性'
                    break;
                case 'accountInAttr':
                    temp.name = '账户属性流入'
                    break;
                case 'accountOutAttr':
                    temp.name = '账户属性流出'
                    break;
                case 'formula':
                    temp.name = '公式'
                    break;
            }
            return temp
        })
        dataSources.vatTaxpayer = data.vatTaxpayerList.map(o=>{
            return {id:o.enumItemId,name:o.enumItemName}
        })
        dataSources.departmentAttr= data.departmentAttrList.map(o=>{
            return {id:o.enumItemId,name:o.enumItemName}
        })
        dataSources.personAttr = data.personAttrList.map(o=>{
            return {id:o.enumItemId,name:o.enumItemName}
        })
        dataSources.inventoryAttr = data.inventoryPropertyList.map(o=>{
            return {id:o.templateId,name:o.name}
        })
        dataSources.punishmentAttr = data.penaltyTypeList.map(o=>{
            return {id:o.enumItemId,name:o.enumItemName}
        })
        dataSources.borrowAttr = data.loanTermList.map(o=>{
            return {id:o.enumItemId,name:o.enumItemName}
        })
        dataSources.assetAttr = []

        for(let o of data.inventoryPropertyList ){
            if(!o.detailList) continue
            o.detailList.map(oo=>{
                dataSources.assetAttr.push({
                    id:oo.templateId,
                    name:oo.name
                })
            })
        }
        dataSources.industryIdList = data.industryIdList.map(o=>{
            return o.enumItemName
        })

        dataSources.taxType = [{id:true,name:'一般计税'},{id:false,name:'简易计税'}]
        dataSources.qualification = [{id:true,name:'是'},{id:false,name:'否'}]

        return dataSources
    }

    initTemplate = (state,templateData,typeName) =>{

        let inventoryPropertyList = templateData.inventoryPropertyList,
        inventoryProperty = inventoryPropertyList && inventoryPropertyList.length? inventoryPropertyList.map(o=>{
            return o.name
        }):[]

        state = this.metaReducer.sf(state,'data.other.inventoryProperty',fromJS(inventoryProperty))


        state = this.metaReducer.sf(state,'data.typeName',typeName)
        state = this.metaReducer.sf(state,'data.other.codeEditable',false)
        state = this.metaReducer.sf(state,'data.other.isHide',!templateData.businessType.isShow)
        state = this.metaReducer.sf(state,'data.templateData',fromJS(templateData))
        state = this.metaReducer.sf(state,'data.other.status',false)




        return state
    }
    initForm = (state,data) =>{

        let metaReducer = this.metaReducer
        let focusCellInfo = this.metaReducer.gf(state,'data.rule.other.focusCellInfo')
        let ruleOther = getInitState().data.rule.other,
            dataSources = this.metaReducer.gf(state,'data.dataSources').toJS()

        state = this.metaReducer.sf(state,'data.interface.list',fromJS(data.interface.list))
        state = this.metaReducer.sf(state,'data.rule.list18',fromJS(data.rule.list18))
        state = this.metaReducer.sf(state,'data.rule.list19',fromJS(data.rule.list19))
        state = this.metaReducer.sf(state,`data.rule.other`,fromJS(parseSelected(ruleOther,dataSources,data.rule)))
        return state
    }
    newBusiness = (state,typeName) =>{
        state = this.metaReducer.sf(state,'data.other.codeEditable',true)
        state = this.metaReducer.sf(state,'data.typeName','1')
        state = this.metaReducer.sf(state,'data.templateData',fromJS(this.newBusinessData(state,typeName)))
        state = this.metaReducer.sf(state,'data.interface.list',fromJS([]))
        state = this.metaReducer.sf(state,'data.rule.list18',fromJS([]))
        state = this.metaReducer.sf(state,'data.rule.list19',fromJS([]))
        state = this.metaReducer.sf(state, 'data.other.rightVisible', 'right')
        state = this.metaReducer.sf(state,'data.other.status',true)
        state = this.metaReducer.sf(state,'data.other.inventoryProperty',fromJS([]))

        return state
    }
    newBusinessData =(state,typeName)=>{
        let paymentsType = 10000
        // let templateData = this.metaReducer.gf(state,'data.templateData').toJS()
        let templateData = {
            businessType:{
                isShow:true,
                paymentsType: getPaymentsType(typeName),
                report:0
            },
            docTemplateList:[],
            inventoryPropertyList:[],
            tacticsList:[],
            taxProperty:{}
        }
        function getPaymentsType(typeName){
            let ret = 10000
            switch (typeName) {
                case '1':
                    ret = 10000
                    break;
                case '2':
                    ret = 10001
                    break;
                case '3':
                    ret = 10002
                    break;
                case '4':
                    ret = 10003
                    break;
                case '5':
                    ret = 10004
                    break;
            }
            return ret
        }
        return templateData
    }
	selectInOrOutInfo = (state, selectInOrOutInfo) => {
		state = this.metaReducer.sf(state, 'data.other.selectInOrOutInfo', selectInOrOutInfo)
		let treeType = this.metaReducer.gf(state, 'data.businessTypeList'), isTypeClass
		treeType.map(o => {
			if(o.get('code') == selectInOrOutInfo['data-code']) {
				isTypeClass = o.get('isCategory')
			}
		})
		if(selectInOrOutInfo['data-code'].length == 6 && isTypeClass) {
//			state = this.metaReducer.sf(state, 'data.other.addOrDelBussiness', '删除分类')
			state = this.metaReducer.sf(state, 'data.right1.busName', selectInOrOutInfo.title)
			state = this.metaReducer.sf(state, 'data.other.addOrDelBus', 'del')
			state = this.metaReducer.sf(state, 'data.other.rightVisible', 'right1')
		} else if(selectInOrOutInfo['data-code'].length != 2 ) {
//			state = this.metaReducer.sf(state, 'data.other.addOrDelBussiness', '新增分类')
			state = this.metaReducer.sf(state, 'data.other.addOrDelBus', 'add')
			state = this.metaReducer.sf(state, 'data.other.rightVisible', 'right')
		}
		return state
	}
}

function parseSelected (other,dataSources,rule,standard){
    let {list18,list19} = rule,
        {dataSource18,dataSource19} = other

    if(standard){
        other[`dataSource${standard}`] = countDataSource(rule,other[`dataSource${standard}`])
    }else{
        other.dataSource18 = countDataSource(list18,dataSource18)
        other.dataSource19 = countDataSource(list19,dataSource19)
    }


        function countDataSource (list,dataSource){
            list.map((o,i)=>{

                for(let attr in o){
                    if(attr == 'accountCode'){
                        dataSource.account[i]  = dataSources.accountSource.filter(oo=>{
                            return oo.value == o.accountCode
                        })[0]
                    }
                    if(
                        attr == 'influence'||
                        attr == 'vatTaxpayer'||
                        attr == 'departmentAttr'||
                        attr == 'personAttr'||
                        // attr == 'inventoryAttr'||
                        attr == 'taxType'||
                        attr == 'qualification'||
                        attr == 'punishmentAttr'||
                        attr == 'borrowAttr'||
                        attr == 'assetAttr'||
                        attr == 'direction'||
                        attr == 'isSettlement'

                    ){
                        dataSource[attr][i] = consts[attr].filter(oo=>{
                            return oo.value === o[attr]
                        })[0]
                    }
                    if(attr == 'extendAttr'){
                        let influence = o.influence,
                            id = consts.influence.filter(oo=>{
                                return oo.value == influence
                            })[0].id,
                            extendAttrArr = consts[consts.extendAttr[id]]
                        if(extendAttrArr) {
                            dataSource.extendAttr[i] = extendAttrArr.filter( oo=>{
                                return oo.value == o.extendAttr
                            })
                        }
                    }
                }

            })
            return dataSource
        }


    return other
}
export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}
