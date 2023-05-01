import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Collapse,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import moment from 'moment';
import { useState } from "react";
import { db } from "../services/firebase";

const getUInfofromStorage = (type: any) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
  return userInfo ? userInfo[type] : "";
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

const Post = ({ name, createdAt, img, desc, taggedPerson, postId }: any) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = async () => {
    const getData: any = doc(db, "users", getUInfofromStorage('email'), "posts", postId)
    await getDoc(getData)
      .then(async (results: any) => {
        let payload: any = ''
        if (results.data().like) {
          payload = { like: results.data().like + 1 }
        } else {
          payload = { like: 1 }
        }
        console.log(payload, 'payload');
        await updateDoc(getData, payload)
          .then(async () => {
            const userLikeComment: any = await collection(db, "users", getUInfofromStorage('email'), "posts", postId, 'comments')
            console.log(userLikeComment, 'userLikeComment --');
            onSnapshot(userLikeComment, async (snapshot: any) => {
              const likeComments: any = await doc(db, "users", getUInfofromStorage('email'), "posts", postId, 'comments', getUInfofromStorage('email'))
              console.log(snapshot.docs, '---datat');
              if (snapshot.docs.length > 0) {
                await updateDoc(likeComments, payload)
              } else {
                await setDoc(likeComments, payload)
              }
            })

            await updateDoc(userLikeComment, payload)
              .catch((e) => {
                console.log(e, 'error');
              })
          })

      })

  };


  // const userLikes = (async () => {
  //   const docRef = doc(db, "users", getUInfofromStorage('email'), "posts", postId); //get user data from database
  //   await getDoc(docRef)
  //     .then((res: any) => {
  //       console.log(res.data().like, 'res.data().like --');

  //       // localStorage.setItem('userInfo', JSON.stringify(res.data() ) )
  //       // setProfileData({...profileData, name: res.data().username, email: res.data().email, bio: res.data().bio, base64Img:res.data().avatar })
  //     })

  // })

  // useEffect(() => {
  //   userLikes()
  // }, [])

  const addComment = (async () => {
    const docRef = doc(db, "users", getUInfofromStorage('email'), "posts", postId); //get user data from database
    await getDoc(docRef)
      .then((res: any) => {
        // console.log(res.data().like, 'res.data().like --');
      })

  })



  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" alt={name} src=" " />
        }

        title={taggedPerson.length > 0 ? `${name} is with ${taggedPerson[0]} ${taggedPerson.length > 1 && `and ${taggedPerson.length - 1} others`}` : name}
        subheader={moment(createdAt).format("MM MMM [at] hh:mm a")}
      />
      <CardMedia
        component="img"
        height="20%"
        image={img}
        alt="Posts"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => handleLikeClick()}>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <AddCommentIcon />
        </ExpandMore>

      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>All comments:</Typography>

          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                S
              </Avatar>
            }
            title="Snehasis"
            subheader="Cool :)"
          />

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Write a comment ..."
              inputProps={{ "aria-label": "Write a comment" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <ArrowCircleRightIcon />
            </IconButton>
          </Paper>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
