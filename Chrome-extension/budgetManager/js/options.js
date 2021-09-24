document.addEventListener("DOMContentLoaded", function() {

    chrome.storage.sync.get('limit', function(budget){
        document.getElementById("limitInput").value = budget.limit;
    })

    document.getElementById("saveLimit").onclick = function(){
        var limit = document.getElementById("limitInput").value;
        if(limit) {
            chrome.storage.sync.set({'limit': limit}, function(){
                close();
            });
        }
    };

    document.getElementById("resetTotal").onclick = function(){        
        chrome.storage.sync.set({'total': 0}, function(){
            var options = {
                type: "basic",
                title: "Total Reset!",
                iconUrl: "icon48.png",
                message: "Total has been reset to 0!"
            };
            chrome.notifications.create('resetTotal', options);
        });
    };
});