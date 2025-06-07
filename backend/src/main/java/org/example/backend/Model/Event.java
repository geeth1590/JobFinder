package org.example.backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.example.backend.Constant.CommonStatus;
import org.example.backend.Model.Auth.User;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "event")
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String location;
    private LocalDate date;
    private LocalTime time;
    private Double price;
    private String imageUrl;
    @Enumerated
    private CommonStatus commonStatus;

    @ManyToMany(mappedBy = "appliedEvents")
    private Set<User> applicants = new HashSet<>();

}
