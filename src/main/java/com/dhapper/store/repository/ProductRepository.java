package com.dhapper.store.repository;

import com.dhapper.store.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // SELECT * FROM product WHERE name = ?;
    List<Product> findByName(String name);

    // SELECT * FROM product WHERE price < ?;
    List<Product> findByPriceLessThan(Double price);

    // SELECT * FROM product WHERE category IN (?, ?, ...);
//    List<Product> findByCategoryIn(List<String> categories);

}
