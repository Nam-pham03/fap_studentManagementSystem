package com.fpt.fap.module.auth.service;

import com.fpt.fap.dto.AccountDTO;

import org.springframework.stereotype.Service;

@Service
public interface ForgotPassService {
    public AccountDTO getAccountByEmailOrFeId(String feId);

    public AccountDTO getAccountByAccountId(int accountID);

    public AccountDTO getAccountByAccountIdAndPassword(int accountID , String old);

    public boolean ResetPass(int accountID , String hashedPassword);


}
