import jwt from "jsonwebtoken";
import { config } from "dotenv";
import express from "express";
config();

//validando
const validarToken = (token) =>{
    let respuesta = "";
    const secret = process.env.JWT_SECRET;
    if(!token){
        return "";
    }
    
    jwt.verify(token, secret, (error, decodedToken) => {
        if(error) {
            //Error al verificar el token
            console.log('Error al verificar el token: ', error);
            return ""
        }else{
            //token verificado correctamente, puedes acceder
            //console.log('Token decodificado:', decodedToken)
            respuesta=decodedToken;
        }
    })
    return respuesta;
}

const MostrarDash = (req, res) =>{
    let token = "";
    const cookieToken = req.headers.cookie;
    const url = process.env.URL_BACK;

    if(cookieToken){
        const cookies = cookieToken.split(';');
        cookies.forEach(cookie =>{
            const [nombre, valor] = cookie.split('=');
            if(nombre.trim () === 'token'){
                token = valor;
            }
        });
}
    let datos = validarToken(token);
    if (datos !== ""){
        res.render("views.dash.ejs" , {"datos":datos});
        return;
    }
    res.redirect("/login.html");
};

const RutaDash = Router();

RutaDash.get(MostrarDash);

ruta.use("/dashboard", RutaDash);

const app=express();

app.use(ruta);

app.listen(app.get("port"), () =>{
    console.log(`Conectado al puerto ${app.get('port')}`);
});

const logueese = () => {

    const correo = document.getElementById("correo");
    const contrasena = document.getElementById("contrasena");

    let option = {
        "method": "POST",
        headers: {
            "Content-type": "application/json",
        },
        "body": JSON.stringify({
            "correo":correo.value,
            "contrasena": contrasena.value
        })
    }
    let url = "http://localhost:20000/api/login";

    fetch(url, option)
    .then(res => res.json())
    .then(data => {
        document.cookie =`token=${data.token}`;
        if(data.token !==undefined){
            window.location.href="/dash";
        }else{
            alertify.error("Clave incorrecta");
        }
    })
    .catch(error => console.log(error.message))
};

const EliminaRegistro = (event) =>{
    // let codigo = document.getElementById("Elimina")
    // .parentElement. parentElement.children[3];
    let codigo = event.target.parentElement
    .parentElement.children[0].innerHTML;

    const url = "http://localhost:20000/api/usuario";
    const option = {
        method : "DELETE",
        body:  JSON.stringify({
            "idusuario": codigo
        })
    }
    fetch(url, option)
    .then(res=>res.json())
    .then(data=>alert(data))
    .catch(error=>alert(error))
}

// Para salir de la aplicacion

const salirUsuario = () =>{
    document.cookie = "token=";
    window.location.href="/salir"
}

const GuardarUsuario = () =>{
    const identificacion = document.getElementById('identificacion').value;
    const nombre = document.getElementById('nombres').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const telefono = document.getElementById('telefono').value;

    
    const url = "http://localhost:20000/api/usuario";
    // const option = {
    //     method : "POST",
    //     body:  JSON.stringify({
    //         "idusuario": codigo
    //     })
    // }

    // alert('Registro guardado');

    let token = "";
    const cookieToken = document.cookie;

    if(cookieToken){
        const cookies = cookieToken.split(';');
        cookies.forEach(cookie =>{
            const [nombre, valor] = cookie.split('=');
            if(nombre.trim() === 'token'){
                token = valor;
            }
        });
    }else{
        alert("Debe loguearse nuevamente");
        return
    }
    if(token==""){
        alert("Debe loguearse nuevamente");
        return
    }

    const headers ={
        'x-access-token':token,
        'Content-type': 'application/json'
    };

    const options = {
        method: "POST",
        body : JSON.stringify({
            "idusuario": null,
            identificacion,
            nombre,
            correo,
            contrasena,
            telefono
        }),
        headers
    }

    fetch(url, options)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        alert('Registro guardado' + data)
    })
    .catch(error =>{
        alert("Error al guardar registro" , error)
    })
}