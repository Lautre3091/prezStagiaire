package com.capgemini.prez.repository;

import com.capgemini.prez.domain.Saga;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Saga entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SagaRepository extends JpaRepository<Saga, Long> {

}
