function formValidation() {
    var username = document.getElementById("username").value;
    var regUsername = /[A-Za-z\s]+/;      
    var regEmail = /^[a-z0-9]+@[a-z0-9]+(\.com)/;  
    var regPhone = /^(090|091|092)[0-9]{7}/;
    var regPwd = /^[a-zA-Z0-9]{6,}/;
    var regRepwd = /^[a-zA-Z0-9]{6,}/;
    if(username == "" || username == null) {
        errName.innerHTML = "Username khong duoc rong";
    } else if (isNaN(username) == false) {
        errName.innerHTML = "Username khong hop le";
    } else if (username.match(regUsername)) {
        errName.innerHTML = "";
    } else {
        errName.innerHTML = "Username sai cu phap";
    }

    var email = document.getElementById("email").value;
    if(email == "" || email == null) {
        errEmail.innerHTML = "Email khong duoc rong";
    } else if(email.match(regEmail)) {
        errEmail.innerHTML = "";
    } else {
        errEmail.innerHTML = "Email sai cu phap";
    }

    var phone = document.getElementById("phone").value;
    if(phone == "" || phone == null) {
        errPhone.innerHTML = "Phone khong duoc rong";
    } else if(isNaN(phone) == true){
        errPhone.innerHTML = "Phone khong hop le";
    } else if(phone.match(regPhone)){
        errPhone.innerHTML = "";
    } else {
        errPhone.innerHTML = "Phone sai cu phap";
    }

    var pwd = document.getElementById("pwd").value;
    if(pwd == "" || pwd == null) {
        errPwd.innerHTML = "Password khong duoc rong";
    } else if(pwd.match(regPhone)){
        errPwd.innerHTML = "";
    } else {
        errPwd.innerHTML = "Password sai cu phap";
    }

    var Repwd = document.getElementById("Repwd").value;
    if(Repwd == "" || Repwd == null) {
        errRepwd.innerHTML = "Repassword khong duoc rong";
    } else if(Repwd.match(regRepwd) && Repwd == pwd){
        errRepwd.innerHTML = "";
    } else if(Repwd != pwd){
        errRepwd.innerHTML = "Repassword khong trung";
    } else {
        errRepwd.innerHTML = "Repassword sai cu phap";
    }

    if(username.match(regUsername) && email.match(regEmail) && phone.match(regPhone) && pwd.match(regPwd) && Repwd.match(regRepwd) && Repwd == pwd){
        alert("Dang ky thanh cong");
        return true;
    } else {
        alert("Dang ky that bai");
        return false;
    }
}