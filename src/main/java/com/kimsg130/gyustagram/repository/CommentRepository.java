package com.kimsg130.gyustagram.repository;

import com.kimsg130.gyustagram.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findAllByPostIdOrderByCommentDateDesc(int postId);
}
