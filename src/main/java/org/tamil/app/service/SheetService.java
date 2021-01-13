package org.tamil.app.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.tamil.app.domain.Sheet;
import org.tamil.app.repository.AuthorityRepository;
import org.tamil.app.repository.SheetRepository;
import org.tamil.app.service.dto.SheetDTO;

/**
 * Service class for managing sheets.
 */
@Service
@Transactional
public class SheetService {

    private final Logger log = LoggerFactory.getLogger(SheetService.class);

    private final SheetRepository sheetRepository;

    private final AuthorityRepository authorityRepository;
	    private final CacheManager cacheManager;

    public SheetService(SheetRepository sheetRepository, AuthorityRepository authorityRepository, CacheManager cacheManager) {
        this.sheetRepository = sheetRepository;
        this.authorityRepository = authorityRepository;
        this.cacheManager = cacheManager;
    }

    @Transactional(readOnly = true)
    public Page<SheetDTO> getAllSheets(Pageable pageable) {
        return sheetRepository.findAll(pageable).map(SheetDTO::new);
    }
    
    @Transactional(readOnly = true)
    public Optional<Sheet> getSheet(Long id) {
        return sheetRepository.findById(id);
    }
}
