package com.jfitz.bulletapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jfitz.bulletapi.dao.BulletDAO;
import com.jfitz.bulletapi.modal.Bullet;

@Service
public class BulletServiceImp implements BulletService {
	
	@Autowired
	private BulletDAO bulletDao;

	@Transactional
	@Override
	public List<Bullet> get() {
		return bulletDao.get();
	}

	@Transactional
	@Override
	public Bullet get(int id) {
		return bulletDao.get(id);
	}

	@Transactional
	@Override
	public void save(Bullet bullet) {
		bulletDao.save(bullet);
		
	}

	@Transactional
	@Override
	public void delete(int id) {
		bulletDao.delete(id);
		
	}

}