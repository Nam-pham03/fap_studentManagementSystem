package com.fpt.fap.module.auth.service.impl;

import com.fpt.fap.dto.AccountDTO;
import com.fpt.fap.entity.Account;
import com.fpt.fap.mapper.AccountMapper;
import com.fpt.fap.module.auth.repository.AccountRepository;
import com.fpt.fap.module.auth.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountMapper accountMapper;

    public AccountDTO getAccountByEmail(String email) {
        try {
            Account account = accountRepository.findAccountByEmail(email);
            if (account != null) {
                return accountMapper.toDTO(account);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public AccountDTO getAccount(String email, String password) {
        try {
            Account account = accountRepository.findByEmailAndPassword(email, password);
            if (account != null) {
                return accountMapper.toDTO(account);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public AccountDTO getAccountByFeidId(String fe_id, String password) {
        try {
            Account account = accountRepository.findByFeIdAndPassword(fe_id, password);
            if (account != null) {
                return accountMapper.toDTO(account);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }


}
