
function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Function to get a cookie value
function getCookie(name) {
  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    const [key, val] = cookie.split("=");
    if (key === name) return val;
  }
  return null;
}

// Apply font settings to CSS variables
function applyFontSettings(fontSize, fontColor) {
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);
}

// On page load: apply saved cookies
window.addEventListener("DOMContentLoaded", () => {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) document.getElementById("fontsize").value = savedFontSize;
  if (savedFontColor) document.getElementById("fontcolor").value = savedFontColor;

  applyFontSettings(savedFontSize || 16, savedFontColor || "#000000");
});

// Handle Save button
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Save cookies
  setCookie("fontsize", fontSize);
  setCookie("fontcolor", fontColor);

  // Apply changes immediately
  applyFontSettings(fontSize, fontColor);

  alert("Preferences saved!");
});

// Optional: live preview while changing inputs
document.getElementById("fontsize").addEventListener("input", (e) => {
  applyFontSettings(e.target.value, document.getElementById("fontcolor").value);
});

document.getElementById("fontcolor").addEventListener("input", (e) => {
  applyFontSettings(document.getElementById("fontsize").value, e.target.value);
});