package org.tamil.app.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tamil.app.domain.Word;

/**
 * Spring Data JPA repository for the {@link Word} entity.
 */
@Repository
@Transactional
public interface WordRepository extends JpaRepository<Word, Long> {

}
