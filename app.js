import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDT2wuvo64TfJyuOUGYpyZmXrhg7TjiNjo",
    authDomain: "smit-form-37a02.firebaseapp.com",
    projectId: "smit-form-37a02",
    storageBucket: "smit-form-37a02.appspot.com",
    messagingSenderId: "44619604020",
    appId: "1:44619604020:web:30af6e91247d02c34baa61"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let getSubbtn = document.querySelector("#submit");

getSubbtn.addEventListener("click", async () => {

    let getcity = document.querySelector("#cityinp");
    let getcourse = document.querySelector("#courseinp");
    let getname = document.querySelector("#nameinp");
    let getF_name = document.querySelector("#Fnameinp");
    let getEmail = document.querySelector("#emailinp");
    let getphone = document.querySelector("#Phoneinp");
    let getCNIC = document.querySelector("#CNICinp");
    let getF_CNIC = document.querySelector("#FCNICinp");
    let getDOB = document.querySelector("#DOBinp");
    let getgender = document.querySelector("#genderinp");
    let getAddress = document.querySelector(".Addressinp");
    let getQualificaion = document.querySelector("#qualificationinp");
    let getlaptop = document.querySelector("#Laptopinp");

    // console.log(getname.value);
    // console.log(getF_name.value);
    // console.log(getEmail.value);
    // console.log(getphone.value);
    // console.log(getCNIC.value);
    // console.log(getF_CNIC.value);
    // console.log(getDOB.value);
    // console.log(getAddress.value);
    // console.log(getQualificaion.value);
    // console.log(getlaptop.value);
    // console.log(getgender.value);

    let getpicture = document.querySelector("#Upload");

    if (getname.value == "" || getF_name.value == "" || getEmail.value == "" || getphone.value == "" || getCNIC.value == "" || getF_CNIC.value == "" || getDOB.value == "" || getAddress.value == "" || getQualificaion.value == "" || getlaptop.value == "" || getgender.value == "" || getcity.value == "" || getcourse.value == "") {
        alert("Please Fill The Form")
    }
    else {

        try {
            const docRef = await addDoc(collection(db, "users Data"), {
                City: getcity.value,
                Course: getcourse.value,
                Name: getname.value,
                F_Name: getF_name.value,
                Email: getEmail.value,
                Phone: getphone.value,
                CNIC: getCNIC.value,
                F_CNIC: getF_CNIC.value,
                Born: getDOB.value,
                Gender: getgender.value,
                Address: getAddress.value,
                Qualification: getQualificaion.value,
                LapTop: getlaptop.value,
                Time: new Date().toLocaleString()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        getcity.value = ''
        getcourse.value = ''
        getname.value = ''
        getF_name.value = ''
        getEmail.value = ''
        getphone.value = ''
        getCNIC.value = ''
        getF_CNIC.value = ''
        getDOB.value = ''
        getgender.value = ''
        getAddress.value = ''
        getQualificaion.value = ''
        getlaptop.value = ''
    }


})