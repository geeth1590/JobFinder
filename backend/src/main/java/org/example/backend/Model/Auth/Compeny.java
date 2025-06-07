package org.example.backend.Model.Auth;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.Constant.CommonStatus;

@Entity
@Table(name = "compeny")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
public class Compeny extends User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String compenyName;
    private String adress;
    private String phoneNumber;
    @Enumerated
    private CommonStatus commonStatus;


}
