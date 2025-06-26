package org.example.backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.example.backend.Constant.JobStatus;


@Entity
@Table(name = "jobrequest")
@Data
public class JobRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String eventId;
    private String userId;
    @Enumerated
    private JobStatus jobStatus;

}
