package org.example.backend.DTO;

import lombok.Data;

@Data
public class ContactRequestDTO {

    private String name;
    private String email;
    private String message;
}
