(function persistUsers() {
  const globalKey = "users_backup";
  const users = localStorage.getItem("users");

  if (users && !localStorage.getItem(globalKey)) {
    localStorage.setItem(globalKey, users);
  }
  if (!users && localStorage.getItem(globalKey)) {
    localStorage.setItem("users", localStorage.getItem(globalKey));
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const phoneInput = document.getElementById("phone");
  const countrySelect = document.getElementById("countryCode");
  const message = document.getElementById("message");

  phoneInput.addEventListener("input", function () {
    if (this.value.includes(" ")) {
      this.value = this.value.replace(/\s+/g, "");
      message.style.color = "orange";
      message.textContent = "Spaces-ek eltávolítva automatikusan.";
    }
  });

  function validatePhone() {
    const code = countrySelect.value;
    const number = phoneInput.value.trim();
    let valid = false;
    let ruleMessage = "";

    switch (code) {
      case "+36":
        valid = /^[0-9]{9}$/.test(number);
        ruleMessage = "Magyar szám pontosan 9 számjegyet tartalmazzon.";
        break;
      case "+44":
        valid = /^7[0-9]{9}$/.test(number);
        ruleMessage = "UK szám kezdőfjön 7-el és 10 számjegyet tartalmazzon.";
        break;
      case "+1":
        valid = /^[0-9]{10}$/.test(number);
        ruleMessage = "US szám pontosan 10 számjegy.";
        break;
      case "+49":
        valid = /^[0-9]{10,11}$/.test(number);
        ruleMessage = "Német szám pontosan 10-11 számjegyet tartalmazzon.";
        break;
      case "+33":
        valid = /^[0-9]{9}$/.test(number);
        ruleMessage = "Francia szám 9 számjegyjőb álljon.";
        break;
      case "+91":
        valid = /^[0-9]{10}$/.test(number);
        ruleMessage = "Indiai szám pontosan 10 számjegy legyen.";
        break;
      case "+81":
        valid = /^[0-9]{9,10}$/.test(number);
        ruleMessage = "Japán szám 9–10 számjegyből álljon.";
        break;
      case "+39":
        valid = /^[0-9]{9,10}$/.test(number);
        ruleMessage = "Olasz szám 9–10 számjegyből álljon.";
        break;
      case "+61":
        valid = /^[0-9]{9}$/.test(number);
        ruleMessage = "Ausztál szám pontosan 9 számjegyet tartalmazzon.";
        break;
      case "+34":
        valid = /^[0-9]{9}$/.test(number);
        ruleMessage = "Spanyol szám pontosan 9 számjegyet tartalmazzon.";
        break;
      case "+7":
        valid = /^[0-9]{10}$/.test(number);
        ruleMessage = "Orosz szám pontosan 10 számjegyet tartalmazzon.";
        break;
      case "+90":
        valid = /^[0-9]{10}$/.test(number);
        ruleMessage = "Török szám pontosan 10 számjegyet tartalmazzon.";
        break;
      case "+48":
        valid = /^[0-9]{9}$/.test(number);
        ruleMessage = "Lengyel szám pontosan 9 számjegyet tartalmazzon.";
        break;
      default:
        ruleMessage = "Adj meg egy valós telefonszámot!";
    }

    if (!valid && number.length > 0) {
      message.style.color = "red";
      message.textContent = ruleMessage;
    } else {
      message.textContent = "";
    }

    return valid;
  }

  phoneInput.addEventListener("input", validatePhone);
  countrySelect.addEventListener("change", validatePhone);

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const phone = phoneInput.value.trim();
    const selectedCountry = countrySelect.value;

    message.textContent = "";
    message.style.color = "red";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      message.textContent = "Adj meg egy email címet (example@gmail.com).";
      return;
    }

    if (!validatePhone()) return;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      message.textContent =
        "Jelszónak legalább 8 karakterből álljon és tartalmazzon egy nagy és egy kisbetűt, speciális karaktert és számot.";
      return;
    }

    if (password !== confirmPassword) {
      message.textContent = "A jelszó nem egyezik.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (u) => u.username === username || u.email === email || u.phone === phone
    );
    if (existingUser) {
      message.textContent = "Felhasználónév már létezik. Adj meg egy másikat!";
      return;
    }

    const newUser = {
      username,
      email,
      password: btoa(password),
      phone,
      country: selectedCountry,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("users_backup", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    message.style.color = "green";
    message.textContent = "Sikeres a regisztráció...";

    setTimeout(() => {
      window.location.href = "zevizar.html";
    }, 1500);
  });
});
