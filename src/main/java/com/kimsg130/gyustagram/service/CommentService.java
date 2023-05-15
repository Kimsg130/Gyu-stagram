package com.kimsg130.gyustagram.service;

import com.kimsg130.gyustagram.model.Comment;

import java.util.List;

public interface CommentService {

    List<Comment> getCommentByPostId(int postId);
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