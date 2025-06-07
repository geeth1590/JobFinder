package org.example.backend.Model.Auth;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "admins")
public class Admin extends User {
    private String department;
    // Other admin-specific fields
}
