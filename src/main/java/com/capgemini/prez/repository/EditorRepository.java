package com.capgemini.prez.repository;

import com.capgemini.prez.domain.Editor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Editor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EditorRepository extends JpaRepository<Editor, Long> {

}
