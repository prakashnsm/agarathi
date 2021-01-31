import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { Translate, TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getWords, updateWord } from './word-management.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IWordManagementIndexProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const WordManagementIndex = (props: IWordManagementIndexProps) => {
  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  useEffect(() => {
    props.getWords(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const toggleActive = word => () =>
    props.updateWord({
      ...word
    });

  const { words, account, match, totalItems } = props;
  return (
    <div>
      <h2 id="word-management-index-page-heading">
        <Translate contentKey="wordManagement.home.title">Words</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
          <FontAwesomeIcon icon="plus" /> <Translate contentKey="wordManagement.home.createLabel">Create a new word</Translate>
        </Link>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={sort('id')}>
              <Translate contentKey="wordManagement.id">ID</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('english')}>
              <Translate contentKey="wordManagement.english">Name</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th />
            <th className="hand" onClick={sort('tamizh')}>
              <Translate contentKey="wordManagement.tamizh">Tag</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('sheet')}>
              <Translate contentKey="wordManagement.sheet">Tag</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('createdDate')}>
              <Translate contentKey="wordManagement.createdDate">Created Date</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
              <Translate contentKey="wordManagement.lastModifiedDate">Last Modified Date</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {words.map((word, i) => (
            <tr id={word.id} key={`word-${i}`}>
              <td>
                <Button tag={Link} to={`${match.url}/${word.id}`} color="link" size="sm">
                  {word.id}
                </Button>
              </td>
              <td>{word.id}</td>
              <td>{word.english}</td>
              <td>{word.tamizh}</td>
              <td>{word.sheet}</td>
              <td>
                {word.createdDate ? <TextFormat value={word.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}
              </td>
              <td>
                {word.lastModifiedDate ? (
                  <TextFormat value={word.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                ) : null}
              </td>
              <td className="text-right">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={`${match.url}/${word.id}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.view">View</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${word.id}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.edit">Edit</Translate>
                    </span>
                  </Button>
                  <Button
                    tag={Link}
                    to={`${match.url}/${word.id}/delete`}
                    color="danger"
                    size="sm"
                  >
                    <FontAwesomeIcon icon="trash" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.delete">Delete</Translate>
                    </span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {props.totalItems ? (
        <div className={words && words.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={pagination.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  words: storeState.wordManagement.words,
  totalItems: storeState.wordManagement.totalItems,
  account: storeState.authentication.account,
});

const mapDispatchToProps = { getWords, updateWord };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WordManagementIndex);
