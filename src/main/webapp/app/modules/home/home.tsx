import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <><Row>
      <Col md="9">
        <h2>
          <Translate contentKey="home.title">Welcome, Tamizh Agarathi!</Translate>
        </h2>
        <p className="lead">
          <Translate contentKey="home.subtitle">This is your homepage</Translate>
        </p>
        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                                You are logged in as user {account.login}.
              </Translate>
            </Alert>
          </div>
        ) : (
            <div>
              <Alert color="warning">
                <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
                <Link to="/login" className="alert-link">
                  <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
                </Link>
                <Translate contentKey="global.messages.info.authenticated.suffix">
                              , you can try the default accounts:
                  <br />- Administrator (login=&quot; admin&quot; and password=&quot; admin&quot;)
                  <br />- User (login=&quot; user&quot; and password=&quot; user&quot;).
                </Translate>
              </Alert>

              <Alert color="warning">
                <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
                <Link to="/account/register" className="alert-link">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </Alert>
            </div>
          )}
      </Col>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
    </Row>
      <Row>
        <Col md="9">
            <form method="POST" encType="multipart/form-data" id="fileUploadForm" action="/upload">
            <input type="text" name="_csrf" value=""/>
              <div className="form-group">
                <label className="control-label" htmlFor="uploadfile">Upload File:</label>
                <input type="file" className="form-control" id="uploadfile" placeholder="Upload File"  name="uploadfile"></input>
              </div>
              <button type="submit" className="btn btn-default" id="btnSubmit">Upload</button>
          </form>
        </Col>
      </Row></>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
