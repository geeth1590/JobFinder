package org.example.backend.Repository.AuthRepos;

import org.example.backend.Enum.ERole;
import org.example.backend.Model.Auth.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}
