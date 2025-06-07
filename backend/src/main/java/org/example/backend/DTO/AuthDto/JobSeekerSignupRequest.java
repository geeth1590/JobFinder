package org.example.backend.DTO.AuthDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobSeekerSignupRequest extends SignupRequest{
    private String address;
    private int age;
}
