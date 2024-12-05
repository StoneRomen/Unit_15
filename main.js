document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.js--form');
    const input = document.querySelector('.js--form__input');
    const todosWrapper = document.querySelector('.js--todos-wrapper');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const renderTodo = () => {
        todosWrapper.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            if (todo.completed) {
                todoItem.classList.add('todo-item--checked');
            }
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodoCompletion(index));

            const description = document.createElement('span');
            description.classList.add('todo-item__description');
            description.textContent = todo.text;
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('todo-item__delete');
            deleteButton.textContent = 'Видалити';
            deleteButton.addEventListener('click', () => deleteTodo(index));
            
            todoItem.append(checkbox);
            todoItem.append(description);
            todoItem.append(deleteButton);
            todosWrapper.append(todoItem);
        });
    };

    const addTodo = (text) => {
        todos.push({ text, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodo();
    };

    const deleteTodo = (index) => {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodo();
    };

    const toggleTodoCompletion = (index) => {
        todos[index].completed = !todos[index].completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodo();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text !== '') {
            addTodo(text);
            input.value = '';
        }
    });

    renderTodo();
});
