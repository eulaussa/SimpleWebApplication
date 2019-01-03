# SimpleWebApplication
This is a simple app with two endpoints written using node.js.
You can access it from 18.218.82.91 with port number 8080 using any browser.

1) /messages takes a string message as POST and returns its SHA256 hashed version,
using the command:  curl -X POST --data 'message=*enter message here*' http://18.218.82.91:8080/messages/
2) /messages/<hash> returns the original version of the hashed message as GET
using the command: curl http://18.218.82.91:1234/messages/*enter hash*
a request to the nonexistent message returns 404 error.

Additional Questions:
1) How can you scale your implementation?
I used a string array to store the data, which is quite inefficient because it's limited and when 
the server crashes, data would be lost becuse no back up mechanism, storing it in a db or text file, 
is used. 
If there are lot of users trying to connect (after using an efficient way to store the data instead of
an array), the best approach is to build the application so that whenever a user tries to post a message,
the message to be stored would be forwarded to a different server according to its hash value. Maybe 
checking the first and the last characters of the hash can be the forwarding criterion.
2) How did you deploy this application? How can you improve this process and make it easy to maintain?
I used AWS to deploy the application and it was quite easy to do it. I also needed a static IP address 
because when something unexpected happenes, IP address would change and I'd need to provide a new IP 
address everytime, which is extremely inconvenient. 
