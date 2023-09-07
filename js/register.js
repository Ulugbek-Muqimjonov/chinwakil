const elForm = document.querySelector(".hero__form");
const elUserName = document.querySelector(".hero__user-name");
const elUserSurname = document.querySelector(".hero__user-surname");
const elUserEmail = document.querySelector(".hero__user-email");
const elUserPassword= document.querySelector(".hero__user-password");
const users = JSON.parse(localStorage.getItem("data") || "[]");
// localStorage.setItem("data",JSON.stringify(users));
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const elUserNameValue = elUserName.value.trim();
    const elUserSurnameValue = elUserSurname.value.trim();
    const elUserEmailValue = elUserEmail.value.trim();
    const elUserPasswordValue = elUserPassword.value.trim();

    if ((elUserNameValue.length < 2) || (elUserNameValue.length > 20)) {
        alert("ismiz 2 tadan 20 tagacha  bolishi kerak");
        return;
    }
    if (elUserSurnameValue.length < 2 || elUserSurnameValue.length > 20) {
        alert("Familyez 2 tadan 20 tagacha  bolishi kerak");
        return;
    }
    // console.log(elUserEmailValue);
    if (!elUserEmailValue.endsWith("@gmail.com")) {
        alert("Emailnigiz oxiri @gmail.com bilan tugashi kerak");
        return;
    }
    if (elUserPasswordValue.length < 8) {
        alert("Paroliz 8 tadan kam bo'lmasin !");
        return;
    }
    const finduser = users.find(item => item.user_email == elUserEmailValue);

    if (finduser) {
        alert("bu email bilan allaqachon ro'yhatdan otilgan");
        return;
    }
    const user_Info = {
        user_id:users ? users.length + 1 : 1,
        user_name: elUserNameValue,
        user_surname:elUserSurnameValue,
        user_email: elUserEmailValue,
        user_password: elUserPasswordValue,
        user_orders:[],
    }
    users.push(user_Info);
    localStorage.setItem("data",JSON.stringify(users))   
    localStorage.setItem("user-id",JSON.stringify(user_Info.user_id))   
    window.location.href = "./index.html";
    elUserName.value = "";
    elUserSurname.value = "";
    elUserEmail.value = "";
    elUserPassword.value = "";

    // window.location.href = "./index.html";
})