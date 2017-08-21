import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import * as util from './util'
import { Tree,Input ,DataGrid} from 'mk-component'
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
        injections.reduce('init')
        this.queryTree()
    }
    queryTree = async () => {
        const response = await this.webapi.tree.query()
        let ret = {}
        //收支数据
        ret.incomeTypes = util.enumToArray(response.paymentsType)
        //业务类型
        ret.bizTypes = util.enumToArray(response.businessType)
        //左树数据
        ret.types = util.typesToTree(response.businessType)
        // response.filter = filter
        this.injections.reduce('initTree', ret)
    }
    btnClick = () => {
        this.injections.reduce('modifyContent')
    }
    addBisness = () =>{
        this.injections.reduce('addBisness')
    }
    onSearch = (val)=>{
        console.log(val)
    }
    handleSelect=(a,b)=>{
        // console.log(a,b,c,d,e,f,g)

    }
    handleCheck = () => {

    }
    getTreeNode = (types) =>{
        let parseNade = (types)=>{
            let ret =[]
            for (let o of types){
                if(o.subTypes){

                    ret.push(
                        <TreeNode title={o.name} key={o.id} data-code = {o.code}>
                            {parseNade(o.subTypes)}
                        </TreeNode>
                    )
                }else{
                    ret.push(
                        <TreeNode  className = 'z-tree-leaf' title={o.name} key={o.id} data-key =   {o.code}>
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

        let types = this.metaAction.gf('data.tree').toJS()

        return this.getTreeNode(types)
    }
    nameChange =(ps)=>{
        // console.log(ps)
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
        if(type == 'rule'){

            this.metaAction.sf('data.interface.rule.focusCellInfo', { rowIndex: ps.rowIndex, columnKey })
        }else{
            this.metaAction.sf('data.interface.other.focusCellInfo', { rowIndex: ps.rowIndex, columnKey })

        }

        // if (columnKey == 'name') {
        //     setTimeout(() => {
        //         const dom = ReactDOM.findDOMNode(this.refName)
        //         dom.select()
        //     }, 0)
        // }
        // else if (columnKey == 'mobile'){
        //     setTimeout(() => {
        //         const dom = ReactDOM.findDOMNode(this.refMobile)
        //         dom.select()
        //     }, 0)
        // }

    }
    handleChange = (a,b,c,d)=>{
        // console.log(a,b,c,d)
    }
    cellGetterRule = (columnKey) => (ps) => {
        var cellValue = this.metaAction.gf(`data.rule.list.${ps.rowIndex}.${columnKey}`)
        var showValue = cellValue

        if (!this.isFocusCell(ps, columnKey,'rule')) {
            return (
                <DataGrid.TextCell
                    onClick={this.cellClick(ps, columnKey,'rule')}
                    value={showValue}
                />
            )
        }

        return (
                <Input
                   className='mk-app-editable-table-cell'
                   onChange={this.nameChange(ps)}
                   value={cellValue}
                   ref={o => this.refName = o}
                />
            )
    }
    cellGetter = (columnKey) => (ps) => {
        var cellValue = this.metaAction.gf(`data.interface.list.${ps.rowIndex}.${columnKey}`)
        var showValue = cellValue

        if (!this.isFocusCell(ps, columnKey)) {
            return (
                <DataGrid.TextCell
                    onClick={this.cellClick(ps, columnKey)}
                    value={showValue}
                />
            )
        }

        return (
                <Input
                   className='mk-app-editable-table-cell'
                   onChange={this.nameChange(ps)}
                   value={cellValue}
                   ref={o => this.refName = o}
                />
            )
    }

    // 弹框 界面元数据
    addInvoiceType = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '新增/编辑界面元数据',
            width:900,
            children: this.metaAction.loadApp('interface-data-card', {
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
    // 弹框 新增规则1
    newInvoiceRule = async ()=>{
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
        const ret = await this.metaAction.modal('show', {
            title: '新增/编辑凭证规则2：',
            width:400,
            children: this.metaAction.loadApp('invoice-rule2', {
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


}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}
