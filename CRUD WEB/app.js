firebase.initializeApp({
    apiKey: 'AIzaSyBAyX2tpN73vkVzAvjr8WzoQj1Q4YBFHa0',
    authDomain: 'proyecto-firebase-38580.firebaseapp.com',
    projectId: 'proyecto-firebase-38580'
  });
  
  // Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
// agregar documento
function Guardar() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;
    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then(function(docRef) {
        console.log("este es el id: ", docRef.id);
        document.getElementById('nombre').value='';
        document.getElementById('apellido').value='';
        document.getElementById('fecha').value='';
    })
    .catch(function(error) {
        console.error("ocurrio un error y la operacion fallo: ", error);
    });
}

var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML="";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td> 
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>     
        </tr> `
    });
});

// eliminar un documento
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("se elimino con exito");
    }).catch(function(error) {
        console.error("ocurrio un error al intentar eliminar ", error);
    });
}

// actualizar un documento
function editar(id,nombre,apellido,fecha){
    
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;
    var boton = document.getElementById('boton'); 
    boton.innerHTML = "Actualizar";
    boton.onclick = 
    function (){
        var washingtonRef = db.collection("users").doc(id);
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var fecha = document.getElementById('fecha').value;
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            first: nombre,
            last: apellido,
            born: fecha
        })
        .then(function() {
            console.log("actualizado con exito!");
            document.getElementById('boton').innerHTML = "Guardar";
            document.getElementById('boton').onclick = Guardar;
            document.getElementById('nombre').value='';
            document.getElementById('apellido').value='';
            document.getElementById('fecha').value='';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error al actualizar: ", error);
        });
    }
}

