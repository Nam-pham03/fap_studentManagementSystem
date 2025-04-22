package com.fpt.fap.module.common.service;

import com.fpt.fap.dto.AccountDTO;

import org.springframework.stereotype.Service;

@Service
public interface UpdateProfileService {

    public boolean UpdateProfile(AccountDTO acc);

    public boolean UpLoadImgProfile(AccountDTO acc);

}
