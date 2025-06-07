package org.example.backend.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.Model.Auth.User;

@Getter
@Setter
@Data
public class CompenyDTO extends UserDTO{


    private String compenyName;
    private String adress;
    private String phoneNumber;

}
