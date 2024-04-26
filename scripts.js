document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("registrationForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var formData = new FormData(form); // Create FormData object to collect form data

    // Send the data to the API endpoint
    fetch("/api/v1/public/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle response here if needed
        console.log("Registration successful");
      })
      .catch((error) => {
        console.error("There was a problem with your registration:", error);
      });
  });

  // slider
  const interval = 1e3,
    parent = document.getElementById("js-slideshow"),
    items = parent.getElementsByTagName("li");

  items.length && setInterval(() => onSlide(), interval);
  let scrollCount = 0;

  const onSlide = () => {
    const t = items[0];
    (scrollCount = scrollCount === items.length ? 0 : scrollCount + 1),
      parent.scrollTo({
        top: 0,
        left: t.offsetWidth + 16,
        behavior: "smooth",
      }),
      setTimeout(() => {
        parent.appendChild(t), parent.scrollTo({ top: 0, left: 0 });
      }, interval);
  };


const showAfterInactivity = !1,
  popupContainer = document.getElementById("js-exit-intent"),
  mainPopup = document.getElementById("js-exit-intent-main"),
  closeButton = document.getElementById("js-exit-intent-close");
let timeoutId;
const resetTimer = () => {
  window.clearTimeout(timeoutId);
};

class ExitIntent {
  canShow = !0;
  timeout = 0;

  constructor() {
    document.addEventListener("mouseout", (t) => {
      this.shouldShow(t) && this.handleShow(t);
    }),
      closeButton.addEventListener("click", () => this.handleClose()),
      document.addEventListener("click", (t) => {
        t.target.classList.contains("js-registration-country-selector") ||
          mainPopup.contains(t.target) ||
          popupContainer.classList.contains("invisible") ||
          this.handleClose();
      }),
      showAfterInactivity && this.addInactivityListeners();
  }

  shouldShow(t) {
    return (
      t.clientY <= 0 ||
      t.clientX <= 0 ||
      t.clientX >= window.innerWidth ||
      t.clientY >= window.innerHeight
    );
  }

  handleShow(t) {
    if (!this.canShow) return !1;
    popupContainer.classList.remove("invisible"), (this.canShow = !1);
  }

  handleClose() {
    (this.canShow = !1), popupContainer.classList.add("invisible");
  }

  startTimer() {
    const e = this;
    timeoutId = window.setTimeout((t) => e.doInactive(t), 18e4);
  }

  doInactive(t) {
    this.handleShow(t);
  }

  addInactivityListeners() {
    document.addEventListener("mousemove", resetTimer, !1),
      document.addEventListener("mousedown", resetTimer, !1),
      document.addEventListener("keypress", resetTimer, !1),
      document.addEventListener("touchmove", resetTimer, !1),
      this.startTimer();
  }
}

popupContainer && new ExitIntent();

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get parameters from the URL
let offer = getParameterByName("offer");
let apiUrl = "https://admin-staging.igsc.io/api/offers/" + offer;

// Fetch API data
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Get the image URL from the API response
    let imageUrl = data.offer.logoFeatured;
    console.log(imageUrl);
    // Load the image into the HTML
    let dynamicImages = document.querySelectorAll(".main-logo");

    dynamicImages.forEach((dynamicImage) => {
      dynamicImage.src = imageUrl;
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

}); // doc ready end
