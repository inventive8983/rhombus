import React, { Component } from 'react'
import { PrinterOutlined } from '@ant-design/icons';
import { Card, Table, Button, message } from 'antd';
import { invoiceData } from './invoiceData';
import NumberFormat from 'react-number-format';
import orderAPI from '../../../services/orders'

const { Column } = Table;

export class Invoice extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            id: props.match.params.id,
            order: {}
        }
      }

	total() {
		let total = 0;
		invoiceData.forEach((elm) => {
			total += elm.price;
		})
		return total
    }
    
    componentDidMount(){
        orderAPI.getOrder({id: this.state.id}).then(order => {
            this.setState({order: order})
            console.log(order);
        }).catch(err => {
            message.error("Some error occured.")
        })
    }

	render() {
		return (
            <div className="container">
				<Card>
					<div className="d-md-flex justify-content-md-between">
						<div>
							<img className="py-5" src="/img/logo.png" alt=""/>
							<address>
								<p>
									<span className="font-weight-semibold text-dark font-size-md">Rhombus Education</span><br />
									<span>47-D Block Near Vakilon Wali Diggi</span><br />
									<span>Sri Ganganagar, Rajasthan 335001</span><br />
									<abbr className="text-dark" title="Phone">Phone:</abbr>
									<span>8905280050</span>
								</p>
							</address>
						</div>
						<div className="mt-3 text-right">
							<h2 className="mb-1 font-weight-semibold">Invoice #{this.state.order.orderId}</h2>
							<p>{this.state.order.date}</p>
							<address>
								<p>
									<span className="font-weight-semibold text-dark font-size-md">{this.state.order.name}</span><br />
									<span>{this.state.order.billingAddress} <br/>
                                    {this.state.order.city},{this.state.order.state} {this.state.order.pincode} <br/>
                                    Phone: {this.state.order.phone} <br/> Email: {this.state.order.email}</span>
								</p>
							</address>
						</div>
					</div>
					<div className="mt-4">
						<Table dataSource={this.state.order.items} pagination={false} className="mb-5">
                            <Column title="Type" dataIndex="product" key="product"/>
                            <Column title="Product" dataIndex="name" key="product"/>
							<Column title="Details" dataIndex="details" key="details"/>
							<Column 
								title="Total" 
								render={(text) => (
									<NumberFormat 
										displayType={'text'} 
										value={(Math.round((text.amount) * 100) / 100).toFixed(2)} 
										prefix={'$'} 
										thousandSeparator={true}
									/>
								)} 
								key="total"
							/>
						</Table>
						<div className="d-flex justify-content-end">
							<div className="text-right ">
								{/* <div className="border-bottom">
									<p className="mb-2">
										<span>Sub - Total amount: </span>
										<NumberFormat 
											displayType={'text'} 
											value={(Math.round((this.total()) * 100) / 100).toFixed(2)} 
											prefix={'$'} 
											thousandSeparator={true}
										/>
									</p>
									<p>vat (10%) : {(Math.round(((this.total()/ 100) * 10 ) * 100) / 100).toFixed(2)}</p>
								</div> */}
								<h2 className="font-weight-semibold mt-3">
									<span className="mr-1">Grand Total: </span>
									<NumberFormat 
										displayType={'text'} 
										value={this.state.order.totalAmount} 
										prefix={'₹'} 
										thousandSeparator={true}
									/>
								</h2>
							</div>
						</div>
						<p className="mt-5">
							<small>
								In exceptional circumstances, Financial Services can provide an urgent manually processed special cheque.
								Note, however, that urgent special cheques should be requested only on an emergency basis as manually 
								produced cheques involve duplication of effort and considerable staff resources. Requests need to be 
								supported by a letter explaining the circumstances to justify the special cheque payment
							</small>
						</p>
					</div>
					<hr className="d-print-none"/>
					<div className="text-right d-print-none">
						<Button type="primary" onClick={() => window.print()}>
							<PrinterOutlined  type="printer" />
							<span className="ml-1">Print</span>
						</Button>
					</div>
				</Card>
			</div>
        );
	}
}

export default Invoice