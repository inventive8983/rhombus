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
import Axios from 'axios';
import { API_BASE_URL } from 'constants/ApiConstant';


const { Option } = Select

const paymentStatusList = ['TXN_SUCCESS', 'TXN_FAILED', 'TXN_PENDING']

const Orders = () => {

	let history = useHistory();

	const [ListData, setListData] = useState()
	const [list, setList] = useState()

	useEffect(() => {
		Axios.get(`${API_BASE_URL}/contact/courses`).then(queries => {
			setListData(queries.data)
			setList(queries.data)
		}).catch(err => {
			console.log(err);
			message.error("Some error occured.")
		})
	}, [])

	const handleShowStatus = value => {
		if(value !== 'All') {
			const key = 'status'
			const data = utils.filterArray(ListData, key, value)
			setList(data)
		} else {
			setList(ListData)
		}
	}

	const tableColumns = [
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
			title: 'Name',
			dataIndex: 'name',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Phone Number',
			dataIndex: 'mobile',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'mobile')
		},
		{
			title: 'Course',
			dataIndex: 'course',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'course')
		},
		{
			title: 'City',
			dataIndex: 'city',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'city')
		},
	];
	
	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : ListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
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
				/>
			</div>
		</Card>
	)
}

export default Orders
