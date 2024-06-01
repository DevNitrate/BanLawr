const { initializeApp } = require("firebase/app")
const { getFirestore, addDoc, collection, query, where, getDoc, getDocs } = require('firebase/firestore')
const express = require("express")

const app = express()
app.use(express.static('public'))
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.listen(3000)
console.log("listening on port 3000")

const firebaseConfig = {
    apiKey: "AIzaSyBuM7wbq3oPATjIqvj7p0GrkAVAvZvq3WY",
    authDomain: "chust-cb8e5.firebaseapp.com",
    databaseURL: "https://chust-cb8e5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chust-cb8e5",
    storageBucket: "chust-cb8e5.appspot.com",
    messagingSenderId: "781104905147",
    appId: "1:781104905147:web:037484f8cdf6544506e29e",
    measurementId: "G-GHFKL05S1G"
}

const fireApp = initializeApp(firebaseConfig)
const db = getFirestore(fireApp)

app.get("/", async (req, res) => {
    let q = query(collection(db, "votes"), where("vote", "==", true))
    let snap = await getDocs(q)

    var num = 0

    snap.forEach((doc) => {
        num++
    })
    res.render("home.ejs", {
        yes: num
    })
})

app.post("/vote", async (req, res) => {
    await addDoc(collection(db, "votes"), {
        vote: true
    })
    res.redirect("/")
})