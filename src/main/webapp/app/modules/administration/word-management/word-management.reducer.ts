import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IWord, defaultValue } from 'app/shared/model/word.model';

export const ACTION_TYPES = {
  FETCH_ROLES: 'wordManagement/FETCH_ROLES',
  FETCH_WORDS: 'wordManagement/FETCH_WORDS',
  FETCH_WORD: 'wordManagement/FETCH_WORD',
  CREATE_WORD: 'wordManagement/CREATE_WORD',
  UPDATE_WORD: 'wordManagement/UPDATE_WORD',
  DELETE_WORD: 'wordManagement/DELETE_WORD',
  RESET: 'wordManagement/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  words: [] as ReadonlyArray<IWord>,
  authorities: [] as any[],
  word: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

export type WordManagementState = Readonly<typeof initialState>;

// Reducer
export default (state: WordManagementState = initialState, action): WordManagementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROLES):
      return {
        ...state,
      };
    case REQUEST(ACTION_TYPES.FETCH_WORDS):
    case REQUEST(ACTION_TYPES.FETCH_WORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_WORD):
    case REQUEST(ACTION_TYPES.UPDATE_WORD):
    case REQUEST(ACTION_TYPES.DELETE_WORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_WORDS):
    case FAILURE(ACTION_TYPES.FETCH_WORD):
    case FAILURE(ACTION_TYPES.FETCH_ROLES):
    case FAILURE(ACTION_TYPES.CREATE_WORD):
    case FAILURE(ACTION_TYPES.UPDATE_WORD):
    case FAILURE(ACTION_TYPES.DELETE_WORD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROLES):
      return {
        ...state,
        authorities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WORDS):
      return {
        ...state,
        loading: false,
        words: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_WORD):
      return {
        ...state,
        loading: false,
        word: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_WORD):
    case SUCCESS(ACTION_TYPES.UPDATE_WORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        word: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_WORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        word: defaultValue,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/words';
// Actions
export const getWords: ICrudGetAllAction<IWord> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_WORDS,
    payload: axios.get<IWord>(requestUrl),
  };
};

export const getWordStartsWith = (page, size, sort, a, b) => {
  const requestUrl = `${apiUrl}/${a}/${b}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_WORDS,
    payload: axios.get<IWord>(requestUrl),
  };
};

export const getRoles = () => ({
  type: ACTION_TYPES.FETCH_ROLES,
  payload: axios.get(`${apiUrl}/authorities`),
});

export const getWord: ICrudGetAction<IWord> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WORD,
    payload: axios.get<IWord>(requestUrl),
  };
};

export const createWord: ICrudPutAction<IWord> = word => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WORD,
    payload: axios.post(apiUrl, word),
  });
  dispatch(getWords());
  return result;
};

export const updateWord: ICrudPutAction<IWord> = word => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WORD,
    payload: axios.put(apiUrl, word),
  });
  dispatch(getWords());
  return result;
};

export const deleteWord: ICrudDeleteAction<IWord> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WORD,
    payload: axios.delete(requestUrl),
  });
  dispatch(getWords());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
