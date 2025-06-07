package org.example.backend.ServiceImpl;

import org.apache.logging.log4j.Logger;
import org.example.backend.Constant.CommonMsg;
import org.example.backend.Constant.CommonStatus;
import org.example.backend.DTO.EventDTO;
import org.example.backend.DTO.UserDTO;
import org.example.backend.Model.Auth.User;
import org.example.backend.Model.Event;
import org.example.backend.Repository.AuthRepos.UserRepository;
import org.example.backend.Repository.EventRepository;
import org.example.backend.Service.EventService;
import org.example.backend.Service.UserService;
import org.example.backend.Utils.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.apache.logging.log4j.LogManager.getLogger;

@Service
public class UserServiceImpl implements UserService {

    private final Logger LOGGER =getLogger(UserService.class);
    @Autowired
    UserRepository userRepository;


    private List<String> validationUserDTO(UserDTO userDTO) {
        List<String> validation = new ArrayList<>();
        if (userDTO==null){
            validation.add(CommonMsg.CHECK_INPUT_DATA);
        }
        return validation;
    }

    @Override
    public CommonResponse saveUser(UserDTO userDTO) {
        CommonResponse commonResponse =new CommonResponse();

        try {
            List<String> validation = validationUserDTO(userDTO);
            if (!CollectionUtils.isEmpty(validation)){
                commonResponse.setErrorMessages(validation);
                return commonResponse;
            }
            User user =castUserDTOIntoUser(userDTO);
            userRepository.save(user);
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(userDTO));
        }
        catch (Exception e)
        {
            LOGGER.error("/**************** Exception in EventService -> saveEvent" + e);
        }
        return commonResponse;
    }

    @Override
    public CommonResponse updateUser(UserDTO userDTO) {
        CommonResponse commonResponse = new CommonResponse();
        User user;
        try {
//
            List<String> validations = validationUserDTO(userDTO);
            if (!CollectionUtils.isEmpty(validations)) {
                commonResponse.setErrorMessages(validations);
                return commonResponse;
            }
            System.out.println("update event----------------------------------");
            System.out.println(userDTO.toString());
//            Event userSave = this.eventRepository.getById(Long.valueOf(userDTO.getId()));
              User userSave =this.userRepository.getById(Long.valueOf(userDTO.getId()));
//            userSave.setLocation(eventDTO.getLocation());
//            event1.setCommonStatus(CommonStatus.ACTIVE);
                userSave.setId(userDTO.getId());
                userSave.setEmail(userDTO.getEmail()) ;
                userSave.setRoles(userDTO.getRoles());


            userRepository.save(userSave);

            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(userDTO));

        }catch (Exception e){
            LOGGER.error("/**************** Exception in EventService -> UpdateEvent()" + e);
        }
        return commonResponse;
    }

    @Override
    public CommonResponse getAll() {
        return null;
    }

    @Override
    public CommonResponse deletePlayerById(String id) {
        return null;
    }

    @Override
    public CommonResponse getById(Long id) {
        return null;
    }



    private UserDTO castUserIntoEvent(User user) {
        UserDTO userDTO = new UserDTO();
        user.setId(Long.valueOf(user.getId()));
        user.setEmail(user.getEmail());
        user.setRoles(user.getRoles());

        return userDTO;
    }

    private User castUserDTOIntoUser(UserDTO userDTO) {
        User user =new User();
        user.setEmail(userDTO.getEmail());
        user.setRoles(userDTO.getRoles());
        user.setId(userDTO.getId());

        return user;
    }
}
