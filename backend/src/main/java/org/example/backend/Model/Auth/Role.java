package org.example.backend.Model.Auth;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.Enum.ERole;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;
}
