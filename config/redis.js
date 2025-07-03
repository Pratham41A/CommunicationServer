import { createClient } from 'redis';


export var client;

export default  function connectRedis() {
  

    client=createClient({
          url:process.env.REDIS_URI
    });
  
       return client.connect()
  } 

