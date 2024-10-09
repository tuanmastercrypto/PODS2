import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Import pool from your database connection library

async function fetchProductsByKeywords(keywords: string[], page: number) {
    const limit = 20; // Number of products per page
    const offset = (page - 1) * limit; // Calculate offset for pagination
  
    try {
      const connection = await pool.getConnection(); // Get connection from pool
      try {
        // Create SQL query dynamically for multiple keywords
        const searchConditions = keywords.map(() => `a.name LIKE ?`).join(' OR ');
        const queryParams = keywords.map(keyword => `%${keyword}%`); // Prepare keyword parameters for LIKE clause
  
        // Pass limit and offset as numbers
        queryParams.push(limit as any, offset as any);
  
        const [rows] = await connection.query(`
          SELECT 
              a.id, 
              a.price_sale, 
              a.price, 
              a.name AS title, 
              a.image, 
              a.point, 
              a.is_type, 
              a.total_sale, 
              a.quantity, 
              c.title AS category_title
          FROM 
              product AS a
          INNER JOIN 
              category AS c 
              ON a.level2 = c.id
          WHERE 
              ${searchConditions}  -- Dynamic condition for multiple keywords
          LIMIT ? OFFSET ?;  -- Pagination using LIMIT and OFFSET
        `, queryParams);
  
        return rows; // Return the list of products
      } finally {
        connection.release(); // Release the connection
      }
    } catch (error) {
      console.error('Error querying the database:', error);
      throw new Error('Database query failed');
    }
  }
  

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const keyid = url.searchParams.get('keyid');
    const page = Number(url.searchParams.get('page')) || 1; // Get page number, default to 1

    // Ensure keyid exists
    if (!keyid) {
      return NextResponse.json({ message: "error", error: "Missing keyid" }, { status: 400 });
    }

    // Split keyid into an array of keywords
    const keywords = keyid.split(' '); // Split by space (assumed '+' will be replaced by space in the URL)
    
    // Fetch products by multiple keywords
    const products = await fetchProductsByKeywords(keywords, page);
    
    // Return the response with the products data
    return NextResponse.json({ message: "success", data: products }, { status: 200 });
  } catch (error) {
    console.error('Error connecting or querying the database:', error);
    return NextResponse.json({ message: "error", error: String(error) }, { status: 500 });
  }
}
