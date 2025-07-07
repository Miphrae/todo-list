export const domManipulation = (() => {
  const tpl = document.getElementById("new-project-template");
  const tplTask = document.getElementById("new-task-template");

  function openAddProjectBox() {
    const clone = tpl.content.cloneNode(true);
    document.body.appendChild(clone);

    const overlay = document.getElementById("project-modal-overlay");
    const input = document.getElementById("new-project-name");
    const cancelBtn = document.getElementById("cancel-project-btn");
    const createBtn = document.getElementById("create-project-btn");

    input.focus();

    cancelBtn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });

    return { overlay, input, createBtn };
  }

  function closeAddProjectBox() {
    const overlay = document.getElementById("project-modal-overlay");
    if (overlay) overlay.remove();
  }

  function addNewProject(name) {
    const myProjects = document.getElementById("my-projects");

    const newProject = document.createElement("div");
    newProject.classList.add("project", "basic-task");

    const iconWrapper = document.createElement("div");
    iconWrapper.classList.add("icon");
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-hashtag");
    iconWrapper.appendChild(icon);

    const projectName = document.createElement("div");
    projectName.classList.add("basic-text", "project-name");
    projectName.textContent = name;

    newProject.appendChild(iconWrapper);
    newProject.appendChild(projectName);

    myProjects.appendChild(newProject);
  }

  function openAddTaskBox() {
    const cloneTask = tplTask.content.cloneNode(true);
    document.body.appendChild(cloneTask);

    const overlay = document.querySelector(".modal-overlay")
    const inputs = overlay.querySelectorAll(".task-input");
    const createBtn = overlay.querySelector(".create-task-btn");
    const cancelBtn = overlay.querySelector(".cancel-task-btn");
    const projectSelect = overlay.querySelector('select[data-field="projectSelect"]');
    const addTaskBtn = document.querySelector(".add-task");
    const todosContainer = document.querySelector(".todos");
    const projectSidebar = document.querySelector(".my-projects");
    const taskTpl = document.getElementById("new-task-template");

    projectSelect.innerHTML = "";
    projectSidebar
      .querySelectorAll(".project-name")
      .forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.textContent.trim();
        opt.textContent = p.textContent.trim();
        projectSelect.appendChild(opt);
      });

    overlay.querySelector('input[data-field="title"]').focus();

    cancelBtn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", e => {
      if (e.target === overlay) overlay.remove();
    });

    return { overlay, inputs, createBtn };
  }



  return { openAddProjectBox, closeAddProjectBox, addNewProject, openAddTaskBox };
})();
