package com.apex.studentmanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class StudentRequestDTO {

    @NotBlank(message="Name cannot be empty")
    private String name;

    @Email(message="Enter a valid Email")
    @NotBlank(message="Email cannot be empty")
    private String email;

    @NotBlank(message="Department cannot be empty")
    private String department;

    @NotNull(message="CGPA is required")
    @Min(value=0,message="CGPA cannot be less than 0")
    @Max(value=10,message="CGPA cannot be greater then 10")
    private Double cgpa;

    @NotBlank(message ="phone cannot be empty")
    private String phone;

}
