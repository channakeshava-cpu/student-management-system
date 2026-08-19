package com.apex.studentmanagement.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponseDTO {

    private Long id;

    private String name;

    private String email;

    private String department;

    private Double cgpa;

    private String phone;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
