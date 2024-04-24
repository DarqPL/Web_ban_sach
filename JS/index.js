$(document).ready(function() {
    const btnForgetPassword = document.querySelector("[btn-forget-password]");
    const loginForm = document.querySelector("[login-form]");
    const registerForm = document.querySelector("[register-form]");
    const formResetPassword = document.querySelector("[form-reset-password]");
    const loginHeader = document.querySelector("[login-header]");
    const confirmBtn = document.querySelector("[confirm-btn]");
    const returnLoginForm = document.querySelector("[return-login-form]");
    const btnClose = document.querySelectorAll(".btn-close");
    
    // các biến báo lỗi
    var errUserInput = document.getElementById("errUserInput");
    var errPasswordInput = document.getElementById("errPasswordInput");
    var errUser = document.getElementById("errUser");
    var errTel = document.getElementById("errTel");
    var errEmail = document.getElementById("errEmail");
    var errPassword = document.getElementById("errPassword");
    var errConfirmPassword = document.getElementById("errConfirmPassword");
    var errRe_Email = document.getElementById("errRe-Email");
    var errResetPassword = document.getElementById("errResetPassword");
    var errResetConfirmPassword = document.getElementById("errResetConfirmPassword");

    function checkInputInfo(value, regex, errInput, message) {
        if (value == "" || value == null) {
            errInput.innerHTML = "Vui lòng nhập thông tin"
            return false;
        }

        if (regex.test(value)) {
            errInput.innerHTML = "";
        } else {
            errInput.innerHTML = message;
            return false;
        }

        return true;
    }

    function checkPassword(pass, errPass) {
        if (pass.length == 0) {
            errPass.innerHTML = "Vui lòng nhập thông tin"
            return false;
        }
        else if (pass.length < 8) {
            errPass.innerHTML = "Mật khẩu phải từ 8 ký tự"
            return false;
        }
        else if (!/\d/.test(pass)) {
            errPass.innerHTML = "Mật khẩu phải có ít nhất 1 ký tự số"
            return false;
        }
        else if (!/\W/.test(pass)) {
            errPass.innerHTML = "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"
            return false;
        }
        else if (!/[A-Z]/.test(pass)) {
            errPass.innerHTML = "Mật khẩu phải có ít nhất 1 ký tự là chữ in hoa"
            return false;
        }
        else {
            errPass.innerHTML = ""
            return true;
        }

    
    }

    function checkRePassword(pass, rePass, errRePass) {
        if (rePass == "" || rePass == null) {
            errRePass.innerHTML= "Vui lòng nhập thông tin"
            return false;
        }

        if (rePass !== pass) {
            errRePass.innerHTML="Mật khẩu không trùng";
            return false;
        } else {
            errRePass.innerHTML="";
        }
        return true;
    }

    // check loginForm
    function checkLoginForm() {
        // tên đăng nhập 
        var userInput  = document.getElementById("userInput").value;

        if (!checkInputInfo(userInput, /^[a-zA-Z0-9\s]+$/, errUserInput, "Tên đăng nhập không được chứa ký tự dặc biệt")) {
            return false
        }

        // password 
        var passwordInput = document.getElementById("passwordInput").value;
        
        if (!checkPassword(passwordInput, errPasswordInput))
            return false;

        // kiểm tra thông tin
        var user = JSON.parse(localStorage.getItem("user"));
        if (user == null) {
            alert("Tài khoản không tồn tại")
            return false;
        }
        if (user.user !== userInput || user.password !== passwordInput) {
            alert("Tài khoản hoặc mật khẩu không đúng")
            return false;
        }
        sessionStorage.setItem("loggedInUser", user.user)
        alert("Đăng nhập thành công")
        return location.reload();
    }

    // check RegisterForm
    function checkRegisterForm() {
        // tên đăng nhập
        var user = document.getElementById("user").value;
        
        if (!checkInputInfo(user, /^[a-zA-Z0-9\s]+$/, errUser, "Tên đăng nhập không được chứa ký tự dặc biệt")) {
            return false        
        }
        user_storage = user
        
        // số điện thoại
        var tel = document.getElementById("tel").value;
        var telRegex = /^\d*$/;
    
        if (!checkInputInfo(tel, telRegex, errTel, "Số điện thoại chỉ chứa ký tự số")) {
            return false
        } else if (!/[0-9]{10}/.test(tel)) {
            errTel.innerHTML = "Số điện thoại phải chứa 10 ký tự số"
            return false
        } else if (!/^(096|097|098|086|090|093|089)\d{7}$/.test(tel)) {
            errTel.innerHTML = "Số điện thoại phải 10 ký tự số bao gồm các số đầu: 096, 097, 098, 086, 090, 093, 089";
            return false;
        }
        
        // email
        var email = document.getElementById("email").value;
        var emailRegex = /^[a-zA-z][a-zA-Z0-9]*@gmail.com$/;

        if (!checkInputInfo(email, emailRegex, errEmail, "Email phải bắt đầu bằng chữ cái, không bao gồm kí tự đặc biệt và kết thúc bằng @gmail.com")) {
            return false;
        } 
        
        email_storage = email

        // mật khẩu
        var password = document.getElementById("password").value;
        
        if (!checkPassword(password,  errPassword)) 
            return false
        
        // nhập lại mật khẩu
        var confirm_password = document.getElementById("confirm-password").value;

        if (!checkRePassword(password, confirm_password, errConfirmPassword))
            return false;
        password_storage = confirm_password;
        var user =  {user: user, tel: tel, email: email, password: password}
        localStorage.setItem("user", JSON.stringify(user))
        sessionStorage.setItem("user", JSON.stringify(user))
        alert("Đăng ký thành công")
        return true;
    }

    // check checkPasswordForm 
    function checkPasswordForm() {

        // email
        var re_email = document.getElementById("re-email").value;
        var re_emailRegex = /^[a-zA-z][a-zA-Z0-9]*@gmail.com$/;
        
        
        if (!checkInputInfo(re_email, re_emailRegex, errRe_Email, "Email phảii bắt đầu bằng chữ cái, không bao gồm kí tự đặc biệt và kết thúc bằng @gmail.com")) {
            return false;
        }

        // mật khẩu

        var reset_password = document.getElementById("reset-password").value;
        
        if (!checkPassword(reset_password, errResetPassword)) {
            return false;
        }

        // nhập lại mật khẩu
        
        var reset_confirm_password = document.getElementById("reset-confirm-password").value;

        if (!checkRePassword(reset_password, reset_confirm_password, errResetConfirmPassword)) {
            return false;
        }
        password_storage = reset_confirm_password;
        return true;
    }

    // // thao tác chuyển qua tab quên mật khẩu 
    btnForgetPassword.addEventListener("click", () => {
        errRe_Email.innerHTML = ""
        errResetPassword.innerHTML = ""
        errResetConfirmPassword.innerHTML = ""

        // Bắt sự kiện bấm vào nút quên mật khẩu
        formResetPassword.classList.add("active")
        loginForm.classList.toggle("active");
        loginHeader.classList.toggle("d-none"); // ẩn thanh đăng nhập / đăng ký

        confirmBtn.onclick = function(e) {
            e.preventDefault(); // ngăn chặn sự kiện mặc định của phần tử
            if (checkPasswordForm()) {
                loginForm.classList.add("active");
                formResetPassword.classList.toggle("active");
                loginHeader.classList.remove("d-none")
                btnForgetPassword.classList.remove("active");
            }

        };
        return true;
    })

    // thao tác quay về form đăng nhập từ form quên mật khẩu
    returnLoginForm.addEventListener("click", () => {
        loginForm.classList.add("active");
        formResetPassword.classList.toggle("active");
        loginHeader.classList.remove("d-none")
        btnForgetPassword.classList.remove("active");

        return true;
    })

    // thao tác quay về form đăng nhập từ form đăng ký
    document.getElementById("registerButton").addEventListener("click", function(event) {
        event.preventDefault();
        
        if (checkRegisterForm()) {
            registerForm.classList.toggle("active");
            // thay đổi modal header
            const navItemLink = document.querySelector(".nav-item-link.active");
            const navItemLinkActive = document.querySelector(".nav-item-link-active");

            navItemLink.classList.remove("active");
            navItemLinkActive.classList.add("active");
            // registerForm.classList.remove("active");
            loginForm.classList.toggle("active")

        }

    });

    // thao tác trở về form đăng nhập sau khi bấm nút x
    btnClose.forEach(function(btn) {
        btn.onclick = function() {
            // Lấy các form đăng nhập / đăng ký / quên mk 
            const loginForm_2 = document.querySelector(".loginForm");
            const registerForm_2 = document.querySelector(".registerForm");
            const formResetPassword_2 = document.querySelector(".formResetPassword");
        
            loginForm_2.reset();
            registerForm_2.reset();
            formResetPassword_2.reset();
        
            // kiểm tra nếu có class ở trong phần tử đó
            if (registerForm.classList.contains("active")) {
                const navItemLink = document.querySelector(".nav-item-link.active");
                const navItemLinkActive = document.querySelector(".nav-item-link-active");
        
                navItemLink.classList.remove("active");
                navItemLinkActive.classList.add("active");
                registerForm.classList.remove("active");
                loginForm.classList.add("active");
            }

            if (formResetPassword.classList.contains("active")) {
                loginHeader.classList.toggle("d-none");
                formResetPassword.classList.remove("active");
                loginForm.classList.add("active");

            }
        };
    })

    // lấy tên user sau khi đăng nhập 
    document.getElementById("loginButton").addEventListener("click", function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của button (chạy submit form)
            
        if (checkLoginForm() ) {
            var loginText = document.getElementById("loginText");
            var userInput = document.getElementById("userInput").value;
            loginText.innerText = userInput; // Cập nhật nội dung của "loginText" bằng giá trị nhập vào
            $('#modalContent').modal('hide'); // Ẩn modal sau khi đăng nhập thành công
        }
    
    });
    
    // thao tác reset lại các form
    $('#modalContent').on('hidden.bs.modal', function () {
        if (registerForm.classList.contains("active")) {
           errUser.innerHTML = ""
           errTel.innerHTML = ""
           errEmail.innerHTML = ""
           errPassword.innerHTML =""
           errConfirmPassword.innerHTML = ""
        }
    
        if (formResetPassword.classList.contains("active")) {
            errRe_Email.innerHTML = ""
            errResetPassword.innerHTML = ""
            errResetConfirmPassword = ""
        }
    
        if (loginForm.classList.contains("active")) {
            errPasswordInput.innerHTML = ""
            errUserInput.innerHTML = ""
        }
    
      })

    // thao tác đăng xuất
    document.getElementById("logoutButton").addEventListener("click", function() {
        sessionStorage.removeItem("loggedInUser");
        var loginText = document.getElementById("loginText");
        loginText.innerText = "Tài khoản";
        location.reload();
    });
});

window.onload = function() {
    if(sessionStorage.getItem("loggedInUser")) {
        var loginText = document.getElementById("loginText");
        loginText.innerText = sessionStorage.getItem("loggedInUser");
        // Ẩn form đăng nhập
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('modalHeader').style.display = 'none';
        // Hiển thị nút đăng xuất
        document.getElementById('logout').style.display = 'block';
    }
    if(!sessionStorage.getItem("loggedInUser")) {
        document.getElementById('logout').style.display = 'none';
    }
}

