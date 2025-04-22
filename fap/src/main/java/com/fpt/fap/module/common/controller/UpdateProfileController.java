package com.fpt.fap.module.common.controller;

import com.fpt.fap.constant.ValidationConstant;
import com.fpt.fap.exception.DatabaseOperationException;
import com.fpt.fap.exception.InvalidInputException;
import com.fpt.fap.module.common.service.UpdateProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fpt.fap.dto.AccountDTO;


import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

@RestController
@RequestMapping("/fap")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UpdateProfileController {
    @Autowired
    private UpdateProfileService updateProfileService;



    @PostMapping("/update-user-profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody Map<String, String> requestBody, HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        String email = requestBody.get("email");
        String firstName = requestBody.get("firstName");
        String lastName = requestBody.get("lastName");
        String name = (firstName + " " + lastName).trim();
        Date dob = Date.valueOf(requestBody.get("dob")) ;
        String phone = requestBody.get("phone");
        String ethnicity = requestBody.get("ethnicity");
        String nationality = requestBody.get("nationality");
        String placeBirth = requestBody.get("placeBirth");
        String addressCurrent = requestBody.get("addressCurrent");
        String idNumber = requestBody.get("idNumber");
        int gender = Integer.parseInt(requestBody.get("gender"));


        AccountDTO acc = (AccountDTO) session.getAttribute("LOGIN_USER");

        if (Stream.of(name, ethnicity, email, phone, nationality, placeBirth, addressCurrent, idNumber)
                .anyMatch(s -> s == null || s.trim().isEmpty())) {
            throw new InvalidInputException("Fields must not be empty", "/fap/SysAdmin/Profile");
        }

        if (!phone.matches(ValidationConstant.PHONE_CHECK)
                || !email.matches(ValidationConstant.EMAIL_CHECK)
                || !idNumber.matches(ValidationConstant.ID_NUMBER_CHECK)) {
            throw new InvalidInputException("Invalid format in phone/email/idNumber", "/fap/SysAdmin/Profile");
        }


        acc.setEmail(email);
        acc.setFull_name(name);
        acc.setPhone(phone);
        acc.setDob(dob);
        acc.setPlace_birth(placeBirth);
        acc.setId_number(idNumber);
        acc.setAddress_current(addressCurrent);
        acc.setNationality(nationality);
        acc.setEthnicity(ethnicity);
        acc.setGender(gender);


        boolean checkUpdateProfile = updateProfileService.UpdateProfile(acc);

        if (!checkUpdateProfile) {
            throw new DatabaseOperationException("Update Profile failed: unable to update profile in database.", "/fap/SysAdmin/Profile");
        }

        session.setAttribute("LOGIN_USER", acc);
        responseMap.put("message", "Update successful");
        session.setAttribute("destPage", "Profile");
        responseMap.put("redirect", "/fap/SysAdmin/Profile");
        return ResponseEntity.ok(responseMap);

    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/upload-profile-image")
    public ResponseEntity<?> uploadProfileImage(@RequestParam("file") MultipartFile file, HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        AccountDTO acc = (AccountDTO) session.getAttribute("LOGIN_USER");

        if (file.isEmpty()) {
            throw new InvalidInputException("File must not be empty", "/fap/SysAdmin/Profile");
        }

        try {
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdirs();
            }

            String originalFileName = file.getOriginalFilename();
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            String newFileName = acc.getFe_id() + "_" + System.currentTimeMillis() + fileExtension;
            String filePath = uploadDir + newFileName;

            File destFile = new File(filePath);
            file.transferTo(destFile);

            acc.setImg("/uploads/" + newFileName);
            boolean uploadSuccess = updateProfileService.UpLoadImgProfile(acc);
            if (!uploadSuccess) {
                throw new DatabaseOperationException("Profile update failed: Unable to update image path in the database.", "/fap/SysAdmin/Profile");
            }

            session.setAttribute("LOGIN_USER", acc);
            responseMap.put("message", "File uploaded successfully");
            session.setAttribute("destPage", "Profile");
            responseMap.put("redirect", "/fap/SysAdmin/Profile");

            return ResponseEntity.ok(responseMap);

        } catch (IOException e) {
            throw new DatabaseOperationException("File upload failed: " + e.getMessage(), "/fap/SysAdmin/Profile");
        }
    }



}
