package com.fleetflow.dto;

import java.math.BigDecimal;

public class AnalyticsSummary {
    private Long activeFleet;
    private Long maintenanceAlerts;
    private Double utilizationRate;
    private Long pendingCargo;
    private Long totalTripsCompleted;
    private Long activeTrips;
    private BigDecimal totalFuelCost;
    private BigDecimal totalMaintenanceCost;
    private BigDecimal totalOperationalCost;

    public Long getActiveFleet() { return activeFleet; }
    public void setActiveFleet(Long activeFleet) { this.activeFleet = activeFleet; }
    public Long getMaintenanceAlerts() { return maintenanceAlerts; }
    public void setMaintenanceAlerts(Long maintenanceAlerts) { this.maintenanceAlerts = maintenanceAlerts; }
    public Double getUtilizationRate() { return utilizationRate; }
    public void setUtilizationRate(Double utilizationRate) { this.utilizationRate = utilizationRate; }
    public Long getPendingCargo() { return pendingCargo; }
    public void setPendingCargo(Long pendingCargo) { this.pendingCargo = pendingCargo; }
    public Long getTotalTripsCompleted() { return totalTripsCompleted; }
    public void setTotalTripsCompleted(Long totalTripsCompleted) { this.totalTripsCompleted = totalTripsCompleted; }
    public Long getActiveTrips() { return activeTrips; }
    public void setActiveTrips(Long activeTrips) { this.activeTrips = activeTrips; }
    public BigDecimal getTotalFuelCost() { return totalFuelCost; }
    public void setTotalFuelCost(BigDecimal totalFuelCost) { this.totalFuelCost = totalFuelCost; }
    public BigDecimal getTotalMaintenanceCost() { return totalMaintenanceCost; }
    public void setTotalMaintenanceCost(BigDecimal totalMaintenanceCost) { this.totalMaintenanceCost = totalMaintenanceCost; }
    public BigDecimal getTotalOperationalCost() { return totalOperationalCost; }
    public void setTotalOperationalCost(BigDecimal totalOperationalCost) { this.totalOperationalCost = totalOperationalCost; }
}
