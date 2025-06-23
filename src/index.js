import { todo } from "./todoLogic.js";
import { domManipulation } from "./domStuff.js";
import "./style.css";

// const testProject = new todo("test", "test description", [2025,6,12], 2, "someProject", false);

// console.log(testProject);
// console.log(testProject.title);
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("project-modal-overlay");
  const addProjectBtn = document.querySelector(".add-project");
  const cancelBtn = document.getElementById("cancel-project-btn");
  const createBtn = document.getElementById("create-project-btn");
  const input = document.getElementById("new-project-name");

  addProjectBtn.addEventListener("click", () => {
    domManipulation.openAddProjectBox();
  });

  cancelBtn.addEventListener("click", () =>
    domManipulation.closeAddProjectBox()
  );
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) domManipulation.closeAddProjectBox();
  });
});
