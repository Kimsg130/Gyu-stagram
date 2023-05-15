package com.kimsg130.gyustagram.service.impl;

import com.kimsg130.gyustagram.model.Comment;
import com.kimsg130.gyustagram.repository.CommentRepository;
import com.kimsg130.gyustagram.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public List<Comment> getCommentByPostId(int postId) {
        return commentRepository.findAllByPostIdOrderByCommentDateDesc(postId);
    }
}
