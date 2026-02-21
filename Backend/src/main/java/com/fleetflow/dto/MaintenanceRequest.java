package com.fleetflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class MaintenanceRequest {
    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Service type is required")
    private String serviceType;

    @NotNull(message = "Service date is required")
    private LocalDate serviceDate;

    private BigDecimal cost;
    private Double odometerReading;

    @NotNull(message = "Vehicle ID is required")
    private String vehicleId;

    private String status;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public LocalDate getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(LocalDate serviceDate) {
        this.serviceDate = serviceDate;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public Double getOdometerReading() {
        return odometerReading;
    }

    public void setOdometerReading(Double odometerReading) {
        this.odometerReading = odometerReading;
    }

    public String getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(String vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
