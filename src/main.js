import express from "express";
import mysql from "mysql2/promise";
import fs from "fs-extra";

async function main() {
    try {
        const db = await mysql.createConnection({
            "host"     : '127.0.0.1',
            "user"     : 'admin',
            "password" : 'Pik12',
            "database" : 'movie'
        });
      
      console.log('Anslutning till databasservern lyckades!');
  
      const result = await db.execute('SELECT 1 + 1;');
      console.log('Resultat av frågan:', result[0][0]);

      const app = express();


  
  
      return db;
    }
    
     catch (error) {
      console.error('Fel vid anslutning till databasservern:', error);
      throw error;
    }
  }
main();
