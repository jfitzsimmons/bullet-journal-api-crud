package com.jfitz.bulletapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jfitz.bulletapi.service.BulletService;
import com.jfitz.bulletapi.modal.Bullet;

@RestController
@RequestMapping("/api")
public class BulletController {

	@Autowired
	private BulletService bulletService;

	@GetMapping("/bullet")
	public List<Bullet> get() {
		return bulletService.get();
	}

	@PostMapping("/bullet")
	public Bullet save(@RequestBody Bullet bullet) {
		bulletService.save(bullet);
		return bullet;
	}

	@GetMapping("/bullet/{id}")
	public Bullet get(@PathVariable int id) {
		return bulletService.get(id);
	}

	@DeleteMapping("/bullet/{id}")
	public String delete(@PathVariable int id) {

		bulletService.delete(id);

		return "Bullet removed with id " + id;

	}

	@PutMapping("/bullet")
	public Bullet update(@RequestBody Bullet bullet) {
		bulletService.save(bullet);
		return bullet;
	}

}