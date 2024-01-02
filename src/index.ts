import app from './app';
import connection from "./configs/database"

const PORT = process.env.PORT || 7171;

app.listen(PORT,async () => {
    try {
        await connection;
        console.log("Connected to Database")
    } catch (error) {
        console.log(error)
        console.log("Unable to connect to Database")
    }
    console.log(`Server is running on port ${PORT}`);
});
 // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTkzZWQxNzdjMjVkM2IxYTBiMjMwZmMiLCJpYXQiOjE3MDQxOTQxMDB9.xL_Mc0QaJ4PdLQJhpnl0iWZ-S-hcfsgBEWfa9tpy934