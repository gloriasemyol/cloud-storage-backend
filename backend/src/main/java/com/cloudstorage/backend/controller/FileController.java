package com.cloudstorage.backend.controller;

import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.repository.FileRepository;
import com.cloudstorage.backend.service.CloudinaryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final CloudinaryService cloudinaryService;
    private final FileRepository fileRepository;

    public FileController(CloudinaryService cloudinaryService, FileRepository fileRepository) {
        this.cloudinaryService = cloudinaryService;
        this.fileRepository = fileRepository;
    }

    @PostMapping("/init-upload")
    public Map<String, Object> initUpload() {
        return cloudinaryService.generateUploadSignature();
    }

    @PostMapping("/complete-upload")
    public FileEntity completeUpload(@RequestBody FileEntity fileEntity) {
        return fileRepository.save(fileEntity);
    }

    @GetMapping("/{id}")
    public Map<String, String> getFile(@PathVariable Long id) {
        FileEntity file = fileRepository.findById(id).orElseThrow();
        return Map.of("downloadUrl", file.getUrl());
    }

    @PutMapping("/{id}/rename")
    public FileEntity renameFile(@PathVariable Long id, @RequestBody Map<String, String> body) {
        FileEntity file = fileRepository.findById(id).orElseThrow();
        file.setName(body.get("newName"));
        return fileRepository.save(file);
    }

    @PutMapping("/{id}/move")
    public FileEntity moveFile(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        FileEntity file = fileRepository.findById(id).orElseThrow();
        file.setFolderId(body.get("newFolderId"));
        return fileRepository.save(file);
    }

    @DeleteMapping("/{id}")
    public void trashFile(@PathVariable Long id) {
        FileEntity file = fileRepository.findById(id).orElseThrow();
        file.setTrashed(true);
        fileRepository.save(file);
    }

    @PostMapping("/{id}/restore")
    public FileEntity restoreFile(@PathVariable Long id) {
        FileEntity file = fileRepository.findById(id).orElseThrow();
        file.setTrashed(false);
        return fileRepository.save(file);
    }

    @GetMapping("/search")
    public Page<FileEntity> search(
            @RequestParam Long ownerId,
            @RequestParam(defaultValue = "") String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<FileEntity> results = fileRepository
                .findByOwnerIdAndTrashedFalseAndNameContainingIgnoreCase(ownerId, query);
        return new PageImpl<>(results, pageable, results.size());
    }
}