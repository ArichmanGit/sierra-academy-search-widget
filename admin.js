// Handle the user login
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login successful, hide login form and show admin content
      document.getElementById("loginDiv").style.display = "none";
      document.getElementById("adminContent").style.display = "block";
    })
    .catch((error) => {
      console.error("Login Failed:", error);
      alert("Login failed: " + error.message);
    });
}

// Add event listener to form for adding links
document
  .getElementById("linkForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("titleField").value;
    const url = document.getElementById("urlField").value;
    const tags = document
      .getElementById("tagsField")
      .value.split(",")
      .map((tag) => tag.trim().toLowerCase());
    addLink(title, url, tags);
  });

// Function to add links to Firestore
function addLink(title, url, tags) {
  db.collection("links")
    .add({
      title: title,
      url: url,
      tags: tags,
    })
    .then(() => {
      console.log("Document successfully written!");
      alert("Link added successfully!");
      // Optionally clear form fields or display links
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}
