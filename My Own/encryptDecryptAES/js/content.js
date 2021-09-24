chrome.runtime.onMessage.addListener(function (request, sender, sendMessage) {
  if (request.todo == "copyClipbord") {
    var data = [
      new ClipboardItem({
        "text/plain": new Blob([request.data], { type: "text/plain" }),
      }),
    ];
    navigator.clipboard.write(data).then(
      function () {
        chrome.runtime.sendMessage({ todo: "sendNotification" });
      },
      function () {
        console.error("Unable to write to clipboard. :-(");
      }
    );
  }
});
