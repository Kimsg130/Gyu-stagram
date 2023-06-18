package com.kimsg130.gyustagram.repository;

import com.kimsg130.gyustagram.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
    List<Follow> findAllByFollowingOrderByFollowDateDesc(String following);
    List<Follow> findAllByFollowerOrderByFollowDateDesc(String follower);

//    void deleteByPostId(String userId);
}
