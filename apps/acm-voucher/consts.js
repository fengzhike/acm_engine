export const settlementType = [
	{ id: '2', name: "银行" },
	{ id: '1', name: "现金" },
	{ id: '3', name: "微信" },
	{ id: '4', name: "支付宝" },
	{ id: '5', name: "冲减预收款" },
	{ id: '6', name: "冲减预付款" },
	{ id: '7', name: "客户欠款" },
	{ id: '8', name: "欠供应商款" },
	{ id: '9', name: "冲员工借款" },
	{ id: '10', name: "员工垫付" }
]

export const influence = [
	{id:0,value:0,name:'默认'},
	{id:1,value:'departmentAttr',name:'部门'},
	{id:2,value:'departmentAttr,personAttr',name:'部门,人员'},
	{id:3,value:'vatTaxpayer',name:'纳税人身份'},
	{id:4,value:'vatTaxpayer,qualification',name:'纳税人身份,认证'},
	{id:5,value:'vatTaxpayer,taxType',name:'纳税人身份,计税方式'},
	{id:6,value:'punishmentAttr',name:'罚款性质' },  // ext punishmentAttr 6
	{id:7,value:'borrowAttr',name:'借款期限属性'}, // ext borrowAttr 7
	{id:8,value:'inventoryAttr',name:'存货属性'}, // ext inventoryAttr 8
	{id:9,value:'assetAttr',name:'资产属性'},// ext assetAttr 9
	{id:10,value:'accountInAttr',name:'账户属性流入'},// ext account 10
	{id:11,value:'accountOutAttr',name:'账户属性流出'},// ext account 11
	{id:12,value:'formula',name:'公式'} // ext formula 12
]
export const extendAttr = {
	6:'punishmentAttr',
	7:'borrowAttr',
	8:'inventoryAttr',
	9:'assetAttr',
	10:'account',
	11:'account',
	12:'formula'

}
export const vatTaxpayer = [
	{id:0,value:0,name:'默认'},
	{id:1,value:41,name:'一般纳税人'},
	{id:2,value:42,name:'小规模纳税人'},
]
export const departmentAttr = [
	{id:0,value:0,name:'默认'},
	{id:1, value: 200000000000070, name:'其他（含管理）'},
	{id:2, value: 200000000000071, name:'与生产相关'},
	{id:3, value: 200000000000072, name:'与销售相关'},
	{id:4, value: 200000000000073, name:'与研发相关'},
	{id:5, value: 200000000000074, name:'与加工修理相关'},
	{id:6, value: 200000000000075, name:'与技术咨询服务相关'},
]

export const personAttr = [
	{id:0,value:0,name:'默认'},
	{id:1, value:10050,name:'管理人员'},
	{id:2, value:10051,name:'生产人员'},
]

export const inventoryAttr = [
	{id:0,value:0,name:'默认'},
	{id:1, value:1, name:'商品'},
	{id:2, value:2, name:'原材料'},
	{id:3, value:3, name:'半成品'},
	{id:4, value:4, name:'周转材料'},
	{id:5, value:5, name:'固定资产-动产'},
	{id:6, value:6, name:'劳务'},
	{id:7, value:7, name:'服务'},
	{id:8, value:8, name:'无形资产'},
	{id:9, value:9, name:'固定资产-不动产'},
]

export const taxType = [
	{id:1, value:true, name:'一般计税'},
	{id:2, value:false, name:'简易计税'}
]
export const qualification = [
	{id:0,value:0,name:'默认'},
	{id:1,value:true,name:'是'},
	{id:2,value:false,name:'否'}
]
export const punishmentAttr = [
	{id:0, value:0,name:'默认'},
	{id:1, value:75,name:'其他罚款'},
	{id:2, value:123,name:'行政罚款'},
	{id:3, value:124,name:'违约金'},
]
export const borrowAttr = [
	{id:0,value:0,name:'默认'},
	{id:1, value:125,name:'一年及一年以下'},
	{id:2, value:126,name:'一年以上'},
]
export const assetAttr = [
	{id:0,value:0,name:'默认'},
	{id:1, value:1,name:'交通运输服务'},
	{id:2, value:2,name:'电信服务'},
	{id:3, value:3,name:'建筑服务'},
	{id:4, value:4,name:'金融服务'},
	{id:5, value:5,name:'金融商品转让'},
	{id:6, value:6,name:'生活服务'},
	{id:7, value:7,name:'有形动产租赁服务'},
	{id:8, value:8,name:'不动产租赁服务'},
	{id:9, value:9,name:'其他服务'},
	{id:10, value:10,name:'信息技术服务'},

	{id:11, value:19,name:'土地使用权'},
	{id:12, value:20,name:'专利权'},
	{id:13, value:21,name:'著作权'},
	{id:14, value:23,name:'非专利技术'},
	{id:15, value:31,name:'特权使用费'},
	{id:16, value:32,name:'其它'},

	{id:17, value:35,name:'房屋建筑物'},
	{id:18, value:36,name:'机器设备'},
	{id:19, value:37,name:'办公家具'},
	{id:20, value:38,name:'运输工具'},
	{id:21, value:39,name:'电子设备'},
]
export const direction = [

	{id:1, value:true,name:'贷'},
	{id:2, value:false,name:'借'},
]
export const isSettlement = [
	{id:0,value:0,name:'默认'},
	{id:1, value:true,name:'结算方式'},
	{id:2, value:false,name:'本表'},
]



export const commonAccountId = {
	xj: { id: 4, name: '现金' },
	cjysk: { id: 5, name: '冲减预收款' },
	khqk: { id: 6, name: '暂不支付' },
	cjyfk: { id: 7, name: '冲减预付款' },
	qgysk: { id: 8, name: '暂不支付' },
	cygjk: { id: 9, name: '冲员工借款' },
	ygdf: { id: 10, name: '员工垫付' }
}


// export const ticketType = {
// 	pp: { id: 200000000000050, code: '001', name: '增值税普通发票' },
// 	zp: { id: 200000000000051, code: '002', name: '增值税专用发票' },
// 	qt: { id: 200000000000052, code: '003', name: '其他票据' },
// 	hgzp: { code: "004", id: 200000000000053, name: "海关进口增值税专用缴款书" },
// 	np: { code: "005", id: 200000000000054, name: "农产品发票" },
// 	qtp: { code: "006", id: 200000000000055, name: "其他发票" },
// 	qtpk: { code: "007", id: 200000000000056, name: "其他发票(可抵扣)" },
// 	wkp: { code: "008", id: 200000000000057, name: "未开票" }
// }

export const ticketType = [
	{ id: 200000000000050, code: '001', name: '增值税普通发票' },
	{ id: 200000000000051, code: '002', name: '增值税专用发票' },
	{ id: 200000000000052, code: '003', name: '其他票据' },
	{ code: "004", id: 200000000000053, name: "海关进口增值税专用缴款书" },
	{ code: "005", id: 200000000000054, name: "农产品发票" },
	{ code: "006", id: 200000000000055, name: "其他发票" },
	{ code: "007", id: 200000000000056, name: "其他发票(可抵扣)" },
	{ code: "008", id: 200000000000057, name: "未开票" }
]



export const incomeType = {
	sr: { id: 10000, code: '10', name: '收入' },
	zc: { id: 10001, code: '20', name: '支出' },
	cbzjtx: { id: 10002, code: '30', name: '成本/折扣和摊销' },
	cqxj: { id: 10003, code: '40', name: '存取现金/内部账户互转' },
	sk: { id: 10004, code: '50', name: '收款/付款' },
	kj: { id: 10005, code: '60', name: '请会计处理' }
}

export const industryType = [
	{ id: 1, name: '工业' },
	{ id: 2, name: '商贸' },
	{ id: 3, name: '服务' },
	{ id: 4, name: '信息技术' }

]

export const vatTaxpayerType = {
	ybnsr: { id: 41, name: '一般纳税人' },
	xgmnsr: { id: 42, name: '小规模纳税人' }
}

export const taxRateType = [
	{ id: '100', name: '100%', value: 1 },
	{ id: '17', name: '17%', value: 0.17 },
	{ id: '13', name: '13%', value: 0.13 },
	{ id: '11', name: '11%', value: 0.11 },
	{ id: '6', name: '6%', value: 0.06 },
	{ id: '5', name: '5%', value: 0.05 },
	{ id: '4', name: '4%', value: 0.04 },
	{ id: '3', name: '3%', value: 0.03 },
	{ id: '2', name: '3%减按2%', value: 0.03 },
	{ id: '1', name: '1.5%', value: 0.015 },
	{ id: '0', name: '0%', value: 0 },
	{ id: '1000', name: '免税', value: 0 }
]

export const columns = {
	noTaxAmount: { id: 1, name: '金额' },
	amount: { id: 2, name: '价税合计' },
	tax: { id: 3, name: '税额' },
	department: { id: 4, name: '部门' },
	employee: { id: 5, name: '人员' },
	customer: { id: 6, name: '客户' },
	goods: { id: 7, name: '商品或服务名称' },
	assetsType: { id: 8, name: '资产类别' },
	assets: { id: 9, name: '资产' },
	number: { id: 10, name: '数量' },
	price: { id: 11, name: '单价' },
	settlement: { id: 12, name: '结算方式' },
	abstract: { id: 13, name: '摘要' },
	bankAccount: { id: 14, name: '银行账户' },
	billNumber: { id: 15, name: '票据号' },
	taxRate: { id: 16, name: '税率' },
	isDeduct: { id: 17, name: '抵扣' },
	byInvestor: { id: 18, name: '被投资人' },
	investmentType: { id: 19, name: '投资类别' },
	investor:{id:20, name:'  投资人'},
	creditor: { id: 21, name: '债权人' },
	obligor: { id: 22, name: '债务人' },
	penaltyType: { id: 23, name: '罚款性质' },
	loanTerm: { id: 24, name: '借款期限' },
	incomeAccount: { id: 25, name: '收款账户' },
	project: { id: 26, name: '项目' },
	invoiceNO: { id: 27, name: '票据编码' },
	billingDate: { id: 28, name: '开票日期' },
	isQualification: { id: 29, name: '认证' },
	certificationMonth: { id: 30, name: '认证月份' },
	deductibleInputTax: { id: 31, name: '可抵扣进项税额' },
	vatTaxpayerSmall:{id:32,name:'票据类型小规模'},
	vatTaxpayerNormal:{id:33,name:'票据类型一般'},
	drawbackPolicy:{id:34,name:'即征即退核算'},

	ext0: { id: 1000, name: '自定义项0' },
	ext1: { id: 1001, name: '自定义项1' },
	ext2: { id: 1002, name: '自定义项2' },
	ext3: { id: 1003, name: '自定义项3' },
	ext4: { id: 1004, name: '自定义项4' },
	ext5: { id: 1005, name: '自定义项5' },
	ext6: { id: 1006, name: '自定义项6' },
	ext7: { id: 1007, name: '自定义项7' },
	ext8: { id: 1008, name: '自定义项8' },
	ext9: { id: 1009, name: '自定义项9' },

	stringExt0: { id: 1020, name: "字符自定义项0" },
	stringExt1: { id: 1021, name: "字符自定义项1" },
	stringExt2: { id: 1022, name: "字符自定义项2" },
	stringExt3: { id: 1023, name: "字符自定义项3" },
	stringExt4: { id: 1024, name: "字符自定义项4" },

	// taxBreaks: { id: 90001, name: '减免税款' },

}

// 税务属性
export const taxPropertyList = [
	{attrCode: "1", attrName: "货物"},
	{attrCode: "2", attrName: "劳务"},
	{attrCode: "3", attrName: "服务"},
	{attrCode: "4", attrName: "无形资产"},
	{attrCode: "7", attrName: "不涉税"},
	{attrCode: "6", attrName: "其他"},
	{attrCode: "5", attrName: "不动产"}
]

export const statusType = {
	normal: { value: 2, label: '未审核' },
	audit: { value: 3, label: '已审核' },
	draft: { value: 1, label: '暂存' },
	reject: { value: 4, label: '驳回' },
}

export const sourceVoucherType = {
	lsz: { id: 109, name: '流水账' },
	yhdzd: { id: 147, name: '银行对账单' },
	gzd_gz_jt: { id: 100001, name: '工资单-工资-计提' },
	gzd_sb_jt: { id: 100002, name: '工资单-社保-计提' },
	gzd_zfgjj_jt: { id: 100003, name: '工资单-住房公积金-计提' },
	gzd_gz_ff: { id: 100004, name: '工资单-工资-发放' },
	gzd_sb_jn: { id: 100005, name: '工资单-社保-缴纳' },
	gzd_zfgjj_jn: { id: 100006, name: '工资单-住房公积金-缴纳' },
	gzd_gs_jn: { id: 100007, name: '工资单-个税-缴纳' },
}
