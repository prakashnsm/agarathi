import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getSheet, getRoles, updateSheet, createSheet, reset } from './sheet-management.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ISheetManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SheetManagementUpdate = (props: ISheetManagementUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getSheet(props.match.params.id);
    }
    props.getRoles();
    return () => {
      props.reset();
    };
  }, []);

  const handleClose = () => {
    props.history.push('/admin/sheet-management');
  };

  const saveSheet = (event, values) => {
    if (isNew) {
      props.createSheet(values);
    } else {
      props.updateSheet(values);
    }
    handleClose();
  };

  const getCSRF = () => {
    const name = "XSRF-TOKEN=";
    const ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
        let c = ca[i];
        while (c.startsWith(' ')) c = c.substring(1);
        if (c.includes(name)) return c.substring(name.length, c.length);
    }
    return "";
  };

  const onFileChangeHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const xsrf = getCSRF();
    if(e.target.files && e.target.files[0]){
      formData.append('uploadfile', e.target.files[0]);
      fetch('http://localhost:8080/upload', {
          method: 'post',
          headers: {'X-XSRF-TOKEN' : xsrf},
          body: formData
      }).then(res => {
        if(res.ok) {
          props.history.push(`/admin/sheet-management`);
        }
      });
    }
  };

  const isInvalid = false;
  const { sheet, loading, updating, roles } = props;

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="sheetManagement.home.createOrEditLabel">Create or edit a Sheet</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm onValidSubmit={saveSheet}>
              {sheet.id ? (
                <AvGroup>
                  <Label for="id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvField type="text" className="form-control" name="id" required readOnly value={sheet.id} />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="name">
                  <Translate contentKey="sheetManagement.name">Name</Translate>
                </Label>
                <AvField
                  type="file"
                  className="form-control"
                  name="uploadfile"
                  onChange={onFileChangeHandler}
                />
              </AvGroup>

              <Button tag={Link} to="/admin/sheet-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  sheet: storeState.sheetManagement.sheet,
  roles: storeState.sheetManagement.authorities,
  loading: storeState.sheetManagement.loading,
  updating: storeState.sheetManagement.updating,
});

const mapDispatchToProps = { getSheet, getRoles, updateSheet, createSheet, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SheetManagementUpdate);
