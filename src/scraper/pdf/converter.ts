import PDFParser from 'pdf2json';
import fs from 'fs';

export class Parser {
  static async pdfParser(pdfPath: string, parsedName:string) {
    const parser = new PDFParser(this, 1);
    parser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    parser.on("pdfParser_dataReady", pdfData => {
      fs.writeFile(`./src/parsedPDFs/${parsedName}.json`, JSON.stringify(parser.getRawTextContent()), () => {console.log("Written successfully")});
    });
    await parser.loadPDF(pdfPath);
  }
}
