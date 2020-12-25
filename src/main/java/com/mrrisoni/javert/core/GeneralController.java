package core;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import com.mrrisoni.spring_repos.HostsRepository;
import com.mrrisoni.entities.Hosts;

import java.util.Collection;
import java.lang.Iterable;

@RestController
public class GeneralController {

    @Autowired
    HostsRepository hostsRepo;

    @RequestMapping(value=  "/api/version" , method = RequestMethod.GET)
    public ResponseEntity<String> getVersion() {
        return new ResponseEntity<>("4.5.0.11", HttpStatus.OK);
    }

    @RequestMapping(value=  "/api/hosts" , method = RequestMethod.GET)
    public Iterable<Hosts> getHosts() {
        return hostsRepo.findAll();
    }
}
