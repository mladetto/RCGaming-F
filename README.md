# Proyecto eCommerce RCGames 
¡Hola! Este es un proyecto del curso de **Full Stack** de **RollingCode**, enfocado en un eCommerce de una tienda tecnológica. Decidimos crear una tienda de insumos de computación de diversas categorías. El proyecto fue desarrollado en Visual Studio Code utilizando React para el frontend, CSS y Bootstrap 5 para estilos, y MongoDB como base de datos.

# Funciones de la Página  
## Modo Usuario
La función principal del eCommerce **RCGames** en modo usuario es facilitar la compra de insumos de computación. Aquí hay una descripción de sus funciones clave:
-  **Inicio**: El home presenta un carrusel y una selección de productos destacados.
-  **Navegación**: Los usuarios pueden explorar diferentes categorías de productos y acceder al carrito desde el navegador. 
-  **Carrito de Compras**: Permite agregar productos con una cantidad específica y muestra un resumen de la compra con dos botones, una para limpiar la tabla de productos seleccionados "Limpiar carrito" y "Finalizar compra" que al confirmar la misma, se muestra un mensaje de "Orden creada" que almacena la información en MongoDB. 
-  **Páginas Informativas**: Además, el sitio cuenta con páginas como "Acerca de Nosotros", "Contacto" y un Footer con información adicional. 
  
  ## Modo Administrador 
  Los administradores tienen acceso a una pestaña exclusiva en el navbar llamada "Administración". Aquí pueden administrar los siguientes aspectos del eCommerce **RCGames**:
 -  **Usuarios**: Muestra una lista con todos los usuarios indicando su nombre, apellido, correo electrónico y estado de la cuenta (activo o inactivo). Los administradores pueden activar/desactivar cuentas y eliminar usuarios. 
 -  **Productos**: Muestra una lista con todos los productos creados, con sus datos correspondientes. Los administradores tienen la opción de editar o eliminar productos existentes, así como crear nuevos productos. 
 -  **Ordenes de Compra**: Muestra un listado de las compras realizadas, con los datos del comprador, el monto y la fecha de la compra. También proporciona un botón para ver cada compra en detalle.

Ademas, el sitio web es responsive y está en constante desarrollo para mejorar la experiencia del usuario en diferentes dispositivos. 



## NPM y Enlaces 
Para utilizar este proyecto, sigue estos pasos: 
1.  **Clonar el Repositorio**: Clona este repositorio desde GitHub ejecutando el siguiente comando en tu terminal: ``` git clone <URL del repositorio> ``` 
2.  **Instalar Dependencias**: Una vez clonado el repositorio, navega hasta el directorio del proyecto en tu terminal y ejecuta el siguiente comando para instalar todas las dependencias npm: ``` npm install ```
3.  **Configurar el Archivo .env**: Antes de ejecutar el proyecto, asegúrate de configurar el archivo `.env` con las variables necesarias, como las credenciales de acceso a la base de datos u otras configuraciones específicas del proyecto. 

Aquí están las dependencias npm utilizadas en el proyecto:
 -  `npm install bootstrap`: Instalación de la biblioteca Bootstrap 5. 
 -  `npm install bootstrap-icons`: Instalación de la biblioteca de iconos de Bootstrap.
 -  `npm install sweetalert`: Instalación de SweetAlert para mostrar alertas, como la confirmación de una orden. Además, se utilizan enlaces externos para recursos como fuentes y Bootstrap:
 -  `<link rel="preconnect" href="https://fonts.googleapis.com">` 
 -  `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
 -  `<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">` 
 -  `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">`
 -  `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>`
    


## Creadores del Proyecto
 Este proyecto fue creado por: 
 - Esteban Ignacio Barrionuevo **[Github](https://github.com/3steban99)**
 - Jimena Herrera **[Github](https://github.com/jimenaherrera22)**
 - Rodrigo Cardozo **[Github](https://github.com/rodrigocardoso080488)**
 - Felix Lamas **[Github](https://github.com/FelixLamas)**
 - Martin Ladetto **[Github](https://github.com/mladetto)**


