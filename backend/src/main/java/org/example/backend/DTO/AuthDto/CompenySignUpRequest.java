package org.example.backend.DTO.AuthDto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompenySignUpRequest extends SignupRequest{

    private String compenyName;
    private String adress;
    private String phoneNumber;
}
