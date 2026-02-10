const loadLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevels(data.data));
};

const displayLevels = (levels) => {
  const levelsContainer = document.getElementById("levels-container");
  console.log(levels);
  //   levelsContainer.innerHTML = "";
  //   levels.forEach((level) => {
  //     const levelDiv = document.createElement("div");
  //     levelDiv.innerHTML = `
  //       <h2>${level.name}</h2>
  //       <p>${level.description}</p>
  //     `;
  //     levelsContainer.appendChild(levelDiv);
  //   });
};

loadLevels();
