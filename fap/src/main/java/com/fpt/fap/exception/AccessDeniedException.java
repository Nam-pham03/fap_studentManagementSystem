package com.fpt.fap.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public class AccessDeniedException extends RuntimeException {
    private final HttpStatus status;
    private final String path;

    public AccessDeniedException(String message, String path) {
        super(message);
        this.status = HttpStatus.FORBIDDEN;
        this.path = path;
    }
}
