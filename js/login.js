const elloginForm = document.querySelector(".hero__form");
const elloginuserEmail = elloginForm.querySelector(".hero__user-email");
const elloginuserPassword = elloginForm.querySelector(".hero__user-password");
const users = JSON.parse(localStorage.getItem("data") || "[]")

elloginForm.addEventListener("submit", evt => {
    evt.preventDefault();
    const elloginuserEmailValue = elloginuserEmail.value.trim();
    const elloginuserPasswordValue = elloginuserPassword.value.trim();
    
    if (!elloginuserEmailValue.endsWith("@gmail.com")) {
        alert("emailni oxirini @gmail.com bilan  yozing !");
        return;
    }
    if (elloginuserPasswordValue.length < 8) {
        alert("parolingiz 8 tadan kam bo'lmasligi kerak !")
        return;
    }
    
    
    users.find(item => {
        if(item.user_email == elloginuserEmailValue) {
            // return item.user_password == elloginuserPasswordValue
            window.location.href = "./index.html";
            localStorage.setItem("user-id", JSON.stringify(item.user_id));
        }
    } )
    
    elloginuserEmail.value = "";
    elloginuserPassword.value = "";
})