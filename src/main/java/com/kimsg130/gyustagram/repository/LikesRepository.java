package com.kimsg130.gyustagram.repository;

import com.kimsg130.gyustagram.model.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Integer> {
//    List<Likes> findAllByPostOrCommentIdAndKindOrderByLikeDateDesc(int postOrCommentId, String kind);
}
