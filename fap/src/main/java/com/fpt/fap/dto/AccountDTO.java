package com.fpt.fap.dto;

import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AccountDTO {
    private int account_id;
    private String email;
    private String fe_id;
    private String full_name;
    private String phone;
    private Date dob;
    private String place_birth;
    private String id_number;
    private int gender;
    private String address;
    private String address_current;
    private String nationality;
    private String ethnicity;
    private int status;
    private int role_id;
    private String img;
}
