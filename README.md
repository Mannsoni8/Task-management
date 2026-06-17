# Task Manager

A simple task management app built with HTML, CSS and JavaScript.

## How it works

- `index.html` defines the app structure and interface.
  - A header with the app title and theme toggle.
  - A task form to add new tasks.
  - A search form to filter tasks by title.
  - A section to display created task cards.
  - A hidden edit modal for updating task details.

- `style.css` styles the page and task cards.
  - Creates a responsive layout for desktop and mobile.
  - Uses color-coded status labels for completed vs pending tasks.
  - Styles buttons, cards, and the edit modal.
  - Supports a dark theme toggle for the page background.

- `script.js` handles the app logic.
  - Adds new tasks from the form and renders them as cards.
  - Tracks completed, pending, and total task counts.
  - Lets the user mark tasks as completed, delete tasks, and edit tasks.
  - Saves task data to `localStorage` so the list persists after refresh.
  - Loads saved tasks on page load and restores the counts.
  - Filters displayed tasks using the search input.

## Features

- Add tasks with a title and description.
- Mark tasks as completed and update counters.
- Delete tasks.
- Edit task title and description.
- Search tasks by title.
- Persist tasks in browser storage.
- Toggle between light and dark themes.

## Files

- `index.html` - page layout and form structure.
- `style.css` - visual design and responsive styles.
- `script.js` - behavior, task management, and storage.
