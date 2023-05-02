import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import { arrayRemove, collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../services/firebase";

const getUInfofromStorage = (type: any) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
  return userInfo ? userInfo[type] : "";
}

const Rightbar = () => {
  const [allUserList, setAllUserList] = useState<any>([]);
  const [FollwerList, setFollwerList] = useState<any>([]);

  const getFollowerList = async () => { //get following friend list
    const docRef = doc(db, "users", getUInfofromStorage('email')); // get particular sec
    const docSnap: any = await getDoc(docRef)
    Promise.all(docSnap.data().followingFriend.map((doc: any) => {
      return doc
    })).then((results) => {
      onSnapshot(collection(db, "users"), async (snapshot) => { // get all users collection
        const setdata = snapshot.docs.map((e) => ({ id: e.id, ...e.data() }))
        const filterdFollwerList = setdata.filter(element => results.includes(element.id))
        setFollwerList(filterdFollwerList)

      })

    })

  }


  React.useEffect(() => {

    onSnapshot(collection(db, "users"), (snapshot) => { // get all users
      const setdata = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setAllUserList(setdata)
    })

    getFollowerList();

  }
    , []
  );


  const followFriend = (async (followingFriendId: any, name: any) => {

    const usersRef = doc(db, "users", getUInfofromStorage('email')); //update user doc

    const getPreviousFollowingList: any = await getDoc(usersRef);
    let dataArr: any = []
    if (getPreviousFollowingList?.data()?.followingFriend) {
      getPreviousFollowingList?.data()?.followingFriend.map((doc: any) => {
        dataArr.push(doc)
      });
    } else {
      await updateDoc(usersRef, { followingFriend: dataArr })
    }

    dataArr.push(followingFriendId)

    const payload = { followingFriend: dataArr }
    await updateDoc(usersRef, payload)// update users doc
      .then(() => {
        toast.success(`Following ${name}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        getFollowerList()
      })

  });

  const unFollowFriend = (async (unfollowingFriendId: any, name: any) => {
    const usersRef = doc(db, "users", getUInfofromStorage('email')); //update user doc

    await updateDoc(usersRef, {
      'followingFriend': arrayRemove(unfollowingFriendId)
    })
      .then(() => {
        toast.success(`Unfollow ${name}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        getFollowerList()
      })



  });


  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width={300}>

        <Typography variant="h6" fontWeight={100} mt={2}>
          All Followers
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {FollwerList?.map((item: any) => (
            <>
              <ListItem alignItems="flex-start"
                secondaryAction={
                  <Stack direction="column" gap={1} mt={2} mb={3}>
                    <Button onClick={() => unFollowFriend(item?.email, item?.username)}>UnFollow</Button>
                  </Stack>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={item?.username || ''} src={item?.avatar || " "} />
                </ListItemAvatar>
                <ListItemText
                  primary={item?.username}

                  secondary={
                    <React.Fragment>
                      {item?.bio && <><Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Bio -
                      </Typography>
                        {`  ${item?.bio}`}
                      </>}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}

        </List>


        <Typography variant="h6" fontWeight={100} mt={2}>
          Add Following
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {allUserList?.filter((element: any) => (element.id != getUInfofromStorage('email'))
            // FollwerList.includes(element.id) 
            // (FollwerList.map((e:any) => (e.id != element.id )) )
            //.filter((e:any) =>  FollwerList.includes(e.id ))
          ).map((item: any) => (
            <>
              <ListItem alignItems="flex-start"
                secondaryAction={
                  <Stack direction="column" gap={1} mt={2} mb={3}>
                    <Button onClick={() => followFriend(item?.email, item?.username)}>Follow</Button>
                  </Stack>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={item?.username || ''} src={item?.avatar || " "} />
                </ListItemAvatar>
                <ListItemText
                  primary={item?.username}

                  secondary={
                    <React.Fragment>
                      {item?.bio && <><Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Bio -
                      </Typography>
                        {`  ${item?.bio}`} </>}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}

        </List>

      </Box>
    </Box>
  );
};

export default Rightbar;
