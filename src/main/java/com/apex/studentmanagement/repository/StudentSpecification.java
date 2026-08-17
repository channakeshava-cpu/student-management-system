package com.apex.studentmanagement.repository;

import com.apex.studentmanagement.entity.Student;
import org.springframework.data.jpa.domain.Specification;

public class StudentSpecification {
    public static Specification<Student> nameContains(String name){
        return (root,query,criteriaBuilder)->
                criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("name")),
                        "%"+name.toLowerCase()+"%"
                );
    }

    public static Specification<Student> departmentEquals(
            String department){
        return (root,query,criteriaBuilder)->
                criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get("department")),
                        department.toLowerCase()
                );
    }

    public static Specification<Student> cgpaGreaterThanOrEqual(
            Double minCgpa){
        return (root,query,criteriaBuilder)->
                criteriaBuilder.greaterThanOrEqualTo(
                        root.get("cgpa"),
                        minCgpa
                );
    }

   
}
