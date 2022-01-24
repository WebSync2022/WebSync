var currentUrl = window.location.href;
console.log(currentUrl);
var isMaster = true;

var socket = io.connect("https://server-e5ic2cscaq-nn.a.run.app/");
socket.on("connect", function () {
  console.log("Client connected");
});

chrome.storage.local.get(["sessionInfo"], (result) => {
  room = result.sessionInfo.joinedWith;
  socket.emit("join session", room, "archit");
  console.log("user joined", room);
});

chrome.storage.onChanged.addListener(() => {
  chrome.storage.local.get(["sessionInfo"], (result) => {
    room = result.sessionInfo.joinedWith;
    socket.emit("join session", room, "archit");
    console.log("user joined", room);
  });
});

const video = document.querySelector("video");
video.addEventListener("click", () => {
  if (video.paused) {
    var currentTime = video.currentTime;
    isMaster = true;

    isMaster &&
      socket.emit("sync signal", room, {
        type: "play",
        timestamp: currentTime,
        message: "hi",
      });
    console.log("send play command");
  } else {
    var currentTime = video.currentTime;
    isMaster = true;
    isMaster && socket.emit("sync signal", room, {
      type: "pause",
      timestamp: currentTime,
      message: "hi",
    });
    console.log("send pause command");
  }
});

// video.addEventListener("pause", (event) => {
//   {
//     console.log("video is paused");
//     var currentTime = video.currentTime;
//     isMaster = true;

//     isMaster && socket.emit("sync signal", room, {
//       type: "pause",
//       timestamp: currentTime,
//       message: "hi",
//     });
//     console.log("send pause command");
//     console.log(room);
//     console.log(isMaster);
//   }
// });

// video.addEventListener("play", (event) => {
//   {
//     console.log("video is playing");
//     var currentTime = video.currentTime;
//     isMaster = true;
//     socket.emit("sync signal", room, {
//       type: "play",
//       timestamp: currentTime,
//       message: "hi",
//     });
//     console.log("send play command");
//     console.log(room);
//     console.log(isMaster);
//   }
// });

// chrome.tabs.update({ url: "http://www.google.com" });
// document.location = "http://www.google.com";
console.log(document.location);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === "hello!") {
    console.log(request.url); // new url is now in content scripts!
    setTimeout(()=>{isMaster = true}, 250);

    isMaster &&
      socket.emit("sync signal", room, {
        type: "url",
        url: request.url,
      });
    console.log(isMaster);
  }
});

socket.on("signal", (data) => {
  console.log(data);
  console.log(data.type);
  console.log(data.message);
  console.log(data.timestamp);
  isMaster = false;
  if (data.type === "play") {
    video.currentTime = data.timestamp;
    video.play();
    console.log(message);
  } else if (data.type === "pause") {
    video.currentTime = data.timestamp;
    video.pause();
    console.log(message);
  } else if (data.type === "url") {
    console.log(data.url);
    document.location.href = data.url;
  }
});
