package org.tamil.app.service.dto;

import java.time.Instant;

import javax.validation.constraints.Size;

import org.tamil.app.domain.Sheet;

/**
 * A DTO representing a user, with his authorities.
 */
public class SheetDTO {

    private Long id;

    @Size(max = 50)
    private String name;

    @Size(max = 50)
    private String tag;

    private Instant createdDate;

    private Instant lastModifiedDate;


    public SheetDTO() {
        // Empty constructor needed for Jackson.
    }

    public SheetDTO(Sheet sheet) {
        this.id = sheet.getId();
        this.name = sheet.getName();
        this.tag = sheet.getTag();
        this.createdDate = sheet.getCreatedDate();
        this.lastModifiedDate = sheet.getLastModifiedDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
    
}
