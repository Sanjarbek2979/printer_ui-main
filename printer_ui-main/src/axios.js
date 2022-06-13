import axios from "axios";
import auth from "@/store/modules/auth/auth";


axios.defaults.baseURL = 'http://172.18.45.65:8088/api'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = 'Bearer' + auth.state.token
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,DELETE,PUT';
axios.defaults.headers.common['Access-Control-Allow-Headers']= 'Origin,Content-Type,X-Requested-With, X-Auth-Token, Accept,Authorization';
//

