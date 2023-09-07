const elList = document.querySelector(".hero__list");
const DocumentFragment = document.createDocumentFragment();
const modalList = document.querySelector(".modal__list");
const users = JSON.parse(localStorage.getItem("data") || "[]");
const user_id = JSON.parse(localStorage.getItem("user-id"));
localStorage.setItem("data", JSON.stringify(users));
if (!user_id) {
    window.location.href ='./register.html';
}
const prodducts = [
    {
        id:1,
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDb6-HaCwYOtsEBeVcFXJe1sdry77zQeb-Q&usqp=CAU",
        name:"pizza1",
        desc:"juda mazali pitsa",
    },
    {
        id:2,
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDb6-HaCwYOtsEBeVcFXJe1sdry77zQeb-Q&usqp=CAU",
        name:"pizza2",
        desc:"juda mazali pitsa"
    },
    {
        id:3,
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDb6-HaCwYOtsEBeVcFXJe1sdry77zQeb-Q&usqp=CAU",
        name:"pizza3",
        desc:"juda mazali pitsa"
    },
    {
        id:4,
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDb6-HaCwYOtsEBeVcFXJe1sdry77zQeb-Q&usqp=CAU",
        name:"pizza4",
        desc:"juda mazali pitsa"
    },
    {
        id:5,
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDb6-HaCwYOtsEBeVcFXJe1sdry77zQeb-Q&usqp=CAU",
        name:"pizza5",
        desc:"juda mazali pitsa"
    },
    {
        id:6,
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDb6-HaCwYOtsEBeVcFXJe1sdry77zQeb-Q&usqp=CAU",
        name:"pizza6",
        desc:"juda mazali pitsa"
    }
];
function render(arr,node) {
    node.innerHTML = "";
    arr.forEach(item => {
        const liElement = document.createElement("li");
        const imgElement = document.createElement("img");
        const wrapperElement = document.createElement("div");
        const titleElement = document.createElement("h3");
        const descElement = document.createElement("p");
        const btnElement = document.createElement("button");
        
        liElement.classList.add("hero__item","shadow");
        imgElement.classList.add("hero__item-img");
        wrapperElement.classList.add("hero__item-innerdiv")
        titleElement.classList.add("hero__item-title");
        descElement.classList.add("hero__item-desc");
        btnElement.classList.add("hero__item-btn","btn","btn-success");
        
        
        imgElement.src = item.img;
        imgElement.alt = item.name;
        imgElement.width = "200";
        imgElement.height = "150";
        btnElement.dataset.id =item.id
        
        titleElement.textContent = item.name;
        descElement.textContent = item.desc;
        btnElement.textContent = "add";
        
        wrapperElement.append(titleElement,descElement,btnElement);
        liElement.append(imgElement,wrapperElement)
        DocumentFragment.appendChild(liElement)
    });
    
    node.appendChild(DocumentFragment);
}

render(prodducts,elList);
// saqlangan orderlarni chizish
function Savedrender(arr,node) {
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
        btnElement.dataset.id =item.id
        
        titleElement.textContent = item.name;
        btnElement.textContent = "del";
        
        wrapperElement.append(titleElement,btnElement);
        liElement.append(imgElement,wrapperElement)
        DocumentFragment.appendChild(liElement)
    });
    
    node.appendChild(DocumentFragment);
}

elList.addEventListener("click",evt => {
    // bu yerda avval foydalanuvchi aniqlanmoqda 
    users.find(item => {
        // bu userOreders userni orederlanini ozgaruvchiga tenglandi
        const userOrder = item.user_orders;
        if (item.user_id == user_id) {
            // topilgan user boyicha matches qilib userni orderlariga qo'shilmoqda
            if (evt.target.matches(".hero__item-btn")) {
                const saveditem = prodducts.find(item => {
                    return item.id == evt.target.dataset.id;
                });
                const faundeditem  = userOrder.find(item => item.id == saveditem.id);
                // bu yerda tanlangan order bor yoki yoqligi tekshiriladi bolmasa qoshiladi bolsa qoshilmaydi
                if (!faundeditem) {
                    userOrder.push(saveditem); 
                }
                localStorage.setItem("data",JSON.stringify(users))  
                Savedrender(userOrder,modalList)
            }
        }
        Savedrender(userOrder,modalList)
        localStorage.setItem("data",JSON.stringify(users))  
    })
})

// bu yerda orderlarni modalga chizib turish jarayoni
users.forEach(item => {
    if (item.user_id == user_id) {
        const userOrder = item.user_orders;
        Savedrender(userOrder,modalList)
        localStorage.setItem("data",JSON.stringify(users))      
        modalList.addEventListener("click",evt => {
            if(evt.target.matches(".modal__del-btn")) {
                const modalDelElementid = userOrder.findIndex(item => item.id  == evt.target.dataset.id)
                
                userOrder.splice(modalDelElementid,1)
            }

            // console.log(userOrder);
            Savedrender(userOrder,modalList);
            localStorage.setItem("data",JSON.stringify(users))      
        })
        
    }
    
}) 



