import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Badge,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    TextField
} from "@mui/material";
import { red } from '@mui/material/colors';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../services/firebase";


//   const getBase64 = (file:any) => {
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       onLoad(reader.result);
//     };
//   }

const getUInfofromStorage = (type: any) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    return userInfo ? userInfo[type] : "";
}

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
        setProfileData({ ...profileData, base64Img: imgBase64 })
    };

    const getProfileDetails = (async () => {
        const docRef = doc(db, "users", getUInfofromStorage('email')); //get user data from database
        await getDoc(docRef)
            .then((res: any) => {
                localStorage.setItem('userInfo', JSON.stringify(res.data()))
                setProfileData({ ...profileData, name: res.data().username, email: res.data().email, bio: res.data().bio, base64Img: res.data().avatar })
            })

    })

    const updateProfileDetails = (async () => {
        const getData: any = doc(db, "users", getUInfofromStorage('email'))
        const payload = { 'bio': profileData?.bio, 'avatar': profileData?.base64Img }

        await updateDoc(getData, payload)
            .then((res: any) => {
                console.log(res, 'response');
                toast.success("Profile Details Updated", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                getProfileDetails()
                // localStorage.setItem('userInfo', JSON.stringify(res.data() ) )
                // setProfileData({...profileData, name: res.data().username, email: res.data().email, bio: res.data().bio, base64Img:res.data().avatar })
            }).catch((e) => {
                console.log(e, 'error');
                toast.error("Something went wrong or image size exceeded", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            });

    })

    useEffect(() => {
        getProfileDetails()
    }, [])

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
                                        src={profileData?.base64Img || `/static/images/avatar/1.jpg`}
                                    />
                                    {/* <Avatar alt={item?.name || ''} src={item?.img || " "} /> */}

                                </Badge>
                            </IconButton>
                        }
                        title={profileData?.name}
                        subheader={profileData?.email}
                    />

                    <CardContent>
                        <TextField
                            id="standard-multiline-static"
                            label="Bio :-"
                            multiline
                            rows={4}
                            value={profileData?.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            variant="standard"
                            fullWidth
                        />
                    </CardContent>
                    <CardActions disableSpacing>

                        <Button onClick={() => updateProfileDetails()}>Update</Button>

                    </CardActions>
                </Card>
            </Grid>

            <input
                accept="image/*"
                type="file"
                style={{ display: 'none' }}
                onChange={onChange}
                ref={fileInputRef}
            />
        </>
    );
}
