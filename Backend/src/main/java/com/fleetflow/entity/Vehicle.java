package com.fleetflow.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(name = "license_plate", nullable = false, unique = true)
    private String licensePlate;

    @Column(nullable = false, length = 100)
    private String model;

    @Column(name = "vehicle_type", nullable = false)
    private String vehicleType;

    @Column(name = "max_load_capacity", nullable = false)
    private Double maxLoadCapacity;

    @Column(nullable = false)
    private Double odometer = 0.0;

    @Column(name = "acquisition_cost")
    private Double acquisitionCost;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.AVAILABLE;

    @Column(name = "is_retired", nullable = false)
    private Boolean isRetired = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum Status {
        AVAILABLE, ON_TRIP, IN_SHOP, RETIRED
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLicensePlate() { return licensePlate; }
    public void setLicensePlate(String licensePlate) { this.licensePlate = licensePlate; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }
    public Double getMaxLoadCapacity() { return maxLoadCapacity; }
    public void setMaxLoadCapacity(Double maxLoadCapacity) { this.maxLoadCapacity = maxLoadCapacity; }
    public Double getOdometer() { return odometer; }
    public void setOdometer(Double odometer) { this.odometer = odometer; }
    public Double getAcquisitionCost() { return acquisitionCost; }
    public void setAcquisitionCost(Double acquisitionCost) { this.acquisitionCost = acquisitionCost; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public Boolean getIsRetired() { return isRetired; }
    public void setIsRetired(Boolean isRetired) { this.isRetired = isRetired; }
    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
