import multer from "multer";


export const fileUploadFunc = () => {
    try{
        const storage = multer.diskStorage({
            destination: function (req, file, cb){
                cb(null, "public/assets");
            },
            filename: function (req, file, cb){
                cb(null, file.originalname);
            }
        });
        const upload = multer({ storage});
        return upload;
    }catch(err){
        console.log("upload err", err);
    }
}