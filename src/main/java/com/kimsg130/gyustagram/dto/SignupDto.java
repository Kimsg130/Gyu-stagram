package com.kimsg130.gyustagram.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupDto { //회원가입시 보내줄 객체
    private String userId;
    private String password;
    private String passwordCheck;
    private String email;
    private String phone;
    private String name;
    private String nickname;
    private String comment;
    private String image;
}
