import { Typography } from 'antd'
import React, { useEffect } from 'react'

const Home = () => {

	const [user, setUser] = React.useState({})

	useEffect(() => {
		const data = localStorage.getItem('user')
		setUser(JSON.parse(data));
	}, [])

	return (
		<div>
			<Typography.Title level={2} strong>Hi! {user.name}</Typography.Title>
			<Typography.Paragraph>We are setting up homepage for you, you will get to see stats of your website soon.</Typography.Paragraph>
		</div>
	)
}

export default Home
