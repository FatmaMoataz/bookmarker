// & GLOBAL VARIABLES
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.querySelector(".btn-submit");
var deleteBtn=document.querySelector(".btn-danger");
var visitBtn=document.querySelector(".btn-success");
var tbody=document.getElementById("myData");
var itemList = [];
//  ! GET LOCALE STORAGE
if(localStorage.getItem("itemList") != null) {
    itemList = JSON.parse(localStorage.getItem("itemList"));
    display(itemList);
}
// & EVENT LISTENER
siteName.addEventListener("input", validateSiteName);
siteURL.addEventListener("input", validateSiteURL);
submitBtn.addEventListener("click", function(){
    if(siteName.value=="" || siteURL.value=="") {
        alert("Please fill this out")
    }
    else {
        if(siteName.classList.contains("is-valid") && siteURL.classList.contains("is-valid")) {
            checkSiteName();
        }
        else {
            if(siteName.classList.contains("is-invalid")) {
                alert("Site Name should be atleast 3 characters");
            }
                if(siteURL.classList.contains("is-invalid")) {
                    alert("Site URL should be in a corrected format");
                }
        }
    }
});
// * =====> FUNCTIONS <=====
// ^ DISPLAY LIST
function display(list) {
    var item = "";
    for (var i = 0; i < list.length; i++) {
        item += `<tr>
            <td>${i + 1}</td>
            <td>${list[i].name}</td>
            <td><button class="btn btn-success" onclick="visitURL(${i})"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button class="btn btn-danger" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>`;
    }
    document.getElementById("myData").innerHTML = item;
}
// ^ ADD LIST
function add() {
    var items = {
        name: siteName.value,
        url: siteURL.value
    };
    itemList.push(items);
    display(itemList);
   clearInput();
   updateLocalStorage();
}
// ^ CLEAR INPUT
function clearInput() {
    siteName.value=null;
    siteURL.value=null;
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
}
// ^ DELETE ITEM
function deleteItem(index) {
itemList.splice(index,1);
display(itemList);
updateLocalStorage();
}
// ^ VALIDATION FOR SITE NAME
function validateSiteName() {
    if (siteName.value.length >= 3) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
    } else {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
    }
}
// ^ VALIDATION FO SITE URL
function validateSiteURL() {
    var regex=/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
    if(regex.test(siteURL.value)) {
        siteURL.classList.add("is-valid");
        siteURL.classList.remove("is-invalid");
    }
    else {
        siteURL.classList.add("is-invalid");
        siteURL.classList.remove("is-valid");
    }
}
// ^ VISIT SITE URL
function visitURL(index) {
    var site = itemList[index].url;
    var fullURL = site.startsWith("http://") || site.startsWith("https://") ? site : `https://${site}`;
    window.open(fullURL, "_blank");
}
// ^ UPDATE LOCALE STORAGE
function updateLocalStorage() {
    localStorage.setItem("itemList" , JSON.stringify(itemList));
}
// ^ CHECK SITE NAME
function checkSiteName () {
    var siteExist=false;
    for(var i=0;i<itemList.length;i++) {
        if(itemList[i].name.toLowerCase()===siteName.value.toLowerCase()) {
            siteExist = true;
            break;
        }
    }
    if(siteExist==true) {
        alert("This Site Name already exists");
        clearInput();
    }
    else {
        add();
    }
}