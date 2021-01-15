package org.tamil.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.tamil.app.service.FileServices;

@RestController
public class UploadFileController {
  
  @Autowired
  FileServices fileServices;
  
    @PostMapping(value  = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadMultipartFile(@RequestParam("uploadfile") MultipartFile file) {
    	try {
	      fileServices.store(file);
	      return ResponseEntity.ok().build();
    	} catch( Exception e) {
    		e.printStackTrace();
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    	}
    }
}