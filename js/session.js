async function checkSession() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.href = "login.html";
  } else {
    console.log("User Login:", session.user.email);
  }
}

async function logout() {
  await supabaseClient.auth.signOut();

  alert("Logout berhasil");

  window.location.href = "login.html";
}
