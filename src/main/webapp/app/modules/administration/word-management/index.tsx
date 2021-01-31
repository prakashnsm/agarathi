import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import WordManagement from './word-management';
import WordManagementIndex from './word-management-index';
import WordManagementDetail from './word-management-detail';
import WordManagementUpdate from './word-management-update';
import WordManagementDeleteDialog from './word-management-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WordManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WordManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WordManagementDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/index`} component={WordManagementIndex} />
      <ErrorBoundaryRoute path={match.url} component={WordManagement} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={WordManagementDeleteDialog} />
  </>
);

export default Routes;
