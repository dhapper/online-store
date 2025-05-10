package com.dhapper.store.repository;

import com.dhapper.store.model.Sealed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SealedRepository extends JpaRepository<Sealed, Long> {

    // SELECT * FROM product WHERE name = ?;
    List<Sealed> findByName(String name);

}
