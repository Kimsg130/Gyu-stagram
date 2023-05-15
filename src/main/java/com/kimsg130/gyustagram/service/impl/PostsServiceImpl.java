package com.kimsg130.gyustagram.service.impl;

import com.kimsg130.gyustagram.dto.PostingDto;
import com.kimsg130.gyustagram.model.Posts;
import com.kimsg130.gyustagram.repository.PostsRepository;
import com.kimsg130.gyustagram.service.PostsService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class PostsServiceImpl implements PostsService {

    private final PostsRepository postsRepository;
    @Override
    public String posting(PostingDto dto) {
        Posts post = new Posts(dto);
        try {
            postsRepository.save(post);
        }catch (Exception e) {
            return "Failed"; // 실패
        }
        return "Success"; // 성공
    }

    @Override
    public List<Posts> getPostsByUserId(String userId) {
        // 유저의 모든 포스트들을 날짜로 정렬하여 리스트로 반환
        return postsRepository.findAllByUserIdOrderByPostDateDesc(userId);
    }

    @Override
    public Posts getPostByPostId(int postId) {
        // 포스트아이디에 맞는 포스트 반환
        return postsRepository.findByPostId(postId);
    }
}
