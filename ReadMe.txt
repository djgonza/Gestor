**************************************************
** 					Gestor 						**
**************************************************

- Requisitos

	NodeJs -v 6.9.1
	MongodDb -v 3.4.3

- Puesta en marcha de la aplicación:

	- Desarrollo: 

		1: Abrir consola y posicionarte en la raiz del proyecto.
		2: Entrar a /server y ejecutar npm install para instalar las
		   dependencias.
		3: Volver a la raiz.
		4: Acceder a /client y ejecutar npm install para instalar las
		   dependencias.
		5: En un terminal aparte ejecutar mongod para inicar la DB
		6: Abrir otro terminal y posicionarse en /server y ejecutar 
		   npm start para inicar el servidor.
		7: Abrir otro terminar y posicionarse en /cliente y jecutar
		   npm start para iniciar el servidor y gulp para transpilar
		   los archivos cliente.

	- Produción:

		1: Abrir consola y posicionarte en la raiz del proyecto.
		2: Entrar a /server y ejecutar npm install --production para 
		   instalar solo las dependencias de produccion.
		3: Volver a la raiz.
		4: Acceder a /client y ejecutar npm install --production para instalar solo las dependencias de produccion.
		5: En un terminal aparte ejecutar mongod para inicar la DB.
		6: Abrir otro terminal y posicionarse en /server y ejecutar 
		   npm start -pro para inicar el servidor en modo produccion.
		7: Abrir otro terminar y posicionarse en /cliente y jecutar
		   npm start -pro para inicar el servidor en modo produccion.