package com.fpt.fap.entity;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString

@Entity
@Table(name = "Account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int account_id;


    private String email;
    private String password;

    @Column(unique = true, nullable = false)
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
    private String token;
    private String img;
}
