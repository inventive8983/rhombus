import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Testimonials from './testimonials'
import Fundamentals from './fundamentals'

const Content = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/fundamentals`} />
			<Route path={`${match.url}/fundamentals`} component={Fundamentals} />
			<Route path={`${match.url}/testimonials`} component={Testimonials} />
		</Switch>
	)
}

export default Content

