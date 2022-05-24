const BASE_URL = 'https://posts-pw2021.herokuapp.com/api/v1';

export const useAdminServices = {
    tempLogin: async () => {
        try {
            // definition of request's config
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
                body: "username=gp30_admin&password=QNnbLKHxVe7ktNog",
            }

            const response = await fetch( `${BASE_URL}/auth/signin`, config );
    
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error(error);
            return {};
        }
    },

    getAdminPosts: async ( token, limit = 10, page = 0 ) => {
        try {
            // definition of request's config
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                method: "GET",
            }

            // getting the owned posts from the api
            const response = await fetch( `${BASE_URL}/post/owned?limit=${limit}&page=${page}`, config );
    
            // chekgin if response returned withoud problems
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    },

    getOnePost: async ( token, id ) => {
        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                method: "GET",
            }

            const response = await fetch( `${BASE_URL}/post/one/${id}`, config );
    
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch ( error ) {
            console.log( error );
        }
    },

    createPost: async ( token, title, description, image ) => {
        try {
            // definition of request's config
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title: title, description: description, image: image }),
            }

            // making the request to the api
            const response = await fetch( `${BASE_URL}/post/create`, config );
    
            // chekgin if response returned withoud problems
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch ( error ) {
            console.log( error );
        }
    },

    toggleActive: async ( token, id ) => {
        try {
            // definition of request's config
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                method: "PATCH",
            }

            const response = await fetch( `${BASE_URL}/post/toggle/${id}`, config );
    
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch ( error ) {
            console.log( error );
        }
    },

    updatePost: async ( token, id, title, description, image ) => {
        try {
            const config = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title: title, description: description, image: image }),
            }

            const response = await fetch( `${BASE_URL}/post/update/${id}`, config );
    
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch ( error ) {
            console.log( error );
        }
    } 
}