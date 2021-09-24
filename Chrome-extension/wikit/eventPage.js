var menuItem = {
  id: "wikit",
  title: "Wikit",
  contexts: ["selection"],
};

chrome.contextMenus.create(menuItem);

function fixedEncodeURL(str) {
  return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}

chrome.contextMenus.onClicked.addListener(function (clickedData) {
  if (clickedData.menuItemId == "wikit" && clickedData.selectionText) {
    var wikiURL =
      "https://en.wikipedia.org/wiki/" +
      fixedEncodeURL(clickedData.selectionText);
    console.log(wikiURL);
    var createData = {
      url: wikiURL,
      type: "popup",
      top: 5,
      left: 5,
      width: screen.availWidth / 2,
      height: screen.availHeight / 2,
    };
    chrome.windows.create(createData);
  }
});
