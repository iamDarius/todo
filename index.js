// Todo items
let todos = [];

const addNewTodoBtn = document.querySelector("#create-todo");
const todoDescription = document.querySelector("#todo-description");
const todoList = document.querySelector(".todo-list");
const todoItem = document.querySelector(".todo-item");
const todoCount = document.querySelector("#todo-count");
const showTodoList = document.querySelector(".show-todo-list");
const listContainer = document.querySelector("#list-container");
const checkbox = document.querySelector(".checkbox");

getTodoCount();
displayTodoList();
getActiveTodos();

// Event Listeners
addNewTodoBtn.addEventListener("click", () => {
  createTodo(todoDescription.value);
  getTodoCount();
  displayTodoList();
  console.log("Todo Added");
});

// listens for removed todo items
todoList &&
  todoList.addEventListener("click", (e) => {
    const id = e.target.id;
    if (e.target.className === "btn btn-light") {
      removeTodo(id);
      displayTodoList();
      getTodoCount();
    }
  });

todoList &&
  todoList.addEventListener("change", (e) => {
    const id = e.target.id;
    const checkbox = document.getElementById(id);
    if (checkbox.checked) {
      completeTodo(e);
      displayTodoList();
      getTodoCount();
    }
  });

function createTodo(text) {
  const id = "id" + new Date().getTime();
  const newItem = { id, text, isComplete: false };
  todos.push(newItem);
  todoList.innerHTML += `
    <div class="py-2 border-bottom row" id="item-${newItem.id}">
       <div class="col-10"><input class="checkbox align-bottom" type="checkbox" id="checkbox-${newItem.id}" name="${newItem.id}"><label class="align-bottom" for="${newItem.id}"> ${newItem.text}</label> </div>
       <div class="col-2"><button id="btn-${newItem.id}" class="btn btn-light">Remove</button></div> 
    </div>
    `;
  todoDescription.value = "";
}

// Delete Todo
function removeTodo(id) {
  const itemId = getItemId(id);
  const divToRemove = `item-${itemId}`;
  todos = todos.filter((todo) => todo.id !== itemId);
  document.getElementById(divToRemove).remove();
  displayTodoList();
}

// Edit existing Todo Item
function updateTodo() {}

// Check off a Todo Item
function completeTodo(e) {
  const textDevElementId = e.currentTarget.firstElementChild.id;
  const uid = textDevElementId.slice(5);
  const index = todos.findIndex((todo) => todo.id === uid);
  todos[index].isComplete = true;

  document.getElementById(textDevElementId).remove();
  getActiveTodos();
}

// See All Completed Todos
function viewCompletedTodos() {}

/* Utility functions */
function getItemId(id) {
  return id.slice(4);
}

function getTodoCount() {
  const activeTodos = todos.filter((todo) => !todo.isComplete);
  todoCount.innerHTML =
    activeTodos && activeTodos.length ? `${activeTodos.length} Items` : "There are no active items.";
  console.log({ todos });
}

function displayTodoList() {
  if (todos.length > 0) {
    listContainer.classList.replace("hide-list", "display-list");
  } else {
    listContainer.classList.replace("display-list", "hide-list");
  }
}

function getActiveTodos() {
  todos.filter((todo) => !todo.isComplete);
}
