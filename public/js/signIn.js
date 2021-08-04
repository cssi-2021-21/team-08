const signIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  // console.log(provider)
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;

    // The signed-in user info.
    var user = result.user;
    window.location = 'signIn.html';
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    const err = {
      errorCode,
      errorMessage,
      email,
      credential
    };
    console.log(err);
  });
}
document.querySelector("#emailSignIn").addEventListener("click", () => {
    document.querySelector(".modal").classList.add("is-active");
})

document.querySelector(".modal-background").addEventListener("click", () => {
    document.querySelector(".modal").classList.remove("is-active");
})

{
    let buttonAction = () => {
        const email = document.querySelector("#emailInput").value;
        const password = document.querySelector("#passwordInput").value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location = "stockPortfolio.html";
            })
            .catch((error) => {
                alert(error);
            });
    }

    function listenerFunction() {
        buttonAction();
    }

    document.querySelector("#loginButton").addEventListener("click", listenerFunction);

    document.querySelector(".has-text-grey").addEventListener("click", () => {
        const confirmPass = document.querySelector("#passwordConfirmInput");
        confirmPass.classList.remove("is-hidden");
        document.querySelector(".has-text-grey").classList.add("is-hidden");
        document.querySelector("#loginButton").innerHTML = "Create New Account";
        buttonAction = () => {
            const email = document.querySelector("#emailInput").value;
            const password = document.querySelector("#passwordInput").value;
            const password2 = confirmPass.value;
            console.log(password2);
            console.log(password);
            if (password2 == password) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        window.location = "stockPortfolio.html";
                    })
                    .catch((error) => {
                        alert(error);
                    });
            } else {
                alert("Your passwords don't match.");
            }
        };
    })
}

