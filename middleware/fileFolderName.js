 const fileFolderName = (folderName) => {
    return  (req, res, next) => {
        req.folderName = folderName; 
        next();
      }
  }
  export default fileFolderName;  