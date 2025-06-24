import { todo } from "./todoLogic.js";
import { domManipulation } from "./domStuff.js";
import "./style.css";

// const testProject = new todo("test", "test description", [2025,6,12], 2, "someProject", false);

// console.log(testProject);
// console.log(testProject.title);
document.addEventListener("DOMContentLoaded", () => {
  const addProjectBtn = document.querySelector(".add-project");
  const cancelBtn = document.getElementById("cancel-project-btn");
  const createBtn = document.getElementById("create-project-btn");
  const input = document.getElementById("new-project-name");

  addProjectBtn.addEventListener("click", () => {
    const { input, createBtn } = domManipulation.openAddProjectBox();

    createBtn.addEventListener('click', () => {
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


});
