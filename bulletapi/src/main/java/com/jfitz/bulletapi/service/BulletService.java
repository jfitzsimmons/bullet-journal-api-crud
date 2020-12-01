package com.jfitz.bulletapi.service;

import java.util.List;

import com.jfitz.bulletapi.modal.Bullet;

public interface BulletService {
    List<Bullet> get();

    Bullet get(int id);

    void save(Bullet bullet);

    void delete(int id);
}