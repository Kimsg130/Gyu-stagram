package com.kimsg130.gyustagram.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto { //회원가입시 보내줄 객체
    private String email;
    private String phone;
    private String password;
    private String passwordCheck;
    private String name;
    private String nickname;
    private String comment;
    private String image;
}
