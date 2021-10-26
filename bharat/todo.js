var todoList = [];

var pageList = new Array();
var currentPage = 1;
var numberPerPage = 10;
var numberOfPages = 0;

function newElement() {
  var inputTitle = document.getElementById('title').value,
    inputUser = document.getElementById('usr').value,
    inputDate = document.getElementById('due-date').value,
    todo = '';
  if (inputTitle === '') {
    alert("Please write a task");
    return;
  } else {
    todo = inputTitle;
    if (inputUser != '') {
      todo = inputUser + " needs to " + inputTitle;
    }
    if (inputDate != '') {
      todo = todo + " by " + inputDate
    }
  }
  var newTodoId = findNextId(),
    newTodo = {
      'todo': todo,
      'id': 'todo' + newTodoId
    };
  todoList.push(newTodo);
  sortElementsById();
  clearFields();
}

function fetchIdFromObj(todo) {
  return parseInt(todo.id.slice(4));
}

function findNextId() {
  if (todoList.length === 0) {
    return 0;
  }
  var lastElementId = fetchIdFromObj(todoList[todoList.length - 1]),
    firstElementId = fetchIdFromObj(todoList[0]);
  return (firstElementId >= lastElementId) ? (firstElementId + 1) : (lastElementId + 1);
}

function clearFields() {
  document.getElementById('title').value = '';
  document.getElementById('usr').value = '';
  document.getElementById('due-date').value = '';
}

function deleteElement(event) {
  var idOfEltToBeDeleted = event.target.parentElement.id;
  var arrayIndex = todoList.findIndex(function(singleTodo) {
    return singleTodo.id === idOfEltToBeDeleted;
  });
  if (arrayIndex !== -1) {
    todoList.splice(arrayIndex, 1);
  }
  load(todoList);
}
