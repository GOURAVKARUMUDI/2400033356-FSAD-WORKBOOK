package com.example.studentmanagement.service;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.exception.StudentNotFoundException;
import com.example.studentmanagement.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class StudentService {
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    );

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }

    public Student addStudent(Student student) {
        Student normalizedStudent = normalizeAndValidate(student);

        if (studentRepository.existsByEmailIgnoreCase(normalizedStudent.getEmail())) {
            throw new IllegalArgumentException("A student with this email already exists.");
        }

        normalizedStudent.setId(null);
        return studentRepository.save(normalizedStudent);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Student existingStudent = getStudentById(id);
        Student normalizedStudent = normalizeAndValidate(studentDetails);

        if (studentRepository.existsByEmailIgnoreCaseAndIdNot(normalizedStudent.getEmail(), id)) {
            throw new IllegalArgumentException("A student with this email already exists.");
        }

        existingStudent.setName(normalizedStudent.getName());
        existingStudent.setEmail(normalizedStudent.getEmail());
        existingStudent.setCourse(normalizedStudent.getCourse());

        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(Long id) {
        studentRepository.delete(getStudentById(id));
    }

    private Student normalizeAndValidate(Student student) {
        if (student == null) {
            throw new IllegalArgumentException("Student payload is required.");
        }

        String name = normalize(student.getName());
        String email = normalize(student.getEmail());
        String course = normalize(student.getCourse());

        if (name.isEmpty()) {
            throw new IllegalArgumentException("Name is required.");
        }

        if (email.isEmpty()) {
            throw new IllegalArgumentException("Email is required.");
        }

        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new IllegalArgumentException("Email must be a valid address.");
        }

        if (course.isEmpty()) {
            throw new IllegalArgumentException("Course is required.");
        }

        student.setName(name);
        student.setEmail(email);
        student.setCourse(course);

        return student;
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }
}
