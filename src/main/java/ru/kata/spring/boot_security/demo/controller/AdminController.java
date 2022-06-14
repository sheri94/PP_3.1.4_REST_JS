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

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserServiceImpl userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String findAll(Model model, @AuthenticationPrincipal UserDetails userDetails) {
        List<User> userList = userService.findAll();
        model.addAttribute("users", userList);
        model.addAttribute("email", userService.findByEmail(userDetails.getUsername()));
        model.addAttribute("newUser", new User());
        model.addAttribute("role", roleService.findAll());
        return "admin";
    }

//    @PostMapping("/admin/user-create")
//    public String createUser(User user,
//                             @RequestParam(value = "rolesId") String[] roles) {
//        user.setRoles(roleService.getSetRoles(roles));
//        userService.saveUser(user);
//        return "redirect:/admin/users";
//    }
//
//    @DeleteMapping("/admin/user-delete/{id}")
//    public String deleteUser(@PathVariable("id") Long id) {
//        userService.deleteById(id);
//        return "redirect:/admin/users";
//    }
//
//    @PatchMapping("/admin/user-updates")
//    public String updateUserForm(User user,
//                                 @RequestParam(value = "rolesId") String[] roles) {
//        user.setRoles(roleService.getSetRoles(roles));
//        userService.saveUser(user);
//        return "redirect:/admin/users";
//    }
}