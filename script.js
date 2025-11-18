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
    // 1. Buat container item
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    // 2. Buat Input Text (Editable Item)
    const inputItem = document.createElement("input");
    inputItem.type = "text";
    inputItem.className = "todo-text-input";
    inputItem.value = item;

    // Simpan nilai asli untuk fitur "Cancel"
    let originalText = item;

    // 3. Buat Container Tombol Delete
    const deleteGroup = document.createElement("div");
    deleteGroup.className = "action-btn-group delete-group";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn-sm btn-delete";
    deleteBtn.onclick = () => deleteTodo(index);

    deleteGroup.appendChild(deleteBtn);

    // 4. Buat Container Tombol Edit (Update & Cancel)
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

    // --- EVENT LISTENERS (LOGIKA UTAMA) ---

    // A. Saat Input diklik/fokus -> Masuk Mode Edit
    inputItem.addEventListener("focus", () => {
      itemDiv.classList.add("editing"); // CSS akan menyembunyikan delete, memunculkan update/cancel
    });

    // B. Tombol Cancel -> Keluar Mode Edit & Kembalikan Text Lama
    cancelBtn.addEventListener("click", () => {
      inputItem.value = originalText; // Reset text
      itemDiv.classList.remove("editing"); // Kembali ke tampilan normal
      inputItem.blur(); // Hilangkan fokus dari input
    });

    // C. Tombol Update -> Simpan Perubahan
    updateBtn.addEventListener("click", () => {
      updateTodo(index, inputItem.value);
    });

    // D. Tombol Enter di Input Item -> Sama dengan Update
    inputItem.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        updateTodo(index, inputItem.value);
        inputItem.blur();
      }
    });

    // Masukkan semua elemen ke dalam Item Div
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
  render(); // Render ulang untuk mereset tampilan ke mode normal
}
