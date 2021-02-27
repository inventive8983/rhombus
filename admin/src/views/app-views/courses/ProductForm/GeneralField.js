import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, Button,message, Select } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { LoadingOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {API_BASE_URL} from '../../../../constants/ApiConstant'
import CourseDescription from '../../../../components/util-components/CourseDescription/index'
const { Dragger } = Upload;
const { Option } = Select;

const rules = {
	name: [
		{
			required: true,
			message: 'Please enter course name',
		}
	],
	description: [
	],
	period: [
		{
			required: true,
			message: 'Please enter course period',
		}
	],
	duration: [
		{
			required: true,
			message: 'Please enter duration of the course',
		}
	],
	language: [
		{
			required: true,
			message: 'Please add minimum one language',
		}
	],
	totalLectures: [
		{
			required: true,
			message: 'Please enter course total lectures',
		}
	],
	driveLink: [
		{
			required: true,
			message: 'Please enter valid Google Drive link',
		}
	],
}

const imageUploadProps = {
  	name: 'file',
	multiple: false,
	listType: "picture-card",
	showUploadList: false,
  	action: `${API_BASE_URL}/upload/fake/`
}

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  return isJpgOrPng;
}

const categories = ['CA', 'UGC-NET', 'MBA', 'Junior']
const subCategories = ['Paper 1', 'Paper 2','Paper 3', 'Group 1', 'Group 2', 'Group 3', 'Foundation', 'Intermediate']
const tags = ['CA', 'Foundation', 'Intermediate', 'Final', 'MBA', 'CAT', 'UGC' ]
const languages = ['English', 'Hindi', 'Punjabi', 'Urdu', 'Rajasthani', 'Tamil', 'Telugu' ]

const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={17}>
			<Card title="Basic Information">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24}>
						<Form.Item name="name" label="Course name" rules={rules.name}>
							<Input placeholder="Course Name" />
						</Form.Item>
						<Form.Item name="description" label="Description" rules={rules.description}>
							<Input.TextArea rows={4} />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={12}>

						

						<Form.Item name="totalLectures" label="Total Lectures" rules={rules.totalLectures}>
							<InputNumber
								className="w-100"
								value={0}
								formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="duration" label="Duration of Course" rules={rules.duration}>
							<InputNumber
								className="w-100"
								formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="videoLanguage" label="Video Language">
						<Select mode="tags" style={{ width: '100%' }} placeholder="Select Languages">
							{languages.map(elm => <Option key={elm}>{elm}</Option>)}
						</Select>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="studyLanguage" label="Study Material Language">
						<Select mode="tags" style={{ width: '100%' }} placeholder="Select Languages">
							{languages.map(elm => <Option key={elm}>{elm}</Option>)}
						</Select>
						</Form.Item>
					</Col>
				</Row>
			</Card>
			<Card title="Demo Videos">
			<Form.List name="demoVideos">
				{(fields, { add, remove }) => {
					return (
						<div className="mt-3">
							{fields.map((field, index) => (
								<Row key={field.key} gutter={16}> 
									<Col flex="0 1 300px">
										<Form.Item
											{...field}
											label="Lesson Name"
											name={[field.name, 'name']}
											fieldKey={[field.fieldKey, 'name']}
											rules={[{ required: true, message: 'Please enter lesson name' }]}
											className="w-100"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col flex="1 1 300px">
										<Form.Item
											{...field}
											label="Youtube Link"
											name={[field.name, 'link']}
											fieldKey={[field.fieldKey, 'link']}
											rules={[{ required: true, message: 'Please enter youtube embed link' }]}
											className="w-100"
										>
											<Input className="w-100"/>
										</Form.Item>
									</Col>
									<Col sm={24} md={2}>
										<MinusCircleOutlined className="mt-md-4 pt-md-3" onClick={() => { remove(field.name)}} />
									</Col>
									<Col span={24}>
										<hr className="mt-2"/>
									</Col>
								</Row>
							))}
							<Form.Item>
								<Button type="dashed" onClick={() => { add()}} className="w-100">
									<PlusOutlined /> Add Demo
								</Button>
							</Form.Item>
						</div>
					);
				}}
			</Form.List>
			</Card>
			<Card title={ <><span className="text-danger">*</span> Course Material Drive Link</>}>
				<Form.Item name="driveLink" label="" rules={rules.driveLink}>
					<Input placeholder="Google Drive Link" />
				</Form.Item>
			</Card>
		</Col>
		<Col xs={24} sm={24} md={7}>
			<Card title="Media">
				<Dragger {...imageUploadProps} beforeUpload={beforeUpload} onChange={e=> props.handleUploadChange(e)}>
					{
						props.uploadedImg ? 
						<img src={props.uploadedImg} alt="avatar" className="img-fluid" /> 
						: 
						<div>
							{
								props.uploadLoading ? 
								<div>
									<LoadingOutlined className="font-size-xxl text-primary"/>
									<div className="mt-3">Uploading</div>
								</div> 
								: 
								<div>
									<CustomIcon className="display-3" svg={ImageSvg}/>
									<p>Click or drag file to upload</p>
								</div>
							}
						</div>
					}
				</Dragger>
			</Card>
		
			<Card title="Organization">
				<Form.Item name="category" label="Category" rules={[{required:true, message:"Please enter a category"}]}>
					<Select className="w-100" placeholder="Category">
						{
							categories.map(elm => (
								<Option key={elm} value={elm}>{elm}</Option>
							))
						}
					</Select>
				</Form.Item>
				<Form.Item name="subCategory" label="Sub Category" rules={[{required:true, message:"Please enter a subCategory"}]}>
					<Select mode="tags" className="w-100" placeholder="Sub Category">
						{
							subCategories.map(elm => (
								<Option key={elm} value={elm}>{elm}</Option>
							))
						}
					</Select>
				</Form.Item>
				<Form.Item name="tags" label="Tags" >
				<Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
					{tags.map(elm => <Option key={elm}>{elm}</Option>)}
				</Select>
				</Form.Item>
			</Card>
		</Col>
	</Row>
)

export default GeneralField
