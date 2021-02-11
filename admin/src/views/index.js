import React, {useEffect, useState} from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from 'antd';
import Loading from 'components/shared-components/Loading'
import authAPI from '../services/auth'
import axios from "axios";

export const Views = (props) => {
  const { locale } = props;
  const currentAppLocale = AppLocale[locale];

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(false)

  useEffect(() => {
    
    const token = localStorage.getItem('token')
    authAPI.getUser({token}).then(result => {
      setUser(true)
      setLoading(false)
      localStorage.setItem('user', JSON.stringify(result))
      
      // Add a request interceptor
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization =  token;
        return config;
      });

    }).catch(err => {
      setUser(false)
      setLoading(false)
    })
  }, [])

  return (
    <>{loading ? <div style={{height:"100vh"}} className="d-flex justify-content-center align-items-center">
        <Loading/>
      </div> : <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/app" />
          </Route>
          <Route path="/app">
            {user ? <AppLayout /> : <AuthLayout />}
          </Route>
        </Switch>
      </ConfigProvider>
    </IntlProvider>}</>
  )
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale } =  theme;
  const { token } = auth;
  return { locale, token }
};

export default withRouter(connect(mapStateToProps)(Views));