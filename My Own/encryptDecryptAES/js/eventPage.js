chrome.browserAction.setBadgeText({ text: "256" });

var menuItem1 = {
  id: "encrypt",
  title: "Encrypt",
  contexts: ["selection"],
};
var menuItem2 = {
  id: "decrypt",
  title: "Decrypt",
  contexts: ["selection"],
};

chrome.contextMenus.create(menuItem1);

chrome.contextMenus.create(menuItem2);

chrome.contextMenus.onClicked.addListener(function (clickedData) {
  if (clickedData.menuItemId == "encrypt" && clickedData.selectionText) {
    var encrypted = CryptoJS.AES.encrypt(
      clickedData.selectionText,
      "FirstChromeExt"
    );
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        todo: "copyClipbord",
        data: encrypted.toString(),
      });
    });
  } else if (clickedData.menuItemId == "decrypt" && clickedData.selectionText) {
    var decrypted = CryptoJS.AES.decrypt(
      clickedData.selectionText,
      "FirstChromeExt"
    );
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        todo: "copyClipbord",
        data: decrypted.toString(CryptoJS.enc.Utf8),
      });
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendMessage) {
  if (request.todo == "sendNotification") {
    var notify = {
      type: "basic",
      title: "Copied to clipboard!",
      iconUrl: "images/icon16.png",
      message: "Data copied to clipboard successfully!",
    };
    chrome.notifications.create("copyClipboard", notify);
  }
});
