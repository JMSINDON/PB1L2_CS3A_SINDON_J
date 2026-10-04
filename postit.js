/*
    PB1-L2 POST IT
    Handles user information, posts, and encryption.
*/

const secretKey = "PostItSecretKey2026";
let user = null;

/* Get the information entered vy the user */
function saveUser() {
    user = {
        fullname: document.getElementById("fullname").value,
        birthday: document.getElementById("birthday").value,
        yearlevel: document.getElementById("yearlevel").value,
        gender: document.getElementById("gender").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    /* Check if the user completed the form */
    if (
        user.fullname === "" ||
        user.birthday === "" ||
        user.yearlevel === "" ||
        user.gender === "" ||
        user.username === "" ||
        user.password === ""
    ) {
        document.getElementById("message").textContent = "Please complete all fields.";
        return;
    }

    /* Hide the information */
    document.getElementById("userSection").style.display = "none";

    /* Show post the area */
    document.getElementById("postSection").style.display = "block";

    document.getElementById("message").textContent = "You can now create a post.";
}


/* create and add a new post */
function addPost() {

    const post = document.getElementById("post").value;

    /* make sure the caption is not empty */
    if (post === "") {
        document.getElementById("message").textContent = "Please enter a caption.";
        return;
    }
    /* Get current date */
    const date = new Date().toLocaleString();
    /* prepared the information for encryption */
    const data = { username: user.username, post: post, date: date };
    /* change the data into text*/
    const text = JSON.stringify(data);
    /* Encrypt the post info */
    const encrypted = CryptoJS.AES.encrypt( text, secretKey ).toString();
    /* Create post the display */
    const postBox = document.createElement("div");

    postBox.className = "post-card";
    postBox.innerHTML = ` <div class="original-title">ORIGINAL POST</div>

        <div class="original-content">
            <b>User:</b> ${user.username}<br><br>
            <b>Post:</b> ${post}<br><br>
            <b>Date:</b> ${date}
        </div>
        <div class="encrypted-title">ENCRYPTED</div>

        <div class="encrypted-content">
            ${encrypted}
        </div>
    `;
    /* put the new post in the thread*/
    document.getElementById("posts").prepend(postBox);
    /* clear the caption after posting */
    document.getElementById("post").value = "";
    document.getElementById("message").textContent =
        "Post added successfully.";
}