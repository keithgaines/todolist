$(document).ready(function() {
    const form = $('.form');
    const input = $('.input');
    const todosUL = $('.todos');
    const emptyMsg = $('.empty-msg');
  
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    if (todos.length > 0) {
      todos.forEach((todo) => addToDo(todo));
    } else {
      showEmptyMsg();
    }
  
    form.on('submit', function(e) {
      e.preventDefault();
      addToDo();
      hideEmptyMsg();
    });
  
    function addToDo (todo) {
      let todoText = input.val();
  
      if (todo) {
        todoText = todo.text;
      }
  
      if (todoText) {
        const todoEl = $('<li></li>');
  
        if (todo && todo.completed) {
          todoEl.addClass('completed');
        }
  
        todoEl.text(todoText);
  
        todoEl.on('click', () => todoEl.toggleClass('completed'));
  
        todoEl.on('contextmenu', (e) => {
          e.preventDefault();
  
          todoEl.remove();
          updateLS();
          if (todosUL.children().length === 0) {
            showEmptyMsg();
          }
        });
  
        todosUL.append(todoEl);
  
        input.val('');
  
        updateLS();
      }
    }
  
    function updateLS() {
      const todosEl = $('li');
  
      const todos = [];
  
      todosEl.each((index, todoEl) => {
        todos.push({
          text: $(todoEl).text(),
          completed: $(todoEl).hasClass('completed'),
        });
      });
  
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    function showEmptyMsg() {
      emptyMsg.show();
    }
  
    function hideEmptyMsg() {
      emptyMsg.hide();
    }
  });
  