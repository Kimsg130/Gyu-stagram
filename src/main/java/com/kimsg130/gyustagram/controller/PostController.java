package com.kimsg130.gyustagram.controller;

import com.kimsg130.gyustagram.dto.UserInfoDto;
import com.kimsg130.gyustagram.service.FollowService;
import com.kimsg130.gyustagram.service.PostsService;
import com.kimsg130.gyustagram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController // @Contoller + @ResponseBody
@RequestMapping("*")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    PostsService postsService;
    @Autowired
    UserService userService;
    @Autowired
    FollowService followService;

    @GetMapping("profile")
    public UserInfoDto post(@RequestParam String userId){

        UserInfoDto dto = new UserInfoDto(userService.getUserDetails(userId), postsService.getPostsByUserId(userId), followService.getFollwerByFollwing(userId), followService.getFollowingByFollwer(userId));

        return dto;
    }

}
