package org.institutions.controller;

import org.institutions.model.Institution;
import org.institutions.respository.InstitutionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/institutions")
public class InstitutionController {
    private final InstitutionRepository repository;

    public InstitutionController(InstitutionRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<Page<Institution>> getAll(@PageableDefault(size = 10) Pageable pageable) {
        Page<Institution> institutions = repository.findAll(pageable);
        return ResponseEntity.ok(institutions);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Institution>> search(
            @RequestParam(required = false) String province,
            @RequestParam(required = false) String type,
            @PageableDefault(size = 10) Pageable pageable) {

        Page<Institution> institutions;

        if (province != null && type != null) {
            institutions = repository.findByProvinceAndType(province, type, pageable);
        } else if (province != null) {
            institutions = repository.findByProvince(province, pageable);
        } else if (type != null) {
            institutions = repository.findByType(type, pageable);
        } else {
            institutions = repository.findAll(pageable);
        }

        return ResponseEntity.ok(institutions);
    }
}
