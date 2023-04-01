package com.kimsg130.gyustagram.service;

import com.kimsg130.gyustagram.dto.ResponseDto;
import com.kimsg130.gyustagram.dto.SignUpDto;
import com.kimsg130.gyustagram.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public boolean existsEmail(String email);
    public ResponseDto<?> signUp(SignUpDto dto);



//    User createUser(User user); // Create
//
//    User getUserById(Long id); // Read
//
//    List<User> getAllUser(); // Read
//
//    User updateUser(User user); // Update
//
//    void deleteUser(Long id); // Delete

}
