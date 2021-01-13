import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import SheetManagement from './sheet-management';
import SheetManagementDetail from './sheet-management-detail';
import SheetManagementUpdate from './sheet-management-update';
import SheetManagementDeleteDialog from './sheet-management-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SheetManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SheetManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SheetManagementDetail} />
      <ErrorBoundaryRoute path={match.url} component={SheetManagement} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SheetManagementDeleteDialog} />
  </>
);

export default Routes;
