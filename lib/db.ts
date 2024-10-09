// import mysql from 'mysql2/promise';
// import { env } from 'process';

// const parsePort = (port: string | undefined): number | undefined => {
//     return port ? parseInt(port, 10) : undefined;
// };

//  const Connection=async ()=>{
//   return  mysql.createConnection({
//     host: process.env.NEXT_PUBLIC_MYSQL_HOST,
//     port: parsePort(process.env.NEXT_PUBLIC_MYSQL_PORT),  // Chuyển đổi thành số
//     user: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
//     password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
//     database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     idleTimeout: 5000,
//     queueLimit: 0,
//   });
//  }


// export default Connection;


import mysql from 'mysql2/promise';
import { env } from 'process';

const parsePort = (port: string | undefined): number | undefined => {
  return port ? parseInt(port, 10) : undefined;
};

// Tạo một connection pool
const pool = mysql.createPool({
  host: process.env.NEXT_PUBLIC_MYSQL_HOST,
  port: parsePort(process.env.NEXT_PUBLIC_MYSQL_PORT),  // Chuyển đổi thành số
  user: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
  password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
  database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  idleTimeout: 5000,
  queueLimit: 0,
});

// Xuất pool để sử dụng trong các tệp khác
export default pool;
