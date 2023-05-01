import { Box, Skeleton, Stack } from "@mui/material";
import React, { useState } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { db } from "../services/firebase";

import {
  collection,
  doc,
  getDoc,
  onSnapshot
} from "firebase/firestore";

const getUInfofromStorage = (type: any) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
  return userInfo ? userInfo[type] : "";
}


const NewsFeed = () => {
  const [loading, setLoading] = useState(true);


  const [fetchedPostDetails, setFetchedPostDetails] = useState<any>([])


  setTimeout(() => {
    setLoading(false);
  }, 3000);


  const getFollowerPost = async () => { //get posts 

    const getData = collection(db, "users", getUInfofromStorage('email'), "posts")

    const usersRef = doc(db, "users", getUInfofromStorage('email')) // getting user

    onSnapshot(getData, async (snapshot: any) => {

      const userList: any = await getDoc(usersRef);
      const userInfo = userList?.data()
      const postDetails: any = snapshot.docs.map((doc: any) => { return { ...doc.data(), 'name': userInfo.username, 'postId': doc.id } })
      console.log(postDetails, 'userInfo -')
      return setFetchedPostDetails(postDetails)
    })

  }


  React.useEffect(() => {

    getFollowerPost()
  }
    , []
  );

  let shortedArr: any
  const shortArraybyCreatedAt = (arraySet: any) => {
    const arr = arraySet.sort(function (a: any, b: any) {
      var c: any = new Date(a.createdAt);
      var d: any = new Date(b.createdAt);
      return d - c;
    });

    shortedArr = arr
  }

  return (
    <Box flex={4} p={{ xs: 0, md: 5 }}>
      <CreatePost setFetchedPostDetails={setFetchedPostDetails} />


      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          {shortArraybyCreatedAt(fetchedPostDetails)}
          {shortedArr.map((item: any) => (
            <Post postId={item.postId} name={item.name} createdAt={item.createdAt} img={item.img} desc={item.desc} taggedPerson={item.taggedPerson} shortedArr={shortedArr} />
          )
          )}

        </>
      )}
    </Box>
  );
};

export default NewsFeed;
