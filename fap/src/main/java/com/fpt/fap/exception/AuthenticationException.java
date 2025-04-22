package com.fpt.fap.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public class AuthenticationException extends RuntimeException {
    private final HttpStatus status;
    private final String path;

    public AuthenticationException(String message, String path) {
        super(message);
        this.status = HttpStatus.UNAUTHORIZED;
        this.path = path;
    }
}
