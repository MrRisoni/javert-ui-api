package core;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GeneralController {

    @Autowired
    HostsRepository hostsRepo;

    @RequestMapping(value=  "/api/version" , method = RequestMethod.GET)
    public ResponseEntity<String> getVersion() {
        return new ResponseEntity<>("4.5.0.11", HttpStatus.OK);
    }

    @RequestMapping(value=  "/api/hosts" , method = RequestMethod.GET)
    public Collection<Hosts> getHosts() {
        return hostsRepo.findAll();
    }
}
