package org.example.backend.Utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class  CommonResponse {
    private List<Object> payload = null;
    private String message;
    private List<String> errorMessages = new ArrayList<>();
    private boolean status = false;


}
