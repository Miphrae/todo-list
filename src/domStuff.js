import { parse, parseISO, compareAsc, format, formatISO } from "date-fns";

function prettyDate(dueDateString) {
  const date = parseISO(dueDateString);
  const short = format(date, "MMM d, yyyy");
  return short;
}

export const domManipulation = (() => {
  const tpl = document.getElementById("new-project-template");
  const tplAddTask = document.getElementById("new-task-template");
  const tplTask = document.getElementById("task-template");

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
    const cloneTask = tplAddTask.content.cloneNode(true);
    document.body.appendChild(cloneTask);

    const overlay = document.querySelector(".modal-overlay");
    const inputs = overlay.querySelectorAll(".task-input");
    const createBtn = overlay.querySelector(".create-task-btn");
    const cancelBtn = overlay.querySelector(".cancel-task-btn");
    const projectSelect = overlay.querySelector(
      'select[data-field="projectSelect"]'
    );
    const addTaskBtn = document.querySelector(".add-task");
    const todosContainer = document.querySelector(".todos");
    const projectSidebar = document.querySelector(".my-projects");
    const taskTpl = document.getElementById("new-task-template");

    projectSelect.innerHTML = "";
    projectSidebar.querySelectorAll(".project-name").forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.textContent.trim();
      opt.textContent = p.textContent.trim();
      projectSelect.appendChild(opt);
    });

    overlay.querySelector('input[data-field="title"]').focus();

    cancelBtn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });

    return { overlay, inputs, createBtn };
  }

  function AddTodo(Todo) {
    const todos = document.querySelector(".todos");

    const newTodo = document.createElement("div");
    newTodo.classList.add("todo");
    newTodo.dataset.id = Todo.id;
    switch (Todo.priority) {
      case 1:
        newTodo.classList.add("priority-high");
        break;
      case 2:
        newTodo.classList.add("priority-medium");
        break;
      case 3:
        newTodo.classList.add("priority-low");
        break;
      default:
        newTodo.classList.add("priority-low"); //to samo
        break;
    }

    const left = document.createElement("div");
    left.classList.add("left-todo");
    const btn = document.createElement("button");
    btn.classList.add("circular-btn");
    btn.id = "toggleBtn";
    left.appendChild(btn);

    const right = document.createElement("div");
    right.classList.add("right-todo");

    const text = document.createElement("div");
    text.classList.add("text-todo");
    text.textContent = Todo.title;

    const info = document.createElement("div");
    info.classList.add("additional-info-todo");

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time-todo");
    timeDiv.textContent = Todo.dueDate;

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    if (Todo.project != "") {
      projectDiv.textContent = `#${Todo.project}`;
    }

    info.append(timeDiv, projectDiv);
    right.append(text, info);

    newTodo.append(left, right);
    todos.appendChild(newTodo);
  }

  function openTask(Todo, onDelete) {
    const cloneTask = tplTask.content.cloneNode(true);
    document.body.appendChild(cloneTask);

    const overlay = document.querySelector(".modal-overlay");
    const deleteBtn = overlay.querySelector(".delete-task-btn");
    const cancelBtn = overlay.querySelector(".cancel-task-btn");

    overlay.querySelector("h2").textContent = Todo.title;
    overlay.querySelector(".description").textContent = Todo.description;
    overlay.querySelector(".dueDate").textContent = Todo.dueDate;
    overlay.querySelector(".priority").textContent =
      ["High", "Medium", "Low"][Todo.priority - 1] + " priority";
    overlay.querySelector(".project").textContent = Todo.project;

    cancelBtn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });

    deleteBtn.addEventListener("click", () => {
      onDelete();
      overlay.remove();
    });
  }

  function clearTasks() {
    const todosContainer = document.querySelector(".todos");
    todosContainer.innerHTML = "";
  }

  function displayTasksForProject(projectName, todos) {
  clearTasks();
  const filtered = todos.filter(todo => todo.project === projectName);
  filtered.forEach(todo => domManipulation.AddTodo(todo));
  }

  function displayTasksToday(todos) {
    clearTasks();
    const today = new Date().toISOString().split("T")[0];
    const filtered = todos.filter(todo => todo.dueDate == prettyDate(today));
    filtered.forEach(todo => domManipulation.AddTodo(todo));
  }

  function displayTasksUpcoming(todos) {
    clearTasks();
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const upcoming = todos.filter(todo => {
      const dueDate = new Date(todo.dueDate);
      return dueDate > today;
    })
    .sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
    upcoming.forEach(todo => domManipulation.AddTodo(todo));
  }

  return {
    openAddProjectBox,
    closeAddProjectBox,
    addNewProject,
    openAddTaskBox,
    AddTodo,
    openTask,
    clearTasks,
    displayTasksForProject,
    displayTasksToday,
    displayTasksUpcoming
  };
})();
