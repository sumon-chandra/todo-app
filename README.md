# [To-Do List App](https://todomanager-app.vercel.app/)

This is a simple To-Do List application built using React.js that allows users to add, remove, and mark tasks as complete. The app is connected to the JSONPlaceholder REST API to fetch and save tasks. It also includes local storage functionality to persist tasks even after the page is refreshed.

## Set Up Your Environment

1. Clone or download this repository to your local machine.
2. Open your terminal and navigate to the project directory.
3. Run the following command to install the required dependencies:

```bash
npm install
```

4. Once the installation is complete, you're ready to run the application.

## Running the Application

1. In the project directory, run the following command to start the development server:

```bash
npm run dev
```

2. Your default web browser will open, and you should see the To-Do List app.

## Interacting with the JSONPlaceholder API

The To-Do List app is connected to the JSONPlaceholder API (https://jsonplaceholder.typicode.com) to fetch and save tasks. Here's how you can interact with the API:

### Fetching Tasks

When you open the app, it automatically fetches tasks from the JSONPlaceholder API and displays them in the list.

### Adding a Task

To add a new task:

1. Enter the task description in the input field provided.
2. Click the "Add" button.
3. The new task will be sent to the JSONPlaceholder API and added to the list.

### Completing a Task

To mark a task as complete:

1. Click the checkbox next to the task you want to mark as complete.
2. The status of the task will be updated in the JSONPlaceholder API.

### Deleting a Task

To remove a task:

1. Click the "Delete" button next to the task you want to remove.
2. The task will be deleted both from the UI and the JSONPlaceholder API.

## Local Storage

The app includes local storage functionality, which means that your tasks will be saved locally in your browser's storage. Even if you refresh the page or close and reopen the app, your tasks will be preserved.
