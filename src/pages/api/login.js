
export default function login(req, res) {
  
  const user = { username: "UserSample", password: "123456" };
  if (req.method === "GET") {
    res.status(200).json(confPassword);
  } 
  
  else if (req.method === 'POST') {
    const data = req.body; 

    res.status(200).json({ message: 'Data received', data });
    
  } 
  else {
    console.log("Failed");
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed fdfdfd`);
  }

}

const confPassword = [{
  username: "UserSample", 
  password: "123456",
}];

  