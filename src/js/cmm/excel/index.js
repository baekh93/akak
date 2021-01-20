import fileSaver from "file-saver";
import xlsx from "xlsx";

//excel 기본 설정
const excelConfig = {
    //엑셀파일 이름
    getExcelFileName: 'excel.xlsx',
    //시트 이름
    getSheetName: 'excelFile',
    //데이터 (Json)
    getExcelData: [],
    getWorksheet: function () {
        return xlsx.utils.json_to_sheet(this.getExcelData);
    }
};

const s2ab = ({s}) => {
    const buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    const view = new Uint8Array(buf);  //create uint8array as viewer
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
};

//parameter : json객체, 엑셀파일이름, 엑셀시트이름
const getExcelFile = async (data, fileName, excelName) => {
    let wbout = undefined;
    excelConfig.getExcelData = data;
    excelConfig.getExcelFileName = fileName + '_' + getTimeStamp() + '.xlsx';
    excelConfig.getSheetName = excelName;

    //1. workbook 생성
    const wb = xlsx.utils.book_new();
    //2. 시트 만들기
    const newWorksheet = excelConfig.getWorksheet();
    // 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
    xlsx.utils.book_append_sheet(wb, newWorksheet, excelConfig.getSheetName);
    // 4. 엑셀파일 만들기
    wbout = xlsx.write(wb, {bookType: 'xlsx', type: 'binary'});
    // 5. 엑셀파일 내보내기(다운로드)
    // responsType: blob
    await saveAs(new Blob([s2ab({s: wbout})], {type: "application/octet-stream"}), excelConfig.getExcelFileName);
};

const getTimeStamp = () => {
    let date = new Date();
    let str =
        leadingZeros(date.getFullYear(), 4) +
        leadingZeros(date.getMonth() + 1, 2) +
        leadingZeros(date.getDate(), 2) +

        leadingZeros(date.getHours(), 2) +
        leadingZeros(date.getMinutes(), 2) +
        leadingZeros(date.getSeconds(), 2);

    return str;
}

const leadingZeros = (n, digits)=> {
    let zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (let i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}


export {getExcelFile}