package com.apex.studentmanagement.dto;

import java.time.LocalDateTime;

public class ErrorResponse {

    private LocalDateTime timestamp;

    private int status;

    private String error;

    private String message;

    private String path;
}
