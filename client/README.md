# Welcome to Wag!

Wag is a social media application designed to connect dogs (and maybe even their humans!) with new friends, so they can take meet up to take walks together. 

Wag is created with a React frontend and a Flask backend. Use the following instructions for setup.

## Installation:

1.  Fork and clone this repo into your local environment
2.  Navigate into your local directory and open the file in your favorite code editor
3.  Run `pipenv install` to install dependencies
4. Run `pipenv shell` to created a virtual environment
5. Change directories into server by running `cd server` to continue with backend Flask setup

### Flask setup
6. Create `.env` file in the server directory with `touch .env`
7. Add a line for `SECRET_KEY=`
8. In your terminal, run `python -c 'import secrets; print(secrets.token_hex())` to generate your own key
9. Copy the result into the `.env` file as the value for the secret key
10. Make sure `.env` is added to your `.gitignore`
11. Add a line for `DATABASE_URI=`
12. Copy the link to the external database you would like to connect. If you are using Render, start the link with `postgresql://` -- **not** just `postgres://`. You can find full instructions [here](https://render.com/docs/databases#connecting-from-outside-render).

### Configuring the database 
13. While still in the server directory, `export FLASK_APP=app.py`, followed by `flask db init`, and `flask db upgrade head`
14. Finally, run `python seed.py` to seed the database
Your Flask backend is ready!

### React Setup

1. Open a second terminal in the project directory
2. Run `cd client` to navigate into the client directory
3. Run `npm install` to install React dependencies
4. Run `npm start` to open the application in your browser





- formik, yup, mui, chatengine.io


