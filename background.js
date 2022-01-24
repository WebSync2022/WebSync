var isMasterURL = true;
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // read changeInfo data and do something with it
  // like send the new url to contentscripts.js
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: "hello!",
      url: changeInfo.url,
    });
  }
});

// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
//   if(details.frameId === 0) {
//       // Fires only when details.url === currentTab.url
//       console.log(details);
//       chrome.tabs.get(details.tabId, function(tab) {
//           if(tab.url === details.url) 
//           {
//             isMasterURL && chrome.tabs.sendMessage(details.tabId, {
//               message: "hello!",
//               url: tab.url,
//             });
//               console.log("onHistoryStateUpdated");
//           }
//       });
//   }
// });

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.message == "recievedURL"){
    isMasterURL = false;

    setTimeout(()=>{
      isMasterURL = true;
    }, 500);
  }
   
});