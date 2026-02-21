package com.fleetflow.dto;

import com.fleetflow.entity.Vehicle;
import java.time.LocalDateTime;

public class VehicleResponse {
    private String id;
    private String name;
    private String licensePlate;
    private String model;
    private String vehicleType;
    private Double maxLoadCapacity;
    private Double odometer;
    private Double acquisitionCost;
    private String status;
    private Boolean isRetired;
    private LocalDateTime createdAt;

    public static VehicleResponse fromEntity(Vehicle vehicle) {
        VehicleResponse response = new VehicleResponse();
        response.setId(vehicle.getId());
        response.setName(vehicle.getName());
        response.setLicensePlate(vehicle.getLicensePlate());
        response.setModel(vehicle.getModel());
        response.setVehicleType(vehicle.getVehicleType());
        response.setMaxLoadCapacity(vehicle.getMaxLoadCapacity());
        response.setOdometer(vehicle.getOdometer());
        response.setAcquisitionCost(vehicle.getAcquisitionCost());
        response.setStatus(vehicle.getStatus().name());
        response.setIsRetired(vehicle.getIsRetired());
        response.setCreatedAt(vehicle.getCreatedAt());
        return response;
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
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Boolean getIsRetired() { return isRetired; }
    public void setIsRetired(Boolean isRetired) { this.isRetired = isRetired; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
