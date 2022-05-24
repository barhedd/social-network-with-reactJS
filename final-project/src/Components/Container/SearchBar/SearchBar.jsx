import { React, useState, useEffect, useContext } from 'react';
import Button from '../../Button/Button';
import postsServices from '../../../Services/posts.services'
import SearchIcon from '../../../Assets/Search.svg'
import SessionContext from '../../../Contexts/SessionContext';


const SearchBar = ({ searchFunction = () => { }, clearFunction = () => { }, loading = () => { } }) => {
    const [search, SetSearch] = useState("");
    const { authenticated } = useContext(SessionContext);

    useEffect(() => {
        console.log(search);
    }, [search])

    //function created to find one specific post, according to user input
    const searchPost = async (searchText, setter = () => { }) => {

        try {
            //token shall be added when login is incorporated
            //const token = 
            let found = false;

            //number of page to query
            let page = 0;
            let response;
            //const loginInfo = await postsServices.tempLogin();

            const token = authenticated.token;

            do {

                response = await postsServices.getPosts(token, 100, page)

                if (!response["response"]) {
                    console.log(response['error']);

                }
                else if (response['data'].length === 0) {
                    //If no data came back from the server, we go out of the loop, since we'd gone over everypost
                    break;
                }
                else {

                    if (response['data'].some(post => post.title === searchText)) {
                        found = true;

                    }
                    else
                        page += 1;



                }
            } while (found === false);


            if (found) {   //retriving the post needed 
                const searchedPost = response['data'].filter(post => post.title === searchText);

                setter(searchedPost)

            }
            else {
                console.log("error: Data not found")
                //return [];
            }
        } catch (error) {
            console.log(error);
        }



    }




    return (
        <div className="flex  flex-col flex-wrap justify-center justify-items-center content-evenly ">
            <div className="w-1/2  h-18 bg-loginpattern  p-4 rounded-xl shadow-lg   ">
                <form action="" className="w-auto h-auto flex flex-row flex-wrap justify-center justify-items-center content-evenly">
                    <input type="text" className="w-2/3 h-12 bg-purple-300  rounded-xl mr-2  my-2 font-normal p-4 text-center  u-sm:h-12" onChange={(e) => { SetSearch(e.target.value) }} value={search} />
                    <Button localStyle="w-12 h-12  ml-4 my-2" background={SearchIcon} onClick={(e) => { e.preventDefault(); searchPost(search, searchFunction); clearFunction(true); SetSearch("") }} />

                </form>
            </div >
        </div>
    )
}

//<button className="w-12 h-12  ml-4 my-2" style={{ backgroundImage: `url(${SearchIcon})` }}  name="Send"></button>
export default SearchBar;




