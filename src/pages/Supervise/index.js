import * as XLSX from 'xlsx';
import saveAs from 'file-saver';

function exportExcel(list, columns, fileName, sheetName) {
  return new Promise((resolve, reject) => {
    let result = [Array.isArray(columns) ? columns : []];
    try {
      result = result.concat(Array.isArray(list) ? list : []);
      const sheet = XLSX.utils.aoa_to_sheet(result);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, sheet, sheetName || 'sheet1');
      const workBookOut = XLSX.write(workBook, { type: 'binary', bookType: 'xlsx' });
      saveAs(new Blob([s2ab(workBookOut)], { type: 'application/octet-stream' }), fileName || 'file.xlsx');
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function s2ab(s) {
  // 字符串转字符流
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

export default exportExcel;
