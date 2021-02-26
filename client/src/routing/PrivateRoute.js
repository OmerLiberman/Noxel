import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  layout: Layout,
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <div> Loading ... </div>
        ) : isAuthenticated ? (
          // <Layout>
            <Component {...props} />
          // </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  layout: PropTypes.any,
  component: PropTypes.any,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);