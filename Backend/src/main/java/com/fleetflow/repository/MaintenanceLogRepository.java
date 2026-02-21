package com.fleetflow.repository;

import com.fleetflow.entity.MaintenanceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, String> {
    List<MaintenanceLog> findByVehicleId(String vehicleId);
    
    @Query("SELECT SUM(m.cost) FROM MaintenanceLog m WHERE m.vehicle.id = :vehicleId")
    BigDecimal getTotalMaintenanceCostByVehicle(String vehicleId);
    
    @Query("SELECT SUM(m.cost) FROM MaintenanceLog m")
    BigDecimal getTotalMaintenanceCost();
}
