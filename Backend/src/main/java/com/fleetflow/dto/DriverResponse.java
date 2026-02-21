package com.fleetflow.dto;

import com.fleetflow.entity.Driver;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class DriverResponse {
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String licenseNumber;
    private String licenseCategory;
    private LocalDate licenseExpiry;
    private boolean licenseExpired;
    private Double safetyScore;
    private Integer tripsCompleted;
    private String status;
    private LocalDateTime createdAt;

    public static DriverResponse fromEntity(Driver driver) {
        DriverResponse response = new DriverResponse();
        response.setId(driver.getId());
        response.setFullName(driver.getFullName());
        response.setEmail(driver.getEmail());
        response.setPhone(driver.getPhone());
        response.setLicenseNumber(driver.getLicenseNumber());
        response.setLicenseCategory(driver.getLicenseCategory());
        response.setLicenseExpiry(driver.getLicenseExpiry());
        response.setLicenseExpired(driver.getLicenseExpiry().isBefore(LocalDate.now()));
        response.setSafetyScore(driver.getSafetyScore());
        response.setTripsCompleted(driver.getTripsCompleted());
        response.setStatus(driver.getStatus().name());
        response.setCreatedAt(driver.getCreatedAt());
        return response;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }
    public String getLicenseCategory() { return licenseCategory; }
    public void setLicenseCategory(String licenseCategory) { this.licenseCategory = licenseCategory; }
    public LocalDate getLicenseExpiry() { return licenseExpiry; }
    public void setLicenseExpiry(LocalDate licenseExpiry) { this.licenseExpiry = licenseExpiry; }
    public boolean isLicenseExpired() { return licenseExpired; }
    public void setLicenseExpired(boolean licenseExpired) { this.licenseExpired = licenseExpired; }
    public Double getSafetyScore() { return safetyScore; }
    public void setSafetyScore(Double safetyScore) { this.safetyScore = safetyScore; }
    public Integer getTripsCompleted() { return tripsCompleted; }
    public void setTripsCompleted(Integer tripsCompleted) { this.tripsCompleted = tripsCompleted; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
