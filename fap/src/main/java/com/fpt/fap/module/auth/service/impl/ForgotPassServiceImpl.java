package com.fpt.fap.module.auth.service.impl;


import com.fpt.fap.dto.AccountDTO;
import com.fpt.fap.entity.Account;
import com.fpt.fap.mapper.AccountMapper;
import com.fpt.fap.module.auth.repository.AccountRepository;
import com.fpt.fap.module.auth.service.ForgotPassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ForgotPassServiceImpl implements ForgotPassService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountMapper accountMapper;

    public boolean ResetPass(int accountID , String current) {
        boolean check = false;
        try {
            int updatedRows = accountRepository.resetPassword(accountID, current);
            return updatedRows > 0;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return  check;
    }

    public AccountDTO getAccountByAccountIdAndPassword(int accountID, String old) {
        try {
            Account account = accountRepository.findAccountByAccountIdAndPassword(accountID, old);
            if (account != null) {
                return accountMapper.toDTO(account);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }


    public AccountDTO getAccountByAccountId(int accountID) {
        try {
            Account account = accountRepository.findAccountByAccountId(accountID);
            if (account != null) {
                return accountMapper.toDTO(account);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public AccountDTO getAccountByEmailOrFeId(String feId) {
        try {
            Account account = accountRepository.findAccountByEmailOrFeId(feId);
            if (account != null) {
                return accountMapper.toDTO(account);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }


}
