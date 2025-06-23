export { todo };
import { compareAsc, format } from "date-fns";

class todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #project;
  #isDone;

  constructor(
    title,
    description = "",
    dueDate,
    priority = 0,
    project = "",
    isDone = false
  ) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = new Date(dueDate[0],dueDate[1], dueDate[2]);
    this.#priority = priority;
    this.#project = project;
    this.#isDone = isDone;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    if (!value || typeof value !== "string") {
      throw new Error("Title must be a non-empty string");
    }
    this.#title = value.trim();
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    this.#description = value?.trim() ?? "";
  }

  get dueDate() {
    return this.#dueDate;
  }

  set dueDate(value) {
    const date = new Date(value[0],value[1],value[2]);
    if (isNaN(date)) throw new Error("Invalid due date");
    this.#dueDate = date;
  }

  get priority() {
    return this.#priority;
  }

  set priority(value) {
    const valid = [0, 1, 2, 3];
    if (!valid.includes(value)) {
      throw new Error(`Priority must be one of: ${valid.join(", ")}`);
    }
    this.#priority = value;
  }

  get project() {
    return this.#project;
  }

  set project(value) {
    if (!value || typeof value !== "string") {
      throw new Error("Project must be a non-empty string");
    }
    this.#project = value.trim();
  }

  get isDone() {
    return this.#isDone;
  }

  set isDone(value) {
    this.#isDone = value;
  }








}


