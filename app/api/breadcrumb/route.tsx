import { NextResponse } from 'next/server';
import pool from '@/lib/db';  // Import pool thay vì Connection

async function fetchDataFromDatabase(keyid: string) {
  try {
    // Sử dụng pool để lấy một kết nối
    const connection = await pool.getConnection(); // Lấy kết nối từ pool
    try {
      const [rows] = await connection.query(`
        SELECT 
            a.id AS current_id,
            a.title AS current_title,
            a.level AS current_level,
            a.parent_id AS current_parent_id,
            parent.id AS level1_id,
            parent.title AS level1_title,
            parent.slug AS level1_slug,  -- Thêm slug của category cấp 1
            grandparent.id AS level2_id,
            grandparent.title AS level2_title,
            grandparent.slug AS level2_slug,  -- Thêm slug của category cấp 2
            a.slug AS current_slug  -- Thêm slug của category hiện tại
        FROM 
            category AS a
        LEFT JOIN 
            category AS parent ON a.parent_id = parent.id -- Lấy category cấp 1
        LEFT JOIN 
            category AS grandparent ON parent.parent_id = grandparent.id -- Lấy category cấp 2
        WHERE 
            a.slug = ?
            AND (a.level = 2 OR a.level = 3 OR a.level =1);  -- Không có dấu nháy đơn quanh ?

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
