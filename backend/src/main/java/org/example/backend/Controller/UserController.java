package org.example.backend.Controller;

import org.example.backend.DTO.ContactRequestDTO;
import org.example.backend.DTO.EventDTO;
import org.example.backend.DTO.JobRequestDTO;
import org.example.backend.DTO.UserDTO;
import org.example.backend.Service.EventService;
import org.example.backend.Service.UserService;
import org.example.backend.Utils.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.http.HttpStatus;

import org.springframework.mail.SimpleMailMessage;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {


    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    UserService userService;

    @Autowired
    EventService eventService;

//    @PutMapping("/updateUser/{id}")
//    public CommonResponse updateUser (@PathVariable Long id, @RequestBody UserDTO userDTO){
//        System.out.println("controller");
////        System.out.println("update api"+eventDTO.getLocation());
////        System.out.println("update api "+eventDTO.getImageUrl());
//        System.out.println("update api"+id);
//        userDTO.setId(id);
//        return userService.updateUser(userDTO);
//
//    }

//    @PostMapping("/saveEvent")
//    public CommonResponse savePlayer (@RequestBody EventDTO eventDTO) {
//        return eventService.saveEvents(eventDTO);
//
//    }

    @PostMapping("/request")
    public CommonResponse requestJob(@RequestBody JobRequestDTO jobRequestDTO) {
        String userId = jobRequestDTO.getUserId();
        String eventId = jobRequestDTO.getEventId();
        System.out.println(jobRequestDTO);
        return userService.requestEvent(jobRequestDTO);
    }




    @PostMapping("/contact")
    public ResponseEntity<CommonResponse> contactForm(@RequestBody ContactRequestDTO request) {
        try {
            String subject = "New Contact Message from " + request.getName();
            String body = "From: " + request.getName() + "\nEmail: " + request.getEmail() + "\n\nMessage:\n" + request.getMessage();

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("geethkau@gmail.com"); // ✅ Replace with your email
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);

            CommonResponse res = new CommonResponse();
            res.setStatus(true);
            res.setMessage("Message sent successfully");
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            CommonResponse res = new CommonResponse();
            res.setStatus(false);
            res.setMessage("Failed to send message: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/getEventByUser/{id}")
    public CommonResponse getEventByUser (@PathVariable Long id){
        System.out.println("id:: "+id);
        return userService.getEventByUser(id);

    }

}
