package org.example.backend.Controller;

import org.example.backend.DTO.CompenyDTO;
import org.example.backend.DTO.EventDTO;
import org.example.backend.DTO.UserDTO;
import org.example.backend.Service.CompenyService;
import org.example.backend.Service.UserService;
import org.example.backend.Utils.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/compeny")
public class CompenyController {

    @Autowired
    CompenyService compenyService;

    @PostMapping("/savecompeny")
    public CommonResponse savePlayer (@RequestBody CompenyDTO compenyDTO) {
        return compenyService.saveCompeny(compenyDTO);

    }

    @PutMapping("/updatecompeny/{id}")
    public CommonResponse updateCompeny (@PathVariable Long id, @RequestBody CompenyDTO compenyDTO){
        System.out.println("controller");
        System.out.println("update api"+compenyDTO.getCompenyName());
//        System.out.println("update api "+eventDTO.getImageUrl());
        System.out.println("update api"+id);
        compenyDTO.setId(id);
        return compenyService.updateCompeny(id,compenyDTO);

    }

    @GetMapping("/getCompeny")
    public ResponseEntity<CommonResponse> getAll(){
        try {
            CommonResponse response = compenyService.getAll();
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
        CommonResponse response = compenyService.deletePlayerById(id);

        if (response.isStatus()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(response);
        }
    }
}
