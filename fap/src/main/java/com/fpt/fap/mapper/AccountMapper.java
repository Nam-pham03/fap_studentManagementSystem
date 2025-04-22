package com.fpt.fap.mapper;

import com.fpt.fap.dto.AccountDTO;
import com.fpt.fap.entity.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface AccountMapper {


    @Mappings({
            @Mapping(source = "account_id", target = "account_id"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "fe_id", target = "fe_id"),
            @Mapping(source = "full_name", target = "full_name"),
            @Mapping(source = "phone", target = "phone"),
            @Mapping(source = "dob", target = "dob"),
            @Mapping(source = "place_birth", target = "place_birth"),
            @Mapping(source = "id_number", target = "id_number"),
            @Mapping(source = "gender", target = "gender"),
            @Mapping(source = "address", target = "address"),
            @Mapping(source = "address_current", target = "address_current"),
            @Mapping(source = "nationality", target = "nationality"),
            @Mapping(source = "ethnicity", target = "ethnicity"),
            @Mapping(source = "status", target = "status"),
            @Mapping(source = "role_id", target = "role_id"),
            @Mapping(source = "img", target = "img")
    })

    AccountDTO toDTO(Account account);

    @Mappings({
            @Mapping(source = "account_id", target = "account_id"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "fe_id", target = "fe_id"),
            @Mapping(source = "full_name", target = "full_name"),
            @Mapping(source = "phone", target = "phone"),
            @Mapping(source = "dob", target = "dob"),
            @Mapping(source = "place_birth", target = "place_birth"),
            @Mapping(source = "id_number", target = "id_number"),
            @Mapping(source = "gender", target = "gender"),
            @Mapping(source = "address", target = "address"),
            @Mapping(source = "address_current", target = "address_current"),
            @Mapping(source = "nationality", target = "nationality"),
            @Mapping(source = "ethnicity", target = "ethnicity"),
            @Mapping(source = "status", target = "status"),
            @Mapping(source = "role_id", target = "role_id"),
            @Mapping(source = "img", target = "img"),
            @Mapping(target = "password", ignore = true),
            @Mapping(target = "token", ignore = true)
    })
    Account toEntity(AccountDTO dto);
}
