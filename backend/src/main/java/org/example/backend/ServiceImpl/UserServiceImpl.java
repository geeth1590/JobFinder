package org.example.backend.ServiceImpl;

import org.apache.logging.log4j.Logger;
import org.example.backend.Constant.CommonMsg;
import org.example.backend.Constant.CommonStatus;
import org.example.backend.Constant.JobStatus;
import org.example.backend.DTO.EventDTO;
import org.example.backend.DTO.JobRequestDTO;
import org.example.backend.DTO.UserDTO;
import org.example.backend.Model.Auth.User;
import org.example.backend.Model.Event;
import org.example.backend.Model.JobRequest;
import org.example.backend.Repository.AuthRepos.UserRepository;
import org.example.backend.Repository.EventRepository;
import org.example.backend.Repository.JobRequestRepository;
import org.example.backend.Service.EventService;
import org.example.backend.Service.UserService;
import org.example.backend.Utils.CommonResponse;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;

import static org.apache.logging.log4j.LogManager.getLogger;

@Service
public class UserServiceImpl implements UserService {

    //    private static final Logger LOGGER = (Logger) LoggerFactory.getLogger(UserServiceImpl.class);
    private final Logger LOGGER = getLogger(UserService.class);
    @Autowired
    UserRepository userRepository;

    @Autowired
    JobRequestRepository jobRequestRepository;


    private List<String> validationUserDTO(UserDTO userDTO) {
        List<String> validation = new ArrayList<>();
        if (userDTO == null) {
            validation.add(CommonMsg.CHECK_INPUT_DATA);
        }
        return validation;
    }

    @Override
    public CommonResponse saveUser(UserDTO userDTO) {
//        CommonResponse commonResponse =new CommonResponse();
//
//        try {
//            List<String> validation = validationUserDTO(userDTO);
//            if (!CollectionUtils.isEmpty(validation)){
//                commonResponse.setErrorMessages(validation);
//                return commonResponse;
//            }
//            User user =castUserDTOIntoUser(userDTO);
//            userRepository.save(user);
//            commonResponse.setStatus(true);
//            commonResponse.setPayload(Collections.singletonList(userDTO));
//        }
//        catch (Exception e)
//        {
//            LOGGER.error("/**************** Exception in EventService -> saveEvent" + e);
//        }
        return null;
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
            User userSave = this.userRepository.getById(Long.valueOf(userDTO.getId()));
//            userSave.setLocation(eventDTO.getLocation());
//            event1.setCommonStatus(CommonStatus.ACTIVE);
            userSave.setId(userDTO.getId());
            userSave.setEmail(userDTO.getEmail());
            userSave.setRoles(userDTO.getRoles());


            userRepository.save(userSave);

            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(userDTO));

        } catch (Exception e) {
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

    @Override
    public CommonResponse getEventByUser(Long id) {
        CommonResponse response = new CommonResponse();

        List<Object[]> eventList = userRepository.getEventByUser(id);
        List<Map<String, Object>> mappedEvents = new ArrayList<>();

        for (Object[] row : eventList) {
            Map<String, Object> eventMap = new HashMap<>();
            eventMap.put("location", row[0]);
            eventMap.put("title", row[1]);
            eventMap.put("date", row[2]);
            eventMap.put("image_url", row[3]);
            mappedEvents.add(eventMap);
        }

        response.setStatus(true);
        response.setMessage("Request processed successfully.");
//        response.setPayload(mappedEvents);
        response.setPayload(Collections.singletonList(mappedEvents));  // Optional: echo back the request

        return response;
    }

    @Override
    public CommonResponse requestEvent(JobRequestDTO jobRequestDTO) {
        CommonResponse response = new CommonResponse();

        try {

            if (jobRequestDTO == null ||
                    jobRequestDTO.getUserId() == null ||
                    jobRequestDTO.getEventId() == null) {

                response.setStatus(false);
                response.setErrorMessages(Collections.singletonList("User ID and Event ID are required."));
                return response;
            }


            LOGGER.info("Received event request: {}", jobRequestDTO);


            JobRequest jobRequest = castJobRequestDTOintoJobRequest(jobRequestDTO);
            jobRequestRepository.save(jobRequest);
            response.setStatus(true);
            response.setMessage("Request processed successfully.");
            response.setPayload(Collections.singletonList(jobRequestDTO));  // Optional: echo back the request

        } catch (Exception e) {
            LOGGER.error("Exception in requestEvent(): ", e);
            response.setStatus(false);
            response.setErrorMessages(Collections.singletonList("Failed to process request."));
        }

        return response;
    }

    private JobRequest castJobRequestDTOintoJobRequest(JobRequestDTO jobRequestDTO) {
        JobRequest jobRequest = new JobRequest();

        jobRequest.setUserId(jobRequestDTO.getUserId());
        jobRequest.setEventId(jobRequestDTO.getEventId());

        jobRequest.setJobStatus(JobStatus.PENDING);


        return jobRequest;

    }
}







