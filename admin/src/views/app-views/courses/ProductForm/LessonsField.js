import React from 'react'
import { Input, Row, Col, Form, Button, Card, InputNumber, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const VariationField = props => { 
	const [name, setName] = React.useState(props.sectionName)
	const changeName = (str) => {
		props.editName(str)
		setName(str)
	}
	return (
			<Card className="p-3" title = {
				<Typography.Title level={3} className="mb-0 mx-3" editable={{onChange: changeName}}>{name}</Typography.Title>
			} extra={
				<Button type="link">Remove</Button>
			}>			
			<Form.List name={"lessongroup-" + (props.index + 1)}>
				{(fields, { add, remove }) => {
					return (
						<div className="mt-3">
							{fields.map((field, index) => (
								<Row key={field.key} gutter={16}> 
									<Col flex="1 1 200px">
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
									<Col flex="0 1 300px">
										<Form.Item
											{...field}
											label="Duration of Lesson"
											name={[field.name, 'duration']}
											fieldKey={[field.fieldKey, 'duration']}
											rules={[{ required: true, message: 'Please enter duration' }]}
											className="w-100"
										>
											<InputNumber className="w-100"/>
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
									<PlusOutlined /> Add Lesson
								</Button>
							</Form.Item>
						</div>
					);
				}}
			</Form.List>
			</Card>
)}

export default VariationField
