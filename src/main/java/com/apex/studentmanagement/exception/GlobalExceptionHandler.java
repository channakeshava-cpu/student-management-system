package com.apex.studentmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.validation.FieldError;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleStudentNotFound(
            StudentNotFoundException ex) {

        Map<String, Object> error = new LinkedHashMap<>();

        error.put("timestamp", LocalDateTime.now());
        error.put("status", HttpStatus.NOT_FOUND.value());
        error.put("error", "Not Found");
        error.put("message", ex.getMessage());

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,Object>> handleValidationException(
            MethodArgumentNotValidException ex){
        Map<String,String> errors =new LinkedHashMap<>();
        ex.getBindingResult()
                .getAllErrors()
                .forEach(error -> {
                    String field=
                            ((FieldError) error).getField();
                    String message =
                            error.getDefaultMessage();
                    errors.put(field,message);
                });
        Map<String,Object> response = new LinkedHashMap<>();

        response.put("timestamp",LocalDateTime.now());
        response.put("status",HttpStatus.BAD_REQUEST.value());
        response.put("errors",errors);

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<Map<String,Object>> handleDuplicateEmail(
            DuplicateEmailException ex){
        Map<String, Object> response = new LinkedHashMap<>();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.CONFLICT.value());
        response.put("error", "Conflict");
        response.put("message", ex.getMessage());

        return new ResponseEntity<>(
                response,
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidCredentials(
            InvalidCredentialsException ex){

        Map<String,Object> response = new LinkedHashMap<>();

        response.put("timestamp",LocalDateTime.now());
        response.put("status",HttpStatus.UNAUTHORIZED.value());
        response.put("error","Unauthorized");
        response.put("message",ex.getMessage());

        return new ResponseEntity<>(response,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<Map<String,Object>> handleDuplicateUser(
            DuplicateUserException ex){
        Map<String,Object> response = new LinkedHashMap<>();

        response.put("timestamp",LocalDateTime.now());
        response.put("status",HttpStatus.CONFLICT.value());
        response.put("error","Conflict");
        response.put("message",ex.getMessage());

        return new ResponseEntity<>(response,HttpStatus.CONFLICT);
    }
    
}