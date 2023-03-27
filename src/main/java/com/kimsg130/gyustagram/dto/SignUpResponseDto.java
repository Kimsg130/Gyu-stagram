package com.kimsg130.gyustagram.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpResponseDto { //토큰과 익스퍼트타임
    private String token;
    private int exprTime;
}
