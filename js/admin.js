const sitebarlist = document.querySelector(".hero__btn-list");
const users = JSON.parse(localStorage.getItem("data"));
const user_id =JSON.parse(localStorage.getItem("user-id"))
const DocumentFragment = document.createDocumentFragment();
const ordersList = document.querySelector(".hero__users");
const modalList = document.querySelector(".modal__list")
const redybtn = document.querySelector(".btn-ready");
const modaldiv = document.querySelector(".js-modal");
function Savedrender(arr,node) {
    node.innerHTML = "";
    arr.forEach(item => {
        const liElement = document.createElement("li");
        const titleElement = document.createElement("h3");
        const btnElement = document.createElement("button"); 
        
        liElement.classList.add("hero__registerUsers","shadow","haveoreder-user");
        btnElement.classList.add("btn-orders","btn","btn-success")
        titleElement.textContent = item.user_name;
        btnElement.textContent = "orders";
        btnElement.setAttribute("data-bs-toggle","modal");
        btnElement.setAttribute("data-bs-target","#exampleModal")
        btnElement.dataset.id = item.user_id;
        
        liElement.append(titleElement,btnElement);
        
        DocumentFragment.appendChild(liElement)
        
    })
    
    node.appendChild(DocumentFragment);
}
function SavedrenderAll(arr,node) {
    node.innerHTML = "";
    arr.forEach((item) => {
        const liElement = document.createElement("li");
        const titleElement = document.createElement("h3");
        const emailElement = document.createElement("p"); 
        
        liElement.classList.add("hero__registerUsers","shadow")
        titleElement.textContent = item.user_name;
        emailElement.textContent = item.user_email;
        
        liElement.append(titleElement,emailElement);
        
        DocumentFragment.appendChild(liElement)
        
    })
    
    node.appendChild(DocumentFragment);
}

function SavedrenderModal(arr,node) {
    node.innerHTML = "";
    arr.forEach(item => {
        const liElement = document.createElement("li");
        const imgElement = document.createElement("img");
        const wrapperElement = document.createElement("div");
        const titleElement = document.createElement("h3");
        const btnElement = document.createElement("button");
        
        liElement.classList.add("modal__item");
        imgElement.classList.add("modal__img");
        wrapperElement.classList.add("modal__innerdiv")
        titleElement.classList.add("modal__order-name");
        btnElement.classList.add("modal__del-btn","btn","btn-success");
        
        
        imgElement.src = item.img;
        imgElement.alt = item.name;
        imgElement.width = "80";
        imgElement.height = "70";
        
        titleElement.textContent = item.name;
        
        liElement.append(imgElement,titleElement)
        DocumentFragment.appendChild(liElement)
    });
    
    node.appendChild(DocumentFragment);
};

sitebarlist.addEventListener("click",evt => {
    if (evt.target.matches(".haveorder")) {
        const filtredUsers = users.filter(item => item.user_orders.length >= 1)
        Savedrender(filtredUsers,ordersList)
        localStorage.setItem("data",JSON.stringify(users));
    }else if (evt.target.matches(".alluser")) {
        SavedrenderAll(users,ordersList);
        localStorage.setItem("data",JSON.stringify(users));
    }
});

ordersList.addEventListener("click",evt => {
    if (evt.target.matches(".btn-orders")) {
        const findOrder = users.find(item => item.user_id == evt.target.dataset.id);
        // modalList
        SavedrenderModal(findOrder.user_orders,modalList);
        
        redybtn.addEventListener("click",() => {
            let claenorder = users.find(item => item == findOrder);
            claenorder.user_orders = [];
            localStorage.setItem("data",JSON.stringify(users));
            
        })
    }
});






