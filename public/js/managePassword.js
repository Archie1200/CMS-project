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
