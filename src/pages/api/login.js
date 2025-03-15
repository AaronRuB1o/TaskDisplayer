export default function login(req, res) {
  if (req.method === 'POST') {
    const data = req.body; 
    let authenticated = false;

    if(user.username == data.username && user.password == data.password){
      authenticated = true;
    }
    res.status(200).json({ authenticated
    });



  } 
  else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

}

const user = {
  username: "UserSample", 
  password: "123456",
};

  