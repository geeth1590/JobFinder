package org.example.backend.DTO.AuthDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminSignupRequest extends SignupRequest{

    private String department;
}
