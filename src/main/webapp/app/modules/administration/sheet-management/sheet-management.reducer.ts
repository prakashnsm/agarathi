import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ISheet, defaultValue } from 'app/shared/model/sheet.model';

export const ACTION_TYPES = {
  FETCH_ROLES: 'sheetManagement/FETCH_ROLES',
  FETCH_SHEETS: 'sheetManagement/FETCH_SHEETS',
  FETCH_SHEET: 'sheetManagement/FETCH_SHEET',
  CREATE_SHEET: 'sheetManagement/CREATE_SHEET',
  UPDATE_SHEET: 'sheetManagement/UPDATE_SHEET',
  DELETE_SHEET: 'sheetManagement/DELETE_SHEET',
  RESET: 'sheetManagement/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  sheets: [] as ReadonlyArray<ISheet>,
  authorities: [] as any[],
  sheet: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

export type SheetManagementState = Readonly<typeof initialState>;

// Reducer
export default (state: SheetManagementState = initialState, action): SheetManagementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROLES):
      return {
        ...state,
      };
    case REQUEST(ACTION_TYPES.FETCH_SHEETS):
    case REQUEST(ACTION_TYPES.FETCH_SHEET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SHEET):
    case REQUEST(ACTION_TYPES.UPDATE_SHEET):
    case REQUEST(ACTION_TYPES.DELETE_SHEET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SHEETS):
    case FAILURE(ACTION_TYPES.FETCH_SHEET):
    case FAILURE(ACTION_TYPES.FETCH_ROLES):
    case FAILURE(ACTION_TYPES.CREATE_SHEET):
    case FAILURE(ACTION_TYPES.UPDATE_SHEET):
    case FAILURE(ACTION_TYPES.DELETE_SHEET):
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
    case SUCCESS(ACTION_TYPES.FETCH_SHEETS):
      return {
        ...state,
        loading: false,
        sheets: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHEET):
      return {
        ...state,
        loading: false,
        sheet: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SHEET):
    case SUCCESS(ACTION_TYPES.UPDATE_SHEET):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        sheet: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SHEET):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        sheet: defaultValue,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/sheets';
// Actions
export const getSheets: ICrudGetAllAction<ISheet> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SHEETS,
    payload: axios.get<ISheet>(requestUrl),
  };
};

export const getRoles = () => ({
  type: ACTION_TYPES.FETCH_ROLES,
  payload: axios.get(`${apiUrl}/authorities`),
});

export const getSheet: ICrudGetAction<ISheet> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SHEET,
    payload: axios.get<ISheet>(requestUrl),
  };
};

export const createSheet: ICrudPutAction<ISheet> = sheet => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SHEET,
    payload: axios.post(apiUrl, sheet),
  });
  dispatch(getSheets());
  return result;
};

export const updateSheet: ICrudPutAction<ISheet> = sheet => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SHEET,
    payload: axios.put(apiUrl, sheet),
  });
  dispatch(getSheets());
  return result;
};

export const deleteSheet: ICrudDeleteAction<ISheet> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SHEET,
    payload: axios.delete(requestUrl),
  });
  dispatch(getSheets());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
