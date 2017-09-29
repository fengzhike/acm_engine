export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className:'interface-card',
		children: [{
			name:'interfaceHeader',
			component:'::div',
			children:[{
				name:'headerItem0',
				component:'::div',
				children:['票据类型：',{
					name:'invoiceType',
					component:'Select',
					defaultValue:'{{$getInvoiceDefaultValue()}}',
					style:{ width: 120 },
					onChange:'{{$invoiceTypeChange}}',
					children:'{{$getInvoiceOptions()}}'
				}]
			},{
				name:'headerItem1',
				component:'::div',
				children:['纳税人身份：',{
					name:'vatTaxpayer',
					component:'Checkbox.Group',
					options:['一般纳税人','小规模纳税人'],
					defaultValue:'{{$getDefaultVat()}}',
					onChange:'{{$vatTaxpayerChange}}'
				}]
			},{
				name:'headerItem2',
				component:'::div',
				children:['支持行业：',{
					name:'industryIdList',
					component:'Checkbox.Group',
					options:['工业','商贸','服务','信息技术'],
					defaultValue:'{{$getDefaultIndustry(data.form.industryIdList)}}',
					onChange:'{{$industryChange}}'
				}]
			}]
		},{
			name:'interfaceBody',
			component:'::div',
			children:[{
				name:'tabs',
				component:'Tabs',
				defaultActiveKey:'0',
				onChange:'{{$tabsChange}}',
				children: [{
					name:'amountAndtax',
					tab:"金额/税率",
					component:'Tabs.TabPane',
					key:"0",
					children:getAmountAndtaxChild()
				},{
					name:'deductible',
					tab:"认证/抵扣",
					component:'Tabs.TabPane',
					key:"1",
					children:getDeductibleChild()
				},{
					name:'departAndEmployee',
					tab:"部门/人员",
					component:'Tabs.TabPane',
					key:"2",
					children:getDepartAndEmployeeChild()
				},{
					name:'goodsAndAmount',
					tab:"商品/数量",
					component:'Tabs.TabPane',
					key:"3",
					children:getGoodsAndAmountChild()
				},{
					name:'bankAccount',
					tab:"银行账号",
					component:'Tabs.TabPane',
					key:"4",
					children:getBankAccountChild()
				},{
					name:'auxInfo',
					tab:"辅助信息",
					component:'Tabs.TabPane',
					key:"5",
					children:getAuxInfoChild()
				},{
					name:'ext',
					tab:"数值扩展",
					component:'Tabs.TabPane',
					key:"6",
					children:getExtChild()
				},{
					name:'stringExt',
					tab:"字符扩展",
					component:'Tabs.TabPane',
					key:"7",
					children:getStringExtChild()
				}]
			}]
		}]
	}
}

function getAmountAndtaxChild(){
	return {
		name:'amountAndtax',
		component:'::div',
		children:[{
			name:'amount',
			component:'::div',
			children:[{
				name:'amountTitle',
				component:'::span',
				className:'settingLabel',
				children:'金额:'
			},{
				name:'amountRadio',
				component:'Radio.Group',
				value:'{{data.form.noTaxAmount}}',
				onChange:'{{$detailRadioChange("noTaxAmount")}}',
				children:[{
					name:'amountRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'amountRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'amountRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'tax',
			component:'::div',
			children:[{
				name:'taxTitle',
				component:'::span',
				className:'settingLabel',
				children:'税额:'
			},{
				name:'taxRadio',
				component:'Radio.Group',
				value:'{{data.form.tax}}',
				onChange:'{{$detailRadioChange("tax")}}',
				children:[{
					name:'taxRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'taxRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'taxRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'taxAndAmount',
			component:'::div',
			children:[{
				name:'taxAndAmountTitle',
				component:'::span',
				className:'settingLabel',
				children:'价税合计:'
			},{
				name:'taxAndAmountRadio',
				component:'Radio.Group',
				value:'{{data.form.amount}}',
				onChange:'{{$detailRadioChange("amount")}}',
				children:[{
					name:'taxAndAmountRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'taxAndAmountRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'taxAndAmountRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'deductibleAmount',
			component:'::div',
			children:[{
				name:'deductibleTitle',
				component:'::span',
				className:'settingLabel',
				children:'可抵扣进项税额:'
			},{
				name:'deductibleAmountRadio',
				component:'Radio.Group',
				value:'{{data.form.deductibleInputTax}}',
				onChange:'{{$detailRadioChange("deductibleInputTax")}}',
				children:[{
					name:'deductibleAmountRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'deductibleAmountRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'deductibleAmountRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'taxRate',
			component:'::div',
			children:[{
				name:'taxRateTitle',
				component:'::span',
				className:'settingLabel',
				children:'税率:'
			},{
				name:'taxRate',
				component:'Radio.Group',

				value:'{{data.form.taxRate}}',
				onChange:'{{$detailRadioChange("taxRate")}}',
				children:[{
					name:'taxRate0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'taxRate1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'taxRate2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'taxNormal',
			component:'::div',
			children:['一般纳税人:(多选)',{
				component:'Checkbox.Group',
				disabled:"{{!data.form.vatTaxpayerNormal}}",
				options:'{{$getTaxRateOption()}}',
				defaultValue:'{{$getDefaultRate("normalRate")}}',
				onChange:'{{$taxRateChange("normalRate")}}'
			}]
		},{
			name:'taxSmall',
			component:'::div',
			children:['小规模:(多选)',{
				component:'Checkbox.Group',
				disabled:"{{!data.form.vatTaxpayerSmall}}",
				options:'{{$getTaxRateOption("smallRate")}}',
				defaultValue:'{{$getDefaultRate("smallRate")}}',
				onChange:'{{$taxRateChange("smallRate")}}'
			}]
		}]
	}
}
function getDeductibleChild(){
	return {
		name:'deductibleAndCertification',
		component:'::div',
		children:[{
			name:'certification',
			component:'::div',
			children:[{
				name:'certificationTitle',
				component:'::span',
				className:'settingLabel',
				children:'认证:'
			},{
				name:'certificationRadio',
				component:'Radio.Group',

				value:'{{data.form.isQualification}}',
				onChange:'{{$detailRadioChange("isQualification")}}',
				children:[{
					name:'certificationRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'certificationRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'certificationRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'certificationMonth',
			component:'::div',
			children:[{
				name:'certificationMonthTitle',
				component:'::span',
				className:'settingLabel',
				children:'认证月份:'
			},{
				name:'certificationMonthRadio',
				component:'Radio.Group',

				value:'{{data.form.certificationMonth}}',
				onChange:'{{$detailRadioChange("certificationMonth")}}',
				children:[{
					name:'certificationMonthRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'certificationMonthRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'certificationMonthRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'deductible',
			component:'::div',
			children:[{
				name:'deductibleTitle',
				component:'::span',
				className:'settingLabel',
				children:'抵扣:'
			},{
				name:'deductibleRadio',
				component:'Radio.Group',

				value:'{{data.form.isDeduct}}',
				onChange:'{{$detailRadioChange("isDeduct")}}',
				children:[{
					name:'deductibleRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'deductibleRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'deductibleRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'invoiceDate',
			component:'::div',
			children:[{
				name:'invoiceDateTitle',
				component:'::span',
				className:'settingLabel',
				children:'开票日期:'
			},{
				name:'invoiceDateRadio',
				component:'Radio.Group',

				value:'{{data.form.billingDate}}',
				onChange:'{{$detailRadioChange("billingDate")}}',
				children:[{
					name:'invoiceDateRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'invoiceDateRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'invoiceDateRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'imAndRefund',
			component:'::div',
			children:[{
				name:'imAndRefundTitle',
				component:'::span',
				className:'settingLabel',
				children:'即征即退核算:'
			},{
				name:'imAndRefundRadio',
				component:'Radio.Group',

				value:'{{data.form.drawbackPolicy}}',
				onChange:'{{$detailRadioChange("drawbackPolicy")}}',
				children:[{
					name:'imAndRefundRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'imAndRefundRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'imAndRefundRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		}]
	}
}
function getDepartAndEmployeeChild(){
	return {
		name:'departAndEmployee',
		component:'::div',
		children:[{
			name:'department',
			component:'::div',
			children:[{
				name:'departmentTitle',
				component:'::span',
				className:'settingLabel',
				children:'部门:'
			},{
				name:'departmentRadio',
				component:'Radio.Group',

				value:'{{data.form.department}}',
				onChange:'{{$detailRadioChange("department")}}',
				children:[{
					name:'departmentRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'departmentRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'departmentRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'employee',
			component:'::div',
			children:[{
				name:'employeeTitle',
				component:'::span',
				className:'settingLabel',
				children:'人员:'
			},{
				name:'employeeMonthRadio',
				component:'Radio.Group',

				value:'{{data.form.employee}}',
				onChange:'{{$detailRadioChange("employee")}}',
				children:[{
					name:'employeeMonthRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'employeeMonthRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'employeeMonthRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'customer',
			component:'::div',
			children:[{
				name:'customerTitle',
				component:'::span',
				className:'settingLabel',
				children:'客户:'
			},{
				name:'customerRadio',
				component:'Radio.Group',

				value:'{{data.form.customer}}',
				onChange:'{{$detailRadioChange("customer")}}',
				children:[{
					name:'customerRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'customerRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'customerRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'investor',
			component:'::div',
			children:[{
				name:'investorTitle',
				component:'::span',
				className:'settingLabel',
				children:'投资人:'
			},{
				name:'investorRadio',
				component:'Radio.Group',

				value:'{{data.form.investor}}',
				onChange:'{{$detailRadioChange("investor")}}',
				children:[{
					name:'investorRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'investorRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'investorRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'byInvestor',
			component:'::div',
			children:[{
				name:'investorTitle',
				component:'::span',
				className:'settingLabel',
				children:'被投资人:'
			},{
				name:'byInvestorRadio',
				component:'Radio.Group',

				value:'{{data.form.byInvestor}}',
				onChange:'{{$detailRadioChange("byInvestor")}}',
				children:[{
					name:'investorRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'investorRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'investorRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'creditor',
			component:'::div',
			children:[{
				name:'creditorTitle',
				component:'::span',
				className:'settingLabel',
				children:'债权人:'
			},{
				name:'creditorRadio',
				component:'Radio.Group',

				value:'{{data.form.creditor}}',
				onChange:'{{$detailRadioChange("creditor")}}',
				children:[{
					name:'creditorRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'creditorRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'creditorRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'obligor',
			component:'::div',
			children:[{
				name:'obligorTitle',
				component:'::span',
				className:'settingLabel',
				children:'债务人:'
			},{
				name:'obligorRadio',
				component:'Radio.Group',

				value:'{{data.form.obligor}}',
				onChange:'{{$detailRadioChange("obligor")}}',
				children:[{
					name:'obligorRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'obligorRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'obligorRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		}]
	}
}
function getGoodsAndAmountChild(){
	return {
		name:'goodsAndAmount',
		component:'::div',
		children:[{
			name:'goods',
			component:'::div',
			children:[{
				name:'goodsTitle',
				component:'::span',
				className:'settingLabel',
				children:'商品或服务名称:'
			},{
				name:'goodsRadio',
				component:'Radio.Group',

				value:'{{data.form.goods}}',
				onChange:'{{$detailRadioChange("goods")}}',
				children:[{
					name:'goodsRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'goodsRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'goodsRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'assetsType',
			component:'::div',
			children:[{
				name:'assetsTypeTitle',
				component:'::span',
				className:'settingLabel',
				children:'资产分类:'
			},{
				name:'assetsTypeMonthRadio',
				component:'Radio.Group',

				value:'{{data.form.assetsType}}',
				onChange:'{{$detailRadioChange("assetsType")}}',
				children:[{
					name:'assetsTypeMonthRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'assetsTypeMonthRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'assetsTypeMonthRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'assets',
			component:'::div',
			children:[{
				name:'assetsTitle',
				component:'::span',
				className:'settingLabel',
				children:'资产:'
			},{
				name:'assetsRadio',
				component:'Radio.Group',

				value:'{{data.form.assets}}',
				onChange:'{{$detailRadioChange("assets")}}',
				children:[{
					name:'assetsRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'assetsRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'assetsRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'quantity',
			component:'::div',
			children:[{
				name:'quantityTitle',
				component:'::span',
				className:'settingLabel',
				children:'数量:'
			},{
				name:'quantityRadio',
				component:'Radio.Group',

				value:'{{data.form.number}}',
				onChange:'{{$detailRadioChange("number")}}',
				children:[{
					name:'quantityRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'quantityRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'quantityRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'price',
			component:'::div',
			children:[{
				name:'priceTitle',
				component:'::span',
				className:'settingLabel',
				children:'单价:'
			},{
				name:'priceRadio',
				component:'Radio.Group',

				value:'{{data.form.price}}',
				onChange:'{{$detailRadioChange("price")}}',
				children:[{
					name:'priceRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'priceRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'priceRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		}]
	}
}
function getBankAccountChild(){
	return {
		name:'bankAccount',
		component:'::div',
		children:[{
			name:'bankAccountSet',
			component:'::div',
			children:[{
				name:'bankAccountTitle',
				component:'::span',
				className:'settingLabel',
				children:'账户(银行账号):'
			},{
				name:'bankAccountRadio',
				component:'Radio.Group',

				value:'{{data.form.bankAccount}}',
				onChange:'{{$detailRadioChange("bankAccount")}}',
				children:[{
					name:'bankAccountRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'bankAccountRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'bankAccountRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'bankAccountCheck',
			component:'::div',
			children:['结算方式：',{
				name:'normalTaxer',
				component:'Checkbox.Group',
				options:'{{$getSettlementTypeList()}}',
				defaultValue:'{{$getDefaultSettlement()}}',
				onChange:'{{$settlementTypeChange}}'
			}]
		},{
			name:'othBankAccountSet',
			component:'::div',
			children:[{
				name:'othBankAccountSetTitle',
				component:'::span',
				className:'settingLabel',
				children:'对方账户(用于转账):'
			},{
				name:'othBankAccountSetRadio',
				component:'Radio.Group',

				value:'{{data.form.incomeAccount}}',
				onChange:'{{$detailRadioChange("incomeAccount")}}',
				children:[{
					name:'othBankAccountSetRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'othBankAccountSetRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'othBankAccountSetRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		}]
	}
}
function getAuxInfoChild(){
	return {
		name:'auxInfo',
		component:'::div',
		children:[{
			name:'invoiceCode',
			component:'::div',
			children:[{
				name:'invoiceCodeTitle',
				component:'::span',
				className:'settingLabel',
				children:'票据编码:'
			},{
				name:'invoiceCodeRadio',
				component:'Radio.Group',

				value:'{{data.form.invoiceNO}}',
				onChange:'{{$detailRadioChange("invoiceNO")}}',
				children:[{
					name:'invoiceCodeRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'invoiceCodeRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'invoiceCodeRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'billNumber',
			component:'::div',
			children:[{
				name:'billNumberTitle',
				component:'::span',
				className:'settingLabel',
				children:'票据号:'
			},{
				name:'billNumberRadio',
				component:'Radio.Group',

				value:'{{data.form.billNumber}}',
				onChange:'{{$detailRadioChange("billNumber")}}',
				children:[{
					name:'billNumberRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'billNumberRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'billNumberRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'penaltyType',
			component:'::div',
			children:[{
				name:'penaltyTypeTitle',
				component:'::span',
				className:'settingLabel',
				children:'罚款性质:'
			},{
				name:'penaltyTypeMonthRadio',
				component:'Radio.Group',

				value:'{{data.form.penaltyType}}',
				onChange:'{{$detailRadioChange("penaltyType")}}',
				children:[{
					name:'penaltyTypeMonthRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'penaltyTypeMonthRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'penaltyTypeMonthRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'loanTerm',
			component:'::div',
			children:[{
				name:'loanTermTitle',
				component:'::span',
				className:'settingLabel',
				children:'借款期限:'
			},{
				name:'loanTermRadio',
				component:'Radio.Group',

				value:'{{data.form.loanTerm}}',
				onChange:'{{$detailRadioChange("loanTerm")}}',
				children:[{
					name:'loanTermRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'loanTermRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'loanTermRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'abstract',
			component:'::div',
			children:[{
				name:'abstractTitle',
				component:'::span',
				className:'settingLabel',
				children:'摘要:'
			},{
				name:'abstractRadio',
				component:'Radio.Group',

				value:'{{data.form.abstract}}',
				onChange:'{{$detailRadioChange("abstract")}}',
				children:[{
					name:'abstractRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'abstractRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'abstractRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		},{
			name:'project',
			component:'::div',
			children:[{
				name:'projectTitle',
				component:'::span',
				className:'settingLabel',
				children:'项目:'
			},{
				name:'projectRadio',
				component:'Radio.Group',

				value:'{{data.form.project}}',
				onChange:'{{$detailRadioChange("project")}}',
				children:[{
					name:'projectRadio0',
					component:'Radio',
					children:'必填',
					value:2
				},{
					name:'projectRadio1',
					component:'Radio',
					children:'选填',
					value:1
				},{
					name:'projectRadio2',
					component:'Radio',
					children:'不显示',
					value:0
				}]
			}]
		}]
	}
}
let extChild = [],
	stringExt = []

for(let i=0 ; i< 10;i++){
	extChild.push({
		name:'ext'+i,
		component:'::div',
		children:[{
			name:'ext'+i+'Title',
			component:'::span',
			className:'settingLabel',
			children:'数值扩展'+i+':'
		},{
			name:'ext'+i+'Radio',
			component:'Radio.Group',

			value:'{{data.form.ext'+i+'}}',
			onChange:'{{$detailRadioChange("ext'+i+'")}}',
			children:[{
				name:'ext'+0+'Radio0',
				component:'Radio',
				children:'必填',
				value:2
			},{
				name:'ext'+0+'Radio1',
				component:'Radio',
				children:'选填',
				value:1
			},{
				name:'ext'+0+'Radio2',
				component:'Radio',
				children:'不显示',
				value:0
			}]
		},{
			name:'showTitle'+i,
			component:'::div',
			className:'showTitle',
			children:[{
				name:'title'+i,
				component:'::span',
				children:'显示标题:'
			},{
				name:'edit'+i,
				onChange:'{{$extTittleChange("ext'+i+'Title")}}',
				component:'Input',
				value:'{{data.form.ext'+i+'Title}}',
				width:100
			}]
		}]
	})
}
for(let i=0; i<5;i++){
	stringExt.push({
		name:'stringExt'+i,
		component:'::div',
		children:[{
			name:'stringExt'+i+'Title',
			component:'::span',
			className:'settingLabel',
			children:'字符扩展'+i+':'
		},{
			name:'stringExt'+i+'Radio',
			component:'Radio.Group',

			value:'{{data.form.stringExt'+i+'}}',
			onChange:'{{$detailRadioChange("stringExt'+i+'")}}',
			children:[{
				name:'stringExt'+0+'Radio0',
				component:'Radio',
				children:'必填',
				value:2
			},{
				name:'stringExt'+0+'Radio1',
				component:'Radio',
				children:'选填',
				value:1
			},{
				name:'stringExt'+0+'Radio2',
				component:'Radio',
				children:'不显示',
				value:0
			}]
		},{
			name:'stringShowTitle'+i,
			component:'::div',
			className:'showTitle',
			children:[{
				name:'stringTitle'+i,
				component:'::span',
				children:'显示标题:'
			},{
				name:'stringEdit'+i,
				onChange:'{{$extTittleChange("stringExt'+i+'Title")}}',
				component:'Input',
				value:'{{data.form.stringExt'+i+'Title}}',
				width:100
			}]
		}]
	})
}
function getExtChild(){
	return {
		name:'ext',
		component:'::div',
		children:extChild
	}
}
function getStringExtChild(){
	return {
		name:'stringExt',
		component:'::div',
		children:stringExt
	}
}

export function getInitState() {
	return {
		data: {
			dataSources:[],
			other:{},
			form:{
				// invoiceType: 200000000000050,
				// bankAccount:2,
				// settlement:[1],
				// stringExt:'',
				// noTaxAmount:2,
			    // "stringExt0": 0,
			    // "extTitle7": "",
			    // "stringExt1": 0,
			    // "extTitle8": "",
			    // "abstract": 0,
			    // "stringExt2": 0,
			    // "extTitle9": "",
			    // "noTaxAmount": 0,
			    // "stringExt3": 0,
			    // "penaltyType": 0,
			    // "assets": 0,
			    // "incomeAccount": 0,
			    // "stringExt4": 0,
			    // "isQualification": 0,
			    // "certificationMonth": 0,
			    // "stringExtTitle0": "",
			    // "billingDate": 0,
			    // "stringExtTitle1": "",
			    // "price": 0,
			    // "number": 0,
			    // "stringExtTitle2": "",
			    // "stringExtTitle3": "",
			    // "taxRate": 0,
			    // "tax": 0,
			    // "stringExtTitle4": "",
			    // "isDeduct": 0,
			    // "invoiceNO": 0,
			    // "employee": 0,
			    // "ext0": 0,
			    // "ext1": 0,
			    // "ext2": 0,
			    // "ext3": 0,
			    // "department": 0,
			    // "ext4": 0,
			    // "ext5": 0,
			    // "vatTaxpayerSmall": 0,
			    // "ext6": 0,
			    // "deductibleInputTax": 0,
			    // "ext7": 0,
			    // "goods": 0,
			    // "ext8": 0,
				// billNumber:0,
			    // "industryIdList": [1],
			    // "amount": 0,
			    // "investor": 0,
				// byInvestor:0,
			    // "ext9": 0,
			    // "extTitle0": "",
			    // "project": 0,
			    // "extTitle1": "",
			    // "vatTaxpayerNormal": 1,
			    // "obligor": 0,
			    // "extTitle2": "",
			    // "loanTerm": 0,
			    // "extTitle3": "",
			    // "creditor": 0,
			    // "drawbackPolicy": 0,
			    // "assetsType": 0,
			    // "extTitle4": "",
			    // "extTitle5": "",
			    // "customer": 0,
			    // "extTitle6": ""
			}
		}
	}
}
