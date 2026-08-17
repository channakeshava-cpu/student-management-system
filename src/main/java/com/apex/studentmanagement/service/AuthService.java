package com.apex.studentmanagement.service;

import com.apex.studentmanagement.dto.AuthResponseDTO;
import com.apex.studentmanagement.dto.LoginRequestDTO;
import com.apex.studentmanagement.dto.RegisterRequestDTO;
import com.apex.studentmanagement.entity.AppUser;
import com.apex.studentmanagement.exception.DuplicateUserException;
import com.apex.studentmanagement.exception.InvalidCredentialsException;
import com.apex.studentmanagement.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private static final Logger logger =
            LoggerFactory.getLogger(AuthService.class);

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequestDTO dto) {

        logger.info("Register request received for username: {}", dto.getUsername());

        if (userRepository.existsByUsername(dto.getUsername())) {

            logger.warn("Duplicate username registration attempt: {}", dto.getUsername());

            throw new DuplicateUserException("Username already exists");
        }

        if (userRepository.existsByEmail(dto.getEmail())) {

            logger.warn("Duplicate email registration attempt: {}", dto.getEmail());

            throw new DuplicateUserException("Email already exists");
        }

        AppUser user = new AppUser();

        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        logger.info("User '{}' registered successfully.", dto.getUsername());

        return "User registered successfully.";
    }

    public AuthResponseDTO login(LoginRequestDTO dto) {

        logger.info("Login attempt for username: {}", dto.getUsername());

        AppUser user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> {
                    logger.warn("Login failed. Username '{}' not found.", dto.getUsername());
                    return new InvalidCredentialsException("Invalid username or password");
                });

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {

            logger.warn("Invalid password for username: {}", dto.getUsername());

            throw new InvalidCredentialsException("Invalid username or password");
        }

        String token = jwtService.generateToken(user.getUsername());

        logger.info("User '{}' logged in successfully.", user.getUsername());

        return new AuthResponseDTO(token);
    }
}