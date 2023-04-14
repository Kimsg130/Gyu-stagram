package com.kimsg130.gyustagram.service;

import com.kimsg130.gyustagram.dto.ResponseDto;
import com.kimsg130.gyustagram.dto.SignupDto;
import com.kimsg130.gyustagram.dto.TokenDto;

public interface UserService {

    //로그인 서비스
    public TokenDto login(String userId, String password);

    //회원가입 서비스
    public boolean existsId(String userId);
    public ResponseDto<?> signup(SignupDto dto);

}




//    User createUser(User user); // Create
//
//    User getUserById(Long id); // Read
//
//    List<User> getAllUser(); // Read
//
//    User updateUser(User user); // Update
//
//    void deleteUser(Long id); // Delete