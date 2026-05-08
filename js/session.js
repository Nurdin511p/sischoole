async function checkSession() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.href = "login.html";
    return;
  }

  const userId = session.user.id;

  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  console.log(data);

  document.getElementById("user-name").innerText = data.nama;

  document.getElementById("user-role").innerText = data.role;
}

async function logout() {
  await supabaseClient.auth.signOut();

  window.location.href = "login.html";
}
