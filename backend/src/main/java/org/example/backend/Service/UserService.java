package org.example.backend.Service;

import org.example.backend.DTO.UserDTO;
import org.example.backend.Utils.CommonResponse;

public interface UserService {

    CommonResponse saveUser(UserDTO userDTO);

    CommonResponse updateUser(UserDTO userDTO);

    CommonResponse getAll();

    CommonResponse deletePlayerById(String id);

    CommonResponse getById(Long id);
}
