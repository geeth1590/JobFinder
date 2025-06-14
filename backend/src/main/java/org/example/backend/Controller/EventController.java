package org.example.backend.Controller;


import org.example.backend.DTO.EventDTO;
import org.example.backend.Service.EventService;
import org.example.backend.Utils.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    EventService eventService;

    @PostMapping("/saveEvent")
    public CommonResponse savePlayer (@RequestBody EventDTO eventDTO) {
        System.out.println("role "+eventDTO.getRole());
        System.out.println("uplodetBy"+eventDTO.getUplodetBy());
        return eventService.saveEvents(eventDTO);

    }

    @PutMapping("/updateEvent/{id}")
    public CommonResponse updateCompeny (@PathVariable Long id, @RequestBody EventDTO eventDTO){
        System.out.println("update api"+eventDTO.getLocation());
        System.out.println("update api "+eventDTO.getImageUrl());
        System.out.println("update api"+id);
        eventDTO.setId(id);
        return eventService.updateEvent(eventDTO);

    }

    @GetMapping("/getEvent")
    public ResponseEntity<CommonResponse> getAll(){
        try {
            CommonResponse response = eventService.getAll();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            CommonResponse errorResponse = new CommonResponse();
            errorResponse.setStatus(false);
            errorResponse.setErrorMessages(Arrays.asList(e.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/admin/pending")
    public ResponseEntity<CommonResponse> getPendingEventsForAdmin() {
        try {
            CommonResponse response = eventService.getPendingEventsForAdmin();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            CommonResponse errorResponse = new CommonResponse();
            errorResponse.setStatus(false);
            errorResponse.setErrorMessages(Arrays.asList(e.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }



    @DeleteMapping("/deleteEvent/{id}")
    public ResponseEntity<CommonResponse> deleteEvent(@PathVariable String id) {
        CommonResponse response = eventService.deletePlayerById(id);

        if (response.isStatus()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(response);
        }
    }


    @GetMapping("/getById")
    public CommonResponse getById(@RequestParam("id") Long id) {
        return this.eventService.getById(id);
    }

    

}
