const loadLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      displayLevels(data.data);
    });
};

const loadCourses = (level_no) => {
  const url = `https://openapi.programming-hero.com/api/level/${level_no}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(
        `lesson-button-${level_no}`,
      );
      clickedButton.classList.add("btn-active");
      displayCourses(data.data);
      //   console.log(clickedButton);
    });
};

const removeActiveClass = () => {
  const buttons = document.querySelectorAll(".active-btn");
  buttons.forEach((button) => {
    button.classList.remove("btn-active");
  });
};

const displayCourses = (courses) => {
  console.log(courses);
  const coursesContainer = document.getElementById("word-container");

  coursesContainer.innerHTML = "";

  if (courses.length === 0) {
    coursesContainer.innerHTML = `
    <div class="text-center col-span-full font-bangla text-xl py-10 space-y-6 rounded-xl bg-gray-100">
          <img class="mx-auto" src="./assets/alert-error.png" alt="">      
          <p class="font-bold text-2xl text-gray-400">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <p class="font-extrabold text-4xl">নেক্সট Lesson এ যান</p>
    </div>`;
    return;
  }

  courses.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.innerHTML = `
        <!-- Words will be dynamically added here -->
        <div
          class="bg-white p-6 rounded-lg shadow-md text-center py-10 px-5 space-y-4 h-full flex flex-col "
        >
          <h2 class="text-2xl font-bold mb-4">${course.word ? course.word : "No word available"}</h2>
          <p class="font-semibold">Meaning/Pronounciation</p>
          <div class="text-2xl font-medium font-bangla">"${course.meaning ? course.meaning : "No meaning available"} / ${course.pronunciation ? course.pronunciation : "No pronunciation available"}"</div>
          <div class="flex justify-between">
            <button class="btn btn-outline btn-primary">
              <i onclick="my_modal_5.showModal()" class="fa-solid fa-circle-info"></i>
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
                  <button id="lesson-button-${level.level_no}" onclick = "loadCourses(${level.level_no})" class="btn btn-outline btn-primary active-btn">
                  <i class="fa-solid fa-book-open-reader"></i>Learn - ${level.level_no}
                  </button>
      `;
    levelsContainer.appendChild(levelDiv);
  });
};

loadLevels();
