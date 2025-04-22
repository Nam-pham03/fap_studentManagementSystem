package com.fpt.fap.module.auth.repository;

import com.fpt.fap.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository("authAccountRepository")
public  interface AccountRepository extends JpaRepository<Account, Integer> {

    @Query("SELECT a FROM Account a WHERE a.email = :email AND a.password = :password")
    Account findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    @Query("SELECT a FROM Account a WHERE a.fe_id = :fe_id AND a.password = :password")
    Account findByFeIdAndPassword(@Param("fe_id") String fe_id, @Param("password") String password);

    @Query("SELECT a FROM Account a WHERE a.email = :email")
    Account findAccountByEmail(@Param("email") String email);

    @Query("SELECT a FROM Account a WHERE a.email = :feId or a.fe_id = :feId")
    Account findAccountByEmailOrFeId(@Param("feId") String feId);

    @Query("SELECT a FROM Account a WHERE a.account_id = :accountID")
    Account findAccountByAccountId(@Param("accountID") int accountID);

    @Query("SELECT a FROM Account a WHERE a.account_id = :accountID and a.password = :old")
    Account findAccountByAccountIdAndPassword(@Param("accountID") int accountID, @Param("old") String old);

    @Modifying
    @Transactional
    @Query("UPDATE Account a SET a.password = :newPassword WHERE a.account_id = :accountID")
    int resetPassword(@Param("accountID") int accountID,
                      @Param("newPassword") String newPassword);

}
