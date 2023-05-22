package com.kimsg130.gyustagram.service;

import com.kimsg130.gyustagram.dto.PostingDto;
import com.kimsg130.gyustagram.dto.ResponseDto;
import com.kimsg130.gyustagram.dto.SignupDto;
import com.kimsg130.gyustagram.dto.TokenDto;
import com.kimsg130.gyustagram.model.Posts;

import java.util.List;

public interface PostsService {

    //포스팅
    public String posting(PostingDto dto);

    //정보 가져오기
    public List<Posts> getPostsByUserId(String userId);
    public List<Posts> getPostsByUserId(List<String> userIds);
    public Posts getPostByPostId(int postId);

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