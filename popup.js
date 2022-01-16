// Initialize butotn with users's prefered color
const joinSession = document.getElementById("joinSessionBtn");
const joinFinal = document.getElementById("join");
const cancelBtn = document.getElementById("cancel");
const disconnect = document.getElementById("disconnect");
const createSession = document.getElementById("createSessionBtn");

joinSession.addEventListener("click", () => {
  const flowBtns = document.getElementById("flowBtns");
  flowBtns.style.display = "none";
  const joinSession = document.getElementById("joinSessionDiv");
  joinSession.style.display = "block";
  const sessionDiv = document.getElementById("sessionDiv");
  sessionDiv.style.display = "none";
});

joinFinal.addEventListener("click", () => {
  const flowBtns = document.getElementById("flowBtns");
  const sessionIdVal = document.getElementById("sessionIdInput").value;
  const uuidSpan = document.getElementById("uuid-span");
  uuidSpan.innerText = sessionIdVal;
  roomID = sessionIdVal;
  chrome.storage.sync.set({ roomID });
  console.log("Set the Room ID", `roomID: ${roomID}`);
  flowBtns.style.display = "none";
  const joinSession = document.getElementById("joinSessionDiv");
  joinSession.style.display = "none";
  const sessionDiv = document.getElementById("sessionDiv");
  sessionDiv.style.display = "block";
});

createSession.addEventListener("click", () => {
  const flowBtns = document.getElementById("flowBtns");
  const uuid = uuidv4();
  const uuidSpan = document.getElementById("uuid-span");
  uuidSpan.innerText = uuid;
  flowBtns.style.display = "none";
  const joinSession = document.getElementById("joinSessionDiv");
  joinSession.style.display = "none";
  const sessionDiv = document.getElementById("sessionDiv");
  sessionDiv.style.display = "block";
});

cancelBtn.addEventListener("click", () => {
  const flowBtns = document.getElementById("flowBtns");
  flowBtns.style.display = "block";
  const joinSession = document.getElementById("joinSessionDiv");
  joinSession.style.display = "none";
  const sessionDiv = document.getElementById("sessionDiv");
  sessionDiv.style.display = "none";
});

disconnect.addEventListener("click", () => {
  const flowBtns = document.getElementById("flowBtns");
  flowBtns.style.display = "block";
  const joinSession = document.getElementById("joinSessionDiv");
  joinSession.style.display = "none";
  const sessionDiv = document.getElementById("sessionDiv");
  sessionDiv.style.display = "none";
});

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
