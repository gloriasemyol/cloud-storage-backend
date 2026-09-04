package com.cloudstorage.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shares")
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long fileId;
    private Long sharedWithUserId;
    private String role; // "VIEWER" or "EDITOR"

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getFileId() { return fileId; }
    public void setFileId(Long fileId) { this.fileId = fileId; }
    public Long getSharedWithUserId() { return sharedWithUserId; }
    public void setSharedWithUserId(Long sharedWithUserId) { this.sharedWithUserId = sharedWithUserId; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}