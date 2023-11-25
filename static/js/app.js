/* vars */
const searchbar = document.querySelector(".searchbar-container");
const urlContainer = document.querySelector(".url-container");
const themeBtn = document.getElementById("theme-btn");
const themeTitle = document.getElementById("theme-title");
const themeIcon = document.getElementById("theme-icon");
const submitBtn = document.getElementById("submit");
const urlInput = document.getElementById("url-input");
const root = document.documentElement.style;
let darkMode = true;


/* Function to check if localStorage has savedURLs */
function getSavedURLs() {
  return JSON.parse(localStorage.getItem("savedURLs")) || [];
}

/* Function to create the HTML elements for each URL and its status */
function createURLStats(url, status) {
  var wrapper = document.createElement("div");
  wrapper.classList.add("url-stats-wrapper");

  var stat = document.createElement("div");
  stat.classList.add("url-stat");

  var img = document.createElement("img");
  img.setAttribute("src", status === "safe" ? "/static/assets/true-check.png" : "/static/assets/red-alert.png");
  img.setAttribute("alt", status === "safe" ? "true-check" : "red-alert");

  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.classList.add("url");
  link.textContent = url;

  stat.appendChild(img);
  stat.appendChild(link);
  wrapper.appendChild(stat);

  return wrapper;
}

/* Function to initialize the UI based on savedURLs */
function initializeUI() {
  var savedURLs = getSavedURLs();
  var enteredUrlsDiv = document.getElementById("entered-urls");
  var noUrlEnteredDiv = document.getElementById("no-url-entered");

  if (savedURLs.length > 0) {
    enteredUrlsDiv.innerHTML = "";

    for (var i = savedURLs.length - 1; i >= 0; i--) {
      enteredUrlsDiv.appendChild(
        createURLStats(savedURLs[i].url, savedURLs[i].status)
      );
    }

    noUrlEnteredDiv.style.display = "none";
  } else {
    noUrlEnteredDiv.style.display = "block";
    enteredUrlsDiv.style.display = "none";
  }
}

/* Call initializeUI when the page loads */
window.addEventListener("load", initializeUI);



/* Event Listeners */
submitBtn.addEventListener("click", function () {
  var url = urlInput.value.trim();
  var status = "save";

  if (url !== "") {
    var savedURLs = JSON.parse(localStorage.getItem("savedURLs")) || [];
    var existingUrlIndex = savedURLs.findIndex(function (item) {
      return item.url === url;
    });

    if (existingUrlIndex !== -1) {
      savedURLs[existingUrlIndex].status = status;
      localStorage.setItem("savedURLs", JSON.stringify(savedURLs));
    } else {
      savedURLs.push({ url: url, status: status });
      localStorage.setItem("savedURLs", JSON.stringify(savedURLs));
    }

    if(savedURLs.length == 1) {
      window.location.href = "";
    }
    initializeUI();
  } else {
    initializeUI();
  }
});

// submitBtn.addEventListener("click", function () {
//   var url = urlInput.value.trim();

//   if (url !== "") {
//     var newURL = { url: url };
//     fetch("/check-url", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newURL),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data === 1) {
//           /* URL is safe, update local storage and UI */
//           var savedURLs = JSON.parse(localStorage.getItem("savedURLs")) || [];
//           savedURLs.push({ url: url, status: 'safe' });
//           localStorage.setItem("savedURLs", JSON.stringify(savedURLs));
//         } else {
//           var savedURLs = JSON.parse(localStorage.getItem("savedURLs")) || [];
//           savedURLs.push({ url: url, status: 'not-safe' });
//           localStorage.setItem("savedURLs", JSON.stringify(savedURLs));
//         }
//         if (savedURLs.length == 1) {
//           window.location.href = "";
//         }
//         initializeUI();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   } else {
//     initializeUI();
//   }
// });


urlInput.addEventListener("input", function () {
  urlContainer.classList.remove("active");
  searchbar.classList.add("active");
});

themeBtn.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});



/* dark mode default */
const prefersDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const localStorageDarkMode = localStorage.getItem("themeMode");
if (localStorageDarkMode === null) {
  localStorage.setItem("dark-mode", prefersDarkMode);
  darkMode = prefersDarkMode;
}
if (localStorageDarkMode) {
  darkMode = localStorageDarkMode;
  darkModeProperties();
} else {
  localStorage.setItem("dark-mode", prefersDarkMode);
  darkMode = prefersDarkMode;
  lightModeProperties();
}


function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  themeTitle.innerText = "LIGHT";
  themeIcon.src = "/static/assets/icon-sun.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  localStorage.setItem("dark-mode", true);
}


function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  themeTitle.innerText = "DARK";
  themeIcon.src = "/static/assets/icon-moon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}
urlContainer.classList.toggle("active");
searchbar.classList.toggle("active");
