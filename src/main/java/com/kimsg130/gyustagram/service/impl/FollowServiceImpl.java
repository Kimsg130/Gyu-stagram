package com.kimsg130.gyustagram.service.impl;

import com.kimsg130.gyustagram.dto.DoFollowingDto;
import com.kimsg130.gyustagram.dto.FollowDto;
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

    @Override
    public List<FollowDto> getFollwerByFollwingWithNo(String following) {
        List<Follow> follows = followRepository.findAllByFollowerOrderByFollowDateDesc(following);
        List<FollowDto> followers = new ArrayList<>();
        for (Follow f : follows) {
            FollowDto fd = new FollowDto(f.getFollowing(), f.getPostId());
            followers.add(fd);
        }
        return followers;
    }

    @Override
    public List<FollowDto> getFollowingByFollwerWithNo(String follower) {
        List<Follow> follows = followRepository.findAllByFollowingOrderByFollowDateDesc(follower);
        List<FollowDto> followings = new ArrayList<>();
        for (Follow f : follows) {
            FollowDto fd = new FollowDto(f.getFollower(), f.getPostId());
            followings.add(fd);
        }
        return followings;
    }

    @Override
    public void deleteByF_Id(int f_id) {
        followRepository.deleteById(f_id);
    }

    @Override
    public void follow(DoFollowingDto fd) {
        Follow f = new Follow(fd);
        followRepository.save(f);
    }
}
