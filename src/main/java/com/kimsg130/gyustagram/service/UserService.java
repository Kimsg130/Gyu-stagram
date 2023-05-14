package com.kimsg130.gyustagram.service;

import com.kimsg130.gyustagram.dto.ResponseDto;
import com.kimsg130.gyustagram.dto.SignupDto;
import com.kimsg130.gyustagram.dto.TokenDto;
import com.kimsg130.gyustagram.model.User_Details;

public interface UserService {

    //로그인 서비스
    public TokenDto login(String userId, String password);

    //회원가입 서비스
    public ResponseDto<?> signup(SignupDto dto);

    //회원가입할 때 아이디가 존재하는지 판단하는 메서드
    public boolean existsId(String userId);

    public User_Details getUserDetails(String userId);
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