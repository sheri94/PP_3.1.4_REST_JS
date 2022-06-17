package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("admin/users")
public class RESTController {

    private final UserService userService;

    @Autowired
    public RESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<User> getAllUser() {
        List<User> allUsers = userService.findAll();
        return allUsers;
    }

    @GetMapping("{id}")
    public User getOneUser(@PathVariable("id") Long id) {
        return userService.findById(id);
    }

    @PostMapping()
    public User addNewUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("{id}")
    public User editUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }
}