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


# Episodio 1

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

    {
        id:primary key not null, auto incremental, 5
        name: website name,
        url: website url exact login,
        username: email to log into the website,
        password: ****** password for the site
    }

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

# 26:34

Es necesario acceder a los datos que existen en el formulario del frontend a través del
objeto body del metodo req, se crea una variable que almacena los valores a insertar en la base de
datos en orden Luego se llama al metodo query del objeto db que permite 
{
generar una sentencia sql directamente para escribir valores en la base de datos, agregados como ?,
Un array con los datos a pasar en la sentencia,
Se toman dos valores de este query, que funciona como una promesa que se ejecuta cuando se cumple
la funcion
    err:almacena cualquier error que pueda producir el query -> se imprime en consola
    result: contiene los mensajes que se le piden al frontend en caso que sea exitoso el query, escribir 
    datos en la bd -> se envia un mensaje de exito
 }

Para acceder y hacer una llamado al api de la ruta /addpassword es necesario instalar el modulo axios en 
el frontend se ingresa al directorio del cliente y se instala como un modulo npm (npm install axios)
Axios es una libreria que permite hacer consultas api a cualquier api.

Tambien se puede usar fetch que es una funcion de javascript, pero axios es mas sencillo
simplemente se importa en app.js (client) y se hace un api request cuando se de click en el boton "add password"
se agrega la funcion onclick al boton en app.js que va a invocar una funcion addpassword que ejecutara la sentencia 

Es necesario crear la funcion addpassword en donde lo unico que se hace es invocar axios y hacer un post request
al endpoint o url de una api, en nuestro caso es 'http://localhost:3001/addpassword' la ruta creada en el 
server. Al ser un post es necesario pasar los datos, se hace luego de la ruta a traves del objeto body pasando los datos
que esta esperando en el lado del server, asignando los valores a cada una de las variables.
Se prueba ingresando datos al formulario de react para ver is esta funcionando
En este momento se obtienen 2 errores, uno es que no se ha usado cors, y lo otro es que no se ha 
confifurado el backend para que parsee json desde el frontend.
Para solucionar esto es necesario importar cors en el servidor, luego usarlo a traves de la app
y luego usar express.json a traves de la app tambien para que el servidor interprete los json que vienen del frontend.

Episodio 2

Ahora la idea es encriptar las contraseñas usando la libreria crypto de NodeJS.
Permite encriptar usando varios algoritmos,y desencriptar tambien.

Los Password en este momento los recibe el back como un atributo del body
desde el front, pasos para encriptar:

Se crea un archivo nuevo en el servidor 
/server/EncryptionManager.js 
En el se almacenan dos funciones, 
Para encriptar la funcion encrypt que recibe la contraseña 
Para desencriptar la funcion decrypt que entrega la encriptacion 

server/index.js
Hay que exportar el modulo con las dos funciones de EncryptionManager debido a que esta en otro archivo 
Para acceder a esos archivos en /index.js basta con importar el archivo con el 
metodo require, accediendo a ambos elementos del archivo, de-estructurandolos en un {}

/server/EncryptionManager.js 
en la funcion encrypt hay que crear una variable secreta, que mantiene la encriptacion segura
es necesario que sea de 32 caracteres de largo, cada encriptacion debe tener un iv, que es el identificador de encriptacion
a este se le crea un buffer con 16 caracteres aleatorios el cualñ sera el identificador 
se randomiza para que no sea igual en ningun caso 

Luego se comienza el cifrado en la variable cypher, la cual generará el algoritmo de encriptacion, 
se crea una variable createCipheriv, 
que recibe tres argumentos (
    el metodo de cifrado, 
    transformar la variable secret en un buffer,
    el iv identificador para crear el cypher
)


Luego se crea otra variable llamada encryptedPassword, que será el resultado
del encriptado hecho en la variable cypher, donde se crea un buffer que se concatena
recibiendo dos argumentos {
    first: el valor con el que se encripta la contraseña con la funcion update Para
    que lo actualice a la version encriptada
    second: El valor con el que finaliza la encriptacion de manera correcta
}

Al final se retorna la variable encryptedPassword la cual es un buffer y necesita ser transformada a un 
string. por lo cual se retorna con el metodo toString usando la codificacion de buffer
Hex, que combina numeros y caracteres.

Hasta este punto se retorna un hash encriptado en formato string 
Sin embargo para desencriptarlo no basta solo con pasar el valor del hash, es necesario pasar el 
identificador tambien, por eso se guardan los dos valorees en la funcion encrypt como un 
objeto que se retorna como json.

Para hacer el proceso de desencriptado, Se crea la funcion decypher que recibe la encriptacion, 
o el el objeto que entrega la funcion cypher.
Se crea una constante que almacena de manera similar a cypher, un decipher que es el 
desencriptador, el cual recibe la palabra secreta y el iv de la funcion cypher- Por lo tanto se accede
al iv dentro de la variable encryption y se convierte a  un buffer ambas vbariables, 
la palabra secreta y el iv en formato hex
Hasta este punto se tiene una variable decipher que ocntiene 3 elementos: 

(
    el metodo de cifrado(mismo de cipher), 
    la variable secret en un buffer,
    el encryption.iv que es el identificador que llega del cypher
)

Como punto funal se desencripta la contraseña y almacena en una variable decryptedPassword 
la cual es similar a la funcion encryptedPassword pero lo que hace es tomar la variable convertida a buffer 
convertirla a hex, hacer el update y entregar el resultado final.

Al final se retorna el password desencriptado convertido en un string

/index.js 
Debido a que los objetos de EncryptionManager ya fuerojn importados, 
ahora es necesario encriptar el password antes de hacer un guardado en base de datos desde la
ruta post de la app en /addpassword, 
para lo cual se crea la cariable hashedPassword que almacena la funcion encrypt con el argumento password recibido en la ruta 
antes de hacer el query a la BD, para esto es necesario modificar el esquema de la BD y agregar un campo para
almacenar el iv de cada uno de los passwords encriptados.

Luego se procede a hacer los cambios en la operacion en la base de datos, 
se pasan los valores de hashedPassword password y iv para guardar en BD

Episodio 3

Construir ruta para desencriptar las contraseñas.
En esta ruta lo que se quiere 
es mostrar las constraseñas para poder usarlas.
Se crea la ruta get /showpasswords en index.js , y en el mismo verbo get se crea
una funcion req, res la cual contiene una funcion query, que contiene una funcion callback 
que va a tomar un err y result y la data que se reciba de la base4 de datos 
despues del statement se va a almacenar en result, en este 
caso todas las contraseñas, antes de enviarlo es necesario verificar si tiene algun error 

Get request en el front
app.js 
Ya se tiene el get request en el back, ahora se necesita invocar desde el frontend 
Se va a usar una funcion useefect que renderiza y hace un llamado 
a la api directamente al entrar en la website
Use efect es una funcion simple que se invoca cada que se
quiera recargar los datos.
La idea es que s ehaga una recarga de los datos solo cuando cambie el estado de
toda la pagina.
Lo que se quiere correr en el ciclo del useEffect es un Axios.getrequest, donde se le 
pasa la URL de la api 'http://localhost:3001/showpasswords') luego se puede pasar una promesa 
que se ejecuta luego de que Axios.get recibe los datos del request en un objeto llamado response
el cual tiene una propiedad data con todos los datos de la base de datos
Por ahora solo se muestra lo que tiene la base de datos por consola.
En este momento cada que se cargue la pagina se hace una llamdo a la api y la consola muestra
en un array los datos de la bd, esto infdica que se esta haciendo correctamente el get request.
Ahora hay que hacer algo con esa informacion, por le momento viene en un array, con todos los passwords
en la tabla. Es necesario crear un estado que va a representar a todos los passwords llamado passwordList y setPasswordsList
Este va a remplazar lo que se muestra por consola y contiene todos los calores de la base de datos  
Ahora es necesario crear un div para solamente la contraseña
que muestre esta informacion en la parte baja del formulario
la informacion de los passwords decodificados llamado Passwords, en donde se van a renderizar todos uno sobre otro.
Por lo que es necesario  hacer en html o jsx una nueva iteracion de list donde
se pongan los passwords para el titulo, por lo que es necesario saber de donde es 
exactamente este password, para lo que se usa jsx: val.name porque name es el nombre de la variable.
En val vienen todas las variables de la base de datos: el iv, data de la contraseña y el id y el nombre, url

Se pone a mostrar el nombre contenido en el val debajo del formulario y se le 
da estilo en app.css para que se vean mas aparentes, ya que la idea es que se muestre la 
contraseña cuando se pase el mouse por encima

decryptPassword()
Ahora se crea una funcion que hace una peticion al servidor
para desencriptar las contraseñas al dar click en el boton
con el nombre de cada una.
Esta funcion recibe un objeto encryption con el iv y el password
y hace un post request a traves de axios que va a devolver la contraseña desencriptada.
Para crear la ruta en el index que muestre la contraseña desencriptada,
esta ruta /decryptpassword recibo un objeto req, res y envia el 
resultado de la operacion decrypt.
Es necesario crear un llamado a la funcion decryptPassword cada vez que se haga click en el boton
de la contraseña, y este se hace usando un listener onClick de eventos dentro del
div de las contraseñas,el cual llama a la funcion decryptPassword con los parametros 
password y iv de ese mismo campo, con el fin de desencriptar la contraseña para ese sitio 

Hay un error que pide un argumento key dentro de cada div de passwords, el cual 
se soluciona agregando una llave key al mapeo y luego definiendola nuevamente al 
final 

Ahora que se tiene la funcion para desencriptar las contraseñas pero se 
muestran por consola, es necesario hacer que la plataforma la muestre. La 
idea es que al dar click sobre el boton de cada sitio se muestre la contraseña. 

En la funcion decryptPassword() se quiere basicamente mapear o iterar en cada 
valor del passwordList() y cambiar el render de  <h3>{val.name}</h3>  al valor 
que corresponda al id del valor que se esta iterando desde el onClick event,
es decir, si coincide la base de datos con el sitio seleccionado.

Para esto se agrega un nuevo valor a la funcion decryptPassword, ya que se 
quiere tener acceso tambien al id del elemento para compararlo en el passwordList.
Al iterar dentro del response buscando el id de elemento que coincida, 
se quiere cambiar el valor name del elemento que en este momento es val.name, 
por la contraseña desencriptada que esta en response.data.
En caso de que no coincida simplemente se devuelve val 



