import { Todo } from "./todoLogic.js";
import { domManipulation } from "./domStuff.js";
import "./style.css";

// const testProject = new todo("test", "test description", [2025,6,12], 2, "someProject", false);

// console.log(testProject);
// console.log(testProject.title);
document.addEventListener("DOMContentLoaded", () => {
  const addProjectBtn = document.querySelector(".add-project");
  const addTaskBtn = document.querySelector(".add-task");
  const cancelBtn = document.getElementById("cancel-project-btn");
  const createBtn = document.getElementById("create-project-btn");
  const input = document.getElementById("new-project-name");

  let todos = [];

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

        const newTodo = new Todo(title, description, dueDate, priority, project, completed);
        console.log(newTodo.dueDate);
        todos.push(newTodo);
        console.log(todos);

        domManipulation.AddTodo(newTodo);
        overlay.remove();
    });
  });
});
