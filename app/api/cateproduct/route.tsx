import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Import pool từ thư viện kết nối cơ sở dữ liệu

async function fetchProductsByCategory(keyid: string, page: number) {
  const limit = 20; // Số lượng sản phẩm trên mỗi trang
  const offset = (page - 1) * limit; // Tính toán offset dựa trên trang hiện tại

  try {
    const connection = await pool.getConnection(); // Lấy kết nối từ pool
    try {
      const [rows] = await connection.query(`
        SELECT a.id, a.price_sale, a.price, a.name as title, a.image, a.point, a.is_type, a.total_sale, a.quantity , c.title AS category_title
        FROM product AS a
        INNER JOIN category AS c ON a.level2 = c.id OR a.level1 = c.id OR a.level3 = c.id
        WHERE c.slug = ?
        LIMIT ? OFFSET ?;  -- Sử dụng LIMIT và OFFSET để phân trang
      `, [keyid, limit, offset]);

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
    const page = Number(url.searchParams.get('page')) || 1; // Lấy số trang, mặc định là 1

    // Kiểm tra xem keyid có tồn tại không
    if (!keyid) {
      return NextResponse.json({ message: "error", error: "Missing keyid" }, { status: 400 });
    }

    const products = await fetchProductsByCategory(keyid, page);
    return NextResponse.json({ message: "success", data: products }, { status: 200 });
  } catch (error) {
    console.error('Error connecting or querying the database:', error);
    return NextResponse.json({ message: "error", error: String(error) }, { status: 500 });
  }
}
