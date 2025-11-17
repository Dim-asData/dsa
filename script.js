const input = document.getElementById("todoInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

let todos = [];

input.addEventListener("input", () => {
  btn.disabled = input.value.trim().length === 0;
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
  todos.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = item;
    list.appendChild(div);
  });
}
