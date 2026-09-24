/**
 * Google Apps Script — Nhận phản hồi khảo sát lễ tốt nghiệp
 * 
 * HƯỚNG DẪN SETUP:
 * 
 * 1. Tạo Google Sheet mới tại https://sheets.google.com
 * 2. Đặt tên sheet là "Khảo sát tốt nghiệp" (hoặc tên tùy thích)
 * 3. Thêm headers ở dòng 1: Thời gian | Họ tên | Tham dự
 * 4. Vào menu: Extensions > Apps Script
 * 5. Xóa code mặc định, paste toàn bộ code bên dưới vào
 * 6. Nhấn Save (Ctrl+S)
 * 7. Deploy:
 *    - Nhấn "Deploy" > "New deployment"
 *    - Type: chọn "Web app"
 *    - Description: "RSVP Survey"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Nhấn "Deploy"
 * 8. Copy URL Web App
 * 9. Mở file index.html, tìm dòng:
 *      const GOOGLE_SCRIPT_URL = '';
 *    Paste URL vào giữa 2 dấu nháy đơn
 * 10. Done! 🎉
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('vi-VN'),
      data.name || '',
      data.attendance || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'RSVP API is running!' }))
    .setMimeType(ContentService.MimeType.JSON);
}
