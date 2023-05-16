package com.kimsg130.gyustagram.service;

import com.kimsg130.gyustagram.model.Likes;

import java.util.List;

public interface LikesService {

    public List<Likes> getLikesBySendingLikesIdAndKind(int sendingLikesId, String kind);
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