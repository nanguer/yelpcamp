import api from './api';
import { SET_ERROR } from './types';

export const ACTION_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FETCH_ALL: 'FETCH_ALL',
  FETCH_ONE: 'FETCH_ONE',
};

const getItemsFromLocal = (id) => {
  return JSON.parse(sessionStorage.getItem(id));
};

export const fetchAll = () => (dispatch) => {
  api
    .campground()
    .fetchAll()
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log({ error });
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    });
};

export const fetchOne = (id) => async (dispatch) => {
  const fetchedItem = getItemsFromLocal(id);

  if (!fetchedItem) {
    try {
      const res = await api.campground().fetchById(id);

      dispatch({
        type: ACTION_TYPES.FETCH_ONE,
        payload: res.data,
      });
      sessionStorage.setItem(id, JSON.stringify(res));
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  } else {
    dispatch({
      type: ACTION_TYPES.FETCH_ONE,
      payload: fetchedItem.data,
    });
  }
};

export const create = (data, onSuccess) => (dispatch) => {
  api
    .campground()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

// export const update = (id, data, onSuccess) => (dispatch) => {
//   data = formatData(data);
//   api
//     .dCandidate()
//     .update(id, data)
//     .then((res) => {
//       dispatch({
//         type: ACTION_TYPES.UPDATE,
//         payload: { id: id, ...data },
//       });
//       onSuccess();
//     })
//     .catch((err) => console.log(err));
// };

// export const destroy = (id, data, onSuccess) => (dispatch) => {
//   api
//     .dCandidate()
//     .delete(id)
//     .then((res) => {
//       dispatch({
//         type: ACTION_TYPES.DELETE,
//         payload: id,
//       });
//       onSuccess();
//     })
//     .catch((err) => console.log(err));
// };
