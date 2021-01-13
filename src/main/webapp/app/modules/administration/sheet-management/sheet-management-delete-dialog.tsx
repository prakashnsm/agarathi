import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getSheet, deleteSheet } from './sheet-management.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ISheetManagementDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SheetManagementDeleteDialog = (props: ISheetManagementDeleteDialogProps) => {
  useEffect(() => {
    props.getSheet(props.match.params.id);
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/admin/sheet-management');
  };

  const confirmDelete = event => {
    props.deleteSheet(props.sheet.id);
    handleClose(event);
  };

  const { sheet } = props;

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody>
        <Translate contentKey="sheetManagement.delete.question" interpolate={{ id: sheet.id }}>
          Are you sure you want to delete this Sheet?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  sheet: storeState.sheetManagement.sheet,
});

const mapDispatchToProps = { getSheet, deleteSheet };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SheetManagementDeleteDialog);
