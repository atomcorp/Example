import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import {
  CoursesContainer,
  CourseContainer,
  ModuleContainer,
  AssessmentContainer,
  LoginContainer,
  Home,
  RegisterContainer,
} from '../components/index.js';
import {loginIfNecessary} from '../redux/actions/login-actions';

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

// TODO: extract this to a new file
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => {
      const {status} = rest;
      return status.isLoggedIn
        ? <Component {...props} />
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: props.location},
            }}
          />
        );
    }
    }
  />
);

const mapStateToProps = (state) => ({
  status: state.status,
});

const PriveRouteContainer = connect(
  mapStateToProps
)(PrivateRoute);

const Routes = ({resources, store}) => {
  // const state = store.getState();
  // if (state.status.isLoggedIn) {
  //   store.dispatch(loginIfNecessary({
  //     email: state.status.email,
  //     id: state.status.id,
  //   }));
  // }
  return (
    <Provider store={store}>
      <Router basename={`${process.env.PUBLIC_URL}/`}>
        <Switch>
          <PriveRouteContainer
            path={`/courses`}
            exact component={() => (
              <CoursesContainer courses={resources.courses} />
            )} />
          <PriveRouteContainer
            path={`/course/:courseId/assessment`}
            component={(route) => (
              <AssessmentContainer route={route} resources={resources} />
            )} />
          <PriveRouteContainer
            path={`/course/:courseId/:moduleId`}
            component={(route) => (
              <ValidateModulePath route={route} resources={resources} />
            )} />
          <PriveRouteContainer
            path={`/course/:courseId`}
            component={(route) => (
              <CourseContainer route={route} resources={resources} />
            )} />
          <Route exact path={`/`} component={Home} />
          <Route exact path={`/register`} component={RegisterContainer} />
          <Route path={`/login`} component={LoginContainer} />
          <Route component={NoMatch}></Route>
        </Switch>
      </Router>
    </Provider>
  );
};

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
