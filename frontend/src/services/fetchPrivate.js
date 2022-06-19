export const fetchPrivate = ( endpoint, data, method = 'GET', id) => {

    const base = process.env.REACT_APP_BASE_URL || "http://localhost:8080/api";
   
    const url = `${base}${endpoint}/${id || ""}`;
   
    const token = localStorage.getItem("token") || '';
   
    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body:  data ? JSON.stringify( data ) : null
        });
    }
   }