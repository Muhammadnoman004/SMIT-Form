import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDT2wuvo64TfJyuOUGYpyZmXrhg7TjiNjo",
    authDomain: "smit-form-37a02.firebaseapp.com",
    projectId: "smit-form-37a02",
    storageBucket: "smit-form-37a02.appspot.com",
    messagingSenderId: "44619604020",
    appId: "1:44619604020:web:30af6e91247d02c34baa61"
};
// Initialize Firebase  //

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();


let imageURL;
let imageDiv = document.querySelector(".imageDiv");
let image = document.querySelector("#image");
let getSubbtn = document.querySelector("#submit");
let getpicture = document.querySelector("#Upload");

//  Storage //

const downloadImageUrl = (file) => {
    return new Promise((resolve, reject) => {
        const restaurantImageRef = ref(storage, `images/${file.name}`
        );
        const uploadTask = uploadBytesResumable(restaurantImageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                switch (snapshot.state) {
                    case "paused":
                        console.log('Upload is paused');
                        break;
                    case "running":
                        console.log("running");
                        break;
                }
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        );
    });
};

getpicture.addEventListener("change", async () => {
    if (getpicture.files.length > 0) {
        const file = getpicture.files[0];
        imageDiv.style.display = "block";
        imageURL = await downloadImageUrl(file);
        if (imageURL) {
            image.src = imageURL;
        }
    }
})

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

    if (getname.value == "" || getF_name.value == "" || getEmail.value == "" || getphone.value == "" || getCNIC.value == "" || getDOB.value == "" || getAddress.value == "" || getQualificaion.value == "" || getlaptop.value == "" || getgender.value == "" || getcity.value == "" || getcourse.value == "" || getpicture.value == "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Fill The Form Carefully!",
        });

    }
    else {

        try {
            const docRef = await addDoc(collection(db, "Users Data"), {
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
                Profile_Image: imageURL,
                Time: new Date().toLocaleString()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        const Toast = Swal.mixin({
            toast: true,
            position: "top-center",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Your data has been submitted"
        });
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
        getpicture.value = ''
        imageDiv.style.display = "none"
    }

})