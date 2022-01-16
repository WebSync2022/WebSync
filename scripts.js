var currentUrl = window.location.href;
console.log(currentUrl);
// if (
//   chrome.tabs.url ==
//   "https://www.youtube.com/watch?v=0XSHWXkpIYA&ab_channel=Mightyraccoon%21"
// ) {
//   console.log("wtfffffff bitchchchchahsahd");
//   chrome.tabs.executeScript({
//     code: 'console.log("Archit wtf is this?");\nconst video = document.querySelector("video");\nvideo.addEventListener("pause", (event) => {console.log("The Boolean paused property is now true. Either the " +"pause() method was called or the autoplay attribute was toggled.");});',
//   });
// }

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (
//     tab.url.indexOf(
//       "https://www.youtube.com/watch?v=0XSHWXkpIYA&ab_channel=Mightyraccoon%21"
//     ) > -1 &&
//     changeInfo.url === undefined
//   ) {
//     chrome.tabs.executeScript({
//       code: 'console.log("Archit wtf is this?");\nconst video = document.querySelector("video");\nvideo.addEventListener("pause", (event) => {console.log("The Boolean paused property is now true. Either the " +"pause() method was called or the autoplay attribute was toggled.");});',
//     });
//   }
// });
var socket = io.connect("https://server-e5ic2cscaq-nn.a.run.app/");
socket.on("connect", function () {
  console.log("Client connected");
});
const video = document.querySelector("video");
video.addEventListener("pause", (event) => {
  {
    console.log("video is paused");
    var currentTime = video.currentTime;

    socket.emit("join session", "room-unique", "archit");
    socket.emit("sync signal", "room-unique", {
      type: "pause",
      timestamp: currentTime,
      message: "hi",
    });
    console.log("send pause command");
  }
});

video.addEventListener("play", (event) => {
  {
    console.log("video is playing");
    var currentTime = video.currentTime;

    socket.emit("join session", "room-unique", "archit");
    socket.emit("sync signal", "room-unique", {
      type: "play",
      timestamp: currentTime,
      message: "hi",
    });
    console.log("send play command");
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
