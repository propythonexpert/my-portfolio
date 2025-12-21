const monthYear = document.getElementById("monthYear");
const dates = document.getElementById("dates");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const themeToggle = document.getElementById("themeToggle");

let currentDate = new Date();

function renderCalendar() {
  dates.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.innerText = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    dates.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= lastDate; day++) {
    const today = new Date();
    let className = "";

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      className = "today";
    }

    dates.innerHTML += `<div class="${className}">${day}</div>`;
  }
}

/* Month navigation */
prev.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

next.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

/* 🌙 Dark Mode */
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.innerText = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.innerText = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.innerText = "🌙";
  }
});

renderCalendar();
