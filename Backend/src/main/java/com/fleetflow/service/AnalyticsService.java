package com.fleetflow.service;

import com.fleetflow.dto.AnalyticsSummary;
import com.fleetflow.dto.VehicleAnalytics;
import com.fleetflow.entity.Vehicle;
import com.fleetflow.repository.FuelLogRepository;
import com.fleetflow.repository.MaintenanceLogRepository;
import com.fleetflow.repository.TripRepository;
import com.fleetflow.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {
    private final VehicleRepository vehicleRepository;
    private final TripRepository tripRepository;
    private final FuelLogRepository fuelLogRepository;
    private final MaintenanceLogRepository maintenanceLogRepository;

    public AnalyticsService(VehicleRepository vehicleRepository, TripRepository tripRepository,
            FuelLogRepository fuelLogRepository, MaintenanceLogRepository maintenanceLogRepository) {
        this.vehicleRepository = vehicleRepository;
        this.tripRepository = tripRepository;
        this.fuelLogRepository = fuelLogRepository;
        this.maintenanceLogRepository = maintenanceLogRepository;
    }

    public AnalyticsSummary getDashboardSummary() {
        AnalyticsSummary summary = new AnalyticsSummary();

        summary.setActiveFleet(vehicleRepository.countActiveVehicles());
        summary.setMaintenanceAlerts(vehicleRepository.countVehiclesInShop());

        Long totalVehicles = vehicleRepository.countTotalActiveVehicles();
        Long activeVehicles = vehicleRepository.countActiveVehicles();
        Double utilizationRate = totalVehicles > 0 ? (double) activeVehicles / totalVehicles * 100 : 0.0;
        summary.setUtilizationRate(utilizationRate);

        summary.setPendingCargo(tripRepository.countPendingTrips());
        summary.setTotalTripsCompleted(tripRepository.countCompletedTrips());
        summary.setActiveTrips(tripRepository.countActiveTrips());

        BigDecimal totalFuelCost = fuelLogRepository.getTotalFuelCost();
        summary.setTotalFuelCost(totalFuelCost != null ? totalFuelCost : BigDecimal.ZERO);

        BigDecimal totalMaintenanceCost = maintenanceLogRepository.getTotalMaintenanceCost();
        summary.setTotalMaintenanceCost(totalMaintenanceCost != null ? totalMaintenanceCost : BigDecimal.ZERO);

        BigDecimal operationalCost = (totalFuelCost != null ? totalFuelCost : BigDecimal.ZERO)
                .add(totalMaintenanceCost != null ? totalMaintenanceCost : BigDecimal.ZERO);
        summary.setTotalOperationalCost(operationalCost);

        return summary;
    }

    public List<VehicleAnalytics> getVehicleAnalytics() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        List<VehicleAnalytics> analyticsList = new ArrayList<>();

        for (Vehicle vehicle : vehicles) {
            VehicleAnalytics analytics = new VehicleAnalytics();
            analytics.setVehicleId(vehicle.getId());
            analytics.setVehicleName(vehicle.getName());
            analytics.setLicensePlate(vehicle.getLicensePlate());

            Double totalLiters = fuelLogRepository.getTotalLitersByVehicle(vehicle.getId());
            analytics.setTotalFuel(totalLiters != null ? totalLiters : 0.0);

            BigDecimal fuelCost = fuelLogRepository.getTotalFuelCostByVehicle(vehicle.getId());
            analytics.setTotalFuelCost(fuelCost != null ? fuelCost : BigDecimal.ZERO);

            BigDecimal maintenanceCost = maintenanceLogRepository.getTotalMaintenanceCostByVehicle(vehicle.getId());
            analytics.setTotalMaintenanceCost(maintenanceCost != null ? maintenanceCost : BigDecimal.ZERO);

            BigDecimal operationalCost = (fuelCost != null ? fuelCost : BigDecimal.ZERO)
                    .add(maintenanceCost != null ? maintenanceCost : BigDecimal.ZERO);
            analytics.setTotalOperationalCost(operationalCost);

            Double distance = vehicle.getOdometer();
            analytics.setTotalDistance(distance);

            if (distance != null && distance > 0 && totalLiters != null && totalLiters > 0) {
                analytics.setFuelEfficiency(distance / totalLiters);
            } else {
                analytics.setFuelEfficiency(0.0);
            }

            Long tripsCompleted = tripRepository.findByVehicleId(vehicle.getId()).stream()
                    .filter(t -> t.getStatus().name().equals("COMPLETED"))
                    .count();

            if (vehicle.getAcquisitionCost() != null && vehicle.getAcquisitionCost() > 0) {
                BigDecimal revenue = BigDecimal.valueOf(tripsCompleted * 1000);
                BigDecimal roi = revenue.subtract(operationalCost)
                        .divide(BigDecimal.valueOf(vehicle.getAcquisitionCost()), 4, RoundingMode.HALF_UP)
                        .multiply(BigDecimal.valueOf(100));
                analytics.setRoi(roi);
            }

            analyticsList.add(analytics);
        }

        return analyticsList;
    }

    public List<VehicleAnalytics> getDeadStock() {
        return getVehicleAnalytics().stream()
                .filter(a -> a.getRoi() != null && a.getRoi().compareTo(BigDecimal.ZERO) <= 0)
                .collect(Collectors.toList());
    }

    public String getOperationalReport() {
        List<VehicleAnalytics> data = getVehicleAnalytics();
        StringBuilder sb = new StringBuilder();
        sb.append(
                "Vehicle ID,Name,License Plate,Fuel (L),Fuel Cost,Maint Cost,Total Cost,Dist (km),Efficiency,ROI (%)\n");
        for (VehicleAnalytics a : data) {
            sb.append(a.getVehicleId()).append(",")
                    .append(a.getVehicleName()).append(",")
                    .append(a.getLicensePlate()).append(",")
                    .append(a.getTotalFuel()).append(",")
                    .append(a.getTotalFuelCost()).append(",")
                    .append(a.getTotalMaintenanceCost()).append(",")
                    .append(a.getTotalOperationalCost()).append(",")
                    .append(a.getTotalDistance()).append(",")
                    .append(a.getFuelEfficiency()).append(",")
                    .append(a.getRoi()).append("\n");
        }
        return sb.toString();
    }
}
