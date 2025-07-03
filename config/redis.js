import { createClient } from 'redis';


export var client;

export default  function connectRedis() {
  

    client=createClient({
          
    });
  
       return client.connect()
  } 

