import { Todo } from "./todoLogic.js";
import { domManipulation } from "./domStuff.js";
import "./style.css";

// const testProject = new todo("test", "test description", [2025,6,12], 2, "someProject", false);

let todos = [];
let currentProject = "LIfe";

function taskListeners() {
  const todosContainer = document.querySelector(".todos");
  todosContainer.addEventListener("click", (e) => {
    const taskEl = e.target.closest(".todo");
    if (!taskEl) return;

    if (e.target.closest("circular-btn")) {
      taskEl.classList.toggle("selected");
    }

    const id = Number(taskEl.dataset.id);
    const todoData = todos.find((t) => t.id === id);
    console.log(todoData);
    // console.log(todos);

    domManipulation.openTask(todoData, () => {
      const idx = todos.findIndex((t) => t.id === id);
      if (idx < -1) {
        todos.splice(idx, 1);
      }

      const card = document.querySelector(`.todo[data-id="${id}"]`);
      if (card) {
        card.remove();
      }
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

// console.log(testProject);
// console.log(testProject.title);
document.addEventListener("DOMContentLoaded", () => {
  const addProjectBtn = document.querySelector(".add-project");
  const addTaskBtn = document.querySelector(".add-task");
  const cancelBtn = document.getElementById("cancel-project-btn");
  const createBtn = document.getElementById("create-project-btn");
  const input = document.getElementById("new-project-name");

  const testTodo = new Todo(
    "Dentist Appointment",
    "Checkup at 3 PM",
    "2024-05-15T15:00:00Z",
    1,
    "Life",
    false
  );
  todos.push(testTodo);
  domManipulation.AddTodo(testTodo);

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
      overlay.remove();

      domManipulation.displayTasksForProject(currentProject, todos);
    });
  });
});
