package org.example.backend.Service;


import org.example.backend.DTO.EventDTO;
import org.example.backend.Utils.CommonResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface EventService {


    CommonResponse saveEvents(EventDTO eventDTO);

    CommonResponse updateEvent(EventDTO eventDTO);

    CommonResponse getAll();

    CommonResponse deletePlayerById(String id);

    CommonResponse getById(Long id);



}
