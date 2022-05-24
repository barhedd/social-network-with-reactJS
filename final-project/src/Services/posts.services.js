// url for getting all the posts 
import { homePost } from "./utilites"
const BASE_URL = 'https://posts-pw2021.herokuapp.com/api/v1/post/all'
const ONE_URL = 'https://posts-pw2021.herokuapp.com/api/v1/post/one/';
const FAV = 'https://posts-pw2021.herokuapp.com/api/v1/post/fav';



const services = {};

services.getPosts = async (token, limit = 10, page = 0) => {
    try {
        //getting the posts from the api
        const request = await fetch(`${BASE_URL}?limit=${limit}&page=${page}`, {
            headers: {
                //Header with the auth for accesing the post
                "Authorization": `Bearer ${token}`
            },
            method: "GET", //defining the method

        })

        //chekgin if response returned withoud problems
        const response = await request.json();
        if (request.ok) {

            const simplyfiedData = response['data'].map(homePost);
            return { response: true, data: simplyfiedData, pages: response['pages'] };
        }


        return { response: false, data: null }

    } catch (error) {
        console.log(error);
    }
}


services.getFavorites = async (token) => {
    try {
        //getting the posts from the api
        const request = await fetch(`${FAV}`, {
            headers: {
                //Header with the auth for accesing the post
                "Authorization": `Bearer ${token}`
            },
            method: "GET", //defining the method

        })

        //chekgin if response returned withoud problems
        const response = await request.json();

        if (request.ok) {

            const favorites = response['favorites'];
            let favPosts = [];
            for (let i = 0; i < favorites.length; i++) {
                let temp = await services.getOnePost(favorites[i], token)
                favPosts.push(temp['data']);

            }

    

            console.log(favPosts)
            return { response: true, data: favPosts };
        }


        return { response: false, data: null }

    } catch (error) {
        console.log(error);
    }
}



services.getOnePost = async (id, token) => {
    const request = await fetch(`${ONE_URL}${id}`, {
        headers: {
            //Header with the auth for accesing the post
            "Authorization": `Bearer ${token}`
        },
        method: "GET", //defining the method

    })

    const response = await request.json();
    if (request.ok) {
        const simplyfiedData = await homePost(response);
        return { response: true, data: simplyfiedData };
    }

    return { response: false, data: null }

}






export default services;