import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Pages/app';

import Landing from './Pages/Landing';
import User from './Pages/user';
import UserLogin from './Pages/user/login';
import UserSignUp from './Pages/user/signup';
import UserProfile from './Pages/user/profile';
import EmailSignUp from './Pages/user/email_signup';
import ForgotPassword from './Pages/user/forgot_password';
import Dashboard from './Pages/Dashboard';
import Editor from './Pages/editor';
import Campaign from './Pages/editor/campaign';
import Ads from './Pages/editor/ads';
import Audience from './Pages/editor/audience';
import Automations from './Pages/editor/automations';
import Integrations from './Pages/editor/integrations';
import Settings from './Pages/editor/settings';
import NoContent from './Pages/helpers/no-content';
import requireAuth from '../Utils/authenticated';
import Projects from './Pages/projects';
import Welcome from './Pages/welcome';

export default (
    <Route path="/"                     component={App}>
        <IndexRoute                         component={Landing} />
        <Route path="user"                  component={User}>
            <IndexRoute                         component={UserLogin} />
            <Route path="login"                 component={UserLogin} />
            <Route path="sign-up"               component={UserSignUp} />
            <Route path="email-signup"          component={EmailSignUp} />
            <Route path="forgot"                component={ForgotPassword} />
            <Route path="profile"               component={UserProfile} onEnter={requireAuth} />
        </Route>
        <Route path="welcome"               component={Welcome} onEnter={requireAuth} />
        <Route path="dashboard"             component={Dashboard} onEnter={requireAuth} />
        <Route path="projects"              component={Projects} onEnter={requireAuth} />
        <Route path="editor"                component={Editor} onEnter={requireAuth}>
            <IndexRoute                         component={Campaign} />
            <Route path="campaign"              component={Campaign} />
            <Route path="ads"                   component={Ads} />
            <Route path="audience"              component={Audience} />
            <Route path="automations"           component={Automations} />
            <Route path="integrations"          component={Integrations} />
            <Route path="settings"              component={Settings} />
        </Route>
        <Route path="*"                     component={NoContent} />
    </Route>

);
