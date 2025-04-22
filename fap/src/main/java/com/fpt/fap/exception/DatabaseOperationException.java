package com.fpt.fap.exception;


import lombok.Getter;
import org.springframework.http.HttpStatus;

public class DatabaseOperationException extends RuntimeException {
    private final HttpStatus status ;
    private final String path;

    public DatabaseOperationException(String message, String path) {
        super(message);
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.path = path;
    }


}