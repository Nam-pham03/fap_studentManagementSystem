package com.fpt.fap.module.auth.controller;


import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/fap")
@CrossOrigin(origins = "http://localhost:3000")
public class LogOutController {

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> requestBody, HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        if (session != null) {
            session.invalidate();
        }



        responseMap.put("message", "Log out successful");

        return ResponseEntity.ok(responseMap);
    }

}
