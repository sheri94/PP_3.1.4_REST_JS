package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;


@Controller
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public UserController(UserServiceImpl userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/user/my")
    public String getUser(@AuthenticationPrincipal User user,
                          @AuthenticationPrincipal UserDetails userDetails,
                          Model model) {
        model.addAttribute("users", user);
        model.addAttribute("email", userService.findByEmail(userDetails.getUsername()));
        model.addAttribute("newUser", new User());
        model.addAttribute("role", roleService.findAll());
        return "user-list";
    }
}