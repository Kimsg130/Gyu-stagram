package com.kimsg130.gyustagram.dto;

import com.kimsg130.gyustagram.model.Posts;
import com.kimsg130.gyustagram.model.User_Details;
import lombok.Data;

import java.util.List;

@Data
public class MainInfoDto {
    private String name;
    private String image;
    private List<Posts> posts;
    private List<String> follower;
    private List<String> following;

    public MainInfoDto(User_Details u, List<Posts> p, List<String> fr, List<String> fg) {
        this.name = u.getName();
        this.image = u.getImage();
        this.posts = p;
        this.follower = fr;
        this.following = fg;
    }
}
