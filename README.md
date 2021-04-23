## Sofie Portal 

This is a userportal for accessing Sofie and Sisyfosclients, but can be user for any webpage.
It´s possible to see what other users are active on the webapge the user selects. And if used together with nginx it´s possible to access multiple ppages with only one port open. 
(deployment with nginx: https://github.com/olzzon/tv2-sofie-ansible)




Run as docker:
```
sudo docker run -p 3000:3000 -p 3000:3000/udp olzzon/tv2-sofie-portal:v0.1.5
```

## Admin Page:

```
http://localhost:3000/admin
```
Adminsettings will be stored in build/storage/users.json (same place as the settings file)
 
### Open webpage [http://localhost:3000] with username from /storage/user.json:
```
http://127.0.0.1:3000/?username=afvdlyd
```

### Open a webpage as a slave of another page:
```
http://127.0.0.1:3000/?username=mcr1&master=afvdlyd
```


### Storage files:

In storage folder there´s a settings.json and a users.json file where you define machines:
```

settings.json:
{
   "machines": [
        {
            "id": 1,
            "label": "Q-BOX 01",
            "description": "",
            "hostname": "http://localhost:1176",
            "pathArgs": "/?settings=0"
        },
```
