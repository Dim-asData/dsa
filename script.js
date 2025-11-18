const input = document.getElementById("todoInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

let todos = [];

input.addEventListener("input", () => {
  btn.disabled = input.value.trim().length === 0;
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !btn.disabled) {
    btn.click();
  }
});

btn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  todos.unshift(text);
  render();

  input.value = "";
  btn.disabled = true;
});

function render() {
  list.innerHTML = "";

  todos.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const inputItem = document.createElement("input");
    inputItem.type = "text";
    inputItem.className = "todo-text-input";
    inputItem.value = item;

    let originalText = item;

    const deleteGroup = document.createElement("div");
    deleteGroup.className = "action-btn-group delete-group";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn-sm btn-delete";
    deleteBtn.onclick = () => deleteTodo(index);

    deleteGroup.appendChild(deleteBtn);

    const editGroup = document.createElement("div");
    editGroup.className = "action-btn-group edit-group"; // Hidden by default via CSS

    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.className = "btn-sm btn-update";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "btn-sm btn-cancel";

    editGroup.appendChild(updateBtn);
    editGroup.appendChild(cancelBtn);

    inputItem.addEventListener("focus", () => {
      itemDiv.classList.add("editing");
    });

    cancelBtn.addEventListener("click", () => {
      inputItem.value = originalText;
      itemDiv.classList.remove("editing");
      inputItem.blur();
    });

    updateBtn.addEventListener("click", () => {
      updateTodo(index, inputItem.value);
    });

    inputItem.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        updateTodo(index, inputItem.value);
        inputItem.blur();
      }
    });

    itemDiv.appendChild(inputItem);
    itemDiv.appendChild(deleteGroup);
    itemDiv.appendChild(editGroup);

    list.appendChild(itemDiv);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}

function updateTodo(index, newValue) {
  if (newValue.trim()) {
    todos[index] = newValue.trim();
  }
  render();
}
