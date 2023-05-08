package com.kimsg130.gyustagram.dto;

import com.kimsg130.gyustagram.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInResponseDto { //토큰과 익스퍼트타임
    private String token;
    private int exprTime;
    private User user;
}
