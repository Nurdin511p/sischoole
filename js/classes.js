async function createClass() {
  const namaKelas = document.getElementById("nama-kelas").value;

  const tingkat = document.getElementById("tingkat").value;

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  const userId = session.user.id;

  const { error } = await supabaseClient.from("classes").insert([
    {
      nama_kelas: namaKelas,
      tingkat: tingkat,
      wali_kelas: userId,
    },
  ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Kelas berhasil dibuat");

  loadClasses();
}

async function loadClasses() {
  const { data, error } = await supabaseClient
    .from("classes")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  const classList = document.getElementById("class-list");

  classList.innerHTML = "";

  data.forEach((kelas) => {
    classList.innerHTML += `

      <div class="bg-white p-4 rounded shadow">

        <h2 class="text-xl font-bold">
          ${kelas.nama_kelas}
        </h2>

        <p>
          Tingkat:
          ${kelas.tingkat}
        </p>

      </div>

    `;
  });
}

loadClasses();
