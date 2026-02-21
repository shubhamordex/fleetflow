package com.fleetflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class VehicleRequest {
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "License plate is required")
    private String licensePlate;
    
    @NotBlank(message = "Model is required")
    private String model;
    
    @NotBlank(message = "Vehicle type is required")
    private String vehicleType;
    
    @NotNull(message = "Max load capacity is required")
    @Positive(message = "Max load capacity must be positive")
    private Double maxLoadCapacity;
    
    private Double odometer;
    private Double acquisitionCost;

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
}
