import React, { useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import {
    Badge,
    TextField,
    Button,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    CardActions,
    Grid,
    IconButton
} from "@mui/material";
import { red } from '@mui/material/colors';

// let base64img
// const onLoad = (fileString:any) => {
//     console.log(fileString);
//     return fileString
//   };

//   const getBase64 = (file:any) => {
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       onLoad(reader.result);
//     };
//   }

const getBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function Profile() {
    const fileInputRef = useRef<any>();
    const [files, setFiles] = useState<any>(null);
    const [profileData, setProfileData] = useState<any>({
        name: '',
        email: '',
        base64Img: '',
        bio: '',
    });

    const onChange = async (e: any) => {
        const files = e.target.files;
        const file = files[0];
        const imgBase64 = await getBase64(file);
        // setFiles(imgBase64)
        setProfileData({...profileData ,base64Img: imgBase64  })
    };
    console.log(profileData.base64Img, 'base64img---');

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Card sx={{ minWidth: 600, margin: '10px', }}>
                    <CardHeader
                        avatar={
                            <IconButton onClick={() => fileInputRef.current.click()}>

                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                    badgeContent={
                                        <EditIcon sx={{ backgroundColor: 'Pink', borderRadius: '20px', padding: 0.6 }} />
                                        // <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    }
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: red[500],
                                            width: "80px !important",
                                            height: "80px !important",
                                        }}
                                        aria-label="recipe"
                                        alt={profileData?.name}
                                    src={profileData?.base64Img ||`/static/images/avatar/1.jpg`}
                                    // src={base64img}
                                    />
                                    {/* <Avatar alt={item?.name || ''} src={item?.img || " "} /> */}

                                </Badge>
                            </IconButton>
                        }
                        title={profileData?.name}
                        subheader={profileData?.email}
                    />

                    <CardContent>
                        {/* <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography> */}
                        <TextField
                            id="standard-multiline-static"
                            label="Bio :-"
                            multiline
                            rows={4}
                            // defaultValue="Default Value"
                            value={profileData?.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value })}
                            variant="standard"
                            fullWidth
                        />
                    </CardContent>
                    <CardActions disableSpacing>
                        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>*/}
                        <Button>Update</Button>
                        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <ExpandMoreIcon />
        </ExpandMore> */}
                    </CardActions>
                </Card>
            </Grid>

            <input
                accept="image/*"    
                type="file"
                style={{ display: 'none' }}
                onChange={onChange}
                // onChange={(e) => getBase64(e.target.files)}
                ref={fileInputRef}
            />
        </>
    );
}
