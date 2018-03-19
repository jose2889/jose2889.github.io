
function registrar(){
    var email = document.getElementById('email').value;
    var clave = document.getElementById('clave').value;

    firebase.auth().createUserWithEmailAndPassword(email, clave)
    
    .then(function(){
        verificar();
       })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
      email.html
      
   
}

function ingreso(){
    var email2 = document.getElementById('email2').value;
    var clave2 = document.getElementById('clave2').value;

    firebase.auth().signInWithEmailAndPassword(email2, clave2)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
      email.html
      
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          aparece(user);
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
        console.log("No existe Usuario Activo");
        contenido.innerHTML = `
        <div class="container mt-5">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Cesion No Activa!</strong> Gracias por visitarnos...
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>`;
          // ...
        }
      });
      email.html
      
}

observador();

function aparece(user){
    var contenido = document.getElementById('contenido');
    if (user.emailVerified){
        contenido.innerHTML = `
        <div class="container mt-5">
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
                <p>mensaje de prueba.</p>
                <hr>
                <p class="mb-0">Holaaaaaaaaaaaaaaaaa.</p>
            </div>
            <button class="btn btn-danger" onclick="cerrar()">Cerrar Sesion</button>
        </div>`;
        
    }
    else{
        contenido.innerHTML = `
        <div class="container mt-5">
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            el correo <strong>${user.email}</strong> aun no ha sido verificado
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>            
        </div>
        <button class="btn btn-danger" onclick="cerrar()">Cerrar Sesion</button>
        </div>`;
    }
    
    
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
     console.log('saliendo...')
    })
    .catch(function(error){
        console.log(error)
    })
}

function verificar(){
    var user = firebase.auth().currentUser;
    
    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log("enviando correo")
    }).catch(function(error) {
      // An error happened.
      console.log("no se pudo enviar el correo de verificacion")
    });
}