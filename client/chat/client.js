// import io from "socket.io-client";

// import "bootstrap/dist/css/bootstrap.css";
// import "./style.css";
// import React from "react";
// import ReactDOM from "react-dom";
// import { useEffect, useState } from "react";
// import moment from "moment";

// const username = prompt("what is your username");

// const socket = io("http://localhost:3000", {
//   transports: ["websocket", "polling"]
// });

// const Chat = () => {
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       socket.emit("username", username);
//     });

//     socket.on("users", users => {
//       setUsers(users);
//     });

//     socket.on("message", message => {
//       setMessages(messages => [...messages, message]);
//     });

//     socket.on("connected", user => {
//       setUsers(users => [...users, user]);
//     });

//     socket.on("disconnected", id => {
//       setUsers(users => {
//         return users.filter(user => user.id !== id);
//       });
//     });
//   }, []);

//   const submit = event => {
//     event.preventDefault();
//     socket.emit("send", message);
//     setMessage("");
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12 mt-4 mb-4">
//           <h6>Hello {username}</h6>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-8">
//           <h6>Messages</h6>
//           <div id="messages">
//             {messages.map(({ user, date, text }, index) => (
//               <div key={index} className="row mb-2">
//                 <div className="col-md-3">
//                   {moment(date).format("h:mm:ss a")}
//                 </div>
//                 <div className="col-md-2">{user.name}</div>
//                 <div className="col-md-2">{text}</div>
//               </div>
//             ))}
//           </div>
//           <form onSubmit={submit} id="form">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 onChange={e => setMessage(e.currentTarget.value)}
//                 value={message}
//                 id="text"
//               />
//               <span className="input-group-btn">
//                 <button id="submit" type="submit" className="btn btn-primary">
//                   Send
//                 </button>
//               </span>
//             </div>
//           </form>
//         </div>
//         <div className="col-md-4">
//           <h6>Users</h6>
//           <ul id="users">
//             {users.map(({ name, id }) => (
//               <li key={id}>{name}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ReactDOM.render(<App />, document.getElementById("root"));
// export default Chat;




// const connection = new WebSocket("ws://localhost:8080");
// const button = document.querySelector("#send");

// connection.onopen = (event) => {
//     console.log("WebSocket is open now.");
// };

// connection.onclose = (event) => {
//     console.log("WebSocket is closed now.");
// };

// connection.onerror = (event) => {
//     console.error("WebSocket error observed:", event);
// };

// connection.onmessage = (event) => {
//   // append received message from the server to the DOM element 
//   const chat = document.querySelector("#chat");
//   chat.innerHTML += event.data;
// };

// button.addEventListener("click", () => {
//   const name = document.querySelector("#name");
//   const message = document.querySelector("#message");
//   const data = `<p>${name.value}: ${message.value}</p>`;

//   // Send composed message to the server
//   connection.send(data);

//   // clear input fields
//   name.value = "";
//   message.value = "";
// });