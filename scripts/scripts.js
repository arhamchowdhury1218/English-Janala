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
  const coursesContainer = document.getElementById("word-container");

  coursesContainer.innerHTML = "";
  courses.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.innerHTML = `
        <!-- Words will be dynamically added here -->
        <div
          class="bg-white p-6 rounded-lg shadow-md text-center py-10 px-5 space-y-4"
        >
          <h2 class="text-2xl font-bold mb-4">${course.word}</h2>
          <p class="font-semibold">Meaning/Pronounciation</p>
          <div class="text-2xl font-medium font-bangla">"${course.meaning}"</div>
          <div class="flex justify-between">
            <button class="btn btn-outline btn-primary">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn btn-outline btn-primary">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
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
