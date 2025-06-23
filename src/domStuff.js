export { domManipulation }
let domManipulation;

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("project-modal-overlay");
  const addProjectBtn = document.querySelector(".add-project");
  const cancelBtn = document.getElementById("cancel-project-btn");
  const createBtn = document.getElementById("create-project-btn");
  const input = document.getElementById("new-project-name");

  domManipulation = (function () {
    const openAddProjectBox = function () {
      input.value = "";
      overlay.classList.remove("hidden");
      input.focus();
    };

    const closeAddProjectBox = function () {
      overlay.classList.add("hidden");
    };
    return {openAddProjectBox, closeAddProjectBox};
  })();
});
