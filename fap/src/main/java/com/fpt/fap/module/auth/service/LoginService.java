package com.fpt.fap.module.auth.service;

import com.fpt.fap.dto.AccountDTO;
import org.springframework.stereotype.Service;

@Service
public interface LoginService {
    public AccountDTO getAccount(String email, String password);

    public AccountDTO getAccountByFeidId(String fe_id, String password);

    public AccountDTO getAccountByEmail(String email);

}
