package com.jfitz.bulletapi.dao;

import java.util.List;

import com.jfitz.bulletapi.modal.Bullet;

public interface BulletDAO {

    List<Bullet> get();

    Bullet get(int id);

    void save(Bullet bullet);

    void delete(int id);
}
