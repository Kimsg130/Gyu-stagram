package com.kimsg130.gyustagram.controller;

import com.kimsg130.gyustagram.dto.PostingDto;
import com.kimsg130.gyustagram.dto.UserInfoDto;
import com.kimsg130.gyustagram.model.Comment;
import com.kimsg130.gyustagram.model.Posts;
import com.kimsg130.gyustagram.service.CommentService;
import com.kimsg130.gyustagram.service.FollowService;
import com.kimsg130.gyustagram.service.PostsService;
import com.kimsg130.gyustagram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @Autowired
    CommentService commentService;

    @GetMapping("profile")
    public UserInfoDto getUserInfo(@RequestParam String userId) {

        UserInfoDto dto = new UserInfoDto(userService.getUserDetails(userId), postsService.getPostsByUserId(userId), followService.getFollwerByFollwing(userId), followService.getFollowingByFollwer(userId));
        return dto;
    }

    @GetMapping("post") // 아직 no쓸모지만 나중을 위해 남겨놓음
    public Posts getPost(@RequestParam int postId) {

        return postsService.getPostByPostId(postId);
    }

    @PostMapping("/posting")
    public String Posting(@RequestBody PostingDto dto) {
        return postsService.posting(dto);
    }

    @GetMapping("/get_comments")
    public List<Comment> getComments(@RequestParam int postId) {
        return commentService.getCommentByPostId(postId);
    }
}
