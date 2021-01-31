package org.tamil.app.service.dto;

import org.tamil.app.domain.Sheet;
import org.tamil.app.domain.Word;

/**
 * A DTO representing a user, with his authorities.
 */
public class WordDTO {

	private Long id;
	private String eng;
	private String tamizh;
	private Sheet sheet;


    public WordDTO() {
        // Empty constructor needed for Jackson.
    }

    public WordDTO(Word word) {
        this.id = word.getId();
        this.eng = word.getEng();
        this.tamizh = word.getTamizh();
        this.sheet=word.getSheet();
    }


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEng() {
		return eng;
	}

	public void setEng(String eng) {
		this.eng = eng;
	}

	public String getTamizh() {
		return tamizh;
	}

	public void setTamizh(String tamizh) {
		this.tamizh = tamizh;
	}

	public Sheet getSheet() {
		return sheet;
	}

	public void setSheet(Sheet sheet) {
		this.sheet = sheet;
	}
    
}
