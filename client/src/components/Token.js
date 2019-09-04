const idToken = 'id_token';

class Token {

    setToken(valueToken){
        localStorage.setItem(idToken, valueToken)
    }

    getToken(){
        return localStorage.getItem(idToken)
    }

    logout(){
        localStorage.removeItem(idToken);
    }

}

export const token = new Token();