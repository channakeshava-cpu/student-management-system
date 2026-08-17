package com.apex.studentmanagement.controller;
import java.util.List;
import java.util.Optional;

import com.apex.studentmanagement.dto.PageResponseDTO;
import com.apex.studentmanagement.dto.StudentRequestDTO;
import com.apex.studentmanagement.dto.StudentResponseDTO;
import com.apex.studentmanagement.entity.Student;
import com.apex.studentmanagement.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService=studentService;
    }

    @PostMapping("/students")
    public ResponseEntity<StudentResponseDTO> createStudent(@Valid @RequestBody StudentRequestDTO dto){
        StudentResponseDTO response=studentService.createStudent(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/students")
    public PageResponseDTO<StudentResponseDTO> getAllStudents(
            @org.springdoc.core.annotations.ParameterObject Pageable pageable) {

        return studentService.getAllStudents(pageable);
    }

    @GetMapping("/students/{id}")
    public StudentResponseDTO getStudentById(@PathVariable Long id){
        return studentService.getStudentById(id);
    }

    @PutMapping("/students/{id}")
    public StudentResponseDTO updateStudent(
            @PathVariable Long id,
            @Valid@RequestBody StudentRequestDTO dto){
    return studentService.updateStudent(id,dto);
    }

    @DeleteMapping("students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id){
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }



    @GetMapping("/students/search")
    public PageResponseDTO<StudentResponseDTO> searchStudents(

            @RequestParam(required = false)
            String name,

            @RequestParam(required = false)
            String department,

            @RequestParam(required=false)
            Double minCgpa,

            Pageable pageable){
        return studentService.searchStudents(
                name,
                department,
                minCgpa,
                pageable
        );
    }



}
