import { Todo } from "./todoLogic.js";
import { domManipulation } from "./domStuff.js";
import "./style.css";

// const testProject = new todo("test", "test description", [2025,6,12], 2, "someProject", false);

let todos = [];
let currentProject = "Life";

function taskListeners() {
  const todosContainer = document.querySelector(".todos");
  todosContainer.addEventListener("click", (e) => {
    const taskEl = e.target.closest(".todo");
    if (!taskEl) return;

    const id = Number(taskEl.dataset.id);
    const todoData = todos.find((t) => t.id === id);
    console.log(todoData);
    // console.log(todos);

    domManipulation.openTask(todoData, () => {
      //this is a callback 
      const idx = todos.findIndex((t) => t.id === id);
      if (idx < -1) {
        todos.splice(idx, 1);
      }

      const card = document.querySelector(`.todo[data-id="${id}"]`);
      if (card) {
        card.remove();
      }

      saveTodos();
    });
  });
}

function projectListeners() {
  const projectsContainer = document.querySelector(".my-projects");
  projectsContainer.addEventListener("click", (e) => {
    const p = e.target.closest(".project");
    if (!p) return;
    const name = p.querySelector(".project-name").textContent.trim();
    domManipulation.displayTasksForProject(name, todos);
    currentProject = name;
  });
}

function saveTodos() {
  console.log(todos);
  console.log(JSON.stringify(todos));
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const raw = localStorage.getItem("todos");
  if (!raw) return [];
  console.log(raw);
  try {
    return JSON.parse(raw);
  } catch {
    console.warn("Could not parse todos from LocalStorage");
    return [];
  }
}

// console.log(testProject);
// console.log(testProject.title);
document.addEventListener("DOMContentLoaded", () => {
  const addProjectBtn = document.querySelector(".add-project");
  const addTaskBtn = document.querySelector(".add-task");
  const todayBtn = document.querySelector(".today-btn");
  const upcomingBtn = document.querySelector(".upcoming-btn");

  // const testTodo = new Todo(
  //   "Dentist Appointment",
  //   "Checkup at 3 PM",
  //   "2026-05-15T15:00:00Z",
  //   1,
  //   "Life",
  //   false
  // );
  // todos.push(testTodo);
  // domManipulation.AddTodo(testTodo);

  todos = loadTodos().map(data => {
    const todo = new Todo(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
      data.project,
      data.isDone
    );
    todo.id = data.id; 
    console.log(todo);
    return todo;
  });

  todos.forEach((todo) => domManipulation.AddTodo(todo));



  taskListeners();
  projectListeners();

  addProjectBtn.addEventListener("click", () => {
    const { input, createBtn } = domManipulation.openAddProjectBox();

    createBtn.addEventListener("click", () => {
      const name = input.value.trim();
      if (!name) {
        alert("Enter a project name");
        input.focus();
        return;
      }
      domManipulation.addNewProject(name);

      domManipulation.closeAddProjectBox();
    });
  });

  addTaskBtn.addEventListener("click", () => {
    const { overlay, inputs, createBtn } = domManipulation.openAddTaskBox();
    createBtn.addEventListener("click", () => {
      const values = {};
      inputs.forEach((input) => {
        const key = input.dataset.field;
        values[key] = input.value;
      });

      const title = values.title.trim();
      const description = values.description.trim();
      const dueDate = values.dueDate;
      const priority = parseInt(values.priority);
      const project = values.projectSelect;
      const completed = false;

      if (!title) {
        alert("Task needs a title");
        return;
      }

      const newTodo = new Todo(
        title,
        description,
        dueDate,
        priority,
        project,
        completed
      );
      console.log(newTodo.dueDate);
      todos.push(newTodo);
      console.log(todos);

      domManipulation.AddTodo(newTodo);
      saveTodos();
      overlay.remove();
      console.log(newTodo);
      domManipulation.displayTasksForProject(currentProject, todos);
    });
  });

  todayBtn.addEventListener("click", () => {
    domManipulation.displayTasksToday(todos);
  });

  upcomingBtn.addEventListener("click", () => {
    domManipulation.displayTasksUpcoming(todos);
  });
});
