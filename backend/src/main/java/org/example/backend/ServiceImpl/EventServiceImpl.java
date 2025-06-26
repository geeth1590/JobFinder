package org.example.backend.ServiceImpl;


import org.apache.logging.log4j.Logger;
import org.example.backend.Constant.CommonMsg;
import org.example.backend.Constant.CommonStatus;
import org.example.backend.DTO.EventDTO;
import org.example.backend.Constant.JobStatus;
import org.example.backend.DTO.EventJobRequestDto;
import org.example.backend.Model.Auth.User;
import org.example.backend.Model.Event;
import org.example.backend.Model.JobRequest;
import org.example.backend.Repository.AuthRepos.UserRepository;
import org.example.backend.Repository.EventRepository;
import org.example.backend.Repository.JobRequestRepository;
import org.example.backend.Service.EmailService;
import org.example.backend.Service.EventService;
import org.example.backend.Utils.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static org.apache.logging.log4j.LogManager.getLogger;

@Service
public class EventServiceImpl implements EventService {

    private final Logger LOGGER = getLogger(EventService.class);
    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;


    @Autowired
    private EmailService emailService;
    @Autowired
    private JobRequestRepository JobRequestRepository;
    @Autowired
    private JobRequestRepository jobRequestRepository;

    @Override
    public CommonResponse saveEvents(EventDTO eventDTO) {
        CommonResponse commonResponse = new CommonResponse();

        try {
            List<String> validation = validationEventDTO(eventDTO);
            if (!CollectionUtils.isEmpty(validation)) {
                commonResponse.setErrorMessages(validation);
                return commonResponse;
            }
            Event event = castEventDTOintoEvent(eventDTO);
            eventRepository.save(event);
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(eventDTO));
        } catch (Exception e) {
            LOGGER.error("/**************** Exception in EventService -> saveEvent" + e);
        }
        return commonResponse;
    }

    private Event castEventDTOintoEvent(EventDTO eventDTO) {
        Event event = new Event();
        event.setDate(eventDTO.getDate());
        event.setImageUrl(eventDTO.getImageUrl());
        event.setLocation(eventDTO.getLocation());
        event.setPrice(eventDTO.getPrice());
        event.setTime(eventDTO.getTime());
        event.setTitle(eventDTO.getTitle());
        event.setRole(eventDTO.getRole());
        event.setDescription(eventDTO.getDescription());
        event.setUplodetBy(eventDTO.getUplodetBy());
        if (eventDTO.getRole() != null && eventDTO.getRole().contains("[\"ROLE_ADMIN\"]")) {
//            event.setCommonStatus(CommonStatus.ACTIVE);
            event.setJobStatus(JobStatus.ACCEPTED);
        } else {
//            event.setCommonStatus(CommonStatus.INACTIVE);
            event.setJobStatus(JobStatus.PENDING);
        }


        return event;
    }


    private List<String> validationEventDTO(EventDTO eventDTO) {
        List<String> validatiion = new ArrayList<>();
        if (eventDTO == null) {
            validatiion.add(CommonMsg.CHECK_INPUT_DATA);
//        } else if (C) {
//
        }
        return validatiion;
    }

    @Override
    public CommonResponse updateEvent(EventDTO eventDTO) {
        CommonResponse commonResponse = new CommonResponse();
        Event event;
        try {
//            List<String> validations = validationEventDTO(eventDTO);
            List<String> validations = validationEventDTO(eventDTO);
            if (!CollectionUtils.isEmpty(validations)) {
                commonResponse.setErrorMessages(validations);
                return commonResponse;
            }
            System.out.println("update event----------------------------------");
            System.out.println(eventDTO.toString());
            Event event1 = this.eventRepository.getById(Long.valueOf(eventDTO.getId()));

            event1.setLocation(eventDTO.getLocation());
            event1.setTitle(eventDTO.getTitle());
            event1.setPrice(eventDTO.getPrice());
            event1.setTime(eventDTO.getTime());
            event1.setImageUrl(eventDTO.getImageUrl());
            event1.setDate(eventDTO.getDate());
//            event1.setCommonStatus(CommonStatus.ACTIVE);
            event1.setJobStatus(JobStatus.ACCEPTED);

            eventRepository.save(event1);

            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(eventDTO));

        } catch (Exception e) {
            LOGGER.error("/**************** Exception in EventService -> UpdateEvent()" + e);
        }
        return commonResponse;
    }


    @Override
    public CommonResponse getAll() {

        CommonResponse commonResponse = new CommonResponse();
        List<EventDTO> eventDTOS;
        try {
            Predicate<Event> filterOnStatus = event ->
                    event.getCommonStatus() != CommonStatus.DELETED &&
//                            event.getCommonStatus() != CommonStatus.INACTIVE &&
                            event.getJobStatus() != JobStatus.PENDING &&
                            event.getJobStatus() != JobStatus.REJECTED;

            eventDTOS = eventRepository.findAll()
                    .stream()
                    .filter(filterOnStatus)
                    .map(this::castEventIntoEventDTO)
                    .collect(Collectors.toList());
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(eventDTOS));

        } catch (Exception e) {
            LOGGER.error("/**************** Exception in EventService -> getAll()" + e);
        }
        return commonResponse;
    }

    @Override
    public CommonResponse getPendingEventsForAdmin() {
        CommonResponse commonResponse = new CommonResponse();
        List<EventDTO> eventDTOS;
        try {
            Predicate<Event> filterOnStatus = event ->
//
                    event.getJobStatus() != JobStatus.ACCEPTED &&
                            event.getJobStatus() != JobStatus.REJECTED;

            eventDTOS = eventRepository.findAll()
                    .stream()
                    .filter(filterOnStatus)
                    .map(this::castEventIntoEventDTO)
                    .collect(Collectors.toList());
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(eventDTOS));

        } catch (Exception e) {
            LOGGER.error("/**************** Exception in EventService -> getAll()" + e);
        }
        return commonResponse;
    }

    @Override
    public CommonResponse getAcceptedEventsForUser() {
        return null;
    }

    private EventDTO castEventIntoEventDTO(Event event) {
        EventDTO eventDTO = new EventDTO();

        eventDTO.setId(event.getId());
        eventDTO.setDate(event.getDate());
        eventDTO.setImageUrl(event.getImageUrl());
        eventDTO.setLocation(event.getLocation());
        eventDTO.setPrice(event.getPrice());
        eventDTO.setTime(event.getTime());
        eventDTO.setTitle(event.getTitle());
        eventDTO.setDescription(event.getDescription());
        eventDTO.setUplodetBy(event.getUplodetBy());
        eventDTO.setRole(event.getRole());

        return eventDTO;
    }

    private Event castEventDTOIntoEvent(EventDTO eventDTO) {
        Event event = new Event();
//        eventDTO.setLocation(event.getLocation());
//        eventDTO.setTitle(event.getTitle());
        event.setId(eventDTO.getId());
        event.setDate(eventDTO.getDate());
        event.setImageUrl(eventDTO.getImageUrl());
        event.setLocation(eventDTO.getLocation());
        event.setPrice(eventDTO.getPrice());
        event.setTime(eventDTO.getTime());
        event.setTitle(eventDTO.getTitle());

        return event;
    }

    @Override
    public CommonResponse deletePlayerById(String id) {
        CommonResponse commonResponse = new CommonResponse();

        try {
            if (eventRepository.existsById(Long.valueOf(id))) {
                Event event = eventRepository.getById(Long.parseLong(id));
                event.setCommonStatus(CommonStatus.DELETED);

                eventRepository.save(event);

                commonResponse.setStatus(true);
                commonResponse.setPayload(Collections.singletonList("Event deleted successfully"));
            } else {
                commonResponse.setErrorMessages(Collections.singletonList("Event not found"));
            }
        } catch (NumberFormatException e) {
            commonResponse.setErrorMessages(Collections.singletonList("Invalid Event ID format"));
        } catch (Exception e) {
            LOGGER.error("Exception in EventService -> deleteEventById()", e);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while deleting the Event"));
        }
        return commonResponse;
    }

    @Override
    public CommonResponse getById(Long id) {
        System.out.println("id" + id);
        CommonResponse commonResponse = new CommonResponse();
        List<EventDTO> eventDTOS;

        try {
            Predicate<Event> filterOnStatus = Event -> Event.getCommonStatus() != CommonStatus.DELETED;
            eventDTOS = eventRepository.findById(id)
                    .stream()
                    .filter(filterOnStatus)
                    .map(this::castEventIntoEventDTO)
                    .collect(Collectors.toList());

            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(eventDTOS));

        } catch (Exception e) {
            LOGGER.error("/**************** Exception in EventService -> getById()", e);
            commonResponse.setStatus(false);
            commonResponse.setErrorMessages(Collections.singletonList("An error occurred while fetching Event by Id."));
        }

        return commonResponse;
    }


    @Override
    public void updateJobStatus(Long id, String statusStr) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Long uId = Long.valueOf(event.getUplodetBy());
        User user = userRepository.findById(uId)
                .orElseThrow(() -> new RuntimeException("User not found"));


        try {
            if (statusStr.equals(JobStatus.ACCEPTED.toString())) {
                event.setJobStatus(JobStatus.ACCEPTED);
                String email = user.getEmail();  // or wherever you store user email
                emailService.sendApprovalEmail(
                        email,
                        "Approval Notification",
                        "Dear " + user.getUsername() + ", your request has been approved."
                );
                eventRepository.save(event);
            } else {
                event.setJobStatus(JobStatus.REJECTED);
                String email = user.getEmail();  // or wherever you store user email
                emailService.sendApprovalEmail(
                        email,
                        "Rejected Notification",
                        "Dear " + user.getUsername() + ", your request has been rejected."
                );
                eventRepository.save(event);
            }
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid job status: " + statusStr);
        }
    }


    @Override
    public CommonResponse getEventsForCompeny(String compenyId) {
        CommonResponse commonResponse = new CommonResponse();
        List<EventDTO> eventDTOS;

        try {
            Predicate<Event> filterByCompeny = event ->
                    compenyId.equals(event.getUplodetBy());
//                            event.getJobStatus() != JobStatus.PENDING &&
//                            event.getJobStatus() != JobStatus.REJECTED;

            eventDTOS = eventRepository.findAll()
                    .stream()
                    .filter(filterByCompeny)
                    .map(this::castEventIntoEventDTO)
                    .collect(Collectors.toList());

            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(eventDTOS));
        } catch (Exception e) {
            LOGGER.error("Exception in getEventsForCompeny: " + e.getMessage());
            commonResponse.setStatus(false);
            commonResponse.setMessage("Error fetching events");
        }

        return commonResponse;
    }

    @Override
    public CommonResponse getDeatails(Long userId) {
        CommonResponse response = new CommonResponse();

// Native query returns a list of Object[] rows
        List<Object[]> rows = eventRepository.findEventsByUserAndEvent(userId);

// Convert each row into DTO with safe type casting
        List<EventJobRequestDto> dtos = rows.stream().map(row -> {
            Object rawEventId = row[0];
            Long eventId;

            if (rawEventId instanceof Number) {
                eventId = ((Number) rawEventId).longValue();
            } else if (rawEventId instanceof String) {
                eventId = Long.parseLong((String) rawEventId);
            } else {
                throw new IllegalArgumentException("Unknown type for event_id: " + rawEventId.getClass());
            }

            return new EventJobRequestDto(
                    eventId,
                    (String) row[1],    // title
                    (String) row[2],    // image_url
                    (String) row[3]     // username
            );
        }).toList();


// Optionally add the result to your CommonResponse
        response.setPayload(Collections.singletonList(dtos));
        response.setMessage("Success");
        response.setStatus(true);

        return response;

    }

    @Override
    public CommonResponse getAllDeatails() {
        CommonResponse response = new CommonResponse();

// Native query returns a list of Object[] rows
        List<Object[]> rows = eventRepository.findAllEvents();

// Convert each row into DTO with safe type casting
        List<EventJobRequestDto> dtos = rows.stream().map(row -> {
            Object rawEventId = row[0];
            Long eventId;

            if (rawEventId instanceof Number) {
                eventId = ((Number) rawEventId).longValue();
            } else if (rawEventId instanceof String) {
                eventId = Long.parseLong((String) rawEventId);
            } else {
                throw new IllegalArgumentException("Unknown type for event_id: " + rawEventId.getClass());
            }

            return new EventJobRequestDto(
                    eventId,
                    (String) row[1],    // title
                    (String) row[2],    // image_url
                    (String) row[3]     // username
            );
        }).toList();


// Optionally add the result to your CommonResponse
        response.setPayload(Collections.singletonList(dtos));
        response.setMessage("Success");
        response.setStatus(true);

        return response;

    }

    @Override
    public CommonResponse getEventCount(Long user_id) {

        List<Object[]> rows = eventRepository.getCountAll(user_id);

        long totalCount = rows.stream()
                .map(row -> {
                    Object rawCount = row[0];  // ✅ Correct index: 0
                    if (rawCount instanceof Number) {
                        return ((Number) rawCount).longValue();
                    } else if (rawCount instanceof String) {
                        return Long.parseLong((String) rawCount);
                    } else {
                        throw new IllegalArgumentException("Unknown count type: " + rawCount.getClass());
                    }
                })
                .reduce(0L, Long::sum);

        CommonResponse response = new CommonResponse();
        response.setPayload(Collections.singletonList(totalCount));
        response.setMessage("Success");
        response.setStatus(true);

        return response;

    }

    @Override
    public CommonResponse getJobRequestCount(Long userId) {
        List<Object[]> rows = eventRepository.getJobRequestCount(userId);

        long totalCount = rows.stream()
                .map(row -> {
                    Object rawCount = row[0];  // ✅ Correct index: 0
                    if (rawCount instanceof Number) {
                        return ((Number) rawCount).longValue();
                    } else if (rawCount instanceof String) {
                        return Long.parseLong((String) rawCount);
                    } else {
                        throw new IllegalArgumentException("Unknown count type: " + rawCount.getClass());
                    }
                })
                .reduce(0L, Long::sum);

        CommonResponse response = new CommonResponse();
        response.setPayload(Collections.singletonList(totalCount));
        response.setMessage("Success");
        response.setStatus(true);

        return response;

    }

    @Override
    public CommonResponse getApproedCount(Long userId) {
        List<Object[]> rows = eventRepository.getApproedCount(userId);

        long totalCount = rows.stream()
                .map(row -> {
                    Object rawCount = row[0];  // ✅ Correct index: 0
                    if (rawCount instanceof Number) {
                        return ((Number) rawCount).longValue();
                    } else if (rawCount instanceof String) {
                        return Long.parseLong((String) rawCount);
                    } else {
                        throw new IllegalArgumentException("Unknown count type: " + rawCount.getClass());
                    }
                })
                .reduce(0L, Long::sum);

        CommonResponse response = new CommonResponse();
        response.setPayload(Collections.singletonList(totalCount));
        response.setMessage("Success");
        response.setStatus(true);

        return response;

    }

}
