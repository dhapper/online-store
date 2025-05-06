package com.dhapper.store.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "singles")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

//    private String category;
    private String name;
//    private String description;
    private String condition;
    private BigDecimal price;
    private String language;
    private String cardSet;
    private String type;
    private String filename;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

//    public String getCategory() {
//        return category;
//    }
//
//    public void setCategory(String category) {
//        this.category = category;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getLanguage() { return language; }

    public void setLanguage(String language) { this.language = language; }

    public String getCardSet() { return cardSet; }

    public void setCardSet(String cardSet) { this.cardSet = cardSet; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public String getFilename() { return filename; }

    public void setFilename(String filename) { this.filename = filename; }
}