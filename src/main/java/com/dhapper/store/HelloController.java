package com.dhapper.store;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, Spring Boot is working!";
    }

    @GetMapping("/hello2")
    public String sayHello2() {
        return "MOOOOO";
    }

}