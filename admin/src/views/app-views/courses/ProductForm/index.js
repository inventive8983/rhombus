import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import courseAPI from '../../../../services/courses'
import { Tabs, Form, Button, message, Typography, Card, Input, Col, Row } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import VariationField from './VariationField'
import AddOn from './AddOn'
import LessonsField from './LessonsField'
import { useHistory } from "react-router-dom";
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';


const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'


const ProductForm = props => {

	let history = useHistory()

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [sections, setSections] = useState(["Introduction"])
	const [uploadedImg, setImage] = useState('')
	const [status, setStatus] = useState('Unpublished')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	

	useEffect(() => {
    	if(mode === EDIT) {
			const { id } = param
			courseAPI.getCourse({id})
			.then(values => {
				setImage(values.cover)
				setStatus(values.status)
				var sec = []
				values.sections.forEach((section, index) => {
					sec.push(section.name)
					values[`lessongroup-${index + 1}`] = section.lessons
				});
				setSections(sec)
				form.setFieldsValue(values);	
			})
			.catch(error => {
				console.log(error);
			})
		}
	  }, [form, mode, param, props]);
	  
	const editSection = (str, index) => {
		var sec = sections
		sec[index] = str
		setSections(sec)
	}

	const handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			setImage('')
			setUploadLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			
			getBase64(info.file.originFileObj, imgurl => {
				setImage(imgurl)
				setUploadLoading(false)
			})
			
		}
	};

	const publish = () => {
		courseAPI.changeStatus({id: param.id, status: status}).then((res) => {
			if(res.result.nModified === 1){
				setStatus(res.status)
				if(res.status === "Published") message.success(`Published Successfully.`)
				else message.info(`Course is now hidden.`)
			}
		}).catch(err => {
			console.log(err);
			message.error("Some error occured")
		})
	}

	const back = () => {
		history.push('/app/courses')
	}

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			
			var id = null
			if(param) id = param.id

			courseAPI.addCourse({
				id,
				data: values,
				coverImg: uploadedImg,
				sections: sections,
			})
			  .then(function (response) {
				console.log(response);
				setSubmitLoading(false)
				if(mode === ADD) {
					message.success(`Created ${values.name} to product list`);
					history.push(`/app/courses/edit-course/${response._id}`)
				}
				if(mode === EDIT) {
					message.success(`Saved Successfully`);
				}
			  })
			  .catch(function (error) {
				console.log(error);
				message.error('Oops! Some error occured!');
				setSubmitLoading(false)
			  });
			
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
				
			>
				<PageHeaderAlt className="bg-white border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD'? 'Add New Course' : `Edit Course`} </h2>
							<div className="mb-3">
								<Button className="mr-2" onClick={() => back()}>Discard</Button>
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
								{mode === 'EDIT' && <Button type="primary" onClick={() => publish()} className={status === 'Unpublished' ? "mx-2 bg-success border-0" : "mx-2 bg-danger border-0" }>{status === 'Unpublished' ? "Publish" : "Hide"}</Button>}
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab="General" key="1">
							<GeneralField 
								uploadedImg={uploadedImg} 
								uploadLoading={uploadLoading} 
								handleUploadChange={handleUploadChange}
							/>
						</TabPane>
						<TabPane tab="Variants" key="2">
							<VariationField />
						</TabPane>
						<TabPane tab="Add Ons" key="3">
							<AddOn />
						</TabPane>
						<TabPane tab="Lessons" key="4">
							<Row justify="space-between">
								<Col className="p-3">
									<Typography.Title level={2} strong>Add Lessons</Typography.Title>
									<Typography.Paragraph>You can add lessons and categorize them in different sections.</Typography.Paragraph>
								</Col>
								<Col className="py-4 px-3">
									<Button type="dashed" onClick={() => {setSections([...sections, "New Section"])}}>
										<PlusOutlined /> Add Section
									</Button>
								</Col>
							</Row>
							{sections.map((section, index) => 
								<LessonsField key={index} sectionName = {section} editName = { (str) => {editSection(str, index)}} index={index} />
							)}
						</TabPane>
						<TabPane tab="Tests & Books" key="5">
							{/* <ShippingField /> */}
							<Typography.Title className="text-muted text-center p-5" level={2}>
								<CloudUploadOutlined style={{fontSize:"48px"}} /><br/>
								Coming Soon
								</Typography.Title>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}

export default ProductForm
