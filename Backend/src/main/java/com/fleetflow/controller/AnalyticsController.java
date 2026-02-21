package com.fleetflow.controller;

import com.fleetflow.dto.AnalyticsSummary;
import com.fleetflow.dto.VehicleAnalytics;
import com.fleetflow.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<AnalyticsSummary> getDashboardSummary() {
        return ResponseEntity.ok(analyticsService.getDashboardSummary());
    }

    @GetMapping("/vehicles")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'FINANCIAL_ANALYST', 'ADMIN')")
    public ResponseEntity<List<VehicleAnalytics>> getVehicleAnalytics() {
        return ResponseEntity.ok(analyticsService.getVehicleAnalytics());
    }

    @GetMapping("/dead-stock")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'ADMIN')")
    public ResponseEntity<List<VehicleAnalytics>> getDeadStock() {
        return ResponseEntity.ok(analyticsService.getDeadStock());
    }

    @GetMapping("/report")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'FINANCIAL_ANALYST', 'ADMIN')")
    public ResponseEntity<String> getOperationalReport() {
        return ResponseEntity.ok()
                .header("Content-Type", "text/csv")
                .header("Content-Disposition", "attachment; filename=fleet_report.csv")
                .body(analyticsService.getOperationalReport());
    }
}
