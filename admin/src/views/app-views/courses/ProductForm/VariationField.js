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
			<Card className="p-3" title = "Add Variants">			
			<Form.List name="variants">
				{(fields, { add, remove }) => {
					return (
						<div className="mt-3">
							{fields.map((field, index) => (
								<Row key={field.key} gutter={16}> 
									<Col sm={24} md={10}>
										<Form.Item
											{...field}
											label="Variant Name"
											name={[field.name, 'name']}
											fieldKey={[field.fieldKey, 'name']}
											rules={[{ required: true, message: 'Please enter Variant name' }]}
											className="w-100"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col sm={24} md={10}>
										<Form.Item
											{...field}
											label="Desription"
											name={[field.name, 'description']}
											fieldKey={[field.fieldKey, 'description']}
											rules={[{ required: false, message: 'Please enter description' }]}
											className="w-100"
											>
											<Input />
										</Form.Item>
									</Col>
									
									<Col sm={24} md={10}>
										<Form.Item
											{...field}
											label="Price"
											name={[field.name, 'price']}
											fieldKey={[field.fieldKey, 'price']}
											rules={[{ required: true, message: 'Please enter price' }]}
											className="w-100"
											>
											<InputNumber className="w-100" />
										</Form.Item>
									</Col>
									<Col sm={24} md={10}>
										<Form.Item
											{...field}
											label="Discount Price"
											name={[field.name, 'discountPrice']}
											fieldKey={[field.fieldKey, 'discountPrice']}
											rules={[{ required: true, message: 'Please enter discount price' }]}
											className="w-100"
											>
											<InputNumber className="w-100" />
										</Form.Item>
									</Col>
									<Col sm={24} md={4}>
										<MinusCircleOutlined className="mt-md-4 pt-md-3" onClick={() => { remove(field.name)}} />
									</Col>
									<Col span={24}>
										<hr className="mt-2"/>
									</Col>
								</Row>
							))}
							<Form.Item>
								<Button type="dashed" onClick={() => { add()}} className="w-100">
									<PlusOutlined /> Add Variant
								</Button>
							</Form.Item>
						</div>
					);
				}}
			</Form.List>
			</Card>
)}

export default VariationField
