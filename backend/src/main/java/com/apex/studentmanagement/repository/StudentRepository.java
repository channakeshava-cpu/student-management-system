package com.apex.studentmanagement.repository;


import com.apex.studentmanagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository
        extends JpaRepository<Student,Long>, JpaSpecificationExecutor<Student> {

  boolean existsByEmail(String email);

  List<Student> findByNameContainingIgnoreCase(String name);
  List<Student> findByDepartmentIgnoreCase(String department);
  List<Student> findByCgpa(Double cgpa);
}
