let fs = require('fs');

export const deleteFile = (filePath: string) => {
  try {
    fs.unlinkSync(filePath);
    console.log(`${filePath} deleted`);
    return true;
  } catch (err: any) {
    return err.message;
  }
};
