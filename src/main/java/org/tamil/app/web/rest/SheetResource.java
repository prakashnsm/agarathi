package org.tamil.app.web.rest;

import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.tamil.app.domain.Sheet;
import org.tamil.app.security.AuthoritiesConstants;
import org.tamil.app.service.MailService;
import org.tamil.app.service.SheetService;
import org.tamil.app.service.dto.SheetDTO;
import org.tamil.app.web.rest.errors.BadRequestAlertException;
import org.tamil.app.web.rest.errors.EmailAlreadyUsedException;
import org.tamil.app.web.rest.errors.LoginAlreadyUsedException;

import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Sheets.
 * <p>
 * This class accesses the {@link Sheet} entity, and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between Sheet and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the Sheet and the authorities, because people will
 * quite often do relationships with the Sheet, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our Sheets'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages Sheets, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
@RestController
@RequestMapping("/api")
public class SheetResource {
    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(Arrays.asList("id", "login", "firstName", "lastName", "email", "activated", "langKey"));

    private final Logger log = LoggerFactory.getLogger(SheetResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SheetService sheetService;
    private final MailService mailService;


    public SheetResource(SheetService sheetService, MailService mailService) {
        this.sheetService = sheetService;
        this.mailService = mailService;
    }

    /**
     * {@code POST  /sheets}  : Creates a new Sheet.
     * <p>
     * Creates a new Sheet if the login and email are not already used, and sends an
     * mail with an activation link.
     * The Sheet needs to be activated on creation.
     *
     * @param SheetDTO the Sheet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new Sheet, or with status {@code 400 (Bad Request)} if the login or email is already in use.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     * @throws BadRequestAlertException {@code 400 (Bad Request)} if the login or email is already in use.
     */
    @PostMapping("/sheets")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Sheet> createSheet(@Valid @RequestBody SheetDTO SheetDTO) throws URISyntaxException {
        log.debug("REST request to save Sheet : {}", SheetDTO);

        /*if (SheetDTO.getId() != null) {
            throw new BadRequestAlertException("A new Sheet cannot already have an ID", "SheetManagement", "idexists");
            // Lowercase the Sheet login before comparing with database
        } else if (SheetRepository.findOneByLogin(SheetDTO.getLogin().toLowerCase()).isPresent()) {
            throw new LoginAlreadyUsedException();
        } else if (SheetRepository.findOneByEmailIgnoreCase(SheetDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        } else {
            Sheet newSheet = SheetService.createSheet(SheetDTO);
            mailService.sendCreationEmail(newSheet);
            return ResponseEntity.created(new URI("/api/sheets/" + newSheet.getLogin()))
                .headers(HeaderUtil.createAlert(applicationName,  "SheetManagement.created", newSheet.getLogin()))
                .body(newSheet);
        }*/
        return null;
    }

    /**
     * {@code PUT /sheets} : Updates an existing Sheet.
     *
     * @param SheetDTO the Sheet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated Sheet.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already in use.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already in use.
     */
    @PutMapping("/sheets")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<SheetDTO> updateSheet(@Valid @RequestBody SheetDTO SheetDTO) {
        log.debug("REST request to update Sheet : {}", SheetDTO);
        /*Optional<Sheet> existingSheet = SheetRepository.findOneByEmailIgnoreCase(SheetDTO.getEmail());
        if (existingSheet.isPresent() && (!existingSheet.get().getId().equals(SheetDTO.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        existingSheet = SheetRepository.findOneByLogin(SheetDTO.getLogin().toLowerCase());
        if (existingSheet.isPresent() && (!existingSheet.get().getId().equals(SheetDTO.getId()))) {
            throw new LoginAlreadyUsedException();
        }
        Optional<SheetDTO> updatedSheet = SheetService.updateSheet(SheetDTO);

        return ResponseUtil.wrapOrNotFound(updatedSheet,
            HeaderUtil.createAlert(applicationName, "SheetManagement.updated", SheetDTO.getLogin()));
        */
        
        return null;
    }

    /**
     * {@code GET /sheets} : get all Sheets.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body all Sheets.
     */
    @GetMapping("/sheets")
    public ResponseEntity<List<SheetDTO>> getAllSheets(Pageable pageable) {
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }

        final Page<SheetDTO> page = sheetService.getAllSheets(pageable);
        
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }

    /**
     * Gets a list of all roles.
     * @return a string list of all roles.
     */
//    @GetMapping("/sheets/authorities")
//    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
//    public List<String> getAuthorities() {
//        return SheetService.getAuthorities();
//    }

    /**
     * {@code GET /sheets/:id} : get the "id" Sheet.
     *
     * @param id the id of the Sheet to find.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the "id	" Sheet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sheets/{id}")
    public ResponseEntity<SheetDTO> getSheet(@PathVariable Long id) {
        log.debug("REST request to get Sheet : {}", id);
        return ResponseUtil.wrapOrNotFound(
            sheetService.getSheet(id).map(SheetDTO::new));
    }

    /**
     * {@code DELETE /sheets/:login} : delete the "login" Sheet.
     *
     * @param login the login of the Sheet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
//    @DeleteMapping("/sheets/{login:" + Constants.LOGIN_REGEX + "}")
//    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
//    public ResponseEntity<Void> deleteSheet(@PathVariable String login) {
//        log.debug("REST request to delete Sheet: {}", login);
//        SheetService.deleteSheet(login);
//        return ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName,  "SheetManagement.deleted", login)).build();
//    }

    /**
     * {@code SEARCH /_search/sheets/:query} : search for the Sheet corresponding to the query.
     *
     * @param query the query to search.
     * @return the result of the search.
     */
//    @GetMapping("/_search/sheets/{query}")
//    public List<Sheet> search(@PathVariable String query) {
//        return StreamSupport
//            .stream(SheetSearchRepository.search(queryStringQuery(query)).spliterator(), false)
//            .collect(Collectors.toList());
//    }
}
