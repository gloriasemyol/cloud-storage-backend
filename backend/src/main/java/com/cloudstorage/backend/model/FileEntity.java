package com.cloudstorage.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "files", indexes = {
    @Index(name = "idx_files_owner", columnList = "ownerId"),
    @Index(name = "idx_files_folder", columnList = "folderId"),
    @Index(name = "idx_files_name", columnList = "name")
})
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long ownerId; // added to match the database index requirement

    @Column(nullable = false)
    private String fileName;

    private String name; // used for renaming

    private Long folderId; // used for moving folders

    private boolean trashed = false; // used for soft delete/trash

    @Column(nullable = false)
    private String cloudinaryPublicId;

    @Column(nullable = false, length = 1000)
    private String url;

    private LocalDateTime uploadedAt = LocalDateTime.now();

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getFolderId() { return folderId; }
    public void setFolderId(Long folderId) { this.folderId = folderId; }

    public boolean isTrashed() { return trashed; }
    public void setTrashed(boolean trashed) { this.trashed = trashed; }

    public String getCloudinaryPublicId() { return cloudinaryPublicId; }
    public void setCloudinaryPublicId(String cloudinaryPublicId) { this.cloudinaryPublicId = cloudinaryPublicId; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}