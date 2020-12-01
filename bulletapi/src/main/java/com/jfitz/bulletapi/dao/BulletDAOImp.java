package com.jfitz.bulletapi.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.jfitz.bulletapi.modal.Bullet;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BulletDAOImp implements BulletDAO {
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Bullet> get() {
        Session currSession = entityManager.unwrap(Session.class);
        Query<Bullet> query = currSession.createQuery("from Bullet", Bullet.class);
        List<Bullet> list = query.getResultList();
        return list;
    }

    @Override
    public Bullet get(int id) {
	     Session currSession = entityManager.unwrap(Session.class);
	     Bullet bllt = currSession.get(Bullet.class, id);
	     return bllt;
    }
    
    @Override
    public void save(Bullet employee) {
     
     Session currSession = entityManager.unwrap(Session.class);
     currSession.saveOrUpdate(employee);}
    
    @Override
    public void delete(int id) {
     Session currSession = entityManager.unwrap(Session.class);
     Bullet bllt = currSession.get(Bullet.class, id);
     currSession.delete(bllt);}
}