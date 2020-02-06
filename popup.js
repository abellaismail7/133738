
document.addEventListener("DOMContentLoaded",function(){
    var toggle = document.querySelector(".toggle");
    toggle.addEventListener('click',()=>{
        toggleEvent(toggle)
    })
    chrome.runtime.sendMessage({askfor:"isActive"},function (response) {
            if(response) toggle.classList.add("active")
            else toggle.classList.remove("active")
    });
})


function toggleEvent(toggle){
    if(toggle.classList.contains("active")){
        toggle.classList.remove("active")
        chrome.runtime.sendMessage({askfor:"inactive"});
    }else{
        toggle.classList.add("active")
        chrome.runtime.sendMessage({askfor:"active"});
    }
}