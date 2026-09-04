package com.cloudstorage.backend.controller;

import com.cloudstorage.backend.model.Folder;
import com.cloudstorage.backend.repository.FolderRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/folders")
public class FolderController {

    private final FolderRepository folderRepository;

    public FolderController(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    @PostMapping
    public Folder createFolder(@RequestBody Folder folder) {
        return folderRepository.save(folder);
    }

    @GetMapping("/{parentId}/contents")
    public List<Folder> getContents(@PathVariable Long parentId, @RequestParam Long ownerId) {
        return folderRepository.findByOwnerIdAndParentFolderIdAndTrashedFalse(ownerId, parentId);
    }

    @DeleteMapping("/{id}")
    public void softDeleteFolder(@PathVariable Long id) {
        Folder folder = folderRepository.findById(id).orElseThrow();
        folder.setTrashed(true); // SOFT delete — not actually removed from DB
        folderRepository.save(folder);
    }
}