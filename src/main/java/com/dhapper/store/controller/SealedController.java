package com.dhapper.store.controller;

import com.dhapper.store.model.Product;
import com.dhapper.store.model.Sealed;
import com.dhapper.store.repository.ProductRepository;
import com.dhapper.store.repository.SealedRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sealed")
public class SealedController {

    private SealedRepository sealedRepository;

    public SealedController(SealedRepository sealedRepository) {
        this.sealedRepository = sealedRepository;
    }

    @GetMapping
    public List<Sealed> getAllSealed() {
        return sealedRepository.findAll();
    }

}
