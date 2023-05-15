package com.kimsg130.gyustagram.service.impl;

import com.kimsg130.gyustagram.model.Likes;
import com.kimsg130.gyustagram.repository.LikesRepository;
import com.kimsg130.gyustagram.service.LikesService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class LikesServiceImpl implements LikesService {

    private final LikesRepository likesRepository;

//    @Override
//    public List<Likes> getLikesByPostOrCommentIdAndKind(int postOrCommentId, String kind) {
//        return likesRepository.findAllByPostOrCommentIdAndKindOrderByLikeDateDesc(postOrCommentId, kind);
//    }
}
