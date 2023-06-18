package com.kimsg130.gyustagram.service;

import com.kimsg130.gyustagram.dto.DoFollowingDto;
import com.kimsg130.gyustagram.dto.FollowDto;
import com.kimsg130.gyustagram.dto.PostingDto;
import com.kimsg130.gyustagram.model.Follow;
import com.kimsg130.gyustagram.model.Posts;

import java.util.List;

public interface FollowService {

    //팔로워&팔로잉 가져오기  팔로워 : 당하는, 팔로잉 : 하는
    public List<String> getFollwerByFollwing(String following);
    public List<String> getFollowingByFollwer(String follower);

    public List<FollowDto> getFollwerByFollwingWithNo(String following);
    public List<FollowDto> getFollowingByFollwerWithNo(String follower);

    public void deleteByF_Id(int f_id);

    public void follow(DoFollowingDto f);
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