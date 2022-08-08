import pg from 'pg';

const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const connection = new Pool(databaseConfig);

export default connection;

// const connection = new Pool({
// host:'localhost',
// port:5432 ,
// user:'postgres',
// password:'admin',
// database:'shortly'
// })

// export default connection;



// host : process.env.HOST_POSTGRES,
// port : process.env.PORT_POSTGRES,
// user : process.env.USER_POSTGRES,
// password : process.env.PASSWORD_POSTGRES,
// database : process.env.DATA
// });