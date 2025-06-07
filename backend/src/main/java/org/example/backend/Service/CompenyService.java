package org.example.backend.Service;

import org.example.backend.DTO.CompenyDTO;
import org.example.backend.DTO.UserDTO;
import org.example.backend.Utils.CommonResponse;

public interface CompenyService {

    CommonResponse saveCompeny(CompenyDTO compenyDTO);

    CommonResponse updateCompeny(Long id ,CompenyDTO compenyDTO);

    CommonResponse getAll();

    CommonResponse deletePlayerById(String id);

    CommonResponse getById(Long id);
}
