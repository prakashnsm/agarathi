package org.tamil.app.service;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.tamil.app.domain.Sheet;
import org.tamil.app.domain.Word;
import org.tamil.app.repository.SheetRepository;
import org.tamil.app.repository.WordRepository;
import org.tamil.app.service.mapper.ExcelUtils;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class FileServices {

    private final Logger log = LoggerFactory.getLogger(FileServices.class);

    private final SheetRepository sheetRepository;
    private final WordRepository wordRepository;

    public FileServices(SheetRepository sheetRepository, WordRepository wordRepository) {
        this.sheetRepository = sheetRepository;
        this.wordRepository = wordRepository;
    }
    
    public Sheet store(MultipartFile file) {
    	Sheet sheet = new Sheet();
    	sheet.setName(file.getOriginalFilename());
    	sheet.setTag(new Date().toString());
    	try {
			sheet.setContent(file.getBytes());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
		}
		Sheet sheet_new = this.sheetRepository.saveAndFlush(sheet);
		this.processWords(file, sheet_new);
		
		return sheet_new;
    }
    
    public void processWords(MultipartFile file, Sheet sheet) {
    	try {
			List<Word> words = ExcelUtils.parseExcelFile(file.getInputStream(), sheet);
			this.wordRepository.saveAll(words);
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
}
