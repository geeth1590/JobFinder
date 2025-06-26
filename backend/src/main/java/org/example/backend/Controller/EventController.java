package org.example.backend.Controller;


import org.example.backend.DTO.EventDTO;
import org.example.backend.DTO.StatusUpdateRequest;
import org.example.backend.Service.EventService;
import org.example.backend.Utils.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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

//    @PutMapping("/events/${id}/status")
//    public CommonResponse updateStatus (@PathVariable Long id, @RequestBody EventDTO eventDTO){
//        System.out.println("update api"+eventDTO.getLocation());
//        System.out.println("update api "+eventDTO.getImageUrl());
//        System.out.println("update api"+id);
//        eventDTO.setId(id);
//        return eventService.updateEvent(eventDTO);
//
//    }

    @PatchMapping("/events/{id}/status")
    public ResponseEntity<String> updateEventStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request) {

        eventService.updateJobStatus(id, request.getStatus());
        return ResponseEntity.ok("Job status updated successfully");
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


    @GetMapping("/compeny/{compenyId}/events")
    public ResponseEntity<CommonResponse> getEventsByCompenyId(@PathVariable String compenyId) {
        System.out.println("compeny controller "+compenyId);
        System.out.println("compeny id "+compenyId);
        CommonResponse response = eventService.getEventsForCompeny(compenyId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getdetails")
    public ResponseEntity<CommonResponse> getDetails(@RequestParam ("user_id") Long user_id) {
        CommonResponse response = eventService.getDeatails(user_id);
        return  ResponseEntity.ok(response);
    }

    @GetMapping("/getAlldetails")
    public ResponseEntity<CommonResponse> getAllDetails() {
        CommonResponse response = eventService.getAllDeatails();
        return  ResponseEntity.ok(response);
    }

        @GetMapping("/getEventCount")
    public ResponseEntity<CommonResponse> getEventCount(@RequestParam ("user_id") Long user_id) {
        CommonResponse response = eventService.getEventCount(user_id);
        return  ResponseEntity.ok(response);
    }


    @GetMapping("/getJobRequestCount")
    public ResponseEntity<CommonResponse> getJobRequestCount(@RequestParam ("user_id") Long user_id) {
        CommonResponse response = eventService.getJobRequestCount(user_id);
        return  ResponseEntity.ok(response);
    }

    @GetMapping("/getApproedCount")
    public ResponseEntity<CommonResponse> getApproedCount(@RequestParam ("user_id") Long user_id) {
        CommonResponse response = eventService.getApproedCount(user_id);
        return  ResponseEntity.ok(response);
    }



}
