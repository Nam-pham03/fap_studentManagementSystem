package com.fpt.fap.validation;

import com.fpt.fap.constant.ValidationConstant;
import com.fpt.fap.exception.InvalidInputException;

public class Validation {


    public static boolean checkPassword(String password) {
        return password != null && password.matches(ValidationConstant.PASSWORD_CHECK);
    }

}
