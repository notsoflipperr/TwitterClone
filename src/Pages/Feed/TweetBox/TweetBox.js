import React, {  useState } from 'react';
import { Avatar, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './TweetBox.css';
import axios from 'axios';
import useLoggedInUser from '../../../Hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const TweetBox = () => {
    const [post, setPost] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [loggedInUser] = useLoggedInUser();
    //console.log(loggedInUser)
    const [user] = useAuthState(auth);
    const email = user?.email;

    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"

    const handleUploadImage = (e) =>{
        setIsLoading(true);
        const image = e.target.files[0];
        
        const formData = new FormData();
        formData.set('image', image);

        axios.post("https://api.imgbb.com/1/upload?key=02f7d474897a7d1b5c5131bc5b971133",formData)
        .then(res=>{
            setImageURL(res.data.data.display_url)
            console.log(res.data.data.display_url)
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })

    }

    const handleTweet = async (e) => {
        e.preventDefault();
        console.log(user);
        if(user.providerData[0].providerId === 'password'){
            await fetch(`https://twitter-clone-f5od.onrender.com/loggedInUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setName(data[0]?.name)
                    setUserName(data[0]?.username)
                })
        }
        else{
            setName(user?.displayName)
            setUserName(email?.split('@')[0])
        }
        console.log(loggedInUser);
        if(loggedInUser[0]?._id){
            const userPost = {
                post: post,
                photo: imageURL,
                userId: loggedInUser[0]?._id
            }
            console.log(userPost)
            setPost('');
            setImageURL('');
            fetch(`https://twitter-clone-f5od.onrender.com/post`, {
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                 },
                body: JSON.stringify(userPost)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                })
            .catch( e => {
                console.error(e);
            })
        } else {
            console.log("w");
        }

    }
    
    
    return (
        <div className='tweetBox'>
            <form onSubmit={handleTweet}>
                <div className='tweetBox__input'>
                    <Avatar src= {loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"} />
                    <input
                        type='text'
                        placeholder="What's happening?"
                        onChange={(e) => setPost(e.target.value)}
                        value={post}
                        required
                    />
                </div>
                <div className='imageIcon_tweetButton'>
                    <label htmlFor='image' className='imageIcon'>
                        {
                            isLoading ? <p>Uploading Image..</p> : <p>{imageURL ? 'Image Uploaded' : <AddPhotoAlternateIcon />}</p>
                        }
                    </label>
                    <input
                        type='file'
                        id='image'
                        className='imageInput'
                        onChange={handleUploadImage}
                    />
                    <Button className='tweetBox__tweetButton' type='submit'>Tweet</Button>
                </div>
            </form>   
        </div>
    );
};

export default TweetBox;