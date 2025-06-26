package org.example.backend.DTO;

import lombok.*;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventJobRequestDto {
    private Long event_id;
    private String title;
    private String image_url;
    private String username;
 //   private String address;

}
