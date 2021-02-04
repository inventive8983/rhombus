import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Orders from './list'
import Invoice from './invoice'

const Ecommerce = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/all`} />
			<Route path={`${match.url}/all`} component={Orders} />
			<Route path={`${match.url}/invoice/:id`} component={Invoice} />
		</Switch>
	)
}

export default Ecommerce

