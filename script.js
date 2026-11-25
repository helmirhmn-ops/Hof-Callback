// Mock Data
const students = [
  { name: "Sumanto", class: "Full Stack Developer", score: 90 },
  { name: "Budi Santoso", class: "Frontend", score: 80 },
  { name: "Deni Sumargo", class: "Data Engineer", score: 94 },
  { name: "Dewi Anggraini", class: "Cloud Engineer", score: 89 },
  { name: "Eko Prasetyo", class: "Security Analyst", score: 74 },
  { name: "Eka Amelia", class: "Backend", score: 95 },
  { name: "Gilang Ramadhan", class: "UI & UX Designer", score: 81 },
  { name: "Hani Fitriani", class: "Network Engineer", score: 87 },
  { name: "Irfan Hakim", class: "Data Engineer", score: 72 },
  { name: "Joko Susilo", class: "IT Staff", score: 89 },
];

// Seleksi Elemen DOM
const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");
const averageScoreEl = document.getElementById("averageScore");

// Fungsi untuk menentukan warna nilai
function getScoreBadgeClass(score) {
  if (score >= 85) return "score-high";
  if (score >= 75) return "score-mid";
  return "score-low";
}

// Fungsi Render Tabel (.map) dan Hitung nilai Rata-rata
function renderDashboard(dataList) {
  // Jika hasil pencarian kosong
  if (dataList.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted py-4">
          Data siswa tidak ditemukan.
        </td>
      </tr>
    `;
    averageScoreEl.textContent = "0.0";
    return;
  }

  // Render baris tabel menggunakan .map()
  const rowsHTML = dataList
    .map((student, index) => {
      const badgeClass = getScoreBadgeClass(student.score);
      return `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td class="fw-semibold">${student.name}</td>
          <td class="text-center">
            <span class="badge-class">${student.class}</span>
          </td>
          <td class="text-center">
            <span class="badge-score ${badgeClass}">${student.score}</span>
          </td>
        </tr>
      `;
    })
    .join("");

  tableBody.innerHTML = rowsHTML;

  // Hitung total nilai menggunakan .reduce() lalu bagi jumlah siswa yang tampil
  const totalScore = dataList.reduce((acc, student) => acc + student.score, 0);
  const averageScore = (totalScore / dataList.length).toFixed(1);

  averageScoreEl.textContent = averageScore;
}

// Event Listener pada Input Pencarian menggunakan .filter()
searchInput.addEventListener("input", (event) => {
  const keyword = event.target.value.toLowerCase().trim();

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(keyword),
  );

  renderDashboard(filteredStudents);
});

// Render awal saat halaman pertama kali dibuka
renderDashboard(students);
