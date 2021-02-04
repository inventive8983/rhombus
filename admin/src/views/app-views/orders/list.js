/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Tag, message } from 'antd';
import { EyeOutlined, FileExcelOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import moment from 'moment'; 
import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
import utils from 'utils'
import { List } from 'react-virtualized';
import orderAPI from '../../../services/orders'
import { useHistory } from "react-router-dom";


const { Option } = Select

const getShippingStatus = status => {
	if(status === 'TXN_SUCCESS') {
		return 'cyan'
	}
	if(status === 'TXN_FAILURE') {
		return 'red'
	}
	if(status === 'TXN_PENDING') {
		return 'gold'
	} 
	return ''
}

const paymentStatusList = ['TXN_SUCCESS', 'TXN_FAILED', 'TXN_PENDING']

const Orders = () => {

	let history = useHistory();

	const [OrderListData, setListData] = useState()
	const [list, setList] = useState(OrderListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	useEffect(() => {
		orderAPI.getOrders().then(list => {
			setList(list)
			setListData(list)
		}).catch(err => {
			message.error("Unable to load data. Maybe server not connected.")
		})
	}, [])

	const handleShowStatus = value => {
		if(value !== 'All') {
			const key = 'status'
			const data = utils.filterArray(OrderListData, key, value)
			setList(data)
		} else {
			setList(OrderListData)
		}
	}

	const viewInvoice = (id) => {
		history.push(`/app/orders/invoice/${id}`)
	}
	
	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'orderId'
		},
		{
			title: 'Student',
			dataIndex: 'name',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Date',
			dataIndex: 'date',
			render: (_, record) => {
				var d = new Date(record.date)
				return (
					<span>{d.getUTCDate() + 1}/{d.getUTCMonth() + 1}/{d.getUTCFullYear()}</span>
			)},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'date')
		},
		{
			title: 'Order status',
			dataIndex: 'status',
			render: (_, record) => (
				<><Tag color={getShippingStatus(record.status)}>{record.status}</Tag></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
		},
		{
			title: 'Contact',
			dataIndex: 'phone',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
		},
		{
			title: 'Total',
			dataIndex: 'totalAmount',
			render: (_, record) => (
				<span className="font-weight-semibold">
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(record.totalAmount * 100) / 100).toFixed(2)} 
						prefix={'Rs'} 
						thousandSeparator={true} 
					/>
				</span>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<Button onClick={() => viewInvoice(elm._id)}>
					<EyeOutlined></EyeOutlined> View Details
				</Button>
					
			)
		}
	];
	
	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : OrderListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowStatus} 
							placeholder="Status"
						>
							<Option value="All">All payment </Option>
							{paymentStatusList.map(elm => <Option key={elm} value={elm}>{elm}</Option>)}
						</Select>
					</div>
				</Flex>
				<div>
					{/* <Button type="primary" icon={<FileExcelOutlined />} block>Export All</Button> */}
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						type: 'checkbox',
						preserveSelectedRowKeys: false,
						...rowSelection,
					}}
				/>
			</div>
		</Card>
	)
}

export default Orders
