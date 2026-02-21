package com.fleetflow.dto;

import com.fleetflow.entity.Trip;
import java.time.LocalDateTime;

public class TripResponse {
    private String id;
    private String origin;
    private String destination;
    private String cargoDescription;
    private Double cargoWeight;
    private Double startOdometer;
    private Double endOdometer;
    private Double distanceTraveled;
    private LocalDateTime scheduledAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private String status;
    private String vehicleId;
    private String vehicleName;
    private String vehicleLicensePlate;
    private String driverId;
    private String driverName;
    private LocalDateTime createdAt;

    public static TripResponse fromEntity(Trip trip) {
        TripResponse response = new TripResponse();
        response.setId(trip.getId());
        response.setOrigin(trip.getOrigin());
        response.setDestination(trip.getDestination());
        response.setCargoDescription(trip.getCargoDescription());
        response.setCargoWeight(trip.getCargoWeight());
        response.setStartOdometer(trip.getStartOdometer());
        response.setEndOdometer(trip.getEndOdometer());
        if (trip.getStartOdometer() != null && trip.getEndOdometer() != null) {
            response.setDistanceTraveled(trip.getEndOdometer() - trip.getStartOdometer());
        }
        response.setScheduledAt(trip.getScheduledAt());
        response.setStartedAt(trip.getStartedAt());
        response.setCompletedAt(trip.getCompletedAt());
        response.setStatus(trip.getStatus().name());
        response.setVehicleId(trip.getVehicle().getId());
        response.setVehicleName(trip.getVehicle().getName());
        response.setVehicleLicensePlate(trip.getVehicle().getLicensePlate());
        response.setDriverId(trip.getDriver().getId());
        response.setDriverName(trip.getDriver().getFullName());
        response.setCreatedAt(trip.getCreatedAt());
        return response;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getCargoDescription() { return cargoDescription; }
    public void setCargoDescription(String cargoDescription) { this.cargoDescription = cargoDescription; }
    public Double getCargoWeight() { return cargoWeight; }
    public void setCargoWeight(Double cargoWeight) { this.cargoWeight = cargoWeight; }
    public Double getStartOdometer() { return startOdometer; }
    public void setStartOdometer(Double startOdometer) { this.startOdometer = startOdometer; }
    public Double getEndOdometer() { return endOdometer; }
    public void setEndOdometer(Double endOdometer) { this.endOdometer = endOdometer; }
    public Double getDistanceTraveled() { return distanceTraveled; }
    public void setDistanceTraveled(Double distanceTraveled) { this.distanceTraveled = distanceTraveled; }
    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getVehicleId() { return vehicleId; }
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }
    public String getVehicleName() { return vehicleName; }
    public void setVehicleName(String vehicleName) { this.vehicleName = vehicleName; }
    public String getVehicleLicensePlate() { return vehicleLicensePlate; }
    public void setVehicleLicensePlate(String vehicleLicensePlate) { this.vehicleLicensePlate = vehicleLicensePlate; }
    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }
    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
