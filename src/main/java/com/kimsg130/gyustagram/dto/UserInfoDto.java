package com.kimsg130.gyustagram.dto;

import com.kimsg130.gyustagram.model.Follow;
import com.kimsg130.gyustagram.model.Posts;
import com.kimsg130.gyustagram.model.User_Details;
import lombok.Data;

import java.util.List;

@Data
public class UserInfoDto {
    private String name;
    private String comment;
    private String image;
    private List<Posts> posts;
    private List<String> follower;
    private List<String> following;

    public UserInfoDto(User_Details user_details, List<Posts> posts, List<String> follower, List<String> following) {
        this.name = user_details.getName();
        this.comment = user_details.getComment();
        this.image = user_details.getImage();
        this.posts = posts;
        this.follower = follower;
        this.following = following;
    }
}
