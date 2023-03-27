package com.kimsg130.gyustagram.controller;

import com.kimsg130.gyustagram.dto.ResponseDto;
import com.kimsg130.gyustagram.dto.SignUpDto;
import com.kimsg130.gyustagram.dto.SignUpResponseDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @PostMapping("/signUp")
    public ResponseDto<SignUpResponseDto> signUp(@RequestBody SignUpDto requestBody){
        System.out.println(requestBody.toString());
        return null;
    }
}
