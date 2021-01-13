package org.tamil.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tamil.app.domain.User;
import org.tamil.app.domain.Word;

/**
 * Spring Data JPA repository for the {@link Word} entity.
 */
@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

//    String USERS_BY_LOGIN_CACHE = "usersByLogin";
//
//    String USERS_BY_EMAIL_CACHE = "usersByEmail";
//
//    Optional<User> findOneByActivationKey(String activationKey);
//
//    List<User> findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(Instant dateTime);
//
//    Optional<User> findOneByResetKey(String resetKey);
//
//    Optional<User> findOneByEmailIgnoreCase(String email);
//
//    Optional<User> findOneByLogin(String login);
//
//    @EntityGraph(attributePaths = "authorities")
//    @Cacheable(cacheNames = USERS_BY_LOGIN_CACHE)
//    Optional<User> findOneWithAuthoritiesByLogin(String login);
//
//    @EntityGraph(attributePaths = "authorities")
//    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
//    Optional<User> findOneWithAuthoritiesByEmailIgnoreCase(String email);
//
//    Page<User> findAllByLoginNot(Pageable pageable, String login);
}
