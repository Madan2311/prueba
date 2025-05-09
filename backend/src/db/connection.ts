import sql from 'mssql';

const dbSettings = {
    user: 'sa',
    password: 'admon',
    server: 'localhost',
    database: 'Estudio',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  }

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
}