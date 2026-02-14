const createElements = (arr) => {
  const htmlElements = arr.map((item) => `<span class = "btn">${item}</span>`);
  return htmlElements.join("");
};
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (isLoading) => {
  const spinner = document.getElementById("loading-section");
  const wordContainer = document.getElementById("word-container");
  if (isLoading) {
    spinner.classList.remove("hidden");
    wordContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    wordContainer.classList.remove("hidden");
  }
};

const loadLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      displayLevels(data.data);
    });
};

const loadCourses = (level_no) => {
  manageSpinner(true);
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

const loadWordDetails = async (wordId) => {
  const url = `https://openapi.programming-hero.com/api/word/${wordId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayWordDetails(data.data);
};

const displayWordDetails = (word) => {
  console.log(word);
  const wordDetailsContainer = document.getElementById(
    "word-details-container",
  );
  wordDetailsContainer.innerHTML = `   
  
        <div>
            <h2 class="text-2xl font-bold">
              ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
            </h2>
        </div>
        <div>
            <h2 class="font-bold">Meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
        </div>
        <div>
            <h2 class="font-bold">Example</h2>
            <p class="text-xl">${word.sentence}</p>
        </div>
        <div>
            <h2 class="font-bold font-bangla">সমার্থক শব্দ গুলো</h2>
        <div class="space-x-2">
          ${createElements(word.synonyms)}
        </div>
        </div>`;

  wordModal = document.getElementById("my_modal_5");
  wordModal.showModal();
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
    manageSpinner(false);
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
            <button onclick="loadWordDetails('${course?.id}')" class="btn btn-outline btn-primary">
              <i  class="fa-solid fa-circle-info"></i>
            </button>
            <button onclick="pronounceWord('${course?.word}')" class="btn btn-outline btn-primary">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
      `;
    coursesContainer.appendChild(courseDiv);
  });
  manageSpinner(false);
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

document.getElementById("btn-search").addEventListener("click", () => {
  removeActiveClass();
  const searchInput = document.getElementById("input-search");
  const searchValue = searchInput.value.trim().toLowerCase();
  console.log(searchInput);

  fetch(`https://openapi.programming-hero.com/api/words/all`)
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter(
        (word) => word.word.toLowerCase() === searchValue,
      );
      displayCourses(filterWords);
    });

  //   if (searchInput.trim() === "") {
  //     alert("Please enter a word to search.");
  //     return;
  //   }
  //   loadWordDetails(searchInput);
});
