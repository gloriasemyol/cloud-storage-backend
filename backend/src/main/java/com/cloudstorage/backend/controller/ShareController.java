package com.cloudstorage.backend.controller;

import com.cloudstorage.backend.model.LinkShare;
import com.cloudstorage.backend.model.Share;
import com.cloudstorage.backend.repository.LinkShareRepository;
import com.cloudstorage.backend.repository.ShareRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api")
public class ShareController {

    private final ShareRepository shareRepository;
    private final LinkShareRepository linkShareRepository;

    public ShareController(ShareRepository shareRepository, LinkShareRepository linkShareRepository) {
        this.shareRepository = shareRepository;
        this.linkShareRepository = linkShareRepository;
    }

    @PostMapping("/shares")
    public Share createShare(@RequestBody Share share) {
        return shareRepository.save(share);
    }

    @PostMapping("/public-links")
    public LinkShare createPublicLink(@RequestBody LinkShare linkShare) {
        return linkShareRepository.save(linkShare);
    }

    @GetMapping("/public-links/{token}")
    public LinkShare accessPublicLink(@PathVariable String token) {
        LinkShare link = linkShareRepository.findByToken(token).orElseThrow();
        if (link.getExpiresAt() != null && link.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("This link has expired");
        }
        return link;
    }
}