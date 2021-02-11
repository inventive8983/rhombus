import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Blog from './blog'
import List from './list'

const Ecommerce = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/all`} />
			<Route path={`${match.url}/view/:id`} component={Blog} />
			<Route path={`${match.url}/all`} component={List} />
		</Switch>
	)
}

export default Ecommerce

