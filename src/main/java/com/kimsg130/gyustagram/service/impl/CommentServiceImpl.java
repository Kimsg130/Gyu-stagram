package com.kimsg130.gyustagram.service.impl;

import com.kimsg130.gyustagram.dto.CommentRequestDto;
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

    @Override
    public String sendingComment(CommentRequestDto dto) {
        Comment comment = new Comment(dto);
        try {
            commentRepository.save(comment);
        }catch (Exception e) {
            return "Failed"; // 실패
        }
        return "Success"; // 성공
    }
}
