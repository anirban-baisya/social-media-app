import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
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
      // console.log(setdata, 'setdata ---');

    })
    // console.log(snapshot.docs, 'snapshot ---')

    getFollowerList();

  }
    , []
  );


  const followFriend = (async (followingFriendId: any) => {
    console.log('clicked ---');

    // dataArr.push(followingFriendId)
    // const getData = doc(collection(db, "users", getUInfofromStorage('email')))
    // console.log(docRef,'2345678----');

    // const ref = doc(docRef,'posts');

    const usersRef = doc(db, "users", getUInfofromStorage('email')); //update user doc

    const getPreviousFollowingList: any = await getDoc(usersRef);
    let dataArr: any = []
    // const getPreviousFollowers = getPreviousFollowingList?.data()?.followingFriend.map((data:any) => { return data  })
    // console.log(getPreviousFollowingList?.data(),'friends -');
    getPreviousFollowingList?.data()?.followingFriend.map((doc: any) => {
      dataArr.push(doc)
    });

    dataArr.push(followingFriendId)
    // console.log(dataArr,'dataArr');

    const payload = { followingFriend: dataArr }
    await updateDoc(usersRef, payload); // update users doc

    // await setDoc(getData, payload)
    // await addDoc(collection(users, 'SF', 'landmarks'), {
    //     name: 'Golden Gate Bridge',
    //     type: 'bridge'
    // }),
    // setDoc(doc(db, "users" , 'posts','test@gmail.com' ), payload)

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
                  // <IconButton edge="end" aria-label="delete">
                  //   <DeleteIcon />
                  // </IconButton>
                  <Stack direction="column" gap={1} mt={2} mb={3}>
                    <Button onClick={() => followFriend(item?.email)}>Follow</Button>
                    {/* <Button>Follow</Button> */}
                  </Stack>
                }
              >
                <ListItemAvatar>
                  {/* <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/7.jpg" /> */}
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
          {allUserList?.filter((element:any) => (element.id != getUInfofromStorage('email')) 
          // FollwerList.includes(element.id) 
          // (FollwerList.map((e:any) => (e.id != element.id )) )
          //.filter((e:any) =>  FollwerList.includes(e.id ))
          ).map((item: any) => (
            <>
              <ListItem alignItems="flex-start"
                secondaryAction={
                  // <IconButton edge="end" aria-label="delete">
                  //   <DeleteIcon />
                  // </IconButton>
                  <Stack direction="column" gap={1} mt={2} mb={3}>
                    <Button onClick={() => followFriend(item?.email)}>Follow</Button>
                    {/* <Button>Follow</Button> */}
                  </Stack>
                }
              >
                <ListItemAvatar>
                  {/* <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/7.jpg" /> */}
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


// {routes[getMenuKey()].map((item: any) => (
//   <ListItem key={item.label} disablePadding onClick={() => router.push(item.path)}>
//     <ListItemButton selected={checkActiveMenu() === item.label} sx={{ textAlign: 'center' }}>
//       <ListItemText primary={item.label} />
//     </ListItemButton>
//   </ListItem>
// ))}