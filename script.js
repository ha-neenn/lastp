
const scenes = document.querySelectorAll(".scene");
const dots = document.querySelectorAll(".scene-dot");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const progressFill = document.getElementById("progressFill");
const sceneNumber = document.getElementById("sceneNumber");

let currentScene = 0;

function showScene(number) {
  currentScene = number;

  scenes.forEach(function (scene, index) {
    scene.classList.remove("active");

    if (index === currentScene) {
      scene.classList.add("active");
    }
  });

  dots.forEach(function (dot, index) {
    dot.classList.remove("active");

    if (index === currentScene) {
      dot.classList.add("active");
    }
  });

  previousButton.disabled = currentScene === 0;
  nextButton.disabled = currentScene === scenes.length - 1;

  sceneNumber.textContent = "0" + (currentScene + 1);

  const progress = ((currentScene + 1) / scenes.length) * 100;
  progressFill.style.width = progress + "%";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

nextButton.addEventListener("click", function () {
  if (currentScene < scenes.length - 1) {
    showScene(currentScene + 1);
  }
});

previousButton.addEventListener("click", function () {
  if (currentScene > 0) {
    showScene(currentScene - 1);
  }
});

dots.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    showScene(index);
  });
});

document.querySelectorAll(".next-button").forEach(function (button) {
  button.addEventListener("click", function () {
    if (currentScene < scenes.length - 1) {
      showScene(currentScene + 1);
    }
  });
});

document.getElementById("homeLink").addEventListener("click", function (event) {
  event.preventDefault();
  showScene(0);
});

document.querySelectorAll(".thought-card").forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("open");
    const isOpen = card.classList.contains("open");
    card.setAttribute(
      "aria-expanded",
      isOpen.toString(),
    );
    card.querySelector(".card-hint").textContent = isOpen
      ? "Tap to close ↙"
      : "Tap to reveal ↗";
  });
});

const letterButton = document.getElementById("letterButton");
const letterLastLine = document.getElementById("letterLastLine");

letterButton.addEventListener("click", function () {
  letterLastLine.classList.toggle("hidden");

  if (letterLastLine.classList.contains("hidden")) {
    letterButton.innerHTML = 'There is one last line <span>♡</span>';
  } else {
    letterButton.innerHTML = "I meant every word ♡";
  }
});

const wishButton = document.getElementById("wishButton");
const wishMessage = document.getElementById("wishMessage");

wishButton.addEventListener("click", function () {
  wishMessage.classList.toggle("hidden");

  if (wishMessage.classList.contains("hidden")) {
    wishButton.innerHTML = 'One last little wish <span>✦</span>';
  } else {
    wishButton.innerHTML = "Keep that wish close ♡";
    makeLittleStars();
  }
});

function makeLittleStars() {
  const endingArt = document.querySelector(".ending-art");

  for (let i = 0; i < 12; i++) {
    const star = document.createElement("span");

    star.textContent = Math.random() > 0.5 ? "✦" : "·";
    star.classList.add("wish-star");

    star.style.left = Math.random() * 90 + 5 + "%";
    star.style.top = Math.random() * 75 + 10 + "%";
    star.style.animationDelay = Math.random() * 0.8 + "s";

    endingArt.appendChild(star);
  }
}

document.getElementById("restartButton").addEventListener("click", function () {
  document.querySelectorAll(".thought-card").forEach(function (card) {
    card.classList.remove("open");
    card.setAttribute("aria-expanded", "false");
    card.querySelector(".card-hint").textContent = "Tap to reveal ↗";
  });

  letterLastLine.classList.add("hidden");
  letterButton.innerHTML = 'There is one last line <span>♡</span>';

  wishMessage.classList.add("hidden");
  wishButton.innerHTML = 'One last little wish <span>✦</span>';

  document.querySelectorAll(".wish-star").forEach(function (star) {
    star.remove();
  });

  showScene(0);
});

showScene(0);
