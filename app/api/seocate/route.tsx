import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Import pool từ thư viện kết nối cơ sở dữ liệu

async function fetchProductsByCategory(keyid: string) {
  
  try {
    const connection = await pool.getConnection(); // Lấy kết nối từ pool
    try {
      const [rows] = await connection.query(`
        SELECT *
        FROM category AS a
       
        WHERE a.slug = ? AND a.is_type = 1
      
      `, [keyid]);

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
    const keyid = url.searchParams.get('keyid');
   

    // Kiểm tra xem keyid có tồn tại không
    if (!keyid) {
      return NextResponse.json({ message: "error", error: "Missing keyid" }, { status: 400 });
    }

    const products = await fetchProductsByCategory(keyid);
    return NextResponse.json({ message: "success", data: products }, { status: 200 });
  } catch (error) {
    console.error('Error connecting or querying the database:', error);
    return NextResponse.json({ message: "error", error: String(error) }, { status: 500 });
  }
}
