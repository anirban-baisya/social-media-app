import { Box, Stack, Skeleton, Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
// import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

import {
  query,
  collection,
  where,
  documentId,
  getDocs,
  doc,
  getDoc,
  onSnapshot
} from "firebase/firestore";

const getUInfofromStorage = (type: any) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
  return userInfo ? userInfo[type] : "";
}


const Feed = () => {
  const [loading, setLoading] = useState(true);


  const [fetchedPostDetails, setFetchedPostDetails] = useState<any>([])
  

  // setTimeout(() => {
  //   setLoading(false);
  // }, [3000]);
  setTimeout(() => {
    setLoading(false);
  }, 3000);


  const getFollowerPost = async () => { //get posts 

      const getData = collection(db, "users", getUInfofromStorage('email'), "posts")
     
      const usersRef = doc(db, "users", getUInfofromStorage('email') ) // getting user

        onSnapshot(getData, async (snapshot:any) =>{

          const userList:any =  await getDoc(usersRef);
         const userInfo = userList?.data()
          const postDetails:any = snapshot.docs.map((doc:any) => { return { ...doc.data() , 'name': userInfo.username ,'postId': doc.id } } )
          console.log(postDetails,'userInfo -')
          return setFetchedPostDetails(postDetails)
        })

  }


  React.useEffect(() => {

    // onSnapshot(collection(db, "users"), (snapshot) => { // get all users
    //   const setdata = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    //   setAllUserList(setdata)
    //   // console.log(setdata, 'setdata ---');

    // } )
    // // console.log(snapshot.docs, 'snapshot ---')

    getFollowerPost()


  }
    , []
  );

  let shortedArr :any
  const shortArraybyCreatedAt = (arraySet: any) => {
    // if (arraySet.length > 0) {
    const arr = arraySet.sort(function(a:any,b:any){
      var c:any = new Date(a.createdAt);
      var d:any = new Date(b.createdAt);
      return d-c;
      });
      // console.log(arr,'arr---');
      
      shortedArr = arr
    // } else {
    //   return []
    // }
  }
// console.log(shortedArr,'shortedArr--');

  // const shortArraybyCreatedAt = (arraySet: any) => {
  
  return (
    <Box flex={4} p={{ xs: 0, md: 5 }}>
      <CreatePost setFetchedPostDetails={setFetchedPostDetails}/>


      {/* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </CardActions> */}

      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <> 
        {/* log.sort(function(a,b){ var c = new Date(a.date); var d = new Date(b.date); return c-d; }) */}
        {/* {fetchedPostDetails?.sort(function(a:any,b:any){ var c = new Date(a.createdAt); var d = new Date(b.createdAt); return c-d; }).map((item: any) => ( */}
        {/* {shortArraybyCreatedAt(fetchedPostDetails).map((item: any) => ( */}
        {shortArraybyCreatedAt(fetchedPostDetails)}
        {shortedArr.map((item: any) => (
          <Post postId={item.postId} name={item.name} createdAt={item.createdAt} img={item.img} desc={item.desc} taggedPerson={item.taggedPerson} shortedArr={shortedArr}/>
        )
        )}
          
        </>
      )}
    </Box>
  );
};

export default Feed;
