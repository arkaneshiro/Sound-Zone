// import action type constants from necessary action file/s
import { RECEIVE_USER } from "../actions/userActions";

const initialUsers = {
  1: { name: "Bob Ross", id: 1 },
  2: { name: "Darth Vader", id: 2 },
};

export default (state = initialUsers, action) => {
  const newState = { ...state };
  switch (action.type) {
    // case ACTION_TYPE:
    //  return some kind of modification to newState
    case RECEIVE_USER:
      return { ...newState, [action.user.id]: action.user };
    default:
      return newState;
  }
};
