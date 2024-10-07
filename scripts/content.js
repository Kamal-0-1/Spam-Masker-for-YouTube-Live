
let messeges=[];
let frame=null;
let buttom=null;
function getFrame(){
    frame=null;
    frame=document.querySelector("#chatframe");
    if(frame){
        buttom=document.querySelector("#show-hide-button");
        if(buttom){
            buttom.removeEventListener('click',showHide);
            buttom.addEventListener("click",showHide);
        }
    }
    
    if(frame?.contentWindow.document.querySelector("body")?.childElementCount>0 && frame.contentWindow.document.querySelector("#items")!=null){
        const chatTypes=frame.contentWindow.document.querySelectorAll("a.yt-simple-endpoint.style-scope.yt-dropdown-menu");
        chatTypes[0].removeEventListener('click',topLive);
        chatTypes[0].addEventListener('click',topLive);
        chatTypes[1].removeEventListener('click',topLive);
        chatTypes[1].addEventListener('click',topLive);
        chatObserve.observe(frame.contentWindow.document.querySelector("#items"),{childList:true});
    
    }
    else{
        setTimeout(getFrame,2000);
    }

}


const chatObserve=new MutationObserver((rec)=>{
        rec.forEach(ele=>{
            if(ele.removedNodes.length==0)printMessage(frame);
        })
    });

function printMessage(frame){
    if(frame.contentWindow.document.querySelector("#items").lastElementChild.tagName=="YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER"){
        let message=frame.contentWindow.document.querySelector("#items").lastElementChild.textContent;
        if(frame.contentWindow.document.querySelector("#items").lastChild.querySelector("span#message img")){
            const img=frame.contentWindow.document.querySelector("#items").lastChild.querySelectorAll("span#message img")
            img.forEach(element => {
                message+=element.alt;
            });
        }

        if(messeges.includes(message) && frame.contentWindow.document.querySelector("#items").childElementCount>20){
            let x=frame.contentWindow.document.querySelector("#items").lastElementChild.querySelector("span#message");
            x.style.display="none";
            const b=document.createElement("button");
            const p=document.createElement("p");
            p.append("Marked as spam");
            p.style.color="red";
            b.append("Reveal");
            b.style.backgroundColor="#28a691";
            b.style.color="white";
            b.style.border="none"
            b.style.borderRadius="3px"
            b.style.marginLeft="5px"
            b.addEventListener('click',()=>{
                const y=b.parentElement;
                x=y.querySelector("span#message")
                if(x.style.display=="none"){
                    x.style.display="flex";
                    b.innerText="Hide"
                }
                else{
                    b.innerText="Reveal"
                    x.style.display="none";
                }
            });
            frame.contentWindow.document.querySelector("#items").lastElementChild.appendChild(b);
            b.before(p);
        }
        else{
            if(messeges.length>100){
                messeges=messeges.slice(0,50);
            }
            messeges.push(message);        
        }
    }

}

document.querySelector('html').addEventListener('fullscreenchange',()=>{
    chatObserve.disconnect();
    setTimeout(getFrame,3000);
})

function showHide(){   
        chatObserve.disconnect();
        setTimeout(getFrame,3000);
}

function topLive(){
    chatObserve.disconnect();
    setTimeout(getFrame,3000);
}

getFrame();