import React, {useEffect} from 'react'
import {Typography, Button, Form, Input, Card, Row, Col, message} from 'antd'
import {MinusCircleOutlined,PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Flex from '../../../components/shared-components/Flex';
import generalAPI from '../../../services/general'
    

function Index(props) {

    const [form] = Form.useForm()

    useEffect(() => {

        generalAPI.getContent().then(content => {
            const values = Object.entries(content).map(item => {
                return {
                    name: item[0],
                    description: item[1]
                }
            })
            form.setFieldsValue({
                fundamentals: values
            })
        })

    }, [])
    
    const onFinish = () => {
        form.validateFields().then(values => {
            generalAPI.updateContent(values).then(() => {
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
        <Form form={form} name="content_form">
            <Flex className="p-3" alignItems="center" justifyContent="between">
                <Typography.Title strong>Fundamentals</Typography.Title>
                <Button type="primary" onClick={() => onFinish()} htmlType="submit">Save</Button>
            </Flex>
        
            <Card className="p-3">
                
			        <Form.List name="fundamentals">
				{(fields, { add, remove }) => {
					return (
						<div className="mt-3">
							{fields.map((field, index) => (
								<Row key={field.key} gutter={16}> 
                                    <Col flex="0 1 300px">
										<Form.Item
											{...field}
											name={[field.name, 'name']}
											fieldKey={[field.fieldKey, 'name']}
											rules={[{ required: true, message: 'Please enter name' }]}
											className="w-100"
										>
                                        <Input className="w-100" placeholder="Tag for ex. Facebook"/>
										</Form.Item>
									</Col>
									<Col flex="1 1 200px">
										<Form.Item
											{...field}
											name={[field.name, 'description']}
											fieldKey={[field.fieldKey, 'description']}
											rules={[{ required: true, message: 'Please enter description' }]}
											className="w-100"
										>
											<Input.TextArea rows={3} placeholder="Description for ex. https://www.facebook.com/rhombuseducation" />
										</Form.Item>
									</Col>
									
									<Col sm={24} md={2} className="d-flex justify-content-center align-items-center">
										<MinusCircleOutlined className="mb-md-4" onClick={() => { remove(field.name)}} />
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
