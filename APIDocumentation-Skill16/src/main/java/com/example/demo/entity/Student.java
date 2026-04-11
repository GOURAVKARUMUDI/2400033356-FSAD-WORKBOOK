
package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String course;

    public Student(){}

    public Long getId(){ return id; }
    public String getName(){ return name; }
    public String getEmail(){ return email; }
    public String getCourse(){ return course; }

    public void setName(String name){ this.name = name; }
    public void setEmail(String email){ this.email = email; }
    public void setCourse(String course){ this.course = course; }
}
