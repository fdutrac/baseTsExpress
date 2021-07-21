import { Parser } from '../converter'


export class CNHScrape {
  static async getData() {
    const filename = "cnh"
    await Parser.pdfParser("/home/fdutra/DEV/node-ts-scraper/src/scraper/pdf/formulario_mod11.pdf", filename);
    let rawText = require(`../../../parsedPDFs/${filename}`);

    const parsedToArray:string[] = rawText.split(/\r\n/);
    console.log(parsedToArray)
  
    function filterWord(element: string, wordToFilter: string): boolean {
      return element.includes(wordToFilter)
    }
    
    function findIndexes(array: string[]) {
      return array.map(e => parsedToArray.indexOf(e))
    }
    
    // Check if field is empty and returns its value
    function getData(index: number, checkIfEmpty: string) {
      function sweepArray() {
        return parsedToArray.filter((_, i) => (i === index))[0]
      } 
      const fields = sweepArray()
      console.log(fields.includes(checkIfEmpty))
      if (fields.includes(checkIfEmpty)) return 'Empty'
      return parsedToArray.filter((_, i) => (i === index+1))[0]
    }

    function getFieldsArray(wordToFilter: string) {
      return parsedToArray.filter((e: string) => filterWord(e, wordToFilter))
    }

    const namesArray = getFieldsArray('Nome')
    const [nameIndex, fatherNameIndex, motherNameIndex] = findIndexes(namesArray)

    const name: string = getData(nameIndex, 'Categoria');
    const fatherName: string = getData(fatherNameIndex, 'Mãe');
    const motherName: string = getData(motherNameIndex, 'Data');

    const categoryArray = getFieldsArray('Categoria')
    const [categoryIndex] = findIndexes(categoryArray)

    const category =  getData(categoryIndex, 'Nome');
    
    const cellphoneArray = getFieldsArray('Celular')
    const [cellPhoneIndex] = findIndexes(cellphoneArray)
    console.log(cellphoneArray)
    console.log(cellPhoneIndex)

    const cellphone: string = getData(cellPhoneIndex, 'DDD')
    console.log(cellphone)
    console.log(category)

    console.log(name, fatherName, motherName)
  }
}