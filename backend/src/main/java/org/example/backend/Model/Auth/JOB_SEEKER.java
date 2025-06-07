package org.example.backend.Model.Auth;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "job_seeker")
public class JOB_SEEKER extends User{
    private String address;
    private int age;


}


