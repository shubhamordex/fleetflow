package com.fleetflow.dto;

import java.math.BigDecimal;

public class VehicleAnalytics {
    private String vehicleId;
    private String vehicleName;
    private String licensePlate;
    private Double totalDistance;
    private Double totalFuel;
    private Double fuelEfficiency;
    private BigDecimal totalFuelCost;
    private BigDecimal totalMaintenanceCost;
    private BigDecimal totalOperationalCost;
    private BigDecimal roi;

    public String getVehicleId() { return vehicleId; }
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }
    public String getVehicleName() { return vehicleName; }
    public void setVehicleName(String vehicleName) { this.vehicleName = vehicleName; }
    public String getLicensePlate() { return licensePlate; }
    public void setLicensePlate(String licensePlate) { this.licensePlate = licensePlate; }
    public Double getTotalDistance() { return totalDistance; }
    public void setTotalDistance(Double totalDistance) { this.totalDistance = totalDistance; }
    public Double getTotalFuel() { return totalFuel; }
    public void setTotalFuel(Double totalFuel) { this.totalFuel = totalFuel; }
    public Double getFuelEfficiency() { return fuelEfficiency; }
    public void setFuelEfficiency(Double fuelEfficiency) { this.fuelEfficiency = fuelEfficiency; }
    public BigDecimal getTotalFuelCost() { return totalFuelCost; }
    public void setTotalFuelCost(BigDecimal totalFuelCost) { this.totalFuelCost = totalFuelCost; }
    public BigDecimal getTotalMaintenanceCost() { return totalMaintenanceCost; }
    public void setTotalMaintenanceCost(BigDecimal totalMaintenanceCost) { this.totalMaintenanceCost = totalMaintenanceCost; }
    public BigDecimal getTotalOperationalCost() { return totalOperationalCost; }
    public void setTotalOperationalCost(BigDecimal totalOperationalCost) { this.totalOperationalCost = totalOperationalCost; }
    public BigDecimal getRoi() { return roi; }
    public void setRoi(BigDecimal roi) { this.roi = roi; }
}
