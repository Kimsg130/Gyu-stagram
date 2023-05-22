package com.kimsg130.gyustagram.service.impl;

import com.kimsg130.gyustagram.dto.PostingDto;
import com.kimsg130.gyustagram.model.Follow;
import com.kimsg130.gyustagram.model.Posts;
import com.kimsg130.gyustagram.repository.FollowRepository;
import com.kimsg130.gyustagram.repository.PostsRepository;
import com.kimsg130.gyustagram.service.FollowService;
import com.kimsg130.gyustagram.service.PostsService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;

    @Override
    public List<String> getFollwerByFollwing(String following) {
        List<Follow> follows = followRepository.findAllByFollowerOrderByFollowDateDesc(following);
        List<String> followers = new ArrayList<>();

        for (Follow f : follows) { followers.add(f.getFollowing()); }
        return followers;
    }

    @Override
    public List<String> getFollowingByFollwer(String follower) {
        List<Follow> follows = followRepository.findAllByFollowingOrderByFollowDateDesc(follower);
        List<String> followings = new ArrayList<>();

        for (Follow f : follows) { followings.add(f.getFollower()); }
        return followings;
    }
}
