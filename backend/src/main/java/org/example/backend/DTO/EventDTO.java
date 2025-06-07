package org.example.backend.DTO;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Data
public class EventDTO {

    private Long id;
    private String title;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private Double price;
    private String imageUrl;
    private String description;
}
