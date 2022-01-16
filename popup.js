// Initialize butotn with users's prefered color
//continuing Work 
let changeColor = document.getElementById("changeColor");

const joinSession = document.getElementById("joinSessionBtn");
const joinFinal = document.getElementById("join");
const cancelBtn = document.getElementById("cancel");
const disconnect = document.getElementById("disconnect");
const createSession = document.getElementById("createSessionBtn");

var sessionInfo = {
  'mySessionId': undefined,
  'joinedWith' : undefined,
  'connected' : false,
};

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('Extension starting up.');

  chrome.storage.local.get(['sessionInfo'], (result) => {
    console.log(JSON.stringify(result));
    sessionInfo.mySessionId = result.sessionInfo === undefined ? undefined : result.sessionInfo.mySessionId;
    sessionInfo.joinedWith = result.sessionInfo === undefined ? undefined : result.sessionInfo.joinedWith;
    sessionInfo.connected = result.sessionInfo === undefined ? false : result.sessionInfo.connected;

    console.log('Retrieved mySessionId: ' + sessionInfo.mySessionId);
    console.log('Retrieved joinedWith: ' + sessionInfo.joinedWith);
    console.log('Retrieved connected: ' + sessionInfo.connected);

    console.log(sessionInfo.connected == true)
    if (sessionInfo.connected == true) {
      const flowBtns = document.getElementById("flowBtns");
      const uuidSpan = document.getElementById("uuid-span");

      uuidSpan.innerText = sessionInfo.joinedWith;
      flowBtns.style.display = "none";
      const joinSession = document.getElementById("joinSessionDiv");
      joinSession.style.display = "none";
      const sessionDiv = document.getElementById("sessionDiv");
      sessionDiv.style.display = "block";
    }
  });
});

joinSession.addEventListener("click", ()=>{
  const flowBtns = document.getElementById("flowBtns");
  flowBtns.style.display = "none";
  const joinSession = document.getElementById("joinSessionDiv");
  joinSession.style.display = "block";
  const sessionDiv = document.getElementById("sessionDiv");
  sessionDiv.style.display = "none";

});

joinFinal.addEventListener("click", ()=>{
  const flowBtns = document.getElementById("flowBtns");
  const sessionIdVal = document.getElementById("sessionIdInput").value;
  const uuidSpan = document.getElementById("uuid-span");

  if (sessionIdVal !== ""){
    sessionInfo.joinedWith = sessionIdVal;
    sessionInfo.connected = true;
    chrome.storage.local.set({'sessionInfo': sessionInfo}, () => {
      console.log('Stored joinedWith while creating session: ' + sessionInfo.sessionIdVal);
      chrome.storage.local.get(['sessionInfo'], (result) => {
        console.log(JSON.stringify(result));
        sessionInfo.mySessionId = result.sessionInfo === undefined ? undefined : result.sessionInfo.mySessionId;
        sessionInfo.joinedWith = result.sessionInfo === undefined ? undefined : result.sessionInfo.joinedWith;
        sessionInfo.connected = result.sessionInfo === undefined ? false : result.sessionInfo.connected;

        console.log('Retrieved mySessionId: ' + sessionInfo.mySessionId);
        console.log('Retrieved joinedWith: ' + sessionInfo.joinedWith);
        console.log('Retrieved connected: ' + sessionInfo.connected);
      });
    });

    uuidSpan.innerText = sessionIdVal;
    flowBtns.style.display = "none";
    const joinSession = document.getElementById("joinSessionDiv");
    joinSession.style.display = "none";
    const sessionDiv = document.getElementById("sessionDiv");
    sessionDiv.style.display = "block";
  }
})

createSession.addEventListener("click", ()=>{
  const flowBtns = document.getElementById("flowBtns");
  const uuidSpan = document.getElementById("uuid-span");
  var uuid = sessionInfo.mySessionId;

  if (sessionInfo.mySessionId === undefined){
    uuid = uuidv4();
    sessionInfo.mySessionId = uuid;
    sessionInfo.joinedWith = sessionInfo.mySessionId;
    sessionInfo.connected = true;
    chrome.storage.local.set({'sessionInfo': sessionInfo}, () => {
      console.log('Stored mySessionId while creating session: ' + sessionInfo.mySessionId);
      chrome.storage.local.get(['sessionInfo'], (result) => {
        console.log(JSON.stringify(result));
        sessionInfo.mySessionId = result.sessionInfo === undefined ? undefined : result.sessionInfo.mySessionId;
        sessionInfo.joinedWith = result.sessionInfo === undefined ? undefined : result.sessionInfo.joinedWith;
        sessionInfo.connected = result.sessionInfo === undefined ? false : result.sessionInfo.connected;

        console.log('Retrieved mySessionId: ' + sessionInfo.mySessionId);
        console.log('Retrieved joinedWith: ' + sessionInfo.joinedWith);
        console.log('Retrieved connected: ' + sessionInfo.connected);
      });
    });
  }

  uuidSpan.innerText = uuid;
  flowBtns.style.display = "none";
  const joinSession = document.getElementById("joinSessionDiv");
  joinSession.style.display = "none";
  const sessionDiv = document.getElementById("sessionDiv");
  sessionDiv.style.display = "block";
});

cancelBtn.addEventListener("click",()=>{
  const flowBtns = document.getElementById("flowBtns");
  flowBtns.style.display = "block";
  const joinSession = document.getElementById("joinSessionDiv");
  joinSession.style.display = "none";
  const sessionDiv = document.getElementById("sessionDiv");
  sessionDiv.style.display = "none";
});

disconnect.addEventListener("click", ()=>{
  const flowBtns = document.getElementById("flowBtns");
  flowBtns.style.display = "block";
  const joinSession = document.getElementById("joinSessionDiv");
  joinSession.style.display = "none";
  const sessionDiv = document.getElementById("sessionDiv");
  sessionDiv.style.display = "none";

  sessionInfo.connected = false;

  // Completely clear the storage. All items are removed.
  chrome.storage.local.clear(() => {
    console.log('Everything was removed');
  });
})

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}



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
