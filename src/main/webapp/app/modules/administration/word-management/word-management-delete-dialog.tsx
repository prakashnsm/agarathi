import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getWord, deleteWord } from './word-management.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IWordManagementDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WordManagementDeleteDialog = (props: IWordManagementDeleteDialogProps) => {
  useEffect(() => {
    props.getWord(props.match.params.id);
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/admin/word-management');
  };

  const confirmDelete = event => {
    props.deleteWord(props.word.id);
    handleClose(event);
  };

  const { word } = props;

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody>
        <Translate contentKey="wordManagement.delete.question" interpolate={{ id: word.id }}>
          Are you sure you want to delete this Word?
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
  word: storeState.wordManagement.word,
});

const mapDispatchToProps = { getWord, deleteWord };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WordManagementDeleteDialog);
