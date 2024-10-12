import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Import pool từ thư viện kết nối cơ sở dữ liệu

async function fetchALLSiteMap() {
  
  try {
    const connection = await pool.getConnection(); // Lấy kết nối từ pool
    try {
      const [rows] = await connection.query(`
        SELECT a.slug
        FROM category AS a
      `, );

      return rows; // Trả về danh sách sản phẩm
    } finally {
      connection.release(); // Giải phóng kết nối
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    throw new Error('Database query failed');
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
  
  

    const sitemap= await fetchALLSiteMap();
    return NextResponse.json({ message: "success", data: sitemap }, { status: 200 });
  } catch (error) {
    console.error('Error connecting or querying the database:', error);
    return NextResponse.json({ message: "error",}, { status: 500 });
  }
}
