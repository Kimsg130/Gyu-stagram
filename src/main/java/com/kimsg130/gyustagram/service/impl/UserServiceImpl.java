package com.kimsg130.gyustagram.service.impl;


import com.kimsg130.gyustagram.dto.ResponseDto;
import com.kimsg130.gyustagram.dto.SignupDto;
import com.kimsg130.gyustagram.dto.TokenDto;
import com.kimsg130.gyustagram.model.User;
import com.kimsg130.gyustagram.model.User_Details;
import com.kimsg130.gyustagram.repository.UserRepository;
import com.kimsg130.gyustagram.repository.User_DetailsRepository;
import com.kimsg130.gyustagram.security.JwtTokenProvider;
import com.kimsg130.gyustagram.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional(readOnly = true)
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

        // User생성 TODO : 리스트로 저장해서 saveAll로 바꾸기,   DONE : 수정된 테이블에 따라서 회원가입 수정
        User user = new User(dto);
        User_Details user_details = new User_Details(dto);

        try{
            userRepository.saveAndFlush(user);
            user_detailsRepository.saveAndFlush(user_details);

        } catch (Exception e) {
            return  ResponseDto.setFailed("DataBase Error!!(save)");
        }
        // 성공!
        return ResponseDto.setSuccess("Signup Success!!", null);
    }
}

//@Autowired UserRepository userRepository;
//
//

