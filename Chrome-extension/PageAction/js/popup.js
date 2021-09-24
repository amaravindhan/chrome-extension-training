document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("fontSubmit").onclick = function () {
    var color = document.getElementById("fontColor");
    if (color.value) {
      console.log(color.value);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          todo: "changeColor",
          clickedColor: color.value,
        });
      });
    }
  };
});
