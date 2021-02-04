import React, {useEffect} from 'react'
import {Typography, Button, Form, Input, Card, Row, Col, message} from 'antd'
import {MinusCircleOutlined,PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Flex from '../../../components/shared-components/Flex';
import generalAPI from '../../../services/general'
    

function Index(props) {

    const [form] = Form.useForm()

    useEffect(() => {

        generalAPI.getTestimonials().then(content => {
            form.setFieldsValue({
                testimonials: content
            })
        })

    }, [])
    
    const onFinish = () => {
        form.validateFields().then(values => {
            generalAPI.updateTestimonials(values).then(() => {
                message.success("Updated Successfully")
            }).catch(err => {
                message.error("Some error occured")
            })
        })
        .catch(info => {
			message.error('Please enter all required field ');
		});
        
    };

    return (
        <>
        <Form form={form} name="content_form" layout="vertical">
            <Flex className="p-3" alignItems="center" justifyContent="between">
                <Typography.Title strong>Testimonials</Typography.Title>
                <Button type="primary" onClick={() => onFinish()} htmlType="submit">Save</Button>
            </Flex>
        
            <Card className="p-3">
                
			        <Form.List name="testimonials">
				{(fields, { add, remove }) => {
					return (
						<div className="mt-3">
							{fields.map((field, index) => (
								<Row key={field.key} gutter={16}> 
                                    <Col xs={24}>
										<Form.Item
                                            {...field}
                                            label="Avatar of Person"
											name={[field.name, 'avatar']}
											fieldKey={[field.fieldKey, 'avatar']}
											rules={[{ required: true, message: 'Avatar is required' }]}
											className="w-100"
										>
                                        <Input className="w-100" placeholder="Paste facebook profile link here..."/>
										</Form.Item>
									</Col>
                                    <Col xs={24}>
										<Form.Item
                                            {...field}
                                            label="Name of Person"
											name={[field.name, 'name']}
											fieldKey={[field.fieldKey, 'name']}
											rules={[{ required: true, message: 'Please enter name' }]}
											className="w-100"
										>
                                        <Input className="w-100" placeholder="Name of the person"/>
										</Form.Item>
									</Col>
									<Col xs={24}>
										<Form.Item
                                            {...field}
                                            label="Reviews by person"
											name={[field.name, 'reviews']}
											fieldKey={[field.fieldKey, 'reviews']}
											rules={[{ required: true, message: 'Please enter reviews' }]}
											className="w-100"
										>
											<Input.TextArea rows={3} placeholder="What he said..." />
										</Form.Item>
									</Col>
									
									<Col xs={24} className="d-flex justify-content-end align-items-center">
										<Button className="bg-danger text-white mb-md-4" onClick={() => { remove(field.name)}}>Remove</Button>
									</Col>
                                    <Col span={24}>
										<hr className="mt-2"/>
									</Col>
								</Row>
							))}
							<Form.Item>
								<Button type="dashed" onClick={() => {add()}} className="w-100">
									<PlusOutlined /> Add Content
								</Button>
							</Form.Item>
						</div>
					);
				}}
			</Form.List>
            </Card>
        </Form>			

        </>
    )
}

export default Index
