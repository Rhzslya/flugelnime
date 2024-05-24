export const combineGenres = (animes) => {
  // Buat array untuk menyimpan genres dari setiap anime
  const combinedGenres = [];

  // Loop melalui setiap anime
  animes.forEach((anime) => {
    // Ambil nama genre dari setiap objek genre di dalam anime
    const genres = anime.genres.map((genre) => genre.name);
    // Gabungkan semua genre yang unik menjadi satu string, pisahkan dengan koma
    const combinedGenresString = [...new Set(genres)].join(", ");
    // Tambahkan string genre gabungan ke dalam array
    combinedGenres.push(combinedGenresString);
  });

  // Kembalikan array yang berisi string genre gabungan untuk setiap anime
  return combinedGenres;
};
