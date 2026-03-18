package com.klu.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

    @GetMapping("/{id}")
    public String getStudent(@PathVariable int id) {

        return "Student ID : " + id;
    }
}