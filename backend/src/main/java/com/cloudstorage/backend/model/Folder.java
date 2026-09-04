package com.cloudstorage.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "folders", indexes = {
    @Index(name = "idx_folders_owner", columnList = "ownerId"),
    @Index(name = "idx_folders_parent", columnList = "parentFolderId")
})
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Long ownerId;
    private Long parentFolderId; // null = this is a root-level folder
    private boolean trashed = false;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public Long getParentFolderId() { return parentFolderId; }
    public void setParentFolderId(Long parentFolderId) { this.parentFolderId = parentFolderId; }
    public boolean isTrashed() { return trashed; }
    public void setTrashed(boolean trashed) { this.trashed = trashed; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}