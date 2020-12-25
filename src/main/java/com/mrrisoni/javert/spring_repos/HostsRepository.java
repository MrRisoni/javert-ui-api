package com.mrrisoni.spring_repos;

import com.mrrisoni.entities.Hosts;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HostsRepository  extends CrudRepository<Hosts,Long> {
}
