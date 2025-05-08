package org.institutions.controller;


import org.institutions.model.Institution;
import org.institutions.respository.InstitutionRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/institutions")
public class InstitutionController {
    private final InstitutionRepository repository;

    public InstitutionController(InstitutionRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Institution> getAll() {
        return repository.findAll();
    }

    @GetMapping("/search")
    public List<Institution> search(
            @RequestParam(required = false) String province,
            @RequestParam(required = false) String type) {
        if (province != null && type != null) {
            return repository.findByProvinceAndType(province, type);
        } else if (province != null) {
            return repository.findByProvince(province);
        } else if (type != null) {
            return repository.findByType(type);
        }
        return repository.findAll();
    }
}
