import { ADD_IMAGE } from '../actions/image';

export default function list(state = [], action) {
  switch (action.type) {
    case ADD_IMAGE:
      return [...state, action.image]
    default:
      return state;
  }
}
