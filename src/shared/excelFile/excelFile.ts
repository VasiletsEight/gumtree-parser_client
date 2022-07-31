import Excel, {TableColumnProperties, TableStyleProperties} from "exceljs";
import {UserData} from "../../modules/request/request.type";
import fileSaver from "file-saver";

const createRows = <T extends {}>(fields:T[], withIndex:boolean = false): unknown[][]=>{
    const mapCallback = withIndex? (item: T, index: number) => ([index + 1, ...Object.values(item)]) : (item: T) => (Object.values(item))

    return  fields.map(mapCallback);
}
const columnTransform = (worksheet: Excel.Worksheet, columns:string[]):TableColumnProperties[]=>{
    const columnWidth = 28;

    return columns.map((item, index) => {
        const col = worksheet.getColumn(index + 1);

        col.alignment = {vertical: "middle", horizontal: "center"}
        col.width = columnWidth;

        return {name: item, filterButton: true}
    })
}

const createExel = (fields: UserData[], filename: string): void => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    const column = ["#", "Name", "Phone"];
    const headers = columnTransform(worksheet, column);
    const rows = createRows(fields);

    const style: TableStyleProperties = {
        theme: 'TableStyleMedium2',
        showRowStripes: true,
    }

    worksheet.addTable({
        name: "Table1",
        ref: 'A1',
        headerRow: true,
        columns: headers,
        style,
        rows
    });

    workbook.xlsx.writeBuffer().then((value: BlobPart) => {
        const blob = new Blob([value], {type: 'application/octet-stream'});
        fileSaver.saveAs(blob, `${filename}.xlsx`);
    });
}

export default createExel;
