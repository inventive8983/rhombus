import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import General from './general'
import Courses from './courses'

const Ecommerce = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/general`} />
			<Route path={`${match.url}/general`} component={General} />
			<Route path={`${match.url}/courses`} component={Courses} />
		</Switch>
	)
}

export default Ecommerce

