// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  chrome.tabs.executeScript({
    code: 'var youtube = document.querySelector("video");\nif (youtube.paused){youtube.play();}\nelse {youtube.pause();}',
  });
});
