var menuItem = {
  id: "speakit",
  title: "SpeakIT",
  contexts: ["selection"],
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (clickedData) {
  if (clickedData.menuItemId == "speakit" && clickedData.selectionText) {
    chrome.tts.speak(clickedData.selectionText, { rate: 0.7 });
  }
});
