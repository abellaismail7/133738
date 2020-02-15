var counter = 0;
var isActive = true;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.askfor) {
            case "notification":
                showNotification()
                break;
            case "counter":
                sendResponse({
                    isActive:isActive,
                    counter:++counter
                })
                break;
            case "active":
                isActive = true
                break;
            case "inactive":
                isActive = false
                break;
            case "isActive":
                sendResponse(isActive)
                break;
            default:
                console.log("this request does not exist")
                break;
        }
      
});
function showNotification() {
    var id = "1338-"+ Date.now()
    chrome.notifications.create(
        id,{   
                type: 'basic', 
                iconUrl: 'icon.png', 
                title: "something changed in 1337 website", 
                message: "CheckIn"
        });
}
