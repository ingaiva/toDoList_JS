
let lst = document.getElementById("lst");
let btnAdd=document.getElementById("btnAdd");
let inputNewTask=document.getElementById("inputNewTache");

btnAdd.addEventListener("click", function(e){
    if(inputNewTask.value.length>0)
        add(inputNewTask.value);
});
inputNewTask.addEventListener('keypress', function(event) {    
    if (event.key == "Enter") {
        add(inputNewTask.value);
    }       
});

function add(taskText){
    let newLi=document.createElement("li");  
    newLi.classList.add("row");
    newLi.classList.add("mb-1");

    let divDone=document.createElement("div");
    divDone.classList.add("col-1");
    divDone.classList.add("px-1");
    //btn-done
    let btnDone=document.createElement("a");    
    //btnDone.style.color="green";       
    btnDone.classList.add("btn-done");
    btnDone.style.cursor = "pointer";
    btnDone.setAttribute("name", "btnDone");
    btnDone.insertAdjacentHTML('beforeend', '<i class="fas fa-spinner text-primary d-none"></i>');
    btnDone.insertAdjacentHTML('beforeend', '<i class="fas fa-flag-checkered text-warning"></i>');    
    btnDone.addEventListener("click", function(e){
        setDone(newLi);
    });   
    divDone.appendChild(btnDone);

    let btnMove=document.createElement("a"); 
    btnMove.style.display = "none";   
    btnMove.style.color="green";       
    btnMove.classList.add("btn-move");
    btnMove.classList.add("mx-2");
    btnMove.style.cursor = "pointer";
    btnMove.title = 'Terminer la tâche';
    btnMove.setAttribute("name", "btnMove");
    btnMove.insertAdjacentHTML('beforeend', '<i class="far fa-calendar-check"></i>'); 
    btnMove.insertAdjacentHTML('beforeend', '<i class="fas fa-undo text-primary d-none"></i>');      
    btnMove.addEventListener("click", function(e){
        move(newLi);
    }); 
    divDone.appendChild(btnMove);

    newLi.appendChild(divDone);

    let txt=document.createElement("label")  ;
    txt.innerText=taskText;
    txt.style.whiteSpace = "pre-line";
    txt.classList.add("col-8");    
    txt.style.backgroundColor = "#F5F5F5";
    txt.classList.add("py-2");
    txt.classList.add("px-1");
    txt.addEventListener("blur", function(e){
        endUpdateLi(newLi);
    });    
    
    newLi.appendChild(txt);

    //boutons
    let divBtns=document.createElement("div");
    divBtns.classList.add("col-3"); 

    let btnMaj=document.createElement("a");
    btnMaj.innerText="modifier";
    btnMaj.style.color="blue";   
    btnMaj.classList.add("mx-1");
    btnMaj.classList.add("btn-maj");
    btnMaj.style.cursor = "pointer";
    btnMaj.setAttribute("name", "btnMaj");
    btnMaj.addEventListener("click", function(e){
        startUpdateLi(newLi);
    });
    divBtns.appendChild(btnMaj);

    // btn suppr
    let btnDel=document.createElement("a");
    btnDel.innerText="supprimer";
    btnDel.style.color="red";   
    btnDel.classList.add("mx-1");
    btnDel.classList.add("btn-del");
    btnDel.style.cursor = "pointer";
    btnDel.setAttribute("name", "btnDel");
    btnDel.addEventListener("click", function(e){
        deleteLi(newLi);
    });
    divBtns.appendChild(btnDel);

    newLi.appendChild(divBtns);
    
    lst.insertAdjacentElement("beforeend",newLi);
    inputNewTask.value="";
    checkUi();
}

function startUpdateLi(liItem){
    let txt=liItem.querySelector("label");
    let btnMaj = liItem.querySelector(".btn-maj");   
    btnMaj.style.display="none";
    txt.contentEditable = "true";
    txt.focus();        
}

function endUpdateLi(liItem){  
    let txt=liItem.querySelector("label");    
    txt.contentEditable = "false";
    let btnMaj = liItem.querySelector(".btn-maj");    
    btnMaj.style.display = "inline";
}

function deleteLi(liItem){
    liItem.parentNode.removeChild(liItem); 
    checkUi();
}

function move(liItem){
   
    let classToHide;
    let classToShow;
    if(liItem.parentNode.id=="lstDone"){
        liItem.parentNode.removeChild(liItem); 
        let lstTodo = document.getElementById("lst");
        lstTodo.insertAdjacentElement("beforeend",liItem);
       
        let btn=liItem.querySelector(".btn-done");
        btn.style.display = "inline";

        liItem.querySelector(".btn-move").title = 'Terminer la tâche';
       
        classToHide=".fa-undo";
        classToShow=".fa-calendar-check";
        setDone(liItem);
    }
    else {
        liItem.parentNode.removeChild(liItem); 
        let lstDone=document.getElementById("lstDone");
        lstDone.insertAdjacentElement("beforeend",liItem);

        let btn=liItem.querySelector(".btn-done");
        btn.classList.remove("inProcess");        
        btn.style.display = "none";

        liItem.querySelector(".btn-move").title = 'Annuler';
       
        classToShow=".fa-undo";
        classToHide=".fa-calendar-check";   
        checkStyleDone(liItem);    
    }
        let icoToShow=liItem.querySelector(classToShow);
        icoToShow.classList.remove("d-none");
        let icoToHide=liItem.querySelector(classToHide);
        icoToHide.classList.add("d-none");
        
        checkUi();
}

function setDone(liItem){
    let txt=liItem.querySelector("label");  
    let btn=liItem.querySelector(".btn-done");

    if(btn.classList.contains("inProcess")){
        btn.classList.remove("inProcess");        
        let btnMove=liItem.querySelector(".btn-move");  
        btnMove.style.display = "none";   
    }
    else{
        btn.classList.add("inProcess");        
        let btnMove=liItem.querySelector(".btn-move");  
        btnMove.style.display = "inline";   
    }
    checkStyleDone(liItem);
}

function checkStyleDone(liItem){
    let txt=liItem.querySelector("label");  
    let btn=liItem.querySelector(".btn-done");
    if(btn.classList.contains("inProcess")){       
        txt.style.backgroundColor = "#FFFF33";       
        let icoSpinner=btn.querySelector(".fa-spinner");
        icoSpinner.classList.remove("d-none");
        let icoDone=btn.querySelector(".fa-flag-checkered");
        icoDone.classList.add("d-none");       
    }
    else{        
        txt.style.backgroundColor = "#F5F5F5";       
        let icoSpinner=btn.querySelector(".fa-spinner");
        icoSpinner.classList.add("d-none");
        let icoDone=btn.querySelector(".fa-flag-checkered");
        icoDone.classList.remove("d-none");  
    }
}        
        
        

function checkUi(){ 
    let msgTaskNone = document.getElementById("taskNone");
    if(lst.children.length > 0){
        msgTaskNone.style.display = "none";
    }
    else {
        msgTaskNone.style.display = "block";
    }
    inputNewTask.focus();

    let divDone=document.getElementById("divDone");
    let lstDone=document.getElementById("lstDone");
    if(lstDone.children.length == 0){
        divDone.style.display = "none";
    }
    else {
        divDone.style.display = "block";
    }
}
   
checkUi();  
