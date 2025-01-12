// ---- Get today and yesterday for inp Date ----

var password_agent = false;

var error_date = false;

// دالة لتحويل التاريخ إلى تنسيق YYYY-MM-DD
function formatDateToYMD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // إضافة 1 لأن الأشهر تبدأ من 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// احصل على التاريخ الحالي بدون الاعتماد على UTC
const today = new Date();
const todayString = formatDateToYMD(today);

// احسب تاريخ ثلاث ايام سابقين
const yesterday2 = new Date();
yesterday2.setDate(today.getDate() - 2);
const yesterdayString2 = formatDateToYMD(yesterday2);

// احسب تاريخ ثلاث ايام سابقين
const yesterday1 = new Date();
yesterday1.setDate(today.getDate() - 1);
const yesterdayString1 = formatDateToYMD(yesterday1);


// احسب تاريخ ثلاث ايام سابقين
const yesterday3 = new Date();
yesterday3.setDate(today.getDate() - 3);
const yesterdayString3 = formatDateToYMD(yesterday3);

// // اطبع القيم للتحقق
// console.log("Today: " + todayString);
// console.log("Yesterday: " + yesterdayString3);

// تعيين الحدين الأدنى والأقصى في حقل التاريخ
const dateInput = document.getElementById("date");
dateInput.min = yesterdayString3;
dateInput.max = todayString;


dateInput.addEventListener("change", function () {
  const selectedDate = dateInput.value;

  // تحقق مما إذا كان التاريخ المحدد هو اليوم أو الأمس
  if (selectedDate !== todayString && selectedDate !== yesterdayString1 && selectedDate !== yesterdayString2 && selectedDate !== yesterdayString3  ) {
    document.getElementById("error_msg_date").style.display = "inline";
    dateInput.setCustomValidity("يجب اختيار تاريخ اليوم أو الثلاث ايام السابقين فقط!");
    error_date = false;
    dateInput.classList.add("ac_error");
  } else {
    document.getElementById("error_msg_date").style.display = "none";
    dateInput.setCustomValidity("");
    dateInput.classList.remove("ac_error");
    error_date = true;
  }

  dat_check();
});






// toggleInputs / open and close dev

function toggleInputs(id_Dev, id_checkbox, clas_inp1, clas_inp2) {
  var inputContainer = document.getElementById(`${id_Dev}`);

  var inp11 = document.getElementById(`${clas_inp1}`)
  var inp22 = document.getElementById(`${clas_inp2}`)

  if (document.getElementById(`${id_checkbox}`).checked) {
    inputContainer.classList.add('show');

    inp11.setAttribute("required", true);
    inp22.setAttribute("required", true);
  } else {
    inputContainer.classList.remove('show');

    inp11.value = ""
    inp22.value = ""

    inp11.removeAttribute("required");
    inp22.removeAttribute("required");
  }
}

var scriptURL = "https://script.google.com/macros/s/AKfycbyXx7BWYi6yj369orbCATzxNlrcpG73nu6X6cM9Vg3tBUaBWACL6Vr8hjINegKpHItusA/exec";

let hiddenInput = document.querySelector('input[name="formId"]');
hiddenInput.value = "form1";


function toggleInputs2(id_Dev, id_checkbox, clas_inp1, clas_inp2) {
  var inputContainer = document.getElementById(`${id_Dev}`);

  var show_sec_for_all = document.querySelector(".show_sec_for_all");

  var inp11 = document.getElementById(`${clas_inp1}`)
  var inp22 = document.getElementById(`${clas_inp2}`)

  if (document.getElementById(`${id_checkbox}`).checked) {
    inputContainer.classList.add('show');
    show_sec_for_all.classList.add('show2');


    inp11.setAttribute("required", true);
    inp22.setAttribute("required", true);

    hiddenInput.value = "form2";

    
  } else {
    inputContainer.classList.remove('show');
    show_sec_for_all.classList.remove('show2');

    hiddenInput.value = "form1";

    inp11.value = ""
    inp22.value = ""

    inp11.removeAttribute("required");
    inp22.removeAttribute("required");
  }
}





let password_input = document.querySelector(".password_inp");


let form = document.forms["Marketing_Form"];

let btn_subm = document.getElementById("submitBtn");

let errorMessage = document.getElementById("eror");


function dat_check() {
  if (!error_date) {
    errorMessage.innerHTML = "ادخل تاريخ صحيح !"
  }
  else if (error_date){
    errorMessage.innerHTML = ""
    
  }
}






form.addEventListener("submit", (e) => {

  e.preventDefault();


    const priceInputs = document.querySelectorAll(".price");
  let sum = 0;

  // جمع القيم الموجودة في حقول price
  priceInputs.forEach(input => {
    sum += parseFloat(input.value) || 0;  // إضافة القيمة إذا كانت رقمية، وإلا نضيف 0
  });


    
    if (password_agent && password_agent == password_input.value) {
    btn_subm.classList.add("disable");
    btn_subm.innerHTML = `
        <div class="dot-spinner">
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
        </div>
    `;

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        window.location.href = "thanks.html";
      })
      .catch((error) => console.error("Error!", error.message));
  } else {


    errorMessage.innerHTML = "تأكد من الرقم السري";
  }
});

