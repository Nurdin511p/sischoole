async function register() {
  const nama = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  if (user) {
    const { error: profileError } = await supabaseClient
      .from("profiles")
      .insert([
        {
          id: user.id,
          nama: nama,
          email: email,
          role: "siswa",
        },
      ]);

    if (profileError) {
      console.log(profileError);
      alert(profileError.message);
    }
  }
  alert("Register berhasil!");
  window.location.href = "login.html";
}

async function login() {
  const email = document.getElementById("login-email").value;

  const password = document.getElementById("login-password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login berhasil!");

  window.location.href = "dashboard.html";
}
