
package com.example.demo.service;

import com.example.demo.entity.Student;
import com.example.demo.repo.StudentRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepo repo;

    public StudentService(StudentRepo repo){
        this.repo = repo;
    }

    public Student add(Student s){
        return repo.save(s);
    }

    public List<Student> getAll(){
        return repo.findAll();
    }

    public Student getById(Long id){
        return repo.findById(id).orElseThrow();
    }

    public Student update(Long id, Student s){
        Student existing = getById(id);
        existing.setName(s.getName());
        existing.setEmail(s.getEmail());
        existing.setCourse(s.getCourse());
        return repo.save(existing);
    }

    public void delete(Long id){
        repo.deleteById(id);
    }
}
