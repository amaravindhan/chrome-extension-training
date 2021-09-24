document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submit").onclick = function () {
    var encrypted = undefined;
    var decrypted = undefined;
    var task = document.querySelector(
      'input[type="radio"][name="option"]:checked'
    );
    var inputValue = document.getElementById("inputText");
    var salt = document.getElementById("salt");
    if (inputValue.value) {
      if (salt.value) {
        if (task.value == "enc") {
          encrypted = CryptoJS.AES.encrypt(inputValue.value, salt.value);
        } else {
          decrypted = CryptoJS.AES.decrypt(inputValue.value, salt.value);
        }
      } else {
        if (task.value == "enc") {
          encrypted = CryptoJS.AES.encrypt(inputValue.value, "FirstChromeExt");
        } else {
          decrypted = CryptoJS.AES.decrypt(inputValue.value, "FirstChromeExt");
        }
      }
    }
    document.getElementById("output").style.display = "block";
    if (encrypted) {
      document.getElementById("output").innerHTML = encrypted;
    } else {
      document.getElementById("output").innerHTML = decrypted.toString(
        CryptoJS.enc.Utf8
      );
    }
  };
  document.getElementById("output").onclick = function () {
    copy();
  };
});

function copy() {
  var clip = new ClipboardJS("#output");
  console.log(clip);
  clip.on("success", function (e) {
    var notify = {
      type: "basic",
      title: "Copied to clipboard!",
      iconUrl: "images/icon16.png",
      message: "Data copied to clipboard successfully!",
    };
    chrome.notifications.create("copyClipboard", notify);
    e.clearSelection();
  });
}
