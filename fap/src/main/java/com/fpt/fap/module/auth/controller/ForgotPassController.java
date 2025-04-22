package com.fpt.fap.module.auth.controller;

import com.fpt.fap.module.auth.service.ForgotPassService;
import com.fpt.fap.utils.Email;
import com.fpt.fap.dto.AccountDTO;
import com.fpt.fap.exception.AccessDeniedException;
import com.fpt.fap.exception.InvalidInputException;
import com.fpt.fap.exception.DatabaseOperationException;
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
@CrossOrigin(origins = "http://localhost:3000")
public class ForgotPassController {
    @Autowired
    private ForgotPassService forgotPassService;




    @PostMapping("/forgot-pass")
    public ResponseEntity<?> forgot_pass(@RequestBody Map<String, String> requestBody, HttpSession session) {
        String feId = requestBody.get("feId");

        AccountDTO accountDTO = forgotPassService.getAccountByEmailOrFeId(feId);
        if (accountDTO == null) {
            throw new AccessDeniedException("Email or Fe_id isn't registered.", "/fap/forgot-pass");
        }

        Email emailSender = new Email();
        String OTP = emailSender.generateRandomOTP(6);


        session.setAttribute("generatedOTP", OTP);
        session.setAttribute("accountID", accountDTO.getAccount_id());
        session.setAttribute("otpTimestamp", System.currentTimeMillis());

        boolean emailSent = emailSender.sendEmail(accountDTO.getEmail(),
                "[FAP] YOUR OTP",
                "<html><body>"
                        + "<p>Dear " + accountDTO.getFull_name() + ",</p>"
                        + "<p>Your OTP is: <strong>" + OTP + "</strong></p>"
                        + "<p>This OTP will expire in 60 seconds.</p>"
                        + "<p>Thank you for using our services.</p>"
                        + "<p>Best regards,<br/>FPT DriveSign.</p>"
                        + "</body></html>");

        Map<String, Object> responseMap = new HashMap<>();
        if (!emailSent) {
            throw new RuntimeException("Failed to send email!");
        }

        responseMap.put("message", "Send OTP successful");
        session.setAttribute("destPage", "checkOtp");
        responseMap.put("redirect", "/fap/CheckOtp");

        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/check-otp")
    public ResponseEntity<?> check_otp(@RequestBody Map<String, String> requestBody, HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        String OTP = requestBody.get("OTP");
        String storedOTP = (String) session.getAttribute("generatedOTP");
        Long otpTimestamp = (Long) session.getAttribute("otpTimestamp");


        if (otpTimestamp == null || (System.currentTimeMillis() - otpTimestamp) > 60_000) {
            session.removeAttribute("generatedOTP");
            session.removeAttribute("otpTimestamp");
            throw new InvalidInputException("OTP has expired. Please resend a new OTP.", "/fap/check-otp");
        }

        if (!OTP.equals(storedOTP)) {
            throw new InvalidInputException("Invalid OTP", "/fap/check-otp");
        }

        session.removeAttribute("generatedOTP");
        session.removeAttribute("otpTimestamp");
        responseMap.put("message", "Check OTP successful");
        session.setAttribute("destPage", "ResetPass");
        responseMap.put("redirect", "/fap/ResetPass");

        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<?> resend_otp(HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        session.removeAttribute("generatedOTP");
        session.removeAttribute("otpTimestamp");

        Integer accountID = (Integer) session.getAttribute("accountID");
        if (accountID == null) {
            throw new InvalidInputException("Session expired or invalid account ID", "/fap/resend-otp");
        }

        AccountDTO accountDTO = forgotPassService.getAccountByAccountId(accountID);
        if (accountDTO == null) {
            throw new AccessDeniedException("Account not found.", "/fap/resend-otp");
        }

        Email emailSender = new Email();
        String OTP = emailSender.generateRandomOTP(6);
        session.setAttribute("generatedOTP", OTP);
        session.setAttribute("accountID", accountDTO.getAccount_id());
        session.setAttribute("otpTimestamp", System.currentTimeMillis());

        boolean emailSent = emailSender.sendEmail(accountDTO.getEmail(),
                "[FAP] YOUR OTP",
                "<html><body>"
                        + "<p>Dear " + accountDTO.getFull_name() + ",</p>"
                        + "<p>Your OTP is: <strong>" + OTP + "</strong></p>"
                        + "<p>This OTP will expire in 60 seconds.</p>"
                        + "<p>Thank you for using our services.</p>"
                        + "<p>Best regards,<br/>FPT DriveSign.</p>"
                        + "</body></html>");

        if (!emailSent) {
            throw new RuntimeException("Failed to send email!");
        }

        responseMap.put("message", "Send OTP successful");
        session.setAttribute("destPage", "checkOtp");
        responseMap.put("redirect", "/fap/CheckOtp");

        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/reset-pass")
    public ResponseEntity<?> reset_pass(@RequestBody Map<String, String> requestBody, HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        String old = requestBody.get("old");
        String current = requestBody.get("current");
        String confirm = requestBody.get("confirm");
        Integer accountID = (Integer) session.getAttribute("accountID");

        if (accountID == null) {
            throw new InvalidInputException("Session expired or invalid account ID", "/fap/reset-pass");
        }

        if (!Validation.checkPassword(old) ||
                !Validation.checkPassword(current) ||
                !Validation.checkPassword(confirm)) {
            throw new InvalidInputException("Password must be at least 6 characters and not contain consecutive spaces.", "/fap/reset_pass");
        }

        if (!current.equals(confirm)) {
            throw new InvalidInputException("New password and confirm password must match.", "/fap/reset-pass");
        }

        String hashedOld = SecurityUtils.hashMd5(old);
        AccountDTO accountDTO = forgotPassService.getAccountByAccountIdAndPassword(accountID, hashedOld);

        if (accountDTO == null) {
            throw new AccessDeniedException("Account not found or old password is incorrect.", "/fap/reset-pass");
        }

        String hashedCurrent = SecurityUtils.hashMd5(current);
        boolean checkResetPass = forgotPassService.ResetPass(accountDTO.getAccount_id(), hashedCurrent);

        if (!checkResetPass) {
            throw new DatabaseOperationException("Reset password failed: unable to update password in database.", "/fap/reset-pass");
        }

        session.removeAttribute("accountID");
        responseMap.put("message", "Reset Password successful");
        session.setAttribute("destPage", "Login");
        responseMap.put("redirect", "/fap");

        return ResponseEntity.ok(responseMap);
    }
}