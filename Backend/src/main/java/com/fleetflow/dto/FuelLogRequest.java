package com.fleetflow.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;

public class FuelLogRequest {
    @NotNull(message = "Fuel date is required")
    private LocalDate fuelDate;
    
    @NotNull(message = "Liters is required")
    @Positive(message = "Liters must be positive")
    private Double liters;
    
    @NotNull(message = "Cost is required")
    @Positive(message = "Cost must be positive")
    private BigDecimal cost;
    
    private Double odometerReading;
    private String station;
    private String fuelType;
    
    @NotNull(message = "Vehicle ID is required")
    private String vehicleId;

    public LocalDate getFuelDate() { return fuelDate; }
    public void setFuelDate(LocalDate fuelDate) { this.fuelDate = fuelDate; }
    public Double getLiters() { return liters; }
    public void setLiters(Double liters) { this.liters = liters; }
    public BigDecimal getCost() { return cost; }
    public void setCost(BigDecimal cost) { this.cost = cost; }
    public Double getOdometerReading() { return odometerReading; }
    public void setOdometerReading(Double odometerReading) { this.odometerReading = odometerReading; }
    public String getStation() { return station; }
    public void setStation(String station) { this.station = station; }
    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }
    public String getVehicleId() { return vehicleId; }
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }
}
