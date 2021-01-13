import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { getSheet } from './sheet-management.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ISheetManagementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SheetManagementDetail = (props: ISheetManagementDetailProps) => {
  useEffect(() => {
    props.getSheet(props.match.params.id);
  }, []);

  const { sheet } = props;

  return (
    <div>
      <h2>
        <Translate contentKey="sheetManagement.detail.title">Sheet</Translate> [<b>{sheet.id}</b>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="sheetManagement.id">ID</Translate>
          </dt>
          <dd>
            <span>{sheet.id}</span>&nbsp;
          </dd>
          <dt>
            <Translate contentKey="sheetManagement.name">Name</Translate>
          </dt>
          <dd>{sheet.name}</dd>
          
          <dt>
            <Translate contentKey="sheetManagement.createdDate">Created Date</Translate>
          </dt>
          <dd>{sheet.createdDate ? <TextFormat value={sheet.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
          <dt>
            <Translate contentKey="sheetManagement.lastModifiedDate">Last Modified Date</Translate>
          </dt>
          <dd>
            {sheet.lastModifiedDate ? (
              <TextFormat value={sheet.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/sheet-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />{' '}
        <span className="d-none d-md-inline">
          <Translate contentKey="entity.action.back">Back</Translate>
        </span>
      </Button>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  sheet: storeState.sheetManagement.sheet,
});

const mapDispatchToProps = { getSheet };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SheetManagementDetail);
