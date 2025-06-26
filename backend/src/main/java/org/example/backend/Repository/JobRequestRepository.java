package org.example.backend.Repository;

import org.example.backend.Model.JobRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRequestRepository extends JpaRepository<JobRequest, Long> {
}
