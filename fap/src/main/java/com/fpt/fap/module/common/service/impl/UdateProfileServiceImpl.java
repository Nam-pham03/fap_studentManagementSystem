package com.fpt.fap.module.common.service.impl;


import com.fpt.fap.dto.AccountDTO;
import com.fpt.fap.mapper.AccountMapper;
import com.fpt.fap.module.common.repository.AccountRepository;
import com.fpt.fap.module.common.service.UpdateProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UdateProfileServiceImpl implements UpdateProfileService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountMapper accountMapper;


    public boolean UpdateProfile(AccountDTO acc) {
        try {
            int updatedRows = accountRepository.updateProfile(
                    acc.getEmail(),
                    acc.getFull_name(),
                    acc.getPhone(),
                    acc.getDob(),
                    acc.getPlace_birth(),
                    acc.getId_number(),
                    acc.getGender(),
                    acc.getAddress_current(),
                    acc.getNationality(),
                    acc.getEthnicity(),
                    acc.getAccount_id()
            );
            return updatedRows > 0;
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
    }


    public boolean UpLoadImgProfile(AccountDTO acc) {
        try {
            int updatedRows = accountRepository.upLoadImgProfile(acc.getImg(), acc.getAccount_id());
            return updatedRows > 0;
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
    }

}
