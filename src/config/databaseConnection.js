import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production" && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
};

const db = new Pool(configDatabase);

console.log(process.env.DATABASE_URL);

db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar com o banco de dados", err);
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  }
});

export default db;
