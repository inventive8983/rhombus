/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Tag, message, Modal, Typography } from 'antd';
import { EyeOutlined, FileExcelOutlined, SearchOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import utils from 'utils'
import blogAPI from '../../../services/blogs'
import { useHistory } from "react-router-dom";


const Blogs = () => {

	let history = useHistory();

	const [BlogListData, setListData] = useState()
	const [blogs, setBlogs] = useState()
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const [modal, openModal] = useState(false)
    const [title, setTitle] = useState('')
    const [cover, setCover] = useState('')
    const [err, setError] = useState()

	useEffect(() => {
		blogAPI.getBlogs().then(list => {
			setBlogs(list)
			setListData(list)
		}).catch(err => {
			message.error("Unable to load data. Maybe server not connected.")
		})
	}, [])


	const viewBlog = (id) => {
		history.push(`/app/blogs/view/${id}`)
	}

    const publishBlog = (id, status) => {
        blogAPI.publishBlog({id}, {status}).then(res => {
            
            var data = BlogListData.map(blog => {
                if(blog._id === id) blog.published = status
                return blog
            })
            setBlogs(data)
            setListData(data)

        }).catch(err => {
            console.log(err);
            message.error("Some error occured")
        })
    }

    const deleteBlog = (id) => {
        blogAPI.deleteBlog({id}).then(response => {
            var data = blogs.filter(blog => blog._id !== id)
            setBlogs(data)
            setListData(data)
            message.success("Deleted")
        }).catch(err => {
            console.log(err);
            message.error("Some error occured")
        })
    }

    const addBlog = () => {
        if(title === '' || cover === ''){
            setError("Please add required details.")
            return
        }
        setError('')
        blogAPI.addBlog({title, cover}).then(blog => {
            var data = [...BlogListData, blog]
            setListData(data)
            setBlogs(data)
            openModal(false)
        }).catch(err => {
            message.error("Some error occured")
        })
    }
	
	const tableColumns = [
		{
			title: 'Title',
			dataIndex: 'title',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'title')
		},
		{
			title: 'Created On',
			dataIndex: 'createdOn',
			render: (_, record) => {
				var d = new Date(record.createdOn)
				return (
					<span>{d.getUTCDate() + 1}/{d.getUTCMonth() + 1}/{d.getUTCFullYear()}</span>
			)},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'date')
		},
		{
			title: 'Status',
			dataIndex: 'published',
			render: (_, record) => (
				<><Tag color={record.published ? 'green' : 'red'}>{record.published ? "Published" : "Hidden"}</Tag></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'published')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
                <>
				<Button className="mr-2" onClick={() => viewBlog(elm._id)}>
					<EyeOutlined></EyeOutlined> View Details
				</Button>
                <Button type="primary" className={"border-0 mr-2 " + (elm.published ? "bg-danger" : "bg-success")} onClick={() => publishBlog(elm._id, !elm.published)}>
                    {elm.published ? "Hide" : "Publish"}
                </Button>
                <Button className="mr-2" type="ghost" onClick={() => deleteBlog(elm._id)}>
                    <DeleteOutlined />
                </Button>
				</>	
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
		const searchArray = e.currentTarget.value? blogs : BlogListData
		const data = utils.wildCardSearch(searchArray, value)
		setBlogs(data)
		setSelectedRowKeys([])
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
					<Button type="primary" icon={<PlusCircleOutlined />} onClick={() => {openModal(true)}} block>Add Blog</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={blogs} 
					rowKey='id' 
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						type: 'checkbox',
						preserveSelectedRowKeys: false,
						...rowSelection,
					}}
				/>
			</div>
            <Modal
                title="Add Course"
                visible={modal}
                onOk={addBlog}
                onCancel={() => {openModal(false)}}
            >
            {err && <Typography.Paragraph className="text-danger">! {err}</Typography.Paragraph>}
            <Input className="my-2" value={title} placeholder="Enter Title" onChange={(e) => {setTitle(e.target.value)}}></Input>
            <Input className="my-2" value={cover} placeholder="Paste Image Url" onChange={(e) => {setCover(e.target.value)}}></Input>
        </Modal>
		</Card>
	)
}

export default Blogs
