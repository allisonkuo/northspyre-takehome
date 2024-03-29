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

### Summary
For this app, I decided to build off of the existing skeleton. I started by creating the necessary CRUD endpoints within the `tasks.py` controller, wrapping it in a Blueprint to keep it modular in case I had time to add in additional features that would require different APIs (e.g. an Auth Blueprint). 

On the frontend side, I tried to break the UI down into smaller components for readability and flexibility. The main task list is populated through a `fetch` call to the API, and the data is re-fetched after update operations, and the UI responds accordingly. 

I had many ideas on next feature enhancements (adding a priority status for each task, sort feature by said priority, editing existing tasks, to name a few), but truth be told I just ran out of time to implement them. I faced many hurdles in terms of just new laptop environment setup that cost me too much time, so in the end I decided to use what little remaining time I had left to make the UI look relatively polished and fun-ish.
