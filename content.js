(function(){
    var element = document.querySelector(".span12 > p");
    
    if(!element || (!element.innerText.includes("De nouveaux creneaux ouvriront prochainement") 
        && element.style.display === "" 
        && element.style.visibiliy === ""
        && element.style.opacity === "")
        ){
        chrome.runtime.sendMessage({askfor:"notification"});
    }
    else{
        chrome.runtime.sendMessage({askfor:"counter"},function (response) {
            
            if(!response.isActive) return;
            console.log(response.counter,response.isActive);
            setTimeout(function(){ 
                location.reload();
            }, 60000);
        });
        
        
    }
})()

