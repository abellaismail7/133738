(function(){

    switch(location.pathname){
        case "/users/sign_in" : 
                login();
            break;
        default:
                checkCheckIn();
            break;
    }
    

    
})()


function checkCheckIn(){
    var element = document.querySelector(".span12 > p");
    
    if(!element || (!element.innerText.includes("De nouveaux creneaux ouvriront prochainement") 
        && element.style.display === "" 
        && element.style.visibiliy === ""
        && element.style.opacity === "")
        ){
         chrome.runtime.sendMessage({askfor:"notification"});
    }
    else{

        var toast = document.createElement("div");
        toast.style.background = "#0000008a";
        toast.style.color = "#fff";
        toast.style.padding = "9px 20px";
        toast.style.borderRadius = "10px";
        toast.style.position = "fixed";
        toast.style.left = "50%";
        toast.style.bottom = "40px";

        
        chrome.runtime.sendMessage({askfor:"counter"},function (response) {
            var random = Math.floor(Math.random() * 6)+4; //between 4-10
            if(!response.isActive) return;
            toast.innerText = `Attempts: ${response.counter}  -> reloadAfter:  ${random}`;
            setTimeout(function(){ 
                location.reload();
            },random * 60 * 1000);
        });

        document.body.appendChild(toast);
        setTimeout(function(){ 
            document.body.removeChild(toast);
        },5000);
        
        
    }
}

function login(){
    var loginBtn = document.querySelector("#new_user > div.form-inputs > div.form-actions > input");
    if(loginBtn) loginBtn.click();
}

function notifyMe() {
    
  
    if (Notification.permission === "granted") {
        spawnNotification(
            "something changed in 1337 website",
            "icon.png",
            "CheckIn")
    }
  
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        spawnNotification(
            "something changed in 1337 website",
            "icon.png",
            "CheckIn")
      });
    }
  
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
  }

  function spawnNotification(theBody,theIcon,theTitle) {
    var options = {
        body: theBody,
        icon: theIcon,
        tag: "1338-"+ Date.now(),
    }
    var n = new Notification(theTitle,options);

    n.onclick = function(event) {
            n.close()
    }
  }