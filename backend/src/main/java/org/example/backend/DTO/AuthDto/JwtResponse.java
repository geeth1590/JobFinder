package org.example.backend.DTO.AuthDto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtResponse {
    private Long id;
    private String token;
    private String username;
    private String email;
    private List<String> roles;

    public JwtResponse(String token, String username, String email, List<String> roles , Long id) {
        this.id = id;
        this.token = token;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}
