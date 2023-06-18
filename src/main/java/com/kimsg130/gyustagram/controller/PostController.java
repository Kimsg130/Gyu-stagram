package com.kimsg130.gyustagram.controller;

import com.kimsg130.gyustagram.dto.*;
import com.kimsg130.gyustagram.model.Comment;
import com.kimsg130.gyustagram.model.Likes;
import com.kimsg130.gyustagram.model.Posts;
import com.kimsg130.gyustagram.model.User_Details;
import com.kimsg130.gyustagram.repository.mapping.SearchUserMapping;
import com.kimsg130.gyustagram.service.*;
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
    @Autowired
    LikesService likesService;

    @GetMapping("profile")
    public UserInfoDto getUserInfo(@RequestParam String userId) {

        UserInfoDto dto = new UserInfoDto(userService.getUserDetails(userId), postsService.getPostsByUserId(userId), followService.getFollwerByFollwing(userId), followService.getFollowingByFollwer(userId));
        return dto;
    }

    @GetMapping("/mainPage")
    public MainInfoDto getMainInfo(@RequestParam String userId) {
        User_Details details = userService.getUserDetails(userId);
        List<String> followerIds = followService.getFollwerByFollwing(userId);
        followerIds.add(userId);
        List<Posts> posts = postsService.getPostsByUserId(followerIds);
        List<String> followingIds = followService.getFollowingByFollwer(userId);

        return new MainInfoDto(details, posts, followerIds, followingIds);
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

    @GetMapping("/get_likes")
    public List<Likes> getLikes(@RequestParam int sendingLikesId, String kind) {
        return likesService.getLikesBySendingLikesIdAndKind(sendingLikesId, kind);
    }

    @PostMapping("/commenting")
    public String commenting(@RequestBody CommentRequestDto dto) {
        return commentService.sendingComment(dto);
    }

    @GetMapping("/searchUser")
    public List<SearchUserMapping> searchUser(@RequestParam String userId) {
        return userService.getSearchUserIds(userId);
    }

    @GetMapping("/getfollows")
    public List<FollowDto> getFollows(@RequestParam String userId, boolean isWing) {
        if (isWing) {
            return followService.getFollowingByFollwerWithNo(userId);
        } else {
            return followService.getFollwerByFollwingWithNo(userId);
        }
    }

    @DeleteMapping("/deletefollow")
    public void deleteFollows(@RequestParam int f_id) {
        followService.deleteByF_Id(f_id);
    }

    @PostMapping("/dofollow")
    public void doFollowing(@RequestBody DoFollowingDto dto) {
        followService.follow(dto);
    }

    @PostMapping("/dolike")
    public void doLike(@RequestBody DoLikeDto dto) {
        likesService.doLike(dto);
    }

    @DeleteMapping("/deletepost")
    public void deletePost(@RequestParam int p_id) {
        postsService.deletePost(p_id);
    }
}
