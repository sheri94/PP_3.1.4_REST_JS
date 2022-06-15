package ru.kata.spring.boot_security.demo.model;


import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

//@Data
//@Entity
//@Table(name = "roles")
//public class Role implements GrantedAuthority {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    @Column
//    private String name;
//
//    public Role() {
//    }
//
//    public Role(String name) {
//        this.name = name;
//    }
//
//    public Role(int id, String name) {
//        this.id = id;
//        this.name = name;
//    }
//
//    public int getId() {
//        return id;
//    }
//
//    public void setId(int id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//    public String getNameReplace(){
//        return name.replace("ROLE_", "");
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public List<User> getUser() {
//        return user;
//    }
//
//    public void setUser(List<User> user) {
//        this.user = user;
//    }
//
//    @ManyToMany
//    @JoinTable(name = "user_role",
//            joinColumns = @JoinColumn(name = "role_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id"))
//    private List<User> user;
//
//    @Override
//    public String getAuthority() {
//        return getName();
//    }
//}

@Entity
@Data
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    private int id;

    private String name;

    public Role() {
    }

    @Override
    public String getAuthority() {
        return getName();
    }

    public Role(int id) {
        this.id = id;
    }

    public Role(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public String toString() {
        return name.replace("ROLE_", "");
    }
}
