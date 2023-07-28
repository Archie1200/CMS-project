const profile_button = document.querySelector("#managePassword_link");
profile_button.classList.add("active");

function myFunction(passwordBox) {
  var x = document.getElementById(`${passwordBox}`);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


function checkForm() {
  const errorBox1 = document.getElementById('error-oldPassword');
  const errorBox2 = document.getElementById('error-newPassword');
  const errorBox3 = document.getElementById('error-reNewPassword');

  errorBox1.innerText = "";
  errorBox2.innerText = "";
  errorBox3.innerText = "";



  const oldPassword = document.getElementById("oldPassword");
  const newPassword = document.getElementById("newPassword");
  const reNewPassword = document.getElementById("reNewPassword");

  var check = true;
  if (oldPassword.value.length == 0) {
    check = false;
    errorBox1.innerText = "**Mandatory field!!";
  }
  if (newPassword.value.length == 0) {
    check = false;
    errorBox2.innerText = "**Mandatory field!!";
  }
  if (reNewPassword.value.length == 0) {
    check = false;
    errorBox3.innerText = "**Mandatory field!!";
  }
  if (reNewPassword.value.length != 0 && newPassword.value != reNewPassword.value) {
    check = false;
    errorBox3.innerText = "**New Password not matched!!"
  }

  return check;
}