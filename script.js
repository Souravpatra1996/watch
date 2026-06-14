const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const digitalTime = document.getElementById("digitalTime");
const dateText = document.getElementById("dateText");
const modeButton = document.getElementById("modeButton");
const modeText = document.getElementById("modeText");

let useTwentyFourHour = true;

function updateWatch() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  const secondDegrees = ((seconds + milliseconds / 1000) / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = (((hours % 12) + minutes / 60) / 12) * 360;

  hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;

  digitalTime.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !useTwentyFourHour
  });

  dateText.textContent = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  requestAnimationFrame(updateWatch);
}

modeButton.addEventListener("click", () => {
  useTwentyFourHour = !useTwentyFourHour;
  modeButton.setAttribute("aria-pressed", String(!useTwentyFourHour));
  modeText.textContent = useTwentyFourHour ? "24-hour" : "12-hour";
});

updateWatch();
