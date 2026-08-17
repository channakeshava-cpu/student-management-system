package com.apex.studentmanagement.service;

import java.util.*;

import com.apex.studentmanagement.dto.PageResponseDTO;
import com.apex.studentmanagement.dto.StudentResponseDTO;
import com.apex.studentmanagement.dto.StudentRequestDTO;
import com.apex.studentmanagement.entity.Student;
import com.apex.studentmanagement.exception.DuplicateEmailException;
import com.apex.studentmanagement.exception.StudentNotFoundException;
import com.apex.studentmanagement.mapper.StudentMapper;
import com.apex.studentmanagement.repository.StudentRepository;
import com.apex.studentmanagement.repository.StudentSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;



@Service
public class StudentService {
    private final StudentMapper studentMapper;
    private final StudentRepository studentRepository;
    public StudentService(
            StudentRepository studentRepository,StudentMapper studentMapper){
        this.studentRepository=studentRepository;
        this.studentMapper =studentMapper;
    }

    public StudentResponseDTO createStudent(StudentRequestDTO dto){
        if(studentRepository.existsByEmail(dto.getEmail())){
            throw new DuplicateEmailException(
            "Student with email "+dto.getEmail()+" already exists"
            );
        }
       Student student =studentMapper.toEntity(dto);
       Student savedStudent =studentRepository.save(student);
       return studentMapper.toResponseDTO(savedStudent);
    }
    public PageResponseDTO<StudentResponseDTO> getAllStudents(Pageable pageable){

        Page<StudentResponseDTO> page =
                studentRepository.findAll(pageable)
                        .map(studentMapper::toResponseDTO);

        return new PageResponseDTO<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
    public StudentResponseDTO getStudentById(Long id) {

        Student student =studentRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException(
                                "Student with ID " + id + " not found"));
        return studentMapper.toResponseDTO(student);
    }
    public StudentResponseDTO updateStudent(Long id,StudentRequestDTO dto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Student with ID"+id+" not found"));
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setDepartment(dto.getDepartment());
        student.setCgpa(dto.getCgpa());
        student.setPhone(dto.getPhone());

        Student updateStudent=studentRepository.save(student);

        return studentMapper.toResponseDTO(updateStudent);

    }

    public void deleteStudent(Long id){
        Student student =studentRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Student with ID"+id+" not found"));
        studentRepository.delete(student);
    }

    public List<StudentResponseDTO> searchByName(String name){
        return studentRepository
                .findByNameContainingIgnoreCase(name)
                .stream()
                .map(studentMapper::toResponseDTO)
                .toList();
    }

    public List<StudentResponseDTO> searchByDepartment(
            String department){
        return studentRepository
                .findByDepartmentIgnoreCase(department)
                .stream()
                .map(studentMapper::toResponseDTO)
                .toList();
    }
    public List<StudentResponseDTO> searchByCgpa(Double cgpa){
        return studentRepository
                .findByCgpa(cgpa)
                .stream()
                .map(studentMapper::toResponseDTO)
                .toList();
    }

    public PageResponseDTO<StudentResponseDTO> searchStudents(
            String name,
            String department,
            Double minCgpa,
            Pageable pageable){
        Specification<Student> specification=null;
        if(name !=null && !name.isBlank()){
            specification=
                    StudentSpecification.nameContains(name);

        }
        if(department !=null && !department.isBlank()){
            Specification<Student> departmentSpec=
                    StudentSpecification.departmentEquals(department);

            specification = specification==null
                    ? departmentSpec
                    : specification.and(departmentSpec);
        }

        if(minCgpa !=null){
            Specification<Student> cgpaSpec =
                    StudentSpecification
                            .cgpaGreaterThanOrEqual(minCgpa);
            specification = specification == null
                    ? cgpaSpec
                    : specification.and(cgpaSpec);
        }

        Page<StudentResponseDTO> page =
                studentRepository
                        .findAll(specification,pageable)
                        .map(studentMapper::toResponseDTO);

        return new PageResponseDTO<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }

}
