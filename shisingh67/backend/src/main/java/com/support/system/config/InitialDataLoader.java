package com.support.system.config;

import com.support.system.auth.model.Role;
import com.support.system.auth.model.User;
import com.support.system.auth.repository.RoleRepository;
import com.support.system.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import org.springframework.transaction.annotation.Transactional;
import java.util.Set;

@Component
public class InitialDataLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public InitialDataLoader(RoleRepository roleRepository,
                             UserRepository userRepository,
                             PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {

        // Ensure ROLE_USER exists
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));

        // Ensure ROLE_ADMIN exists
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_ADMIN")));

        // Create admin user if missing
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRoles(Set.of(adminRole));

            userRepository.save(admin);
        }
    }
}
