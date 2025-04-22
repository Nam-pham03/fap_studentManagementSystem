package com.fpt.fap.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class RoleDTO {
    private int role_id;
    private String role_name;
}
