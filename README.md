# Proyecto de un manejador sencillo de contraseñas:

## Objetivos del proyecto:
- Agregar nuevas contraseñas
- Borrar contraseñas
- Encriptar - Desencriptar passwords (Crypto)

## Tools:
- Front: React JS & Material UI
- Back: Node JS & Express creacion de api
- BD: MySQL

## Instructions
Para correr cliente y servidor, se instalan las dependencias

    $ npm install

Para posteriormente lanzar cliente y servidor usando en cada uno de los directorios

    $npm start


### Password Manager By Pedro Tech
https://www.youtube.com/watch?v=ZNY_PYGxrdc


# Episodio 1, configuracion inicial de cliente y servidor

Este manejador de contraseñas es un proyecto sencillo para empezar con nodeJS y ReactJS, permite almacenar
las diferentes contraseñas en un solo lugar. Las contraseñas van a ser guardadas encriptadas.

Seguridad:
Contraseñas de los servicios en un solo lugar
Almacenadas de manera segura y encriptada 
No permitirá agregar contraseñas básicas

Se crea la carpeta del proyecto:

/password_manager

Dentro se crean 2 carpetas:

/client: Almacena la aplicacion de React que es el cliente que se conecta al server
/server: Almacena la aplicacion creada con Node y Express

## Creacion de cliente

En la carpeta /cliente se instala la aplicacion de React:

    $ npx create-react-app .

Ya que este proceso toma un tiempo se procede a configurar el servidor

/server 

## Creacion de servidor

En el servidor es necesario iniciar la aplicacion de nodeJS e instalar Express, esto crea el package.json que va a permitir almacenar las dependencias

    $ npm init -y
    $ npm install express mysql 

Es necesario instalar express, mysql y cors, el cual permite la conexion entre la api de front y la api del back para que no haya problema con las llamadas a las api
    
    $ npm install cors 

Ahora es necesario crear el punto de entrada para nuestro servidor, en package.json muestra por defecto a **/index.js** por lo tanto se crea un archivo con este nombre.

server/index.js 

    const express = require('express');
    const app = express();
    const PORT = 3001;

    app.listen(PORT, () => {
        console.log(`Server is running in http://localhost:${PORT}`);
    });

Se llama a express y se crea una variable puerto que almacena
el puerto de conexion, sera 3001 ya que React corre en el 3000

Al metodo listen se pasa el puerto y una funcion que se va a ejecutar cuando el servidor
establece conexion.

Se verifica la conexion con el comando que inicia el servidor:

    $ node index.js 

La respuesta que se obtiene en el navegador al acceder a la ruta localhost:3001 es:
    
    Cannot GET / -> 
    
Significa que la api esta corriendo, aun no se le han creado manejadores para las rutas.

## Manejo de rutas en el servidor

Se crea una funcion GET con la ruta / para hacer una prueba de las rutas

Para manejar una ruta, se usa el objeto app que contiene a express. A este objeto se le hace un llamado a un metodo get, este metodo recibe la ruta a manejar, y un callback con los objetos req y res que se ejecuta al ingresar a la ruta

    app.get('/', (req, res) => {
        res.send("Hello World!! This is an app running nodejs on express!!");
    });

Para no estar reiniciando el servidor cada que se haga un cambio se instala el modulo nodemon de manera global, esto ya que al subir el servidor, no se quiere que corra en produccion con nodemon.

    $ npm install -g nodemon 

Para que nodemon funcione, se hace un cambio en /package.json, se agrega un atributo scripts, dentro del cual va otro atributo 
    
    "start" : "nodemon index.js", 

de esta manera cada que se llama a start se ejecuta este comando para que los  cambios se actualicen solos. Con el siguiente comando se ejecuta ahora la aplicacion

    $ npm start

## Conexion a base de datos Mysql

Ahora se va a hacer conexion con la base de datos, para lo cual se descarga
la herramienta MYSQL Workbench. que requiere mysql-server corriendo en el equipo.
Para este caso se va a iniciar usando phpmyadmin que se encuentra corriendo en un servidor de xampp.

### Base de datos en Mysql - phpmyadmin, workbench:

Se crea un nuevo esquema en la instancia local de la base de datos en el puerto 3306
con el nombre **PasswordManager** que será la base de datos para este proyecto 
Dentro de esta se crea una tabla llamada **passwords**, con los campos:

    CREATE TABLE `passwords` (
      `id` int(5) NOT NULL,
      `name` varchar(255) NOT NULL,
      `url` varchar(124) NOT NULL,
      `username` varchar(50) NOT NULL,
      `password` varchar(255) NOT NULL,
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Se le da apply en la esquina derecha para crear la tabla.

Para conectar la aplicacion con la tabla, es necesario llamar el modulo de mysql, 

    const mysql = require('mysql');

para crear la conexion es necesario crear un objeto db, que representa todas las querys a la base de datos, este objeto tiene unos parametros que pertenecen a la configuracion de mysql

    const db = mysql.createConnection({
        user: 'root',
        host: 'localhost',
        password: '', 
        database: 'PasswordManager',
    });

## Retomando trabajo con el cliente

/client 

Luego se pasa al lado del cliente en react, en este directorio, hay una carpeta que se llama **/src** que tiene algunos archivos que no son utiles:
App.text.js, index.css, logo.svg, setupTest.js
por lo que se borran, ademas se eliminan todas las referencias a estos archivos
en:

/index.js a index.css , en /app.js a logo y se deja limpio el archivo app.js para comenzar a crear la estructura html, se deja solo la impresion de un mensaje "Hello World from React"

En App.css se le comienza a dar estilo al front de la aplicacion de react para poder trabajar con ella, se borran todos los estilos en App.css y se crea un formulario basico de dos inputs y un boton para submit.

    function App() {
      return (
        <div className="App">
          <div className='AddingPassword'>
            <input type="text" placeholder="Ex. password"></input>
            <input type="text" placeholder="Ex. facebook"></input>
            <button>Add Password</button>
          </div>
        </div>
      );
    }


Se le da un poco de estilo a la aplicacion de react, ya que los estilos por defecto se eliminaron.
Prmero se estiiza el contenedor app que es el que contiene al resto de los elementos.

    .App {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

Posteriormente se estiliza el contenedor AddingPassword que contiene a los elementos input.

    .AddingPassword {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: lightskyblue;
      width: 70%;
      height: 400px;
      border-radius: 20px;
      margin-top: 20px;
    }

Finalmente se le da estilo a los elementos input y el boton individualmnte

    .AddingPassword button, input {
      width: 300px;
      height: 40px;
      border: none;
      border-radius: 7px;
      margin: 10px;
      padding-left: 15px;
      font-size: 17px;
    }

    button{
      cursor: pointer;
    }


Para enviar la informacion escrita en el front al back se usan hooks o estados de react importando la libreria **useState** 
para almacenar estados o states. Los estados son variables que disparan rederizaciones en la pagina. Almacenan el estado de la variable Reaccionan y almacenan cada cambio realizado que desencadenan renders.

Lo primero es importar userState del modulo de react. Luego se crean las variables que almacenaran los cambios, una por cada celda, es decir un hook para el title y otro hook para el password.

Se define e inicializa cada uno de los hooks con una cadena vacia los estados dentro de las cajas de texto,o una funcion onChange que detecta los cambios

    import { useState } from "react";

    function App() {

        const [password, setPassword] = useState("");
        const [title, setTitle] = useState("");

Para el evento onChange de cada uno de los inputs es necesario agregar el atributo onChange, que recibe un evento a traves de una funcion flecha, la cual a cada cambio del input de texto se actualiza usando setPassword con el atributo de event.target.value el cual retorna el valor de texto

    return (
      <div className="App">
        <div className="AddingPassword">
          <input
            type="text"
            placeholder="Ex. password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Ex. facebook"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <button>Add Password</button>
        </div>
      </div>
    );

En este momento ya se tienen las dos variables necesarias para ingresar datos a la base de datos, estos valores estan en title y password creadas con el hook en App.js del lado del cliente.

En este punto se necesita crear la ruta en el backend que sea accesible desde el frontend y permita enviar e insertar esos a la base de datos. Esta ruta es conocida como endpoint y es un punto de conexion entre el backend y el frontend permitiendo insertar esta data.

En el servidor se crea una ruta post, ya que va a recibir datos que se van a insertar en la base de datos. Se va a llamar /addpassword

Para esto se va a /server/index.js y se crea una ruta post en "/addpassword"

Para acceder a los datos en los campos input de la aplicacion de react dede el backend en node, se usa un objeto llamado body que viene en el objeto req.
En cada request que se hace siempre viene un objeto body, de esa manera se pasan valores desde el frontend al backend usando el objeto request.

En este caso se tienen los valores de name, url, username y password, para insertarlos a la base de datos se usa el objeto db de conexion a la base de datos con el metodo query. Para esto se llama al metodo query del objeto de conexion de base de datos y se le pasa una plantilla de consultas que contiene dos parentesis, el primero define los nombres de las columnas a ser afectadas, el segundo define un ? por cada valor a modificar, el metodo tambien recibe luego de la plantilla, un array con las variables a insertar en orden, posteriormente un callback de sql que recibe un error en caso que flle, o un resultado que va a almacenar la respuesta.

Se evalua lo que llega en la respuesta, si llega un error se muestra por cosonsola, y sino entonces se envia un send en el objeto response con un "Success"

    app.post('/addpassword', (req, res) => {
        const {name, url, username, password} = req.body;

        db.query( "INSERT INTO passwords (name, url, username, password) VALUES (?,?,?,?)",[
            name, 
            url, 
            username, 
            password
        ], (err, result) => {
            if (err){
                console.log(err);
            } else {
                res.send('Success!!!')
            }
        });
    });

## LLamado a la API

Para acceder y hacer una llamado al api de la ruta /addpassword es necesario instalar el modulo axios en el frontend. Axios se ingresa al directorio del cliente y se instala como un modulo npm 

    $ npm install axios 
  
Axios es una libreria que permite hacer consultas a cualquier api.

Tambien se puede usar fetch que es una funcion de javascript, pero axios es mas sencillo.

Para hacer una llamada a una API simplemente se importa en app.js (client) y se hace un api request creando un evento onclick en el boton submit, cuando se de click en el boton "add password" el manejador de eventos onclick va a disparar una funcion al boton en app.js que va a invocar una funcion **addPassword** que ejecutara la sentencia para hacer un llamado de axios usando un post request.

Es necesario crear la funcion addpassword en donde lo unico que se hace es invocar axios y hacer un post request al endpoint o url de la api, en nuestro caso es 'http://localhost:3001/addpassword' la ruta creada en el server para el manejo de la insercion. Al ser un post es necesario pasar la ruta como primer argumento,y un objeto body pasando los datos de name, url, username y password que esta esperando en el lado del server, asignando los valores a cada una de las variables.

    const addPassword = () => {
      Axios.post('http://localhost:3001/addpassword', {
        name, 
        url, 
        username, 
        password
      });
    }

Se prueba ingresando datos al formulario de react para ver is esta funcionando En este momento se obtienen 2 errores, uno es que no se ha usado cors, y lo otro es que no se ha confifurado el backend para que parsee el objeto json que viene desde el frontend.

Para solucionar esto es necesario importar cors en el servidor,

    const cors = require('cors');

Luego usarlo a traves de la app

    app.use(cors());

Esto permite usar un frontend y un backend en un mismo pc y comunicarse entre si

y luego usar express.json a traves de la app tambien para que el servidor interprete los json que vienen del frontend.

    app.use(express.json());

Al volver a comprobar se puede ver que ya se estan guardando los datos en la base de datos, se pueden ingresar nuevos datos, sin embargo en este momento la contraseña no esta encriptada y es algo que se va a revisar mas adelante.

# Episodio 2, proceso de encriptado de la contraseña

## Encriptacion

Ahora la idea es encriptar las contraseñas usando la libreria **crypto** de NodeJS. Esta libreria viene integrada con NodeJS y permite encriptar usando varios algoritmos,y desencriptar tambien. En este punto se borran los registros de prueba que se crearon en la base de datos y se quiere aprender la diferencia entre hashing y encryption.

Los Password en este momento los recibe el back como un atributo del body desde el front, para encriptarlo, se crea un archivo nuevo en el servidor para manejar la encriptacion independientemente.

/server/EncryptionManager.js 

En este archivo se almacenan dos funciones, una que permite encriptar llamada **encrypt** que recibe la contraseña y crea una variable password encriptada y otra funncion **decrypt** que permite desencriptar la contraseña para leerla. 

En este nuevo modulo se importa el paquete **crypto** que viene por defecto en node.

La funcion encrypt recibe una contraseña como argumento

    const encrypt = (password) => {}

La funcion decrypt recibe una contraseña encriptada como argumento

    const decrypt = (encryption) => {}

Hay que exportar el modulo con las dos funciones de EncryptionManager debido a que esta en otro archivo 

    module.exports = {encrypt, decrypt};

Luego de requerir el modulo crypto se crea una nueva variable secret que es importante para el algoritmo de 32 caracteres de largo.

    const crypto = require('crypto');
    const secret = '77Dios7777Dios7777Dios7777Dios77'

Para acceder a esos archivos en /index.js basta con importar el archivo con el metodo require, accediendo a ambos elementos del archivo, de-estructurandolos en un {}

    const {encrypt, decrypt} = require("./EncryptionHandler.js");

En la funcion encrypt del EncryptionHandler hay que crear una variable secreta, que mantiene la encriptacion segura es necesario que sea de 32 caracteres de largo, cada encriptacion debe tener un **iv**, que es el identificador de encriptacion, a este se le crea un buffer con 16 caracteres aleatorios el cual sera el identificador que se randomiza para que no sea igual en ningun caso.

    CREATE TABLE `passwords` (
      `id` int(5) NOT NULL AUTO_INCREMENT,
      `name` varchar(255) NOT NULL,
      `url` varchar(124) NOT NULL,
      `username` varchar(50) NOT NULL,
      `password` varchar(255) NOT NULL,
      `iv` varchar(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Luego se comienza el cifrado en la variable **cypher**, la cual generará el algoritmo de encriptacion. Esta variable invoca el metodo de **crypto.createCipheriv()**, 
que recibe tres argumentos: (argumento de cifrado, transformar la variable secret en un buffer, el iv identificador para crear el cypher)

El argumento de cifrado es una opcion ente muchas, no deberia ser de mucha preocupacion, en este caso se usa 'aes-256-ctr'. Luego se convierte el **secret** en un **Buffer**, finalmnete se le pasa el **iv**

    const encrypt = (password) => {    
        const cipher = crypto.createCipheriv(
            'aes-256-ctr', 
            Buffer.from(secret), 
            iv
        );       

Este **createCipheriv** es una especie de llave unica que va a permitir encriptar la contraseña, la contraseña encriptada es una nueva constante **encryptedPassword** el resultado de crear un buffer y concatenar un array con dos argumentos. El primero es el valor del password encriptado, y luego se agrega un final al cypher, sin esto puede haber errores.

        const encryptedPassword = Buffer.concat([
            cipher.update(password),
            cipher.final(),
        ]);


Al final se retorna la variable encryptedPassword la cual es un buffer que contiene el valor hash para esta encriptacion. Finalmente debe retornarse el hash encriptado **encryptedPassword** en formato string.

Sin embargo para desencriptarlo no basta solo con pasar el valor del hash, seria muy facil para desencriptar, es necesario pasar el 
identificador iv tambien convertido a string usando *hex*, por eso se guardan los dos valorees en la funcion encrypt como un  objeto que se retorna como json.

        return {
            iv: iv.toString("hex"),
            password: encryptedPassword.toString("hex") 
        };

Para hacer el proceso de desencriptado dentro de **decrypt** que recibe la encryption que representa al objeto que retorno la encriptacion,  Se crea la constante  **decipher** que almacena de manera similar a cypher, un decipher que es el desencriptador, el cual de la misma manera que el cypher recibe la palabra secreta y el iv, pero es el iv que viene en el objeto **encryption** convirtiendo de vuelta a un buffer partiendo de un hex de la funcion encryption.

    const decrypt = (encryption) => {
        const decipher = crypto.createDecipheriv(
            "aes-256-ctr",
            Buffer.from(secret),
            Buffer.from(encryption.iv, "hex")
        );
    

Como punto funal se desencripta la contraseña y almacena en una variable **decryptedPassword** que contiene la version final del password desencriptado.

Es muy similar a lo que se tenia antes, funcion encryptedPassword pero lo que hace es tomar la variable y convertirla a buffer desde, el password que se envió de **encryption.password** transformandolo a un hex.

        const decryptedPassword = Buffer.concat([
            decipher.update(Buffer.from(encryption.password, "hex")),
            decipher.final(),
        ]);

Al final se retorna el password desencriptado convertido en un string

        return decryptedPassword.toString()


Hasta aca llega la parte pesada de la encriptacion

## Guardar password encriptado en BD

Debido a que los objetos de EncryptionManager ya fuerojn importados, ahora es necesario encriptar el password antes de hacer un guardado en base de datos desde la ruta post de la app en /addpassword, 
para lo cual se crea la variable **hashedPassword** que almacena la funcion encrypt con el argumento password recibido en la ruta. Sin embargo antes de hacer el query a la BD y guardar el registro hasheado de password.

Sin embargo hay que recordar que apra desencriptar la contraseña hay que usar el iv, por lo que hay que guardarlo en la base de datos tambien, para esto es necesario modificar el esquema de la BD y agregar un campo para almacenar el iv de cada uno de los passwords encriptados.

    ALTER TABLE `passwords` ADD `iv` VARCHAR(255) NOT NULL AFTER `password`; 

Luego se procede a hacer los cambios en la operacion en la base de datos, se pasan los nuevos valores de **hashedPassword.password** en donde se pasaba password y **hashedPassword.iv** que es el nuevo campo correspondiente para guardar en BD

    db.query( "INSERT INTO passwords (name, url, username, password, iv) VALUES (?,?,?,?,?)",[
        name, 
        url, 
        username, 
        hashedPassword.password, 
        hashedPassword.iv
    ],

# Episodio 3, ruta para mostrar las contraseñas

## Ruta para mostrar contraseñas en el back

Lo proximo que se desea hacer es crear una ruta para mostrar los password alamacenados en el frontend, para esto se crea un nuevo manejador de ruta, con el verbo http get para mostrar todos los valores de la base de datos, de esta manera accederlos en el frontend.

Se crea la ruta get **/showpasswords** en index.js y el callback que recibe el manejador de ruta con  los objetos req y res. En la funcion se crea un query al objeto db con una consulta sencilla, mostrar toda la informacion de constraseñas que es la tabla passwords de la db donde se almacenan las contraseñas. 

Posterior a la consulta, este query tambien tiene un callback, que recibe el objeto err y result. Este callback va a procesar lo que llegue de la consulta. En caso que la consulta tenga alfun error se manda a imprimir por consola, en caso que sea exitosa, se manda el objeto result usando el *req* hacia el frontend.

    app.get('/showpasswords', (req, res) => {
        db.query("SELECT * FROM passwords", (err, result)=> {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }        
        });
    });

## Consumo de la ruta get para mostrar contraseñas desde el front

Ahora que se tiene la ruta para consultar los registros desde el back, es necesario consumir esa informacion desde el frontend, hacer un Get request en el front.

Ya se tiene el get request en el back, ahora se necesita invocar desde el frontend.

En la aplicacion de React, se va a usar un useefect que es un hook cuya funcionalidad es hacer un llamado a la api al renderizar la pagina de la app, y se llama cada vez que la pagina se renderice o actualice, o cuando se determine

En este caso se va a disparar el useeffect cuando la pagina se renderice, no cuando un estado o useState cambie, para que eso no suceda, al definir el useEffect, se grega luego un array vacio

    useEffect(()=> {

    }, [])

Dentro del useEffect lo que se quiere hacer es un llamado a la API a trves de axios a la ruta exacta del get /showpasswords. Cuando se cierra el llamado se concatena una promesa then que recibe el resultado del llamado a la api como response, inicialmente lo que se hace es procesarlo y mostrarlo por consola, acediendo al atributo data que contiene los valores.

Segun la respuesta de la consola, tambien como se puede ver en postman, la respuesta llega como un array de objetos, para lo cual hay que crear un nuevo hook useState que almacene el estado passwordList conteniendo la informacion de contraseñas que se recibe desde la base de datos, este hook tambien contiene a setPasswordList que permite cambiar el contenido y lo inicia como un array vacio

      const [passwordList, setPasswordList] = useState([]);

Posterior a crear un variable de estado, se accede al metodo setPasswordList del hook para agregar datos a la variable, los datos que se encuentran en response.data, ahora se tiene un estado con el valor de todos los passwords almacenados en la base de datos.

Se crea un nuevo div justo debajo del exitente para mostrar las contraseñas. Se le da un className="Passwords", dentro del div se abren unas llaves indicando que va codigo de javascript, dentro se indica que se quiere hacer un mapeo a la variable passwordList, un mapeo indica que se hace un recorrido y se ejecuta una operacion para cada item del array, en este caso se va a retornar el codigo jsx o html que se va a crear para cada iteracion de la lista. Un elemento va a renderizar una linea de contraseñas

      <div className="Passwords">
          {
            passwordList.map((val) => {
              return <h1> {val.name} </h1>
            })
          }
      </div>

En val vienen todas las variables de la base de datos: el iv, data de la contraseña y el id y el nombre, asi como la url

Se puede mostrar el nombre contenido en el val, para cada una de las contraseñas que se tienen. val contiene todos los datos de la fila en la base de datos para cada campo, teniendo **val.name**, **val.password** u **val.id**.

No se quiere mostrar el iv o la contraseña encriptada pues no es informacion util al usuario, se quiere mostrar el nombre y cuando se pase por encima y le de click muestre la contraseña desencriptada.

Lo primero es crear un div.password que va a representar cada uno de los campos en la base de datos passwords, dentro se va a crear un titulo h3 que contiene el titulo de la contraseña

      <div className="Passwords">
          {passwordList.map((val) => {
              return (
                <div className="password">
                  <h3>{val.name}</h3>
                </div>
              )
            })
          }
      </div>

Se le da estilo a los nuevos div que se crearon

    .Passwords {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }

    .password {
      width: 400px;
      height: 70px;
      background-color: black;
      border-radius: 7px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      font-size: 20px;
      font-family: Arial, Helvetica, sans-serif;
      cursor: pointer;

    }

Una vez se tiene el estilo de la aplicacion, lo que se quiere es que al dar click en los contenedores que contienen la informacion del password, se cambie el texto del nombre de la contraseña al this.decriptedPassword.

## Desencriptacion de contraseña

Se crea un metodo decryptPassword() en el front que hace un llamado al backend e indica que se debe desencriptar un texto. Este llamado es un post que envia la contraseña y el iv correspondientes al campo

    const decryptPassword = (encryption) => {
      Axios.post('http://localhost:3001/decryptpassword', {
        password: encryption.password,
        iv: encryption.iv
      });
    }


Ahora se crea la ruta del lado del servidor que va a responder la peticion del frontend al servidor. Esta es una ruta post **/decryptpassword** que va a tomar los valores que vienen desde el front y devolver el valor desencriptado invocando al metodo decrypt() creado en el EncryptionHandler que recibe el valor encriptado del password y tambien el iv, que corresponden al objeto encryption. Eomo estos objetos se envian en el body desde el frontend por lo cual se accede a traves de req.body

    app.post('/decryptpassword', (req, res)=> {
        res.send(decrypt(req.body));
    });

Es necesario crear la promesa en el cliente para cuando la peticion post a la ruta /decryptpassword termina, inicialimente se va a tomar la respuesta y mostrarla por consola

    const decryptPassword = (encryption) => {
      Axios.post('http://localhost:3001/decryptpassword', {
        password: encryption.password,
        iv: encryption.iv
      }).then((response) => {
        console.log(response.data)
      })
    }


Es necesario tambien crear un llamado a la funcion decryptPassword cada vez que se haga click en el campo que corresponde a la contraseña traida desde la base de datos, este se hace usando un listener onClick de eventos dentro del div de las contraseñas,el cual llama a la funcion decryptPassword con los parametros password y iv de ese mismo campo, con el fin de desencriptar la contraseña para ese sitio.

      <div className="Passwords">
        {passwordList.map((val) => {
          return (
            <div
              className="password"
              onClick={() => {
                decryptPassword({ password: val.password, iv: val.iv, id:val.id });
              }}
            >
              <h3>{val.name}</h3>
            </div>
          );
        })}
      </div>

Hay un error que pide un argumento key dentro de cada div de passwords, el cual 
se soluciona agregando una llave key al mapeo y luego definiendola nuevamente al 
final 

        {passwordList.map((val, key) => {
            ...
            key={key}
        

## Renderizado de las contraseñas desencriptadas en el front

Ahora que se tiene la funcion para desencriptar las contraseñas pero se muestran por consola, es necesario mostrarlos por pantalla reemplazando el campo nombre. La idea es que al dar click sobre el boton de cada sitio se muestre la contraseña desencriptada en la caja que contiene el titulo, en este momento se esta mostrando por consola.

Se puede apreciar en la renderizacion del elemento h3, que siempre se renderiza con val.title en el cliente. Para cambiar esto es necesario agregar un nuevo valor que se envia a la funcion de **decryptpassword()**, se quiere acceder al id del elemento. Una vez que se tiene, dentro de la funcion **decryptpassword()**, se reemplaza la linea en donde se esta mostrando por consola response.data, con un mapeo que hace el setter setPasswordList dentro de passwordList para que itere dentro del array de passwords, y encuentre el elemento que coincide con el id que se quiere cambiar. Se va a encontrar solo uno, y cuando se encuentre, se quiere cambiar su valor por otro diferente.

Para cambiar el valor, se evalua el id que viene en cada uno de los elementos del array, representado por **val.id**, contra el elemento que se esta recibiendo en **encryption.id**, cuando se encuentr, lo que hace es devolver una nueva version de este campo.ya que al dar click no se esta cambiando al 

Hay un error en el codigo en este momento, lo que se descubre al hacer console log, es que no se esta enviando un elemento id al objeto encryption, por lo que no esta haciendo la comparacion dentro de la promesa del Axios dentro de decryptPassword, se soluciona con enviar tambien el id al hacer el llamado de la peticion en el listener onClick

      onClick={() => {
        decryptPassword({
          password: val.password,
          iv: val.iv,
          id: val.id,
        });
      }}

En la funcion decryptPassword() se mapear o iterar en cada valor del passwordList, de esta manera cuando encuentre el elemento que coincide por ids, cambiar lo que se esta renderizando en el valor del div, 

    <h3>{val.name}</h3>
    
Este **val.name** se va a cambiar en la funcion **decryptPassword**, primero se ejecuta el listener dentro del div renderizado en el front **password**, a esta funcion dentro del listener se le envia el password, iv, id. Esto va a crear el objeto encryption que es el que recibe el metodo **decryptPassword**. Este hace la peticion al backend en la ruta /decryptpassword con los parametros de password y iv. En el backend se tiene en esta ruta una peticino post que envia en el objeto **res.send** una peticion al metodo **decrypt** del EncryptionHandler, que es el que se encarga de generar el decipher usando el objeto encryption y usando sus atributos de iv y password, para retornar al front un string que es la cadena password desencriptada.

En el front, si la peticion es exitosa, este string se recibe en response, de esta manera se ejecuta el setter  del hook setPasswordList para hacer un mapeo dentro del array de password. En caso que el id que se recibe de la contraseña desencriptada coincida con el elemento val.id de los div del front, se procede a reemplazar el atribuuto name que es el que se renderiza, por response.data que es el valor de la contraseña desencriptada
