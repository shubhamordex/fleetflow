package com.fleetflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

public class TripRequest {
    @NotBlank(message = "Origin is required")
    private String origin;
    
    @NotBlank(message = "Destination is required")
    private String destination;
    
    private String cargoDescription;
    
    @NotNull(message = "Cargo weight is required")
    @Positive(message = "Cargo weight must be positive")
    private Double cargoWeight;
    
    @NotNull(message = "Vehicle ID is required")
    private String vehicleId;
    
    @NotNull(message = "Driver ID is required")
    private String driverId;
    
    private LocalDateTime scheduledAt;

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getCargoDescription() { return cargoDescription; }
    public void setCargoDescription(String cargoDescription) { this.cargoDescription = cargoDescription; }
    public Double getCargoWeight() { return cargoWeight; }
    public void setCargoWeight(Double cargoWeight) { this.cargoWeight = cargoWeight; }
    public String getVehicleId() { return vehicleId; }
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }
    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }
    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }
}
