package org.example.backend.Controller;

import org.example.backend.DTO.EventDTO;
import org.example.backend.DTO.UserDTO;
import org.example.backend.Service.EventService;
import org.example.backend.Service.UserService;
import org.example.backend.Utils.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

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



}
