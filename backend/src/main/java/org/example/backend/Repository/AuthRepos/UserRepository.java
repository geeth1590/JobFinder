package org.example.backend.Repository.AuthRepos;

import org.example.backend.Model.Auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    @Query(value = "SELECT event.location, event.title, event.date ,event.image_url FROM jobfinder.jobrequest join event on event.id = jobrequest.event_id \n" +
            "where jobrequest.user_id = ?1", nativeQuery = true)
    List<Object[]> getEventByUser(Long userId);
}
