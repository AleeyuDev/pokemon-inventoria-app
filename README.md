# Pokémon Inventoria App 🧾

A full-stack Node.js application to manage **Pokémon**, **Trainers**, and **Types** with full CRUD functionality, built on **Express**, **EJS**, and **PostgreSQL**.

---

## 🚀 Live Demo

Coming soon…

---

## 💻 Tech Stack

- **Backend**: Node.js, Express  
- **Templating**: EJS  
- **Database**: PostgreSQL  
- **Config**: dotenv  
- **Dev Tools**: Nodemon, method-override  

---

## 📂 Project Structure
pokemon-inventoria-app/
├─ controllers/
│  ├─ pokemonController.js
│  ├─ trainerController.js
│  └─ typeController.js
├─ models/
│  └─ db.js
├─ routes/
│  ├─ pokemonRoutes.js
│  ├─ trainerRoutes.js
│  └─ typeRoutes.js
├─ views/
│  ├─ pokemons/
│  ├─ trainers/
│  ├─ types/
│  └─ partials/
├─ public/
├─ .env
├─ seed.js
├─ server.js
└─ package.json
</details>








---

## 🔧 Setup & Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/AleeyuDev/pokemon-inventoria-app.git
   cd pokemon-inventoria-app

 2. Install dependencies
```bash
npm install
```


## Configure environment
3. Create a .env file in the project root:
```env
DB_HOST=localhost
DB_USER=postgres
DB_NAME=yourDtabaseName
DB_PASSWORD=your password
DB_PORT=5432
```

4. Initialize database & seed data
Ensure PostgreSQL is running, then:

```bash

node seed.js
```

5. Run in development

```bash

npm run dev
Visit http://localhost:3000 in your browser.
```




