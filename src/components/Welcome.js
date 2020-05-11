import React from "react";
import { connect } from "react-redux";
import { receiveUser } from "../actions/userActions";

const Welcome = props => {
  return(
    <h1>hemlo welcom 2 soundzone</h1>
  )
}

const mstp = (state) => ({
  users: state.users,
});

const mdtp = (dispatch) => ({
  addUser: (user) => dispatch(receiveUser(user)),
});

export default connect(mstp, mdtp)(Welcome);

// const Welcome = ({ users, addUser }) => {
//   const usersArray = Object.values(users);
//   return (
//     <div>
//       <ul>
//         {usersArray.map((user) => (
//           <li>{user.name}</li>
//         ))}
//       </ul>
//       <button onClick={() => addUser({ name: "Danny Devito", id: 3 })}>
//         Add Danny Devito
//       </button>
//     </div>
//   );
// };
