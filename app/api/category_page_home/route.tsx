import { NextResponse } from 'next/server';
import pool from '@/lib/db';  // Import pool thay vì Connection

async function fetchDataFromDatabase(keyid: string) {
  try {
    // Sử dụng pool để lấy một kết nối
    const connection = await pool.getConnection(); // Lấy kết nối từ pool
    try {
      const [rows] = await connection.query(`
        SELECT a.id, a.price_sale, a.price, a.name as title, a.image, a.point, a.is_type, a.total_sale, a.quantity
        FROM product AS a 
        WHERE a.level2 = ? 
        ORDER BY a.total_sale DESC 
        LIMIT 8;
      `, [keyid]);  // Sử dụng keyid làm điều kiện để truy vấn

      return rows; // Trả về các hàng được truy vấn
    } finally {
      // Giải phóng kết nối khi đã xong
      connection.release();
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    throw new Error('Database query failed'); // Ném lỗi để có thể xử lý trong handler
  }
}

export async function GET(request: Request) {
  try {
    // Lấy URL từ request
    const url = new URL(request.url);
    // Lấy giá trị của keyid từ query parameters
    const keyid = url.searchParams.get('keyid');

    // Kiểm tra xem keyid có tồn tại không
    if (!keyid) {
      return NextResponse.json({ message: "error", error: "Missing keyid" }, { status: 400 });
    }

    // Thực hiện truy vấn hoặc logic khác dựa trên keyid
    const result = await fetchDataFromDatabase(keyid);

    return NextResponse.json({ message: "success", data: result }, { status: 200 });
  } catch (error) {
    console.error('Error connecting or querying the database:', error);
    return NextResponse.json({ message: "error", error: String(error) }, { status: 500 });
  }
}
