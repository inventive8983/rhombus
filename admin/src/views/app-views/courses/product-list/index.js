import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, Button, Typography, Menu, message } from 'antd';
import courseAPI from '../../../../services/courses'
import { EyeOutlined, DeleteOutlined,RocketOutlined, SearchOutlined, PlusCircleOutlined, CopyOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils'
import AnchorLink from 'antd/lib/anchor/AnchorLink';

const { Option } = Select

const categories = ['CA', 'UGC-NET', 'MBA', 'Junior']

const ProductList = () => {

	let history = useHistory();

	const [ProductListData, setProductListData] = useState([])
	const [list, setList] = useState(ProductListData)

	useEffect(() => {
		courseAPI.getAllCourses().then(data => {
			setProductListData(data)
			setList(data)
		}).catch(err => {
			message.error("Some error occured")
		})
	}, [])
	

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => publish(row)}>
				<Flex alignItems="center">
					<RocketOutlined />
					<span className="ml-2">Publish/Hide</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => duplicateCourse(row)}>
				<Flex alignItems="center">
					<CopyOutlined />
					<span className="ml-2">Duplicate</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">Delete</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	
	const addProduct = () => {
		history.push(`/app/courses/add-course`)
	}
	
	const viewDetails = row => {
		history.push(`/app/courses/edit-course/${row._id}`)
	}

	const duplicateCourse = row => {
		courseAPI.duplicate({id: row._id}).then(course => {
			message.success("Created!")
			var data = [...list, course]
			setProductListData([...ProductListData, course])
			setList(data)
		})
		.catch(err => {
			message.error("Bad Request")
		})
	}
	
	const deleteRow = row => {
		courseAPI.deleteCourse({id: row._id}).then(res => {
			var coursesData = list
			coursesData = utils.deleteArrayRow(coursesData, '_id', row._id)
			setList(coursesData)
			setProductListData(coursesData)
			message.success("Deleted")

		}).catch(err => {
			console.log(err);
			message.error("Some error occured")
		})
	}

	const publish = row => {
		courseAPI.changeStatus({id: row._id, status: row.status}).then((res) => {
			if(res.result.nModified === 1){
				let data = ProductListData
				data = data.map(course => {
					if(course._id === row._id){
						course.status = res.status
					}
					return course
				})
				setList(data)
				setProductListData(data)
				if(res.status === "Published") message.success(`${row.name} Published Successfully.`)
				else message.info(`${row.name} is now hidden.`)
			}
		}).catch(err => {
			console.log(err);
			message.error("Some error occured")
		})
	}	

	const tableColumns = [
		{
			title: 'Course',
			dataIndex: 'name',
			render: (_, elm) => <a onClick={() => viewDetails(elm)} className="text-dark" style={{textDecoration: "underline"}} type="text">{elm.name}</a>,
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Category',
			dataIndex: 'category',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'category')
		},
		{
			title: 'Starting Price',
			dataIndex: 'variants',
			render: (_, elm) => (
				<div>
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(elm.variants[0].discountPrice * 100) / 100).toFixed(2)} 
						prefix={'Rs'} 
						thousandSeparator={true} 
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'currentPrice')
		},
		{
			title: 'Duration',
			dataIndex: 'duration',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'duration'),
			render: duration => Math.round(duration / 60) + " hrs " + Math.round(duration % 60) + " mins"
		},
		{
			title: 'Language',
			dataIndex: 'videoLanguage',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'videoLanguage'),
			render: videoLanguage => {
				var languages = ""
				videoLanguage.forEach((lang, index) => {
					if(index === (videoLanguage.length - 1)) languages += lang + " "
					else if(index === (videoLanguage.length - 2)) languages += lang + " and "
					else languages += lang + ", "
				})
				return languages
			}
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: status => (
				<Typography.Text strong className={status === "Published" ? "text-uppercase text-success" : "text-uppercase text-danger" }>{status}</Typography.Text>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
		},
		{
			title: '',
			dataIndex: '_id',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
				</div>
			)
		}
	];

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : ProductListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	const handleShowCategory = value => {
		if(value !== 'All') {
			const key = 'category'
			const data = utils.filterArray(ProductListData, key, value)
			setList(data)
		} else {
			setList(ProductListData)
		}
	}

	return (
		<>
		<Flex className="p-3" alignItems="center" justifyContent="between">
			<Typography.Title strong>Courses</Typography.Title>
			<div className="ml-2">
				<Button onClick={addProduct} type="primary" icon={<PlusCircleOutlined />} block>Add Course</Button>
			</div>
		</Flex>
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
							onChange={handleShowCategory} 
							placeholder="Category"
						>
							<Option value="All">All</Option>
							{
								categories.map(elm => (
									<Option key={elm} value={elm}>{elm}</Option>
								))
							}
						</Select>
					</div>
					
				</Flex>
				
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='_id' 
					// rowSelection={{
					// 	selectedRowKeys: selectedRowKeys,
					// 	type: 'checkbox',
					// 	preserveSelectedRowKeys: false,
					// 	...rowSelection,
					// }}
				/>
			</div>
		</Card>
		</>
	)
}

export default ProductList
