package com.kimsg130.gyustagram.service;

import com.kimsg130.gyustagram.model.User_test;

import java.util.List;

public interface User_testService {
    User_test createUser_test(User_test user_test); // Create

    User_test getUser_testByU_num(Long u_num); // Read

    List<User_test> getAllUser_test(); // Read

    User_test updateUser_test(User_test user_test); // Update

    void deleteUser_test(Long u_num); // Delete

}
