package com.fpt.fap.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public class InvalidInputException extends RuntimeException {
    private final HttpStatus status;
    private final String path;

    public InvalidInputException(String message, String path) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
        this.path = path;
    }
}
