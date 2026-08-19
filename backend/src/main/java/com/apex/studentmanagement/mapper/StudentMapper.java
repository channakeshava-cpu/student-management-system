package com.apex.studentmanagement.mapper;

import com.apex.studentmanagement.dto.StudentRequestDTO;
import com.apex.studentmanagement.dto.StudentResponseDTO;
import com.apex.studentmanagement.entity.Student;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {
    public Student toEntity(StudentRequestDTO dto){
       Student student = new Student();

       student.setName(dto.getName());
       student.setEmail(dto.getEmail());
       student.setDepartment(dto.getDepartment());
       student.setCgpa(dto.getCgpa());
       student.setPhone(dto.getPhone());

       return student;
    }

    public StudentResponseDTO toResponseDTO(Student student){
        StudentResponseDTO dto = new StudentResponseDTO();

        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setDepartment(student.getDepartment());
        dto.setCgpa(student.getCgpa());
        dto.setPhone(student.getPhone());
        dto.setCreatedAt(student.getCreatedAt());
        dto.setUpdatedAt(student.getUpdatedAt());

        return dto;
    }


}
