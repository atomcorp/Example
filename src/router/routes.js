import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {Provider} from 'react-redux';
import CoursesContainer from '../components/Courses/CoursesContainer.js';
import CourseContainer from '../components/Course/CourseContainer.js';
import ModuleContainer from '../components/Module/ModuleContainer.js';
import AssessmentContainer from
  '../components/Assessment/AssessmentContainer.js';
import Login from '../components/Login/Login.js';
import Home from '../components/Home/Home.js';
import {appAuth} from '../config/config.js';

const NoMatch = () => <div>404</div>;

const ValidateModulePath = ({route, resources}) => {
  // courseId is irrelevant to rendering Module, so we check
  // Course actually contains Module, else redirect to Module
  const {courseId, moduleId} = route.match.params;
  if (resources.courses[courseId].modules.includes(moduleId)) {
    return <ModuleContainer route={route} resources={resources} />;
  }
  return <Redirect to={`/course/${courseId}`} />;
};

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      appAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: props.location},
            }}
          />
        )
    }
  />
);

const Routes = ({resources, store}) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <PrivateRoute path="/courses" exact component={() => (
          <CoursesContainer courses={resources.courses} />
        )} />
        <PrivateRoute
          path="/course/:courseId/assessment"
          component={(route) => (
          <AssessmentContainer route={route} resources={resources} />
        )} />
        <PrivateRoute path="/course/:courseId/:moduleId" component={(route) => (
          <ValidateModulePath route={route} resources={resources} />
        )} />
        <PrivateRoute path="/course/:courseId" component={(route) => (
          <CourseContainer route={route} resources={resources} />
        )} />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route component={NoMatch}></Route>
      </Switch>
    </Router>
  </Provider>
);

Routes.propTypes = {
  resources: PropTypes.object,
  store: PropTypes.object,
};

ValidateModulePath.propTypes = {
  resources: PropTypes.object,
  route: PropTypes.object,
};

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func,
};

export default Routes;
