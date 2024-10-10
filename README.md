# Proyecto de Gestión de Inscripciones - MVP POLO IT

<div align="center">
    <img src="https://i.imgur.com/bxve6gU.png"/>
</div>

## Descripción

Este proyecto es un MVP (Producto Mínimo Viable) de un sistema de gestión de inscripciones para actividades como el acelerador del POLO IT. El sistema permite vincular automáticamente Mentores Técnicos con Egresados basándose en diversos parámetros de configuración de equipos.

## Despliegue

El proyecto está desplegado en Vercel. [Link de Página web](https://mvp-poloit.vercel.app/)


## Características principales

- Vinculación automática de Mentores Técnicos con Egresados.
- Configuración de equipos (tamaño máximo, perfiles de egresados, mentores por tecnología).
- Gestión de comunicación vía e-mail entre candidatos y mentores.
- Seguimiento de mentorías.
- ABM (Alta, Baja, Modificación) para la carga de datos.
- Interfaz de usuario diseñada con buenas prácticas de UX/UI.
- Implementación de técnicas de QA.

## Tecnologías utilizadas

- Frontend:
  - HTML
  - CSS
  - JavaScript
  - React
  - Next.js
- Backend:
  - Node.js
- Base de datos:
  - Vercel Postgres
- Autenticación:
  - bcrypt
  - jose (para JWT)
- Envío de correos:
  - nodemailer
  - resend
- Otros:
  - Tailwind CSS
  - TypeScript
  - ESLint
  - Zod (validación de esquemas)

## Requisitos previos

- Node.js (versión recomendada: 18.x o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
   ```
   git clone [URL_DEL_REPOSITORIO]
   ```

2. Instalar dependencias:
   ```
   npm install
   ```
   o
   ```
   yarn install
   ```

3. Configurar variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto y añade las variables necesarias (consulta `.env.example` si está disponible).

## Ejecución

- Desarrollo:
  ```
  npm run dev
  ```
  o
  ```
  yarn dev
  ```

- Producción:
  ```
  npm run build
  npm start
  ```
  o
  ```
  yarn build
  yarn start
  ```

## Estructura del proyecto

## Equipo de desarrollo

| [<img src="https://avatars.githubusercontent.com/u/127247837?v=4" width=115><br><sub>Javier Espindola</sub>](https://github.com/Micolash89) <br> [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/javier-espindola/) <br><sub>BACKEND</sub> | [<img src="https://avatars.githubusercontent.com/u/89267342?v=4" width=115><br><sub>Gabriel García</sub>](https://github.com/gabito1966) <br> [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabriel-garcia-developer/) <br><sub>FRONTEND</sub> | [<img src="https://media.licdn.com/dms/image/v2/D4D03AQEXf94igLDz-Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1711998142018?e=1733961600&v=beta&t=8aepa2Rc0xmwBJL08tlOHf3-0-Vtk--rIF9M7hKSMJQ" width=115><br><sub>Elizabeth Rabinad</sub>]() <br> [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/elizabeth-rabinad-4b6131167/) <br><sub>QA</sub>  | [<img src="https://media.licdn.com/dms/image/v2/D4D03AQETlR9Pm8XSIQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1703885238963?e=1733961600&v=beta&t=XNpFO7L13EFxUsm6hCovKrLmrbo2eEeiDVHd0-PjmDY" width=115><br><sub>Sandro Borga</sub>]()  <br> [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sandro-borga-065936246/) <br><sub>UX/UI</sub> |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |

## Mentor técnico

| [<img src="https://trello-members.s3.amazonaws.com/553a8d767dc93faa578c7c25/5dc47e49d1017969d24abf60ee5429cb/170.png" width=115><br><sub>Ernesto Ponce</sub>]() <br> [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ernesto-ponce-597934103/) | 
| :-----: |