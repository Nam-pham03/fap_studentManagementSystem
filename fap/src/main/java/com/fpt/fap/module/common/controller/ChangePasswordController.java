package com.fpt.fap.module.common.controller;


import com.fpt.fap.dto.AccountDTO;
import com.fpt.fap.exception.AccessDeniedException;
import com.fpt.fap.exception.DatabaseOperationException;
import com.fpt.fap.exception.InvalidInputException;
import com.fpt.fap.module.auth.service.ForgotPassService;
import com.fpt.fap.utils.SecurityUtils;
import com.fpt.fap.validation.Validation;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/fap")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ChangePasswordController {


    @Autowired
    private ForgotPassService forgotPassService;

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> requestBody, HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();

        String old = requestBody.get("oldPassword");
        String current = requestBody.get("newPassword");
        String confirm = requestBody.get("confirmPassword");

        AccountDTO acc = (AccountDTO) session.getAttribute("LOGIN_USER");

        if ((Integer) acc.getAccount_id() == null) {
            throw new InvalidInputException("Session expired or invalid account ID", "/fap/change-password");
        }

        if (!Validation.checkPassword(old) ||
                !Validation.checkPassword(current) ||
                !Validation.checkPassword(confirm)) {
            throw new InvalidInputException("Password must be at least 6 characters and not contain consecutive spaces.", "/fap/reset_pass");
        }

        if (!current.equals(confirm)) {
            throw new InvalidInputException("New password and confirm password must match.", "/fap/change-password");
        }

        String hashedOld = SecurityUtils.hashMd5(old);
        AccountDTO accountDTO = forgotPassService.getAccountByAccountIdAndPassword(acc.getAccount_id(), hashedOld);

        if (accountDTO == null) {
            throw new AccessDeniedException("Account not found or old password is incorrect.", "/fap/change-password");
        }

        String hashedCurrent = SecurityUtils.hashMd5(current);
        boolean checkResetPass = forgotPassService.ResetPass(accountDTO.getAccount_id(), hashedCurrent);

        if (!checkResetPass) {
            throw new DatabaseOperationException("Change password failed: unable to update password in database.", "/fap/change-password");
        }

        session.removeAttribute("accountID");
        responseMap.put("message", "Change Password successful");
        session.setAttribute("destPage", "Login");
        responseMap.put("redirect", "/fap");

        return ResponseEntity.ok(responseMap);
    }

}
