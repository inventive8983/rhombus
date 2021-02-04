import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';

export const AppViews = ({match}) => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${match.url}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${match.url}/content`} component={lazy(() => import(`./content`))} />
        <Route path={`${match.url}/courses`} component={lazy(() => import(`./courses`))} />
        <Route path={`${match.url}/orders`} component={lazy(() => import(`./orders`))} />
        <Route path={`${match.url}/gallery`} component={lazy(() => import(`./media/gallery`))} />
        <Route path={`${match.url}/slider`} component={lazy(() => import(`./media/slider`))} />
        <Redirect from={`${match.url}`} to={`${match.url}/home`} />
      </Switch>
    </Suspense>
  )
}

export default AppViews;
