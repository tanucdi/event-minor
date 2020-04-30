const token = localStorage.getItem('jwtToken')

const config={
    headers:{
        "Content-Type":"application/json"
    }
}
config.headers['jwt-token']=token;

export default config;