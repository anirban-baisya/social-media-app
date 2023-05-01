import React, { useRef } from 'react'
import { onSnapshot, collection, doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import db from "../services/firebase";

import {
    Avatar,
    Button,
    ButtonGroup,
    Fab,
    Modal,
    Stack,
    styled,
    TextField,
    Tooltip,
    Typography,
    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    DialogActions,
    IconButton,
    Card,
    CardMedia
} from "@mui/material";


import {
    Add as AddIcon,
    DateRange,
    EmojiEmotions,
    Image,
    PersonAdd,
    VideoCameraBack,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import moment from 'moment';
import { toast } from 'react-toastify';
// import { Image } from 'image-js';

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

const friendList = [
    {
        id: 1,
        name: "John",
        email: "john@gmail.com"
    },
    {
        id: 2,
        name: "David",
        email: "david@gmail.com"
    },
    {
        id: 3,
        name: "James",
        email: "james@gmail.com"
    }
];

const getUInfofromStorage = (type: any) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    return userInfo ? userInfo[type] : "";
}

// const resizeBase64 = async (image: any) => {
    //     const destructImage = image.split(";");
    //     const mimType = destructImage[0].split(":")[1];
    //     const imageData = destructImage[1].split(",")[1];
    //     try {
        //         let resizedImage = Buffer.from(imageData, "base64")
//         resizedImage = await sharp(resizedImage).resize(640, 640).toBuffer()
//         return `data:${mimType};base64,${resizedImage.toString("base64")}`
//     } catch(e) {
    //             console.log(e,'error');
            
//     }
// }

// const downsizeImage = async (
//     imageBase64: string
// ): Promise<string> => {
//   const blob = await fetch(imageBase64).then(r => r.blob());
//   const buffer:any = await blob.arrayBuffer();

//   const image = await Image.load(buffer);

//   const resizedImage = image.resize({ width: 200, height: 200 });

//   const imgBuffer = resizedImage.toBuffer();

//   // convert to base64
//   return Buffer.from(imgBuffer)
//       .toString('base64');
// }

const getBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>  resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function CreatePost({setFetchedPostDetails} :any) {
    const fileInputRef = useRef<any>();

    const [FollwerList, setFollwerList] = React.useState<any>([]);
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState<any>([]);
    const [createPostData, setCreatePostData] = React.useState<any>({
        base64Img: '',
        content: '',
    });

    const handleToggle = (value: any) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    console.log(checked,'checkedList----');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent<unknown>,
        reason?: string
    ) => {
        if (reason !== "backdropClick") {
            setOpen(false);
        }
    };

    const getFollowerPost = async () => { //get posts 

        const getData = collection(db, "users", getUInfofromStorage('email'), "posts")
       
        const usersRef = doc(db, "users", getUInfofromStorage('email') ) // getting user
  
          onSnapshot(getData, async (snapshot:any) =>{
  
            const userList:any =  await getDoc(usersRef);
           const userInfo = userList?.data()
            const postDetails:any = snapshot.docs.map((doc:any) => { return { ...doc.data() , 'name': userInfo.username } } )
            console.log(postDetails,'userInfo -')
            return setFetchedPostDetails(postDetails)
          })
  
    }


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

    const getAllUserList = (async () => {

        const usersRef = doc(db, "users", getUInfofromStorage('email') ) // getting user
        const userList:any =  await getDoc(usersRef);
        const userInfo = userList?.data()
        console.log(userList, 'userInfo ---')
     });

    React.useEffect(() =>{

            // console.log(moment().format("DD-MM-YYYY hh:mm a"), 'time ---')
            console.log(moment('01-05-2023 12:06 am').format("MM MMM [at] hh:mm a"), 'time ---')
        //01-05-2023 12:06 am
        //   onSnapshot(collection(db, "users"), (snapshot) =>
        //     (snapshot.docs.map((doc) => (
            //         //  ...doc.data(), 
            //         console.log(doc,'23456')
            
            //         ))) 
            //   )
            // onSnapshot(collection(db, "colors"), (snapshot) =>
            //     console.log(snapshot.docs.map((doc) => doc.data()))
            //     // console.log(snapshot.docs, 'snapshot ---')
            // )
            getAllUserList()
            getFollowerList()
        }, []
    );

    // function addPost(params) {

    // }
    const addPost = (async () => {
        console.log('23456789');
        // onSnapshot(collection(db, "colors"), (snapshot) =>
        // console.log( snapshot.docs.map((doc) =>  doc.data() )  )
        //     // console.log(snapshot.docs, 'snapshot ---')
        // )
        // console.log(getUInfofromStorage('email'),'----');
        // const base64img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
        // const docRef = doc(db, 'users',getUInfofromStorage('email'), 'posts');
        // const docRef = doc(db, 'users','test@gmail.com');
        const getData = doc(collection(db, "users", getUInfofromStorage('email'), "posts"))
        
        // const ref = doc(docRef,'posts');
        const payload = { desc: createPostData.content , img: createPostData.base64Img , createdAt: moment().format("DD-MM-YYYY hh:mm a"), taggedPerson: checked }
        await setDoc(getData, payload)
        .then(e =>{
            toast.success("Post Added", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            getFollowerPost()
            setCreatePostData({ content:'' , base64Img: '' })})
        .catch(e =>{
            toast.error("Something went wrong ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

            console.log(e,'errr')
        
    })
        // await addDoc(collection(users, 'SF', 'landmarks'), {
        //     name: 'Golden Gate Bridge',
        //     type: 'bridge'
        // }),
        // setDoc(doc(db, "users" , 'posts','test@gmail.com' ), payload)
        // setCreatePostData({ content:'' , base64Img: '' })
    });

    const onImgUpload = async (e: any) => {
        const files = e.target.files;
        const file = files[0];
        const imgBase64 = await getBase64(file);
        // setFiles(imgBase64)
        setCreatePostData({ ...createPostData, base64Img: imgBase64 })
        // setProfileData({...profileData ,base64Img: imgBase64  })
    };
    
    console.log(createPostData,'2345678----');

    console.log(FollwerList,'FollwerList----');

    return (
        <>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Tag friends</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                        <FormControl sx={{ minWidth: 250 }}>

                            <List
                                dense
                                sx={{
                                    width: "100%",
                                    // maxWidth: 360,
                                    bgcolor: "background.paper"
                                }}
                                subheader={<ListSubheader>Suggestions :-</ListSubheader>}
                            >
                                {FollwerList?.map((value:any, i:any) => {
                                    const labelId = `checkbox-list-secondary-label-${value}`;
                                    return (
                                        <ListItem
                                            key={value.id}
                                            secondaryAction={
                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle(value?.name)}
                                                    checked={checked.indexOf(value.id) !== -1}
                                                    inputProps={{ "aria-labelledby": labelId }}
                                                />
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        alt={value?.name}
                                                        src={value.img}
                                                    />
                                                    {/* <Avatar alt={getUInfofromStorage(displayName) || ''} src={item?.img || " "} />  */}
                                                </ListItemAvatar>
                                                <ListItemText id={labelId} primary={value.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>

            <Box
                //   width={300}
                width={{ xs: 300, md: '95%' }}
                // height={380}
                height={createPostData?.base64Img ? 530 : 255}
                bgcolor={"background.default"}
                color={"text.primary"}
                p={3}
                borderRadius={5}
            >
                <Typography variant="h6" color="gray" textAlign="center">
                    Create post
                </Typography>
                <UserBox>
                    <Avatar
                        src={getUInfofromStorage('avatar')}
                        sx={{ width: 30, height: 30 }}
                    />
                    <Typography fontWeight={500} variant="body1">
                        {getUInfofromStorage('username')}
                    </Typography>
                </UserBox>
                <TextField
                    sx={{ width: "100%" }}
                    id="standard-multiline-static"
                    multiline
                    rows={3}
                    placeholder="What's on your mind?"
                    variant="standard"
                    value={createPostData.content}
                    onChange={(e) => setCreatePostData({ ...createPostData, content: e.target.value })}

                />

                {createPostData?.base64Img && <Card
                    raised
                    sx={{
                        maxWidth: 280,
                        margin: "0 auto",
                        padding: "0.1em",
                        marginTop: "1.5em",
                    }}
                >
                    <CardMedia
                        component="img"
                        height="250"
                        image={createPostData?.base64Img}
                        // image={'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6'}
                        alt={"alt"}
                        sx={{ objectFit: "contain" }}
                    />
                </Card>}


                <Stack direction="row" gap={1} mt={2} mb={3}>
                    <IconButton aria-label="delete" onClick={() => ''}>
                        <EmojiEmotions color="primary" />
                    </IconButton>

                    <IconButton aria-label="delete" onClick={() => fileInputRef.current.click()}>
                        <Image color="secondary" />
                    </IconButton>

                    <IconButton aria-label="delete"onClick={() => ''}>
                        <VideoCameraBack color="success" />
                    </IconButton>
                    {/* <Button onClick={handleClickOpen}>
                        <PersonAdd color="error" />
                    </Button> */}
                    <IconButton aria-label="delete" onClick={handleClickOpen}>
                        <PersonAdd color="error" />
                    </IconButton>
                </Stack >
                <ButtonGroup
                    fullWidth
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    <Button onClick={() => addPost()}>Post</Button>

                </ButtonGroup>
            </Box >

            <input
                accept="image/*"
                type="file"
                style={{ display: 'none' }}
                onChange={onImgUpload}
                ref={fileInputRef}
            />
        </>
    )
}
