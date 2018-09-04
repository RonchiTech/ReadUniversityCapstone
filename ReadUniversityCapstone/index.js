firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".login-cover").hide();

    var dialog = document.querySelector('#loginDialog');
    /*
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    */
    dialog.close();

  } else {

    $(".login-cover").show();

    // No user is signed in.
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

  }
});

/*REGISTER DIALOG*/
// $("#regBtn").click(
//   function () {
//
//
//   }
// )
/* LOGIN PROCESS */

$("#loginBtn").click(
  function(){


    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();
      $("#regBtn").hide();
      $("#register_account_Btn").hide();

      firebase.auth().signInWithEmailAndPassword(email, password).then(user =>{
        return firebase.database().ref('/users/' + user.uid).set({
          email: user.email,
          uid: user.uid
        });
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#loginError").show().text(errorMessage);
        $("#loginProgress").hide();
        $("#loginBtn").show();
        $("#regBtn").show();
        $("#back_btn").show();

      });
    }
  }
);

/* REGISTER PROCESS */

$("#register_account_Btn").click(
function(){
    var email = $("#regEmail").val();
    var password = $("#regPassword").val();

    if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();
      $("#back_btn").hide();
      $("#register_account_Btn").hide();


      firebase.auth().createUserWithEmailAndPassword(email, password)
      //.then(user =>
      // {
      //   return firebase.database().ref('/users/' + user.uid).set({
      //     email: user.email,
      //     uid: user.uid
      //   })
      // })
        .catch(function(error) {
         Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#loginError").show().text(errorMessage);
        $("#loginProgress").hide();
        $("#loginBtn").hide();
        $("#back_btn").show();
        $("#register_account_Btn").show();


      });

    }


  }
);


/* LOGOUT PROCESS */

$("#signOutBtn").click(

  function(){
    confirm("Are you sure you want to signout?");
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.open('index.html','_self');
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });

  }
);
