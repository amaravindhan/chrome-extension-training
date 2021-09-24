document.addEventListener('DOMContentLoaded', function() {
    var newTotal = 0;
    var limit = 0;
    chrome.storage.sync.get(['total', 'limit'], function(budget){
        if(budget.total) {
            newTotal += parseInt(budget.total);
        }
        document.getElementById('total').textContent = newTotal;
        if(budget.limit){
            limit = budget.limit;
        }
        document.getElementById('limit').textContent = (budget.limit == "")? 0:budget.limit;
    });

    document.getElementById("spendAmount").onclick = function(){
        var amount = document.getElementById("amount").value;
        if(amount) {
            newTotal += parseInt(amount);
        }
        
        chrome.storage.sync.set({'total': newTotal}, function(){
            if(amount && newTotal >= limit) {
                var options = {
                    type: "basic",
                    title: "Limit reached!",
                    iconUrl: "icon48.png",
                    message: "Uh oh! Looks like you have reached your limit!"
                };
                chrome.notifications.create('limitNotific', options);
            }
        });

        document.getElementById('total').textContent = newTotal;
        document.getElementById("amount").value = '';
    };

});