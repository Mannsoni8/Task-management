const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskDesc = document.querySelector("#taskDesc");
const taskSec = document.querySelector(".task-sec");

const completedCount = document.querySelector("#completedCount");
const pendingCount = document.querySelector("#pendingCount");
const totalCount = document.querySelector("#totalCount");

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

const toggleBtn = document.querySelector("#dark");

const formEdit = document.querySelector(".formEdit");
const editForm = document.querySelector("#editForm");

const editTitle = document.querySelector("#etaskName");
const editDesc = document.querySelector("#etaskDesc");
const editBtn = document.querySelector(".edit-btn");
const cancelBtn = document.querySelector(".cancle-btn");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const isDark = document.body.classList.contains("dark-theme");

  if (isDark) {
    toggleBtn.innerHTML = '<i class="ri-sun-line"></i>';

    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.innerHTML = '<i class="ri-moon-line"></i>';

    localStorage.setItem("theme", "light");
  }
});
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");

  toggleBtn.innerHTML = '<i class="ri-sun-line"></i>';
} else {
  toggleBtn.innerHTML = '<i class="ri-moon-line"></i>';
}

let currentCard = null;
let completed = 0;
let pending = 0;
let total = 0;

function updateStats() {
  completedCount.textContent = completed;
  pendingCount.textContent = pending;
  totalCount.textContent = total;
}

function saveTasks() {
  const tasks = [];

  document.querySelectorAll(".task-card").forEach((card) => {
    tasks.push({
      title: card.querySelector("h3").textContent,
      description: card.querySelector("p").textContent,
      status: card.querySelector(".status").textContent,
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    createTask(task.title, task.description, task.status === "Completed");
  });
}

function createTask(title, description, isCompleted = false) {
  const card = document.createElement("div");

  card.classList.add("task-card");

  card.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>

        <div class="status ${isCompleted ? "completed" : "pending"}">
            ${isCompleted ? "Completed" : "Pending"}
        </div>

        <div class="task-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="complete-btn">
                ${isCompleted ? "Done" : "Complete"}
            </button>
        </div>
    `;

  taskSec.prepend(card);

  total++;

  if (isCompleted) {
    completed++;
  } else {
    pending++;
  }

  updateStats();

  const deleteBtn = card.querySelector(".delete-btn");
  const completeBtn = card.querySelector(".complete-btn");
  const editBtn = card.querySelector(".edit-btn");
  const status = card.querySelector(".status");

  if (isCompleted) {
    completeBtn.disabled = true;
  }

  completeBtn.addEventListener("click", () => {
    if (status.classList.contains("pending")) {
      status.classList.remove("pending");
      status.classList.add("completed");
      status.textContent = "Completed";

      pending--;
      completed++;

      completeBtn.disabled = true;
      completeBtn.textContent = "Done";

      updateStats();
      saveTasks();
    }
  });

  deleteBtn.addEventListener("click", () => {
    if (status.classList.contains("pending")) {
      pending--;
    } else {
      completed--;
    }

    total--;

    card.remove();

    updateStats();
    saveTasks();
  });

  editBtn.addEventListener("click", () => {
    currentCard = card;

    editTitle.value = card.querySelector("h3").textContent;

    editDesc.value = card.querySelector("p").textContent;

    formEdit.style.display = "flex";
  });
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskName.value.trim();
  const description = taskDesc.value.trim();

  if (!title || !description) return;

  createTask(title, description);

  saveTasks();

  taskName.value = "";
  taskDesc.value = "";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!currentCard) {
    console.log("currentCard is null");
    return;
  }

  currentCard.querySelector("h3").textContent = editTitle.value;

  currentCard.querySelector("p").textContent = editDesc.value;

  saveTasks();
  formEdit.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  formEdit.style.display = "none";
  editForm.reset();
  currentCard = null;
});

loadTasks();
updateStats();

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = searchInput.value.toLowerCase();

  const cards = document.querySelectorAll(".task-card");

  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    card.style.display = title.includes(value) ? "flex" : "none";
  });
});
