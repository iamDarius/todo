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
    if (e.target.className === "btn btn-danger") {
      const id = e.target.id;
      removeTodo(id);
      displayTodoList();
      getTodoCount();
    }

    if (e.target.className === "checkbox") {
      const id = e.target.id;
      if (e.target.checked) {
        removeTodo(id);
        displayTodoList();
        getTodoCount();
      } else {
      }
    }
  });

checkbox &&
  checkbox.addEventListener("click", (e) => {
    console.log({ e });
  });

function createTodo(text) {
  const id = "id" + new Date().getTime();
  const newItem = { id, text, isComplete: false };
  todos.push(newItem);
  todoList.innerHTML += `
    <div class="py-2 border-bottom row" id="item-${newItem.id}">
       <div class="col-10"><input class="checkbox" type="checkbox" id="checkbox-${newItem.id}" name="${newItem.id}"><label for="${newItem.id}"> ${newItem.text}</label> </div>
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
function completeTodo() {}

// See All Completed Todos
function viewCompletedTodos() {}

/* Utility functions */
function getItemId(id) {
  return id.slice(4);
}

function getTodoCount() {
  todoCount.innerHTML = todos.length ? `${todos.length} Items` : "There are no active items.";
}

function displayTodoList() {
  if (todos.length > 0) {
    listContainer.classList.replace("hide-list", "display-list");
  } else {
    listContainer.classList.replace("display-list", "hide-list");
  }
}
