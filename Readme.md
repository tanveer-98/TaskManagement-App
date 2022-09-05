## Task Application Using Node.js , Express.js and MongoDB


### API Usage 
---
**Requirements** : 
- Make sure to create a sendGrid account in case you want to use the  email sending feature. 

- Make sure to have mongodb installed on your machine 

### Installation
---
First install node modules using  the following command

```bash
yarn 
OR 
npm i 
```
Next run the application using the following command
```bash
yarn start
OR
npm run start
```

if you have a macbook instead of Windows machine make sure to change the following line in package.json

```json
"scripts": {
    "start": "node src/index.js",
    "build":"export NODE_ENV=prod&& nodemon -r dotenv/config src/index.js",
    "dev": "export NODE_ENV=dev&& nodemon -r dotenv/config src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
---

### API EndPoints : 

**API Endpoints for User**

* `GET /users`   - returns all the user details.

* `GET /users/me` - returns the details of ther user logged in.

*  `GET /users/:id` - returns the detrails of the user requested by object id.

*  `POST /users`  - add a new user to the database.

*  `PATCH /users/me`  - update details of the user logged in .

* `PATCH /users/:id`  - update details of the user by ObjectId.

*  `POST /users/logout` - logout current user that is logged in.

*  `POST /users/logoutAll` - logout User from all devices . 

*  `POST /users/login` - login user by email and password credentials.

*  `POST /users/signup` - signup new user that also logs in the user after signup.

*  `DELETE /users/me` - signout current user aswell as delete from database .

*  `POST /users/me/avatar` - upload profile pic for the logged in user

*  `POST /users/:id/avatar` - upload profile pic for the user found by ObjectID.

*  `POST /users/forgotPassword` - send password to user to the user email provided (experimental feature).

*  `DELETE /users/me/avatar` - deletes profile pic for the user logged in.

**API Endpoints for Task**


* `GET /tasks?completed=true` - returns all tasks that are completed belonging to the logged in user only.

* `GET /tasks?limit=1&page=1` - returns first page of tasks with 1 document per page belonging to the logged in user only.

* `GET /tasks` - returns all tasks belonging to the logged in user.

* `GET /tasks/:id` - returns task with given ObjectId belongin to the logged in user only 

* `POST /tasks`  - adds a new tasks by the logged in user . 

* `PATCH /tasks/:id` - updates a task by given id , belonging to the logged in user 
