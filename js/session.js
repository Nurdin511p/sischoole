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

  loadRoleMenu(data.role);
}

async function logout() {
  await supabaseClient.auth.signOut();

  window.location.href = "login.html";
}

function loadRoleMenu(role) {
  const roleMenu = document.getElementById("role-menu");

  if (role === "admin") {
    roleMenu.innerHTML = `
      <div class="bg-red-100 p-4 rounded">
        <h3 class="font-bold text-lg">
          Menu Admin
        </h3>

        <ul class="mt-2">
          <li>Kelola User</li>
          <li>Kelola Sistem</li>
          <li>Laporan Sekolah</li>
        </ul>
      </div>
    `;
  } else if (role === "guru") {
    roleMenu.innerHTML = `
      <div class="bg-blue-100 p-4 rounded">
        <h3 class="font-bold text-lg">
          Menu Guru
        </h3>

        <ul class="mt-2">
          <li>Upload Materi</li>
          <li>Buat Tugas</li>
          <li>Input Nilai</li>
        </ul>
      </div>
    `;
  } else if (role === "siswa") {
    roleMenu.innerHTML = `
      <div class="bg-green-100 p-4 rounded">
        <h3 class="font-bold text-lg">
          Menu Siswa
        </h3>

        <ul class="mt-2">
          <li>Lihat Materi</li>
          <li>Kumpulkan Tugas</li>
          <li>Lihat Nilai</li>
        </ul>
      </div>
    `;
  } else if (role === "kepala_sekolah") {
    roleMenu.innerHTML = `
      <div class="bg-yellow-100 p-4 rounded">
        <h3 class="font-bold text-lg">
          Menu Kepala Sekolah
        </h3>

        <ul class="mt-2">
          <li>Monitoring Guru</li>
          <li>Laporan Sekolah</li>
        </ul>
      </div>
    `;
  } else if (role === "orang_tua") {
    roleMenu.innerHTML = `
      <div class="bg-purple-100 p-4 rounded">
        <h3 class="font-bold text-lg">
          Menu Orang Tua
        </h3>

        <ul class="mt-2">
          <li>Monitoring Anak</li>
          <li>Lihat Nilai</li>
        </ul>
      </div>
    `;
  }
}
