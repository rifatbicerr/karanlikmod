document.getElementById("toggle-dark-mode").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: toggleDarkMode,
    });
  });
});

function toggleDarkMode() {
  if (!document.body.classList.contains("dark-mode")) {
    const darkStyle = document.createElement("style");
    darkStyle.id = "dark-mode-style";
    darkStyle.textContent = `
      html, body {
        filter: invert(1) hue-rotate(180deg);
        background-color: #121212 !important;
      }
      img, video {
        filter: invert(1) hue-rotate(180deg);
      }
    `;
    document.head.appendChild(darkStyle);
    document.body.classList.add("dark-mode");
  } else {
    const darkStyle = document.getElementById("dark-mode-style");
    if (darkStyle) darkStyle.remove();
    document.body.classList.remove("dark-mode");
  }
}
