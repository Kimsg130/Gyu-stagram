package com.kimsg130.gyustagram.service;

import com.kimsg130.gyustagram.dto.PostingDto;
import com.kimsg130.gyustagram.model.Follow;
import com.kimsg130.gyustagram.model.Posts;

import java.util.List;

public interface FollowService {

    //팔로워&팔로잉 가져오기  팔로워 : 당하는, 팔로잉 : 하는
    List<String> getFollwerByFollwing(String following);
    List<String> getFollowingByFollwer(String follower);
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