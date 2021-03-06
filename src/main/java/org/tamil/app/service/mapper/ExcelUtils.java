package org.tamil.app.service.mapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tamil.app.domain.Word;

 
public class ExcelUtils {
	private static Logger log = LoggerFactory.getLogger(ExcelUtils.class);
	
	public static List<Word> parseExcelFile(InputStream is, org.tamil.app.domain.Sheet ss) throws Exception {
		List<Word> lstWords = new ArrayList<Word>();
    try {
        Workbook workbook = new XSSFWorkbook(is);
        Sheet sheet = workbook.getSheetAt(0);
        Iterator<Row> rows = sheet.iterator();
        
        int rowNumber = 0;
        while (rows.hasNext()) {
        	try {
	          Row currentRow = rows.next();
	          // skip header
	          if(rowNumber == 0) {
	            rowNumber++;
	            continue;
	          }
	          Iterator<Cell> cellsInRow = currentRow.iterator();
	          Word word = new Word();
	          
	          int cellIndex = 0;
	          while (cellsInRow.hasNext()) {
	            Cell cell = cellsInRow.next();
				String cellValue = "";
	            switch (cell.getCellTypeEnum()) {
	                case BOOLEAN:
	                	cellValue = ""+ cell.getBooleanCellValue();
	                    break;
	                case NUMERIC:
	                	cellValue = ""+ cell.getNumericCellValue();
	                    break;
	                case STRING:
	                	cellValue = ""+ cell.getStringCellValue();
	                    break;
				default:
					break;
	            }
	            
	            if(StringUtils.isBlank(StringUtils.trim(cellValue))) {
					continue;
				}
	            word.setSheet(ss);
				if(cellIndex==0) { // English Word
					word.setEng(cellValue);
				} else if(cellIndex==1) { // Tamizh Word
					if(cellValue.contains(";")) {
						splitWords(ss, lstWords, word, cellValue);
						continue;
					} else {
						word.setTamizh(cellValue);
					}
				}
	            cellIndex++;
	          }
	          lstWords.add(word);
	          
        	} catch (Exception e) {
        		log.debug("" + e.getMessage());
    	      e.printStackTrace();
    	    }
        }
        // Close WorkBook
        workbook.close();
        return lstWords;
    } catch (IOException e) {
      throw new Exception("FAIL! -> message = " + e.getMessage());
    }
  }

	private static void splitWords(org.tamil.app.domain.Sheet ss, List<Word> lstWords, Word word, String cellValue) {
		String[] vals = cellValue.split(";");
		for(int i=0; i<vals.length; i++) {
			Word word1 = new Word();
			word1.setSheet(ss);
			word1.setEng(word.getEng());
			word1.setTamizh(vals[i]);
			lstWords.add(word1);
		}
	}
}