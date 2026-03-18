package com.klu.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.klu.model.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(StudentNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorResponse handleStudentNotFound(StudentNotFoundException ex) {

	    return new ErrorResponse(
	            LocalDateTime.now(),
	            ex.getMessage(),
	            HttpStatus.NOT_FOUND.value()
	    );
  }
}