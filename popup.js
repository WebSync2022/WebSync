// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// const youtube = document.querySelector("video");

// youtube.addEventListener("pause", (event) => {
//   if (youtube.paused) {
//     youtube.play();
//   } else {
//     youtube.pause();
//   }
// });

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  console.log("startttttttttttttttss");
  var socket = io.connect("https://server-e5ic2cscaq-nn.a.run.app/");

  socket.on("connect", function () {
    console.log("Client connected");
  });
  socket.emit("join session", "room", "archit");

  chrome.tabs.executeScript({
    code: 'var youtube = document.querySelector("video");\nif (youtube.paused){youtube.play();}\nelse {youtube.pause();}',
  });

  // chrome.tabs.executeScript({
  //   target: { tabId: tab.id },
  //   function: sendConnection,
  // });
});

// The body of this function will be execuetd as a content script inside the
// current page
// function sendConnection() {
//   var socket = io.connect("https://server-e5ic2cscaq-nn.a.run.app/");

//   socket.on("connect", function () {
//     console.log("Client connected");
//   });
//   socket.emit("join", "room", "archit");
// }
