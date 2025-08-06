interface UserData {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}
async function  postingData(data: UserData) {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': "application/json"
    }
  });
  return await response.json();
}

export default postingData;