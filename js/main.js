
/**
 * As  your  mouse  move  over  any  of  the  items,  the  mouse  pointer  should  be  changed  to  some  otherforms.
 */
const items = document.querySelectorAll('main .boxs .box');
let numberMinuOpend = null;
let countMinues = items.length;
let minuOpend = null;

/**
 * Each item is clickable and the details about it is shown on the whole page by dynamically fetchingits JSON file from the server.
 */
function toggelBoxStatus(boxClickend) {
 
    boxClickend.addEventListener("click", (e) => {
            
        boxClickend.closest(".boxs").querySelectorAll(".box").forEach(box => {
            
            boxClickend.setAttribute("open", "true");
        
        })
    });
}
function createBox() {
    let box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("open", "false");
    let p = document.createElement("p");
    box.appendChild(p);
    
    return box;
}
function setMinu(content) {
    let mainContent = document.querySelector("main.content");
    mainContent.classList.add("hide");

    let sectionMinu = document.querySelector("section.content");
    sectionMinu.classList.remove("hide");

    let boxs = sectionMinu.querySelector(".boxs")
    
    boxs.innerHTML = '';

    content.forEach(element => {
        
        let boxClickend = createBox();
        
        toggelBoxStatus(boxClickend);

        boxClickend.setAttribute("title", element.name);
        let p = boxClickend.querySelector('p');
        p.textContent = element.description;
        boxs.appendChild(boxClickend);       
    });
}
async function getMinu(title) {
    await fetch("api/minu.json")
    .then(response => response.json())
    .then(data => {
        setMinu(data[title]);
    });
}


let count = 0;
items.forEach(box => {
    count++;
    box.setAttribute("count", count)
    
    box.addEventListener("click", () => {
        minuOpend = box.getAttribute("count");
        let title = box.getAttribute("title").toLowerCase();
        getMinu(title);

    });
});