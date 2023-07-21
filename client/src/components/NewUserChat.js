// https://chatengine.io/docs/react/v1/backend
// Here is an example POST request to make a new chat user.
// var axios = require('axios');
// var data = '{
// 	"username": "bob_baker",
// 	"secret": "secret-123-jBj02",
// 	"email": "b_baker@mail.com",
// 	"first_name": "Bob",
// 	"last_name": "Baker",
// 	"custom_json": {"fav_game": "Candy Crush", "high_score": 2002}
// }';

// var config = {
// 	method: 'post',
// 	url: 'https://api.chatengine.io/users/',
// 	headers: {
// 		'PRIVATE-KEY': '{{private_key}}'
// 	},
// 	data : data
// };

// axios(config)
// .then(function (response) {
// 	console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
// 	console.log(error);

// Here is an example of looping through your current users, and adding each one of them.
// import { createChatUser } from './previousSnippet';

// let newUsers = [];
// let failedUsers = [];
// const users = getMyUsers();

// users.map(user => {
// 	response = createChatUser(user);
// 	if (response.status_code === 201) {
// 		newUsers.push(response.data);
// 	} else {
// 		failedUsers.push(response.data);
// 	}
// });

// console.log('New users', newUsers);
// console.log('Failed users', failedUsers);

// we have PATCH and DELETE APIs for when these events happen too!
// Instead of writing out snippets here, I'll link you to the PATCH API and DELETE API in Postman.
// You can put these API calls inside your Update User functions and Delete User functions within your backend.
// You can also put them inside Model Triggers which may be more DRY.