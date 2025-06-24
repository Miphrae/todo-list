export const domManipulation = (() => {
  const tpl = document.getElementById("new-project-template");

  function openAddProjectBox() {
    // Clone & insert
    const clone = tpl.content.cloneNode(true);
    document.body.appendChild(clone);

    // Now grab the elements that actually exist
    const overlay = document.getElementById("project-modal-overlay");
    const input = document.getElementById("new-project-name");
    const cancelBtn = document.getElementById("cancel-project-btn");
    const createBtn = document.getElementById("create-project-btn");

    // Focus the freshly-inserted input
    input.focus();

    // wire up close
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
  return { openAddProjectBox, closeAddProjectBox, addNewProject };
})();
