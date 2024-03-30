# Northspyre Take-Home Project for React & Flask Web Application

## Setup
### Launching the Flask Server
Make sure you have python installed:
```
python --version
brew install python
```
Refer to https://www.python.org/downloads/ for the latest python installations.

Install all the required dependencies:
```
pip install -r requirements.txt
```
NOTE: could be `pip3` instead of `pip`

Launch the Flask server from the `backend/` directory:
```
python run.py
```
Keep this running in a terminal!

### Launching the UI
Now it's time for the visuals! In a separte terminal, make sure you some form of javascript package manager installed:
```
npm -v
yarn --version
```
Refer to https://nodejs.org/en/download download the latest node.js for npm, or https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable for Yarn.

Install necessary dependencies:
```
npm install
```

Start the React app:
```
npm start
```

Et voila! You should now be able to see this very very basic application where you can maintain a To-do list by adding and deleting tasks, and marking them as complete. 

### Additional Helpful Commands
#### DB Migration
If you need to create a new DB migration or update the DB to the latest migration, do the following:

Install Flask-Migrate (should have been already installed w/ `requirements.txt`)
```
pip3 install Flask-Migrate
```

To create a new migration:
```
flask db migrate -m "Note about the migration"
```

To apply the migration:
```
flask db upgrade
```

#### Running Backend Unit Tests
Make sure to have `pytest` installed (should have been already installed w/ `requirements.txt`);
```
pip3 install pytest
```

Export the path to your Flask app in `PYTHONPATH`:
```
export PYTHONPATH=/path/to/northspyre0takehome/backend
```

To run the unit test:
```
pytest
```

**Note:** Running the unit test will wipe the contents of the local DB, so if you go back to the UI, you will not see your tasks anymore. Ideally there would be some sort of separation or use of mocks to prevent this as it can be tedious during development to have to keep re-seeding the DB.

***

## Summary
For this app, I decided to build off of the existing skeleton. I started by creating the necessary CRUD endpoints within the `tasks.py` controller, wrapping it in a Blueprint to keep it modular in case I had time to add in additional features that would require different APIs (e.g. an Auth Blueprint). There are some unit tests implemented for the Task model and Task API endpoints, namely for the happy path cases. It would be beneficial to add in more test cases for the unhappy paths if there were more time (+ add in frontend tests that are missing).

On the frontend side, I tried to break the UI down into smaller components for readability and flexibility. The `useEffect` hook is used to make a `fetch` call to the API to populate a task list. The `useState` hook was used at the top level component to maintain the state of the tasks data, so when tasks are update (created, deleted, completed), the display list updates accordingly without a need for refresh. The available features for this task list include the following: 

* All tasks displayed in a list, where you can view completion status (checkbox), task name, description, and priority.
* A form at the end of the list to add a new tesk. The new task defaults to being incomplete, while the other fields are populated based on user input.
* A delete button at the end of each list item to delete the corresponding task.
* A dropdown above the list gives the user two options to choose how to sort the list: by "date created" (i.e. the order they were created) and "priority."
  * If priority is selected, the list is sorted from high -> low priority.  

I had more ideas on next feature enhancements (editing existing tasks, giving each task a category and having the option to group by category, tying tasks to a user, to name a few), but truth be told I just ran out of time to implement them. I faced many hurdles in terms of having to setup basic dev tools/environment on a new laptop which ultimately cost me a lot of time, so in the end I decided to use the remaining time I had to make the UI look relatively polished and fun-ish!
