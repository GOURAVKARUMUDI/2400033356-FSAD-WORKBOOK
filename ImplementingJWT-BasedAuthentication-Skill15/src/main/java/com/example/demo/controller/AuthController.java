
package com.example.demo.controller;

import com.example.demo.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String role){
        return JwtUtil.generateToken(username, role);
    }

    @GetMapping("/employee/profile")
    public String profile(){
        return "Employee Profile";
    }

    @PostMapping("/admin/add")
    public String add(){
        return "Admin Add";
    }

    @DeleteMapping("/admin/delete")
    public String delete(){
        return "Admin Delete";
    }
}
