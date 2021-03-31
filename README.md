## Sofie Portal 

This is a userportal for accessing Sofie and Sisyfosclients, but can be user for any webpage.
It´s possible to see what other users are active on the webapge the user selects. And if used together with nginx it´s possible to access multiple ppages with only one port open. 
(deployment with nginx: https://github.com/olzzon/tv2-sofie-ansible)




Run as docker:
```
sudo docker run -p 3000:3000 -p 3000:3000/udp olzzon/tv2-sofie-portal:v0.1.5
```

In storage folder there´s a settings.json and a users.json file where you define webpages and access:
```
users.json:
    "users": [
        {
            "id": "afvdlyd",
            "name": "Afv.D Lyd",
            "accessRights": [
                {
                    "webpageId": "1"
                },
                {
                    "webpageId": "2",
                    "path": "/seneste",
                    "label": "2 -To Path"
                },
                {
                    "webpageId": "2"
                },
                {
                    "webpageId": "3"
                }
            ]
        },

settings.json:
{
   "webpages": [
        {
            "id": 1,
            "label": "Q-BOX 01",
            "description": "",
            "hostname": "http://localhost:1176"
        },
```
### Open webpage [http://localhost:3000] with username from /storage/user.json:
http://127.0.0.1:3000/?username=afvdlyd

