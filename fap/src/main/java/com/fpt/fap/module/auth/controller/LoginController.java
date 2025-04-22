package com.fpt.fap.module.auth.controller;


import com.fpt.fap.module.auth.service.LoginService;
import com.fpt.fap.utils.SecurityUtils;
import com.fpt.fap.dto.AccountDTO;
import com.fpt.fap.exception.AuthenticationException;
import com.fpt.fap.exception.AccessDeniedException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/fap")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginController {
    @Autowired
    private  LoginService loginService;



    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> requestBody, HttpSession session) {
        String email = requestBody.get("email");


        AccountDTO accountDTO = loginService.getAccountByEmail(email);
        if (accountDTO == null) {
            throw new AccessDeniedException("Your account is not allowed to log into the system.", "/fap/google-login");
        }

        if (accountDTO.getStatus() == 0) {
            throw new AccessDeniedException("Your account has been locked! Please contact admin.", "/fap/google-login");
        }

        session.setAttribute("LOGIN_USER", accountDTO);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "Google login successful");
        responseMap.put("role", accountDTO.getRole_id());


        switch (accountDTO.getRole_id()) {
            case 1:
                session.setAttribute("destPage", "Sys_admin");
                responseMap.put("redirect", "/fap/SysAdmin");
                break;
        }

        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> requestBody, HttpSession session) {
        String email = requestBody.get("email");
        String password = requestBody.get("password");



        String hashedPassword = SecurityUtils.hashMd5(password);
        AccountDTO accountDTO = loginService.getAccount(email, hashedPassword);

        if (accountDTO == null) {
            throw new AuthenticationException("Incorrect email or password!", "/fap/login");
        }

        if (accountDTO.getStatus() == 0) {
            throw new AccessDeniedException("Your account has been locked! Please contact admin.", "/fap/login");
        }

        session.setAttribute("LOGIN_USER", accountDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("role", accountDTO.getRole_id());

        switch (accountDTO.getRole_id()) {
            case 1:
                session.setAttribute("destPage", "Sys_admin");
                response.put("redirect", "/fap/SysAdmin");
                break;
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/feid-login")
    public ResponseEntity<?> feidLogin(@RequestBody Map<String, String> requestBody, HttpSession session) {
        String feId = requestBody.get("feId");
        String password = requestBody.get("password");



        String hashedPassword = SecurityUtils.hashMd5(password);
        AccountDTO accountDTO = loginService.getAccountByFeidId(feId, hashedPassword);

        if (accountDTO == null) {
            throw new AuthenticationException("Incorrect FeID or password!", "/fap/feid-login");
        }

        if (accountDTO.getStatus() == 0) {
            throw new AccessDeniedException("Your account has been locked! Please contact admin.", "/fap/feid-login");
        }

        session.setAttribute("LOGIN_USER", accountDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "FeID login successful");
        response.put("role", accountDTO.getRole_id());

        switch (accountDTO.getRole_id()) {
            case 1:
                session.setAttribute("destPage", "Sys_admin");
                response.put("redirect", "/fap/SysAdmin");
                break;
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(HttpSession session) {
        AccountDTO accountDTO = (AccountDTO) session.getAttribute("LOGIN_USER");

        if (accountDTO == null) {
            throw new AuthenticationException("Không có người dùng nào đăng nhập!", "/user-info");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("accountId", accountDTO.getAccount_id());
        response.put("email", accountDTO.getEmail());
        response.put("feId", accountDTO.getFe_id());
        response.put("name", accountDTO.getFull_name());
        response.put("phone", accountDTO.getPhone());
        response.put("dob", accountDTO.getDob());
        response.put("placeBirth", accountDTO.getPlace_birth());
        response.put("idNumber", accountDTO.getId_number());
        response.put("gender", accountDTO.getGender());
        response.put("address", accountDTO.getAddress());
        response.put("addressCurrent", accountDTO.getAddress_current());
        response.put("nationality", accountDTO.getNationality());
        response.put("ethnicity", accountDTO.getEthnicity());
        response.put("status", accountDTO.getStatus());
        response.put("role", accountDTO.getRole_id());
//        response.put("img", accountDTO.getImg());

        String imgUrl = accountDTO.getImg();
        if (imgUrl != null && !imgUrl.startsWith("http")) {
            imgUrl = "http://localhost:8080" + imgUrl;
        }
        response.put("img", imgUrl);

        return ResponseEntity.ok(response);
    }
}
