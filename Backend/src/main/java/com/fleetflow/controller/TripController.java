package com.fleetflow.controller;

import com.fleetflow.dto.TripRequest;
import com.fleetflow.dto.TripResponse;
import com.fleetflow.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {
    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public ResponseEntity<List<TripResponse>> getAllTrips() {
        return ResponseEntity.ok(tripService.getAllTrips());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripResponse> getTripById(@PathVariable String id) {
        return ResponseEntity.ok(tripService.getTripById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<TripResponse>> getTripsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(tripService.getTripsByStatus(status));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'DISPATCHER', 'ADMIN')")
    public ResponseEntity<TripResponse> createTrip(@Valid @RequestBody TripRequest request) {
        return ResponseEntity.ok(tripService.createTrip(request));
    }

    @PatchMapping("/{id}/dispatch")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'DISPATCHER', 'ADMIN')")
    public ResponseEntity<TripResponse> dispatchTrip(@PathVariable String id) {
        return ResponseEntity.ok(tripService.dispatchTrip(id));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<TripResponse> completeTrip(@PathVariable String id,
            @RequestParam Double endOdometer) {
        return ResponseEntity.ok(tripService.completeTrip(id, endOdometer));
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'DISPATCHER', 'ADMIN')")
    public ResponseEntity<TripResponse> cancelTrip(@PathVariable String id) {
        return ResponseEntity.ok(tripService.cancelTrip(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'DISPATCHER', 'ADMIN')")
    public ResponseEntity<TripResponse> updateTrip(@PathVariable String id,
            @Valid @RequestBody TripRequest request) {
        return ResponseEntity.ok(tripService.updateTrip(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'ADMIN')")
    public ResponseEntity<Void> deleteTrip(@PathVariable String id) {
        tripService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }
}
