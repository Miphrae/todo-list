export { Todo };
import { parseISO, compareAsc, format } from "date-fns";

function prettyDate(dueDateString) {
  const date = parseISO(dueDateString);

  // Full, human-friendly: “July 14, 2025”
  // const full  = format(date, "MMMM d, yyyy");

  // Short/condensed: “Jul 14, 2025”
  const short = format(date, "MMM d, yyyy");

  // Weekday + short: “Mon, Jul 14”
  // const weekdayShort = format(date, "EEE, MMM d");

  // Numeric: “07/14/2025”
  // const numeric = format(date, "MM/dd/yyyy");

  // return { full, short, weekdayShort, numeric };
  return short;
}

class Todo {
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
    priority = 3,
    project = "",
    isDone = false
  ) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = prettyDate(dueDate);
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
    // const date = new Date(value[0],value[1],value[2]);
    // if (isNaN(date)) throw new Error("Invalid due date");
    try {
      this.#dueDate = prettyDate(value);
    } catch (e) {
      throw new Error("Invalid dueDate format. Expected ISO string.");
    }
  }

  get priority() {
    return this.#priority;
  }

  set priority(value) {
    const valid = [1, 2, 3];
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


