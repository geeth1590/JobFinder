package org.example.backend.Service;


import org.example.backend.DTO.EventDTO;
import org.example.backend.Utils.CommonResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface EventService {


    CommonResponse saveEvents(EventDTO eventDTO);

    CommonResponse updateEvent(EventDTO eventDTO);

    CommonResponse getAll();

    CommonResponse getPendingEventsForAdmin();

    CommonResponse getAcceptedEventsForUser();

    CommonResponse deletePlayerById(String id);

    CommonResponse getById(Long id);


    void updateJobStatus(Long id, String statusStr);

    CommonResponse getEventsForCompeny(String compenyId);

    CommonResponse getDeatails( Long userId);

    CommonResponse getAllDeatails();

    CommonResponse getEventCount(Long user_id);

    CommonResponse getJobRequestCount(Long userId);

    CommonResponse getApproedCount(Long userId);
}
