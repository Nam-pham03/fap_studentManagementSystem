package com.fpt.fap.module.common.repository;

import com.fpt.fap.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;

@Repository("commonAccountRepository")
public  interface AccountRepository extends JpaRepository<Account, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Account a SET " +
            "a.email = :email, " +
            "a.full_name = :fullName, " +
            "a.phone = :phone, " +
            "a.dob = :dob, " +
            "a.place_birth = :placeBirth, " +
            "a.id_number = :idNumber, " +
            "a.gender = :gender, " +
            "a.address_current = :addressCurrent, " +
            "a.nationality = :nationality, " +
            "a.ethnicity = :ethnicity " +
            "WHERE a.account_id = :accountId")
    int updateProfile(@Param("email") String email,
                      @Param("fullName") String fullName,
                      @Param("phone") String phone,
                      @Param("dob") Date dob,
                      @Param("placeBirth") String placeBirth,
                      @Param("idNumber") String idNumber,
                      @Param("gender") int gender,
                      @Param("addressCurrent") String addressCurrent,
                      @Param("nationality") String nationality,
                      @Param("ethnicity") String ethnicity,
                      @Param("accountId") int accountId);


    @Modifying
    @Transactional
    @Query("UPDATE Account a SET a.img = :img WHERE a.account_id = :accountId")
    int upLoadImgProfile(@Param("img") String img, @Param("accountId") int accountId);

}
