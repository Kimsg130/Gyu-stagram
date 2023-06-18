package com.kimsg130.gyustagram.service.impl;


import com.kimsg130.gyustagram.dto.*;
import com.kimsg130.gyustagram.model.User;
import com.kimsg130.gyustagram.model.User_Details;
import com.kimsg130.gyustagram.repository.UserRepository;
import com.kimsg130.gyustagram.repository.User_DetailsRepository;
import com.kimsg130.gyustagram.repository.mapping.SearchUserMapping;
import com.kimsg130.gyustagram.security.JwtTokenProvider;
import com.kimsg130.gyustagram.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final User_DetailsRepository user_detailsRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public TokenDto login(String userId, String password) {

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, password);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = jwtTokenProvider.generateToken(authentication);

        return tokenDto;
    }

    @Override
    public boolean existsId(String userId) {
        Optional<User> users = userRepository.findByUserId(userId);

        if(users.isEmpty())
            return false;
        else
            return true;
    }

    @Override
    public User_Details getUserDetails(String userId) {
        return user_detailsRepository.findByUserId(userId);
    }

    @Override
    public List<SearchUserMapping> getSearchUserIds(String userId) {
        String pattern = "%"+ String.join("%", userId.split("")) + "%";
        Pageable pageable = PageRequest.of(0, 10);
        List<SearchUserMapping> optionalUserIds = user_detailsRepository.findAllByUserIdLike(pattern, pageable);
        //Optional<SearchUserMapping> optionalUserIds = user_detailsRepository.findAllByUserIdLike(pattern, pageable);
        //optionalUserIds.map(Collections::singletonList).orElse(Collections.emptyList());
        return optionalUserIds;
    }

    @Override
    public ResponseDto<?> signup(SignupDto dto) {
        String userId = dto.getUserId();
        String userPassword = dto.getPassword();
        String userPasswordCheck = dto.getPasswordCheck();

        // email중복확인
        try{
            if(existsId(userId))
                return ResponseDto.setFailed("Existed id!!");
        } catch (Exception e) {
            return ResponseDto.setFailed("DataBase Error!!");
        }

        // 비밀번호 체크!
        if(!userPassword.equals(userPasswordCheck))
            return ResponseDto.setFailed("Password does not matched!");

        // User생성 DONE : 수정된 테이블에 따라서 회원가입 수정, 트랜잭션 문제가 있었음
        User user = new User(dto);
        User_Details user_details = new User_Details(dto);

        try{
            userRepository.save(user);
            user_detailsRepository.save(user_details);

        } catch (Exception e) {
            return  ResponseDto.setFailed("DataBase Error!!(save_user)");
        }

        // 성공!
        return ResponseDto.setSuccess("Signup Success!!", null);
    }


}

