package com.kimsg130.gyustagram.repository;

import com.kimsg130.gyustagram.model.User_Details;
import com.kimsg130.gyustagram.repository.mapping.SearchUserMapping;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface User_DetailsRepository extends JpaRepository<User_Details, String> {
    User_Details findByUserId(String userId);

    List<SearchUserMapping> findAllByUserIdLike(String userId, Pageable pageable);

}
