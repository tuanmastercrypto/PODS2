

import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

import pool from '@/lib/db';  // Import pool thay vì Connection

async function fetchProductsByIds(productIds: number[]) {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    try {
      // Create a parameterized query
      const placeholders = productIds.map(() => '?').join(','); // Create placeholders for the query
      const query = `SELECT  a.link_download, a.name as title, a.image FROM product as a WHERE id IN (${placeholders})`; // Adjust the table name as necessary

      const [rows] = await connection.query(query, productIds); // Execute the query with the productIds array

      return rows; 
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    throw new Error('Database query failed');
  }
}

export async function GET(request: Request) {
    try {
      const url = new URL(request.url);
      const token= url.searchParams.get('token');
    
  
      // Kiểm tra xem keyid có tồn tại không
      if (!token) {
        return NextResponse.json({ message: "error", error: "Missing token" }, { status: 400 });
      }
  


   
      const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY_TOKEN)
    
      const { payload } = await jwtVerify(token, secretKey);

     
      
      const productIds = payload.productIds;

      // Check if productIds exists
      if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return NextResponse.json({ message: "error", error: "No product IDs found" }, { status: 400 });
      }

      // Fetch products from the database
      const data = await fetchProductsByIds(productIds);

      return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
      console.error('Error connecting or querying the database:', error);
      return NextResponse.json({ message: "error", error: String(error) }, { status: 500 });
    }
  }
  