package com.kimsg130.gyustagram.repository;

import com.kimsg130.gyustagram.model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostsRepository extends JpaRepository<Posts, Integer> {
    List<Posts> findAllByUserIdOrderByPostDateDesc(String userId);
    Posts findByPostId(int postId);
}
