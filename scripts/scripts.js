const loadLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevels(data.data));
};

const loadCourses = (level_no) => {
  const url = `https://openapi.programming-hero.com/api/level/${level_no}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCourses(data.data));
};

const displayCourses = (courses) => {
  console.log(courses);
  const coursesContainer = document.getElementById("courses-container");

  coursesContainer.innerHTML = "";
  courses.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.innerHTML = `
                  <button class="btn btn-outline btn-secondary">
                  ${course.word}
                  </button>
      `;
    coursesContainer.appendChild(courseDiv);
  });
};

const displayLevels = (levels) => {
  const levelsContainer = document.getElementById("levels-container");
  console.log(levels);
  levelsContainer.innerHTML = "";
  levels.forEach((level) => {
    const levelDiv = document.createElement("div");
    levelDiv.innerHTML = `
                  <button onclick = "loadCourses(${level.level_no})" class="btn btn-outline btn-primary">
                  <i class="fa-solid fa-book-open-reader"></i>Learn - ${level.level_no}
                  </button>
      `;
    levelsContainer.appendChild(levelDiv);
  });
};

loadLevels();
