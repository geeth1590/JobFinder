package org.example.backend.ServiceImpl;

import org.apache.logging.log4j.Logger;
import org.example.backend.Constant.CommonMsg;
import org.example.backend.Constant.CommonStatus;
import org.example.backend.DTO.CompenyDTO;
import org.example.backend.DTO.EventDTO;
import org.example.backend.DTO.UserDTO;
import org.example.backend.Model.Auth.Compeny;
import org.example.backend.Model.Event;
import org.example.backend.Repository.CompenyRepository;
import org.example.backend.Repository.EventRepository;
import org.example.backend.Service.CompenyService;
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
public class CompenyServiceImpl implements CompenyService {

    private final Logger LOGGER =getLogger(EventService.class);
    @Autowired
    CompenyRepository compenyRepository;

    private List<String> validationCompenyDTO(CompenyDTO compenyDTO) {
        List<String>validatiion=new ArrayList<>();
        if (compenyDTO == null){
            validatiion.add(CommonMsg.CHECK_INPUT_DATA);
//        } else if (C) {
//
        }
        return validatiion;
    }

    @Override
    public CommonResponse saveCompeny(CompenyDTO compenyDTO) {
        CommonResponse commonResponse = new CommonResponse();


        try {
            List<String> validation = validationCompenyDTO(compenyDTO);
            if (!CollectionUtils.isEmpty(validation)){
                commonResponse.setErrorMessages(validation);
                return commonResponse;
            }
            Compeny compeny =castCompenyDTOintoCompeny(compenyDTO);
            compenyRepository.save(compeny);
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(compenyDTO));
        }
        catch (Exception e)
        {
            LOGGER.error("/**************** Exception in EventService -> saveEvent" + e);
        }
        return commonResponse;
    }



    @Override
    public CommonResponse updateCompeny(Long id ,CompenyDTO compenyDTO) {
        CommonResponse commonResponse = new CommonResponse();
//        Compeny compeny;
        try {
            List<String> validation = validationCompenyDTO(compenyDTO);
            if (!CollectionUtils.isEmpty(validation)) {
                commonResponse.setErrorMessages(validation);
                return commonResponse;
            }
            Optional<Compeny> optionalCompeny = compenyRepository.findById(id);

            optionalCompeny.ifPresent(compeny -> {
                compeny.setCompenyName(compenyDTO.getCompenyName());
                compeny.setAdress(compenyDTO.getAdress());
                compeny.setPhoneNumber(compenyDTO.getPhoneNumber());
                compeny.setUsername(compenyDTO.getUsername());

                compeny.setCommonStatus(CommonStatus.ACTIVE);
                compenyRepository.save(compeny); // Don't forget to save
            });

                commonResponse.setStatus(true);
                commonResponse.setPayload(Collections.singletonList(compenyDTO));


        }catch (Exception e){
            LOGGER.error("/**************** Exception in EventService -> UpdateEvent()" + e);
        }
        return commonResponse;
    }

    @Override
    public CommonResponse getAll() {

        CommonResponse commonResponse=new CommonResponse();
        List<CompenyDTO> compenyDTOS;
        try {
            Predicate<Compeny> filterOnStatus = player -> player.getCommonStatus() != CommonStatus.DELETED;
            compenyDTOS = compenyRepository.findAll()
                    .stream()
//                    .filter(filterOnStatus)
                    .filter(filterOnStatus)
                    .map(this::castCompenyintoCompenyDTO)
                    .collect(Collectors.toList());
            commonResponse.setStatus(true);
            commonResponse.setPayload(Collections.singletonList(compenyDTOS));

        } catch (Exception e) {
            LOGGER.error("/**************** Exception in EventService -> getAll()" + e);
        }
        return commonResponse;
    }

    @Override
    public CommonResponse deletePlayerById(String id) {
        CommonResponse commonResponse = new CommonResponse();

        try {
            if (compenyRepository.existsById(Long.valueOf(id))) {
                Compeny compeny = compenyRepository.getById(Long.parseLong(id));
                compeny.setCommonStatus(CommonStatus.DELETED);
                compenyRepository.save(compeny);

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
        return null;
    }

    private Compeny castCompenyDTOintoCompeny(CompenyDTO compenyDTO) {

        Compeny compeny = new Compeny();
        compeny.setCompenyName(compenyDTO.getCompenyName());
        compeny.setPhoneNumber(compenyDTO.getPhoneNumber());
        compeny.setEmail(compenyDTO.getEmail());
        compeny.setUsername(compenyDTO.getUsername());
        compeny.setAdress(compenyDTO.getAdress());

        return compeny;

    }

    private CompenyDTO castCompenyintoCompenyDTO(Compeny compeny) {
        CompenyDTO compenyDTO = new CompenyDTO();
        compenyDTO.setId(compeny.getId());
        compenyDTO.setCompenyName(compeny.getCompenyName());
        compenyDTO.setPhoneNumber(compeny.getPhoneNumber());
        compenyDTO.setEmail(compeny.getEmail());
        compenyDTO.setUsername(compeny.getUsername());
        compenyDTO.setAdress(compeny.getAdress());

        return compenyDTO;

    }
}
