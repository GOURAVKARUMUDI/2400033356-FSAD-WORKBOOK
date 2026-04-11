
package com.example.demo.controller;

import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service){
        this.service = service;
    }

    @Operation(summary="Add student")
    @ApiResponse(responseCode="200", description="Student added")
    @PostMapping
    public Student add(@RequestBody Student s){
        return service.add(s);
    }

    @Operation(summary="Get all students")
    @GetMapping
    public List<Student> getAll(){
        return service.getAll();
    }

    @Operation(summary="Get student by ID")
    @GetMapping("/{id}")
    public Student getById(@PathVariable Long id){
        return service.getById(id);
    }

    @Operation(summary="Update student")
    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student s){
        return service.update(id, s);
    }

    @Operation(summary="Delete student")
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Deleted";
    }
}
