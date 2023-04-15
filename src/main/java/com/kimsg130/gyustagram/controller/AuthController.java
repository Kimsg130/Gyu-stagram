package com.kimsg130.gyustagram.controller;

import com.kimsg130.gyustagram.dto.LoginRequestDto;
import com.kimsg130.gyustagram.dto.ResponseDto;
import com.kimsg130.gyustagram.dto.SignupDto;
import com.kimsg130.gyustagram.dto.TokenDto;
import com.kimsg130.gyustagram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public TokenDto login(@RequestBody LoginRequestDto userLoginRequestDto) {
        String userId = userLoginRequestDto.getUserId();
        String password = userLoginRequestDto.getPassword();
        TokenDto tokenDto = userService.login(userId, password);

        return tokenDto;
    }

    @PostMapping("/signup")
    public ResponseDto<?> signUp(@RequestBody SignupDto requestBody){
        ResponseDto<?> result = userService.signup(requestBody);
        return result;
    }

    @PostMapping("/test")
    public String test() {
        return "success";
    }


}
