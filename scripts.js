var currentUrl = window.location.href;
console.log(currentUrl);

var socket = io.connect("https://server-e5ic2cscaq-nn.a.run.app/");
socket.on("connect", function () {
  console.log("Client connected");
});

chrome.storage.local.get(["sessionInfo"], (result) => {
  room = result.sessionInfo.joinedWith;
});

chrome.storage.onChanged.addListener(() => {
  chrome.storage.local.get(["sessionInfo"], (result) => {
    room = result.sessionInfo.joinedWith;
  });
});

const video = document.querySelector("video");
video.addEventListener("pause", (event) => {
  {
    socket.emit("join session", room, "archit");

    console.log("video is paused");
    var currentTime = video.currentTime;

    socket.emit("sync signal", room, {
      type: "pause",
      timestamp: currentTime,
      message: "hi",
    });
    console.log("send pause command");
    console.log(room);
  }
});

video.addEventListener("play", (event) => {
  {
    socket.emit("join session", room, "archit");
    console.log("video is playing");
    var currentTime = video.currentTime;

    socket.emit("sync signal", room, {
      type: "play",
      timestamp: currentTime,
      message: "hi",
    });
    console.log("send play command");
    console.log(room);
  }
});

socket.on("signal", (data) => {
  console.log(data);
  console.log(data.type);
  console.log(data.message);
  console.log(data.timestamp);
  if (data.type == "play") {
    video.currentTime = data.timestamp;
    video.play();
    console.log(message);
  } else if (data.type == "pause") {
    video.currentTime = data.timestamp;
    video.pause();
    console.log(message);
  }
  console.log("done");
});
