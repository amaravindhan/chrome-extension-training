chrome.runtime.sendMessage({ todo: "showPageAction" });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "changeColor") {
    console.log(request.clickedColor);
    $("p").css("color", request.clickedColor);
  }
});
