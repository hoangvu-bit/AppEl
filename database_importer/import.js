const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const { json } = require("stream/consumers");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "nhapmatkhau123",
  database: "app",
  port: 3306,
};

function readJsonFile(filename) {
  try {
    const filePath = path.join(__dirname, filename);
    const rawData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("khong the doc duoc file", error.messege);
    return null;
  }
}

async function importData() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("connection cussessful ");
    await connection.beginTransaction();

    const lessons = readJsonFile("lessons.json");

    if (lessons.length() > 0) {
      const lessonsValue = lessons.map((item) => [
        item.lesson_id,
        item.unit_id,
        item.unit_title,
        item.lesson_title,
        item.order_index ?? 1,
      ]);

      // 4. SQL: thêm mới hoặc cập nhật bài học
      const lessonSql = `
      INSERT INTO Lessons (
        lesson_id,
        unit_id,
        unit_title,
        lesson_title,
        order_index
      )
      VALUES ?
      ON DUPLICATE KEY UPDATE
        unit_id = VALUES(unit_id),
        unit_title = VALUES(unit_title),
        lesson_title = VALUES(lesson_title),
        order_index = VALUES(order_index)
    `;

      // 5. Thực thi và chờ MySQL hoàn thành
      await connection.query(lessonSql, [lessonValues]);
      console.log("📚 Đã nạp thành công Lessons!");
    }
    else {
    console.log('⚠️ File lessons.json không có dữ liệu.');
    }
    // Lưu toàn bộ thay đổi vào Database
    await connection.commit();
    console.log('🎉 Hoàn tất nạp toàn bộ dữ liệu vào MySQL!');

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("loi", error.messege);
    } finally {
        if (connection) await connection.end();
    }
}
importData();
