import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { getWord } from './word-management.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IWordManagementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WordManagementDetail = (props: IWordManagementDetailProps) => {
  useEffect(() => {
    props.getWord(props.match.params.id);
  }, []);

  const { word } = props;

  return (
    <div>
      <h2>
        <Translate contentKey="wordManagement.detail.title">Word</Translate> [<b>{word.id}</b>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="wordManagement.id">ID</Translate>
          </dt>
          <dd>
            <span>{word.id}</span>&nbsp;
          </dd>
          <dt>
            <Translate contentKey="wordManagement.english">English</Translate>
          </dt>
          <dd>{word.english}</dd>
          <dt>
            <Translate contentKey="wordManagement.tamizh">Tamizh</Translate>
          </dt>
          <dd>{word.tamizh}</dd>
          <dt>
            <Translate contentKey="wordManagement.createdDate">Created Date</Translate>
          </dt>
          <dd>{word.createdDate ? <TextFormat value={word.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
          <dt>
            <Translate contentKey="wordManagement.lastModifiedDate">Last Modified Date</Translate>
          </dt>
          <dd>
            {word.lastModifiedDate ? (
              <TextFormat value={word.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/word-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />{' '}
        <span className="d-none d-md-inline">
          <Translate contentKey="entity.action.back">Back</Translate>
        </span>
      </Button>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  word: storeState.wordManagement.word,
});

const mapDispatchToProps = { getWord };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WordManagementDetail);
