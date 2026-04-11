package com.skill14.auth.controller;

import com.skill14.auth.dto.UserProfileResponse;
import com.skill14.auth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getProfile(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String username) {
        return ResponseEntity.ok(userService.getProfile(id, username));
    }
}

